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
          <q-btn flat outline rounded icon="account_circle" label="Accede"  size="20px" class="q-mr-md" no-caps @click="login=true"/>
      </q-toolbar>

      <q-tabs align="left" inline-label indicator-color="black" >
        <q-route-tab icon="mail" to="/price" label="Precios" />
        <q-route-tab icon="mail" to="/reservation" label="Horario" />
        <q-route-tab icon="mail" to="/schedule" label="Reserva" />
      </q-tabs>
    </q-header>

    <q-dialog v-model="login" transition-show="slide-down">
      <LoginCard/>
    </q-dialog>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import LoginCard from '../components/LoginCard'
export default {
  data () {
    return {
      login: false,
    }
  }, 
  components:{
    LoginCard
  }
}
</script>