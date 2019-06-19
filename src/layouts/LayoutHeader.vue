<template>
  <q-layout view="hHh LpR fFf" class="bg">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar class="flex row items-center justify-center">
        <q-toolbar-title class="flex row items-center">
          <q-avatar square class="q-my-md">
            <img src="~assets/icono.png" alt="icon keep it safe">
          </q-avatar>
          <div class="text-h5">Keep it Safe</div>
        </q-toolbar-title>
        <q-item
          v-if="user.isLoginUser == false"
          clickable
          rounded
          style="border-radius: 50px;"
          class="justify-between items-center q-pa-xs q-mr-md"
          @click="loginDialog=true"
        >
          <q-avatar class="q-mr-md">
            <img src="./../assets/login-icon.png" alt="icon.image">
          </q-avatar>

          <span class="text-h6 q-mr-xs">{{user.name}}</span>
        </q-item>

        <q-item
          v-else
          clickable
          rounded
          style="border-radius: 50px;"
          class="justify-between items-center q-pa-xs q-mr-md"
        >
          <q-avatar class="q-mr-md" v-if="user.imageUrl">
            <img :src="user.imageUrl" alt="icon.avatar">
          </q-avatar>
          <q-avatar v-else class="q-mr-md">
            <img src="./../assets/login-icon.png" alt="icon.image">
          </q-avatar>

          <span class="text-h6">{{user.name}}</span>
          <q-menu v-if="user.userLoginSocial">
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup @click="myReservationsDialog = true">
                <q-item-section>Mis reservas</q-item-section>
              </q-item>
              <q-separator/>
              <q-item clickable v-close-popup @click="logout">
                <q-item-section>Cerrar sesión</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
          <q-menu v-else>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup @click="miAccountDialog = true">
                <q-item-section>Mi cuenta</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="myReservationsDialog = true">
                <q-item-section>Mis reservas</q-item-section>
              </q-item>
              <q-separator/>
              <q-item clickable v-close-popup @click="logout">
                <q-item-section>Cerrar sesión</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-item>
      </q-toolbar>

      <q-tabs v-if="user.rol_user === 'CLIENT'" align="left" inline-label indicator-color="black">
        <q-route-tab icon="mdi-currency-eur" to="/price" label="Precios" active-class="text-black"/>
        <q-route-tab icon="mdi-calendar" to="/schedule" label="Horario" active-class="text-black"/>
        <q-route-tab
          v-if="user.isLoginUser"
          icon="mdi-briefcase-check"
          to="/reservation"
          label="Reserva"
          active-class="text-black"
        />
      </q-tabs>

      <q-tabs v-if="user.rol_user === 'EMPLOYEE'" align="left" inline-label indicator-color="black">
        <q-route-tab
          icon="mdi-briefcase-check"
          to="/employee/invoice/check-in"
          label="Facturar equipaje"
          active-class="text-black"
        />
        <q-route-tab
          icon="mdi-checkbox-multiple-marked-outline"
          to="/employee/invoice/validate"
          label="Validar factura"
          active-class="text-black"
        />
        <q-route-tab
          icon="mdi-file-document-edit"
          to="/employee/invoice/edit"
          label="Modificar factura"
          active-class="text-black"
        />
      </q-tabs>

      <q-tabs v-if="user.rol_user === 'ADMIN'" align="left" inline-label indicator-color="black">
        <q-route-tab
          icon="mdi-file-document-edit"
          to="/admin/price/edit"
          label="Modificar tarifa"
          active-class="text-black"
        />
        <q-route-tab
          icon="mdi-account-plus"
          to="/admin/user/create"
          label="Crear empleado"
          active-class="text-black"
        />
        <q-route-tab
          icon="mdi-currency-eur"
          to="/admin/invoice/edit"
          label="Modificar factura"
          active-class="text-black"
        />
      </q-tabs>
    </q-header>

    <q-dialog v-model="loginDialog" transition-show="slide-down">
      <LoginCard :user="user"/>
    </q-dialog>
    <q-dialog v-model="miAccountDialog" transition-show="slide-down">
      <my-account-card :user="user"/>
    </q-dialog>
    <q-dialog v-model="myReservationsDialog" transition-show="slide-down">
      <MyReservationList />
    </q-dialog>

    <q-page-container class="background-color-app">
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>

import LoginCard from "../components/LoginCard";
import MyAccountCard from "../components/MyAccountCard";
import MyReservationList from "../components/MyReservationList";
import { verify } from "crypto";

export default {
  data() {
    return {
      user: {
        name: "Accede!",
        surnames: "",
        rol_user: "CLIENT",
        imageUrl: null,
        isLoginUser: false
      },

      loginDialog: false,
      miAccountDialog: false,
      myReservationsDialog: false
    };
  },
  methods: {
    logout() {
      let token = localStorage.getItem("token");
      this.$axios
        .post("http://localhost:8081/logOut", token)
        .then(response => {
          window.location.reload();
        })
        .catch(error => {
          localStorage.clear();
        });

      localStorage.clear();

      this.user.name = "Accede!";
      this.user.surnames = "";
      this.user.rol_user = "CLIENT";
      this.user.imageUrl = null;
      this.user.isLoginUser = false;

      this.$router.push("/price");
    }
  },
  created() {
    this.isLoginUser = false;

    if (localStorage.getItem("token")) {  
      this.$classes.Utils.verifyTokenSignature(
        localStorage.getItem("token"),
        this.user
      );
    } else {
      let tokenParam = this.$route.query.token;

      // Una vez obtenemos el Token hay que verificarlo.
      if (tokenParam) {
        this.$classes.Utils.verifyTokenSignature(tokenParam, this.user);
      }
    }
  },
  components: {
    LoginCard,
    MyAccountCard,
    MyReservationList
  }
};
</script>