<template>
  <div>
    <q-card style="width: 400px; max-width:90vw;">
      <div class="flex justify-end q-pa-xs">
        <q-btn size="10px" icon="close" flat round dense v-close-popup/>
      </div>
      <q-card-section class="row flex items-center justify-center q-mb-md">
        <div class="col-10 flex column">
          <div class="text-h4 text-center q-mb-md">Mi cuenta</div>
          <div class="text-bold mi-account-label">Nombre</div>
          <span class="mi-account-value font-style">{{user.name}}</span>
          <div class="text-bold mi-account-label">Apellidos</div>
          <span class="mi-account-value font-style">{{user.surnames}}</span>
          <div class="text-bold mi-account-label">Correo electronico</div>
          <span class="mi-account-value font-style">{{user.email}}</span>
        </div>
      </q-card-section>
      <q-card-section class="flex column">
        <q-btn color="primary q-mb-md" @click="changeProfile=true">cambiar datos usuario</q-btn>
        <q-btn color="primary" @click="changePassword=true">cambiar contraseña</q-btn>
      </q-card-section>
    </q-card>

    <!-- Dialog of changePassword -->

    <q-dialog v-model="changePassword" transition-show="slide-down">
      <q-card style="width: 350px; max-width:90vw;">
        <div class="flex justify-end q-pa-xs">
          <q-btn size="10px" icon="close" flat round dense v-close-popup/>
        </div>
        <q-card-section class="row flex items-center justify-center q-mb-md">
          <div class="col-10 flex column">
            <div class="text-bold mi-account-label">Contraseña actual</div>
            <q-input
              type="password"
              outlined
              v-model="oldPassword"
              dense
              :error="$v.oldPassword.$error"
              @blur="$v.oldPassword.$touch"
              error-message="la contraseña debe tener minimo 8"
              placeholder="obligatorio"
            />
            <div class="text-bold mi-account-label">Nueva contraseña</div>
            <q-input
              type="password"
              outlined
              v-model="newPassword"
              dense
              :error="$v.newPassword.$error"
              @blur="$v.newPassword.$touch"
              error-message="la contraseña debe tener minimo 8"
              placeholder="obligatorio"
            />
            <div class="text-bold mi-account-label">Repite contraseña</div>
            <q-input
              type="password"
              outlined
              v-model="repeatNewPassword"
              dense
              :error="$v.repeatNewPassword.$error"
              @blur="$v.repeatNewPassword.$touch"
              error-message="las contraseñas no son iguales"
              placeholder="obligatorio"
            />
          </div>
        </q-card-section>
        <q-card-section class="flex column">
          <q-btn color="primary q-mb-md" @click="savePassword()">Guardar datos</q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Dialog of changeProfile -->

    <q-dialog v-model="changeProfile" transition-show="slide-down">
      <q-card style="width: 350px; max-width:90vw;">
        <div class="flex justify-end q-pa-xs">
          <q-btn size="10px" icon="close" flat round dense v-close-popup/>
        </div>
        <q-card-section class="row flex items-center justify-center q-mb-md">
          <div class="col-10 flex column">
            <div class="text-bold mi-account-label">Nombre</div>
            <q-input
              type="text"
              outlined
              v-model="userEdit.name"
              dense
              :error="$v.userEdit.name.$error"
              @blur="$v.userEdit.name.$touch"
              placeholder="obligatorio"
            />
            <div class="text-bold mi-account-label">Apellidos</div>
            <q-input
              type="text"
              outlined
              v-model="userEdit.surnames"
              dense
              :error="$v.userEdit.surnames.$error"
              @blur="$v.userEdit.surnames.$touch"
              placeholder="obligatorio"
            />
            <div class="text-bold mi-account-label">Correo electrónico</div>
            <q-input
              type="email"
              outlined
              v-model="userEdit.email"
              dense
              :error="$v.userEdit.email.$error"
              @blur="$v.userEdit.email.$touch"
              error-message="correo electrónico invalido"
              placeholder="obligatorio"
            />
          </div>
        </q-card-section>
        <q-card-section class="flex column">
          <q-btn color="primary q-mb-md" @click="saveProfile()">Guardar datos</q-btn>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { required, minLength, sameAs, email } from "vuelidate/lib/validators";
export default {
  name: "MyAccountDialog",
  data() {
    return {
      changePassword: false,
      changeProfile: false,
      oldPassword: "",
      newPassword: "",
      repeatNewPassword: "",
      userEdit: null
    };
  },
  created() {
    this.userEdit = new this.$classes.User(
      this.user.userId,
      this.user.rol_user,
      this.user.email,
      this.user.name,
      this.user.surnames
    );
  },
  methods: {
    savePassword() {
      this.$v.$touch();
      if (this.$v.$error) return;
      this.$axios
        .put("http://localhost:8081/user/password", [
          this.user.userId.toString(),
          this.oldPassword,
          this.newPassword
        ])
        .then(response => {
          let data = response.data;
          localStorage.clear();

          localStorage.setItem("user", data[0]);
          localStorage.setItem("token", data[1]);

          window.location.reload();
        })
        .catch(error => {
          this.$q.notify({
            message: "Contraseña incorrecta, intententelo de nuevo",
            color: "red-10",
            icon: "error",
            position: "center",
            timeout: 2500
          });
        });
    },
    saveProfile() {
      this.$axios
        .put("http://localhost:8081/user/profile", this.userEdit)
        .then(response => {
          let data = response.data;
          localStorage.clear();

          localStorage.setItem("user", data[0]);
          localStorage.setItem("token", data[1]);

          window.location.reload();
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  props: ["user"],
  validations: {
    userEdit: {
      name: {
        required
      },
      email: {
        required,
        email
      },
      surnames: {
        required
      }
    },
    oldPassword: {
      required,
      minLength: minLength(8)
    },
    newPassword: {
      required,
      minLength: minLength(8)
    },
    repeatNewPassword: {
      required,
      sameAs: sameAs(function() {
        return this.newPassword;
      })
    }
  }
};
</script>

<style>
.font-style {
  font-size: 20px;
  font-weight: 400;
}
</style>
