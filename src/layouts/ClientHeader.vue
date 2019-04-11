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

    <q-dialog v-model="login">
      <q-card class="bg-grey-12 q-px-xs " style="width: 900px; max-width:  90vw;">
        <q-card-section>
          <div class="text-h5 text-center text-grey-9">¡Bien venido a Keep it Safe!</div>
          <div class="text-subtitle2 text-center text-grey-9">Regístrate y podrás reservar equipaje gratuitamente</div>
        </q-card-section>
        <q-separator/>
        <q-card-section class="flex row no-wrap items-center justify-center justify-between">
          <div class="text-h6 q-mr-md flex column flex " >
            <div class="">Correo electronico</div>
            <q-input outlined v-model="text" placeholder="demo@keepitsafe.com" class="input-login q-pa-md"/>
            <div class="">Contraseña</div>
            <q-input outlined v-model="text" label="Outlined" class="q-pa-md" />
            <q-btn color="primary" label="Registrarse"/>
          </div>
          <q-separator vertical inset/>
          <div class="q-ml-md">
            <q-input outlined v-model="text" label="Outlined" class="input-login" />
            <q-input outlined v-model="text" label="Outlined" />
            <q-input  outlined v-model="text" label="Outlined" />
          </div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

     <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      login: false,
      text: ''
    }
  },
  methods:{
  }
}
</script>