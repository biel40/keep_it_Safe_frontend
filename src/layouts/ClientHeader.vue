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
      <q-card class="bg-grey-12" style="width: 800px; max-width:  90vw;">
        <q-card-section class="col-12 bg-grey-4">
          <div class="text-h5 text-center text-grey-9">¡Bien venido a Keep it Safe!</div>
          <div class="text-subtitle2 text-center text-grey-9">Regístrate y podrás reservar equipaje gratuitamente</div>
        </q-card-section>
        <q-separator class="col-12"/>
        <q-card-section class="col-12 row flex justify-center">

          <div class="flex column no-wrap col-12 col-md text-h6" >
            <div>
              Correo electronico
              <q-input outlined v-model="text" placeholder="demo@keepitsafe.com" class="q-py-md  "/>
            </div> 
            <div>
              Contraseña
              <q-input outlined type="password" v-model="text" class="q-py-md" placeholder="*********"/>
            </div>
            <q-btn color="primary" label="Registrarse" size="md"  class="button-login  q-mt-md"/>


            <q-item clickable class="flex items-center justify-center q-mt-lg item-border-radius-40 q-pd-xs col" dense="">
              <q-icon color="grey-9" name="mdi-account-circle-outline" size="50px" class="q-mr-md"/>
              <div class="flex column no-wrap justify-center">
                <div class="text-center text-weight-light text-body2">
                  ¿No tienes cuenta?
                </div>
                <div class="text-center ">
                  Registrate aquí
                </div>
              </div>
            </q-item>
          </div>

          <q-separator vertical v-if="!$q.screen.lt.md" inset  class="q-mx-md"/>
          <q-separator inset style="padding:0.25px;" class="q-my-md" v-else />

          <div class="flex column no-wrap justify-center col-12 col-md text-h6 ">
              <div class="q-mb-xs text-center text-body1 text-grey-9 text-weight-light">o si lo prefieres</div>
              <q-btn class="q-my-md" color="blue-10" icon="mdi-facebook" size="lg" no-wrap align="left">
                <div class="q-pl-xl">
                  ENTRA CON FACEBOOK
                </div>
              </q-btn>
              <q-btn class="q-mt-md" color="blue-7" icon="mdi-google" size="lg" no-wrap align="left">
                <div class="q-pl-xl">
                  ENTRA CON GOOGLE
                </div>
              </q-btn>
          </div>
          
        </q-card-section>
        
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
      text: '',
    }
  },
  mounted(){
        console.log(this.$q.screen); 
      },
  methods:{
  }
}
</script>