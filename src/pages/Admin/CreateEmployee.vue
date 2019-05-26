<template>
  <q-page padding class="row justify-center">
    <div class="row column col-4">
      <p class="text-h4 q-mb-lg">Correo electónico</p>
      <q-input
        class="q-mb-md"
        outlined
        v-model="email"
        :error="$v.email.$error"
        @blur="$v.email.$touch"
        error-message="Introduzca un correo electrónico con un formato correcto ej: demo@gmail.com"
      />

      <p class="text-h4 q-mb-lg">Contraseña</p>
      <q-input
        class="q-mb-lg"
        outlined
        v-model="password"
        :error="$v.password.$error"
        @blur="$v.password.$touch"
        hint="La contraseña ha de tener mínimo 8 caracteres"
        error-message="Por favor introduzca una contraseña con un mínimo de 8 caracteres y no contenga caracteres extraños"
      />
      <p class="text-h4 q-mb-lg">Repita contraseña</p>
      <q-input
        class="q-mb-xl"
        outlined
        v-model="confirmPassword"
        :error="$v.confirmPassword.$error"
        @blur="$v.confirmPassword.$touch"
        hint="Repita la contraseña"
        error-message="Las contraseñas no son iguales"
      />
      <q-btn label="CREAR USUARIO" color="primary" size="lg" @click="send"/>
    </div>
  </q-page>
</template>

<script>
import {
  required,
  minLength,
  alphaNum,
  sameAs,
  email
} from "vuelidate/lib/validators";
export default {
  name: "CreateEmployee",
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: ""
    };
  },
  methods: {
    send() {
      this.$v.$touch();
      if (this.$v.$pending || this.$v.$error) return;
      
      this.$axios
        .post("http://localhost:8081/user", {
          email: this.email,
          password: this.password,
        })
        .then(response => { 
          this.$q.notify({
            message: "Se ha creado el usuario correctamente",
            color: "primary",
            icon: "check_circle",
            timeout: 1500
          });
        })
        .catch(error => {
          this.$q.notify({
            message: "Ha ocurrido un error al crear el usuario, intentelo de nuevo",
            color: "red-10",
            icon: "error",
            timeout: 2000
          });
        });
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(8),
      alphaNum
    },
    confirmPassword: {
      required,
      sameAs: sameAs("password")
    }
  },
};
</script>

<style>
</style>
