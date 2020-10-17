<template>
  <div class="home">
    <h1>Bienvenido {{user.names}}!!! - {{role}}</h1>
    <v-btn @click="signOut" color="primary">Cerrar sesión</v-btn>
    <!-- <div>{{user}}</div> -->
    <FormRegister :isCreate="false" :userEdited="user"/>
  </div>
</template>

<script>
import FormRegister from '@/components/forms/FormRegister'
import { mapState } from "vuex";

export default {
  name: "Home",
  data: () => ({
    interval: null
  }),
  components: {
    FormRegister
  },
  computed: {
    ...mapState({
      user: state => state.user,
      role: state => state.user.role
    })
  },
  mounted() {
    this.getDataByRoleUser(this.user.role);
  },
  methods: {
    signOut() {
      localStorage.removeItem("token");
      localStorage.removeItem("iat");
      this.$store.commit("setCurrentUser", null);
      this.$store.commit("setAuthToken", null);
      location.reload();
      //this.$router.push('/login').catch(err => {})
    },
    async getDataByRoleUser(role) {
      console.log(role);
      this.$store.dispatch('getAllDegrees');
      this.verifyTimeExpiresToken();
    },
    async verifyTimeExpiresToken() {
      this.interval = setInterval(async () => {
        try {
          console.log('verificando token');
          if (
            localStorage.getItem("iat") - Date.now() <= 60000 &&
            localStorage.getItem("iat") - Date.now() > 0
          ) {
            console.log("renovando token");
            clearInterval(this.interval);
            const res = await this.$store.dispatch("refreshedToken"); //renovamos el token
            if (res) {
              this.verifyTimeExpiresToken(); // volvemos a ejecutar recursivamente la función
            } else {
              this.redirectLogin();
            }
          } else if (localStorage.getItem("iat") - Date.now() <= 0) {
            this.redirectLogin();
          }
        } catch (error) {}
      }, 5000);
    },
    redirectLogin() {
      this.$store.dispatch("logout");
      this.$router.push("/login").catch(err => {});
      clearInterval(this.interval);
    }
  }
};
</script>
