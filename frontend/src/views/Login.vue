<template>
  <div class="login-wrapper">
    <v-container class="container-login">
      <div class="mb-4">
        <img draggable="false" src="../assets/logo2.png" alt="logo-app" />
      </div>
      <v-card elevation="0" class="mx-auto card-login" width="350">
        <v-form ref="form" v-model="valid" :lazy-validation="lazy">
          <v-col cols="12" lg="12" class="pb-0 pt-0">
            <v-text-field
              color="primary"
              v-model="accessCode"
              outlined
              prepend-inner-icon="account_circle"
              label="Código Alumno/Docente"
              :rules="codeRules"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="12" class="pb-0 pt-0">
            <v-text-field
              color="primary"
              v-model="password"
              outlined
              type="password"
              :rules="passwordRules"
              prepend-inner-icon="lock"
              label="Contraseña"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="12" class="pb-0 pt-1">
            <div class="btn-login">
              <v-btn :loading="loading" :disabled="loading" color="primary" class="btn-block mx-auto" @click="signIn">Iniciar Sesión</v-btn>
              <router-link to="/login/register">
                Aún no tienes una cuenta?
              </router-link>
            </div>
          </v-col>
        </v-form>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Swal from 'sweetalert2';

export default {
  data: () => ({
    valid: true,
    lazy: false,
    loading: false,
    accessCode: "",
    password: "",
    codeRules: [
      v => !!v || "Ingresa tu código de acceso!"
      /* v => (v && v.length <= 10) || 'Name must be less than 10 characters', */
    ],
    passwordRules: [
      v => !!v || "Ingresa tu contraseña para acceder!"
      /* v => (v && v.length <= 10) || 'Name must be less than 10 characters', */
    ]
  }),
  mounted(){
    if(localStorage.getItem('codeTemp')){
      this.accessCode = localStorage.getItem('codeTemp');
    }
  },
  methods: {
    validate() {
      return this.$refs.form.validate();
    },
    async signIn() {
      if (!this.validate()) return;
      this.loading = true;
      const res = await this.$store.dispatch('login', {
          accessCode: this.accessCode,
          password: this.password
      })
      if(res.status !== 200){
        this.loading = false;
        return Swal.fire('Oops!', `${res.data.msg}`, 'error')
      }
      this.loading = false;
      localStorage.removeItem('codeTemp');
      this.$router.push('/');
    }
  }
};
</script>

<style lang="scss">
.login-wrapper {
  width: 100%;
  height: 100vh;
  /* background: rgb(250, 249, 255); */
 /*  background: rgb(255, 243, 191); */
  overflow: hidden;
  .container-login {
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    .card-login{
        background: none !important;
    }
    img {
      max-height: 150px;
      max-width: 100%;
    }
    .btn-login {
      width: 100%;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      justify-content: center;
      button {
        width: 100%;
        height: 45px;
        border-radius: 30px;
      }
      a {
          margin-top: 12px;
          text-decoration: none;
          font-size: 14px;
      }
    }
  }
}
</style>