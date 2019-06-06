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
        <q-item
          v-if="user.imageUrl == 'noImage'"
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
          <q-avatar class="q-mr-md" v-if="user.imageUrl !== null">
            <img
            :src="user.imageUrl"
            alt="icon.avatar"
          >
          </q-avatar>
            <q-avatar v-else class="q-mr-md">
              <img src="./../assets/login-icon.png" alt="icon.image">
          </q-avatar>
          
          <span class="text-h6">{{user.name}}</span>
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
        </q-item>
      </q-toolbar>

      <q-tabs v-if="user.rol === 'CLIENT'" align="left" inline-label indicator-color="black">
        <q-route-tab icon="mdi-currency-eur" to="/price" label="Precios" active-class="text-black"/>
        <q-route-tab icon="mdi-calendar" to="/schedule" label="Horario" active-class="text-black"/>
        <q-route-tab
          v-if="isLogin"
          icon="mdi-briefcase-check"
          to="/reservation"
          label="Reserva"
          active-class="text-black"
        />
      </q-tabs>

      <q-tabs v-if="user.rol === 'EMPLOYEE'" align="left" inline-label indicator-color="black">
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

      <q-tabs v-if="user.rol === 'ADMIN'" align="left" inline-label indicator-color="black">
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
import { verify } from "crypto";

export default {
  data() {
    return {
      user: {
        name: "Accede!",
        surnames: "",
        rol: "CLIENT",
        imageUrl: "noImage"
      },
      isLogin: false,
      loginDialog: false,
      miAccountDialog: false,
      myReservationsDialog: false
    };
  },
  methods: {
    logout() {
      let token = localStorage.getItem("token");
      console.log("PUTO TOKEN ", token);
      this.$axios
        .post("http://localhost:8081/logOut", token)
        .then(response => {
        })
        .catch(error => {
          // Con clear() quitamos todos los elementos del Local Storage
          localStorage.clear();
        });

      localStorage.clear();
      
      this.user.name = "Accede!";
      this.user.surnames = "";
      this.user.rol = "CLIENT";
      this.user.imageUrl = "noImage"
      
    },
    verifyTokenSignature(token) {
      this.$axios
        .post("http://localhost:8081/token/verify", token)
        .then(response => {
          localStorage.clear();
          // Recibiremos el JSON con la información deserializada.
          let user = JSON.parse(response.data[0]);
          let token = response.data[1];
          localStorage.setItem("user", user);
          localStorage.setItem("token", token);

          console.log(user.name);
          console.log(user.surnames);
          console.log(user.role);
          console.log(user.imageUrl);

          // Mirar en el console log lo que devuelve el server y cambiar esto en función.
          this.user.name = user.name;
          this.user.surnames = user.surnames;
          this.user.rol = user.role;
          this.user.imageUrl = user.imageUrl;
          this.isLogin = true;
          if (this.user.rol=="CLIENT") {
            console.log("wefbowef");
            this.$router.push("/price");
          } else{
            console.log("buenos dias")
            this.$router.push("/price");
          }
        })
        .catch(error => {
          // Con clear() quitamos todos los elementos del Local Storage
          localStorage.clear();
        });

      console.log(token);
    }
  },
  created() {
      if(localStorage.getItem("token")) {
        console.log("tokem exist");
        this.verifyTokenSignature(localStorage.getItem("token"));
      } else {
        let tokenParam = this.$route.query.token;

        console.log("the token param",tokenParam);
        // Una vez obtenemos el Token hay que verificarlo.
        if(tokenParam){
          this.verifyTokenSignature(tokenParam);
        };
      }
  },
  components: {
    LoginCard,
    MyAccountCard,
    MyReservationList
  }
};
</script>