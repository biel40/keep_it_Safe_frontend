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
        <!-- Uncomment the following line and comment the another to change the functionality -->
        <img v-if="user.imageUrl == 'noImage'" src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=50" alt="icon" style="border-radius: 50%; ">
        <img v-else :src="user.imageUrl" alt="icon" style="border-radius: 50%; ">

        <q-btn flat outline rounded :label="user.name"  size="20px" class="q-mr-md" no-caps @click="loginDialog=true"/>
        <!-- <q-btn
          flat
          outline
          rounded
          icon="account_circle"
          :label="userName"
          size="20px"
          class="q-mr-md"
          no-caps
        >
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup @click="miAccountDialog=true">
                <q-item-section>Mi cuenta</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="myReservationsDialog=true">
                <q-item-section>Mis reservas</q-item-section>
              </q-item>
              <q-separator/>
              <q-item clickable v-close-popup @click="logout">
                <q-item-section>Cerrar sesión</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn> -->
      </q-toolbar>

      <q-tabs align="left" inline-label indicator-color="black">
        <q-route-tab icon="mdi-currency-eur" to="/price" label="Precios" active-class="text-black"/>
        <q-route-tab icon="mdi-calendar" to="/schedule" label="Horario" active-class="text-black"/>
        <q-route-tab
          icon="mdi-briefcase-check"
          to="/reservation"
          label="Reserva"
          active-class="text-black"
        />
      </q-tabs>
    </q-header>

    <q-dialog v-model="loginDialog" transition-show="slide-down">
      <LoginCard/>
    </q-dialog>
    <q-dialog v-model="miAccountDialog" transition-show="slide-down">
      <MyAccountCard user="Object with user"/>
    </q-dialog>
    <q-dialog v-model="myReservationsDialog" transition-show="slide-down">
      <MyReservationList/>
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
import { verify } from 'crypto';

export default {
  data() {
    return {
      user: {
        "name" : "Accede!",
        "surnames" : "",
        "rol" : "CLIENT",
        "imageUrl" : 'noImage'
      },
      rol: 'U',
      userName: "Accede",
      loginDialog: false,
      miAccountDialog: false,
      myReservationsDialog: false
    };
  },
  methods: {
    logout() {
      console.log("Log out");
    },
    verifyTokenSignature(token) {
      this.$axios.post("http://localhost:8081/token/verify", token)
      .then((response) => {

        // Recibiremos el JSON con la información deserializada.        
        localStorage.setItem('user', response.data);

        console.log(response.data.name);
        console.log(response.data.surnames);
        console.log(response.data.role);
        console.log(response.data.imageUrl);

        // Mirar en el console log lo que devuelve el server y cambiar esto en función.
        this.user.name = response.data.name;
        this.user.surnames = response.data.surnames;
        this.user.rol = response.data.role;
        this.user.imageUrl = response.data.imageUrl;

      }).catch((error) => {
        // Con clear() quitamos todos los elementos del Local Storage
        localStorage.clear();
      });

      console.log(token);

    }

  },
  mounted() {

  },
  created() {

      var url_string = window.location.href
      var url = new URL(url_string);

      var tokenParam = url.searchParams.get("token");

      console.log(tokenParam);

      // Una vez obtenemos el Token hay que verificarlo.
      this.verifyTokenSignature(tokenParam);

  },
  components: {
    LoginCard,
    MyAccountCard,
    MyReservationList
  }
};
</script>