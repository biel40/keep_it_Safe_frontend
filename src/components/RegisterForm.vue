<template>
  <div class="flex column no-wrap col-12 col-md text-h6">
    <div>
      <span>Nombre *</span>
      <q-input
        outlined
        v-model="user.name"
        class="input-register"
        dense
        :error="$v.user.name.$error"
        @blur="$v.user.name.$touch"
        error-message="no debe contener caracteres numéricos o especiales"
        placeholder="obligatorio"
      />
    </div>
    <div>
      <span v-if="isUserView">Primer apellido *</span>
      <q-input
        outlined
        v-model="user.surnames"
        class="input-register q-mb-md"
        dense 
        v-if="isUserView"
      />
    </div>
    <div>
      <span>Correo electrónico*</span>
      <q-input
        type="email"
        outlined
        v-model="user.email"
        class="input-register"
        dense
        :error="$v.user.email.$error"
        @blur="$v.user.email.$touch"
        error-message="correo electrónico invalido"
        placeholder="obligatorio"
      ></q-input>
    </div>
    <div>
      <span>Contraseña *</span>
      <q-input
        outlined
        type="password"
        v-model="user.password"
        class="input-register"
        dense
        error-message="la contraseña debe tener minimo 8"
        placeholder="obligatorio"
        :error="$v.user.password.$error"
        @blur="$v.user.password.$touch"
      />
    </div>
    <div>
      <span>Repite contraseña *</span>
      <q-input
        outlined
        type="password"
        v-model="confirmPassword"
        class="input-register"
        dense
        placeholder="obligatorio"
        :error="$v.confirmPassword.$error"
        @blur="$v.confirmPassword.$touch"
        error-message="las contraseñas no son iguales"
      />
    </div>

    <q-btn
      color="primary"
      :label="buttonName"
      size="md"
      class="button-login q-mt-md"
      @click="doRegister"
    />
  </div>
</template>

<script>
import {
  required,
  minLength,
  alpha,
  sameAs,
  email
} from "vuelidate/lib/validators";

export default {
  // name: 'ComponentName',
  data() {
    return {
      user: {
        name: "",
        surnames: "",
        email: "",
        password: "",
        rol_user: ""
      },
      confirmPassword: ""
    };
  },
  methods: {
    doRegister() {
      this.$v.$touch();
      console.log(this.$v.$error);
      if (this.$v.$error) return;
      // Falta implementar el registro de usuarios.
      if (this.isUserView) {
        this.user.rol_user = "CLIENT";
      } else {
        this.user.rol_user = "EMPLOYEE";
      }
      console.log(this.user);
      this.$axios
        .post("http://localhost:8081/user", this.user)
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
            message:
              "Ha ocurrido un error al crear el usuario, intentelo de nuevo",
            color: "red-10",
            icon: "error",
            timeout: 2000
          });
        });
    }
  },
  props: {
    buttonName: String,
    isUserView: Boolean
  },
  validations() {
    if (this.isUserView) {
      return {
        user: {
          name: {
            required,
            alpha
          },
          email: {
            required,
            email
          },
          password: {
            required,
            minLength: minLength(8)
          }
        },
        confirmPassword: {
          required,
          sameAs: sameAs(function() {
            return this.user.password;
          })
        }
      };
    } else {
      return {
        user: {
          name: {
            required,
            alpha
          },
          email: {
            required,
            email
          },
          password: {
            required,
            minLength: minLength(8)
          }
        },
        confirmPassword: {
          required,
          sameAs: sameAs(function() {
            return this.user.password;
          })
        }
      };
    }
  }
};
</script>

<style>
</style>