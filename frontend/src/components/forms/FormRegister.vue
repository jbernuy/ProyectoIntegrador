<template>
  <v-card elevation="0" width="900" class="mx-auto">
    <v-container class="form-container">
      <h3 class="text-center color-primary mb-3">{{title}}</h3>
      <v-form ref="form" v-model="valid" :lazy-validation="lazy" class="form-register">
        <v-row>
          <v-col cols="12" lg="12" md="12" sm="12" class="pb-0 pt-0">
            <div class="preview-section">
              <canvas class="d-none" id="preview-image"></canvas>
              <div class="preview-img" :style="updateBgImage(image || imgBase64)"></div>
              <input
                id="file-input-register"
                placeholder="Seleccionar imagen"
                class="file-select"
                type="file"
                accept="image/*"
                required
              />
              <v-alert
                v-if="!image && isCreate"
                dense
                style="max-width: 265px;"
                type="error"
              >Selecciona una imagen!</v-alert>
            </div>
          </v-col>
          <v-col cols="12" lg="6" md="6" sm="12" class="pb-0 pt-0">
            <v-text-field
              color="primary"
              v-model="user.names"
              outlined
              prepend-inner-icon="account_circle"
              label="Nombres"
              :rules="nameRules"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6" md="6" sm="12" class="pb-0 pt-0">
            <v-text-field
              color="primary"
              v-model="user.lastNames"
              outlined
              prepend-inner-icon="account_circle"
              label="Apellidos"
              :rules="lastNameRules"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6" md="6" sm="12" class="pb-0 pt-0">
            <v-text-field
              color="primary"
              v-model="user.age"
              outlined
              prepend-inner-icon="account_circle"
              label="Edad"
              type="number"
              :rules="ageRules"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="6" md="6" sm="12" class="pb-0 pt-0">
            <v-text-field
              color="primary"
              v-model="user.phone"
              outlined
              prepend-inner-icon="phone_enabled"
              label="Telefono"
              :rules="phoneRules"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" lg="12" md="12" sm="12" class="pb-0 pt-0">
            <v-text-field
              color="primary"
              v-model="user.address"
              outlined
              prepend-inner-icon="room"
              label="Domicilio"
              :rules="addressRules"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" lg="12" md="12" sm="12" class="pb-0 pt-0">
            <v-text-field
              color="primary"
              v-model="user.email"
              outlined
              prepend-inner-icon="email"
              label="Correo"
              type="email"
              :rules="emailRules"
              required
            ></v-text-field>
          </v-col>
          <v-col v-if="!isAdmin" cols="12" lg="6" md="6" sm="12" class="pb-0 pt-0">
            <v-select
              color="primary"
              v-model="user.degree"
              :items="degrees"
              outlined
              prepend-inner-icon="school"
              label="Elige un grado de enseñanza o aprendizaje"
              type="email"
              item-text="name"
              item-value="degreeCode"
              :rules="degreeRules"
              required
            ></v-select>
          </v-col>
          <v-col cols="12" lg="6" md="6" sm="12" class="pb-0 pt-0">
            <v-text-field
              color="primary"
              v-model="user.password"
              outlined
              prepend-inner-icon="lock"
              label="Contraseña"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="passwordRules"
              required
            ></v-text-field>
          </v-col>
          <v-col v-if="isCreate" cols="12" lg="12" md="12" sm="12" class="pb-0 pt-0">
            <div class="sect-buttons-registry">
              <v-btn
                :loading="loading"
                :disabled="loading"
                color="primary"
                @click="sendRegistry"
              >Registrar</v-btn>
              <v-btn color="primary" @click="closeForm">Salir</v-btn>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
import Swal from "sweetalert2";
import { mapState } from "vuex";
export default {
  props: {
    role: String,
    title: String,
    isCreate: Boolean,
    userEdited: Object
  },
  data: () => ({
    nameRules: [v => !!v || "Ingresa tus nombres!"],
    lastNameRules: [v => !!v || "Ingresa tus apellidos!"],
    emailRules: [
      v => !!v || "Ingresa tu correo aquí!",
      v => /.+@.+\..+/.test(v) || "Escribe un correo válido!"
    ],
    ageRules: [v => !!v || "Ingresa tu edad aquí!"],
    addressRules: [v => !!v || "Ingresa tu dirección aquí!"],
    phoneRules: [v => !!v || "Ingresa tu número telofónico aquí!"],
    degreeRules: [v => !!v || "Elige un grado por favor!"],
    passwordRules: [
      v => !!v || "Ingresa una contraseña aquí!",
      v =>
        (v && v.length >= 6) ||
        "La contraseña debe contener al menos 6 caractéres"
    ],
    valid: true,
    lazy: false,
    loading: false,
    showPassword: false,
    user: {
      names: "",
      lastNames: "",
      age: "",
      phone: "",
      address: "",
      email: "",
      password: "",
      role: "",
      degree: null
    },
    image: null,
    imgBase64: null,
    noImage: false
  }),
  computed: {
    ...mapState({
      degrees: state => state.degrees.all,
      isAdmin: function(state) {
        if(this.isCreate) return false;
        
        if(state.user.role === 'administrador') return true;
        return false;
      },
    })
  },
  mounted() {
    document
      .getElementById("file-input-register")
      .addEventListener("change", this.updatePreview, true);
    if (!this.isCreate) {
      this.user = {...this.userEdited}
      this.imgBase64 = `${this.$store.state.baseURL}${this.userEdited.image}`;
      console.log(this.imgBase64);
      this.updateBgImage(this.imgBase64)
    }
  },
  methods: {
    updatePreview(e) {
      // Re-escalar imagenes a un tamaño más pequeño
      e.preventDefault();
      const width = 200;
      var canvasEj = document.getElementById("canvas-previsualizador");
      if (e.target.files.length === 0) return /* limpiarCanvas() */;
      const fileName = e.target.files[0].name;
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);

      reader.onload = event => {
        this.imgBase64 = event.target.result;
        const img = new Image();
        img.src = event.target.result;
        (img.onload = () => {
          const elem = document.getElementById("preview-image");
          const scaleFactor = width / img.width;
          elem.width = width;
          elem.height = img.height * scaleFactor;
          const ctx = elem.getContext("2d");
          // img.width and img.height will contain the original dimensions
          ctx.drawImage(img, 0, 0, width, img.height * scaleFactor);
          ctx.canvas.toBlob(
            blob => {
              const file = new File([blob], fileName, {
                type: "image/jpeg",
                lastModified: Date.now()
              });
              this.image = file;
            },
            "image/jpeg",
            1
          );
        }),
          (reader.onerror = error => {});
      };
    },
    validateForm() {
      return this.$refs.form.validate() && this.image;
    },
    closeForm() {
      this.$emit("closeThisForm");
    },
    async sendRegistry() {
      if (!this.validateForm()) return;
      const DATA_USER = this.buildData(this.isCreate);
      this.loading = true;
      const res = await this.$store.dispatch("registerUser", DATA_USER);
      if (res.status !== 200) {
        this.loading = false;
        return Swal.fire("Ocurrio un error!", `${res.data.msg}`, "error");
      }
      this.loading = false;
      Swal.fire(
        "Bien!!!",
        `${res.data.msg}<br>Tu usuario de acceso es: ${res.data.user.accessCode}`,
        "success"
      );
      localStorage.setItem("codeTemp", res.data.user.accessCode);
      this.$router.push("/login").catch(err => {});
    },
    buildData(isCreate) {
      if (isCreate) {
        const FORM_USER = new FormData();
        const USER = {
          names: this.user.names,
          lastNames: this.user.lastNames,
          age: this.user.age,
          phone: this.user.phone,
          address: this.user.address,
          email: this.user.email,
          accessCode: "",
          password: this.user.password,
          role: this.role,
          degree: this.user.degree
        };
        FORM_USER.append("image", this.image);
        FORM_USER.append("user", JSON.stringify(USER));
        return FORM_USER;
      }
    },
    updateBgImage(img) {
      if (!img) return `background: #ccc;`;
      return `background-image: url(${this.imgBase64});`;
    }
  }
};
</script>

<style lang="scss">
.form-container {
  padding: 2em 2em !important;
  .form-register {
    .row {
      margin: 1em 3em;
    }
    .sect-buttons-registry {
      width: 100%;
      display: flex;
      justify-content: center;
      button {
        margin-right: 1em;
        /* border-radius: 30px; */
      }
    }
  }
}

.preview-section {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
  margin-bottom: 10px;

  #preview-image,
  .preview-img {
    width: 160px;
    height: 160px;
  }
  #preview-image {
    background: #ccc;
  }
  .preview-img {
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .file-select {
    margin-top: 8px;
    margin-bottom: 10px;
    max-width: 155px;
  }
}

@media screen and (max-width: 500px) {
  .form-container {
    padding: 2em 1em !important;
    .form-register {
      .row {
        margin: 1em 1em;
      }
    }
  }
}

@media screen and (max-width: 400px) {
  .form-container {
    padding: 2em 1em !important;
    .form-register {
      .row {
        margin: 0.5em 0;
      }
    }
  }
}
@media screen and (max-width: 340px) {
  .form-container {
    padding: 1.5em 0.5em !important;
    .form-register {
      .row {
        margin: 0.5em 0;
      }
    }
  }
}
</style>