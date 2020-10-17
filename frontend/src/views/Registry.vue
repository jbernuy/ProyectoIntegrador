<template>
  <div class="registry-view">
    <v-container v-if="!register" class="registry-container">
      <h1 class="text-center color-primary">¿Quiere registrarse como?</h1>
      <v-row>
        <v-col cols="12" lg="6" md="6" sm="12">
          <div class="card-register mx-auto">
            <h3 class="text-center color-primary">Docente</h3>
            <img draggable="false" src="../assets/icons/profesor2.png" alt />
            <v-btn @click="openForm(1)" color="primary">Continuar</v-btn>
          </div>
        </v-col>
        <v-col cols="12" lg="6" md="6" sm="12">
          <div class="card-register mx-auto">
            <h3 class="text-center color-primary">Estudiante</h3>
            <img draggable="false" src="../assets/icons/estudiante2.png" alt />
            <v-btn @click="openForm(2)" color="primary">Continuar</v-btn>
          </div>
        </v-col>
      </v-row>
      <p class="return-login text-center mt-3">
        <router-link to="/login" class="color-primary">Volver al Login</router-link>
      </p>
    </v-container>
    <v-container class="registry-container-form" v-else>
        <FormRegistry 
        :isCreate="true"
        :title="title"
        :role="role"
        v-on:closeThisForm="closeForm"
        />
    </v-container>

  </div>
</template>

<script>
import FormRegistry from '@/components/forms/FormRegister';

export default {
    components: {
        FormRegistry
    },
    data: () => ({
        register: false,
        role: '',
        title: '',
    }),
    async mounted(){
      await this.$store.dispatch('getAllDegrees');
    },
    methods: {
        openForm(type){
            this.register = true;
            if(type===1){
                this.title="REGISTRO DOCENTE";
                this.role = 'docente'
            }else {
                this.title="REGISTRO ESTUDIANTE";
                this.role = 'alumno'
            }
        },
        closeForm(){
          this.register = false;
        }
    }
};
</script>

<style lang="scss">
.registry-view {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(243, 233, 190);
  .registry-container {
    width: 100%;
    .return-login {
      a {
        text-decoration: none;
        font-size: 15px;
        font-weight: 500;
      }
    }
    .card-register {
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      max-width: 300px;
      img {
        margin-top: 10px;
        margin-bottom: 10px;
        max-height: 250px;
      }
      button {
        width: 100%;
        border-radius: 30px;
      }
    }
  }
  .registry-container-form {
      padding: 2em 0;
  }
}
@media screen and (max-width: 500px) {
  .registry-view {
    padding: 2em 0;
    .registry-container {
      h1 {
        font-size: 25px;
      }
      h3 {
        font-size: 18px;
      }
    }
  }
}

@media screen and (max-width: 355px) {
  .registry-view {
    padding: 2em 0;
    .registry-container {
      h1 {
        font-size: 20px;
      }
      h3 {
        font-size: 15px;
      }
      a {
          font-size: 13px;
      }
    }
  }
}
</style>