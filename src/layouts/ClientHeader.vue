<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-primary text-white ">
      <q-toolbar class="flex row items-center justify-center">
        <q-toolbar-title class="flex row items-center">
            <q-avatar square class="q-my-md" >
              <img src="~assets/icono.png" alt="icon keep it safe">
            </q-avatar>
            <div class="text-h5">
              Keep it Safe  
            </div>
        </q-toolbar-title>
          <!-- <q-btn flat outline rounded icon="account_circle" :label="userName"  size="20px" class="q-mr-md" no-caps @click="loginDialog=true"/> -->
          <q-btn flat outline rounded icon="account_circle" :label="userName"  size="20px" class="q-mr-md" no-caps >
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item clickable v-close-popup @click="miAccountDialog=true">
                <q-item-section>Mi cuenta</q-item-section>
              </q-item>
              <q-item clickable v-close-popup @click="myReservationsDialog=true">
                <q-item-section>Mis reservas</q-item-section>
              </q-item>
              <q-separator />
              <q-item clickable v-close-popup @click="logout">
                <q-item-section>Cerrar sesión</q-item-section>
              </q-item>
            </q-list>
        </q-menu>
          </q-btn>
      </q-toolbar>

      <q-tabs align="left" inline-label indicator-color="black" >
        <q-route-tab icon="mdi-currency-eur" to="/price" label="Precios" active-class="text-black"/>
        <q-route-tab icon="mdi-calendar" to="/schedule" label="Horario" active-class="text-black"/>
        <q-route-tab icon="mdi-briefcase-check" to="/reservation" label="Reserva" active-class="text-black"/>
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

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import LoginCard from '../components/LoginCard';
import MyAccountCard from '../components/MyAccountCard';
import MyReservationList from '../components/MyReservationList';
export default {
  data () {
    return {
      userName: 'Accede',
      loginDialog: false,
      miAccountDialog: false,
      myReservationsDialog: false
    }
  }, 
  methods: {
    logout(){
      console.log("Log out")
    }
  },
  components:{
    LoginCard,
    MyAccountCard,
    MyReservationList
  }
}
</script>