<template>
<div style="width: 800px; max-width:  90vw;">
<q-card class="bg-grey-12"   v-if="isLoging">
    <q-card-section class="col-12 bg-grey-4">
        <div class="text-h5 text-center text-grey-9">¡Bien venido a Keep it Safe!</div>
        <div class="text-subtitle2 text-center text-grey-9">Regístrate y podrás reservar equipaje gratuitamente</div>
    </q-card-section>
    <q-separator class="col-12" />
    <q-card-section class="col-12 row flex justify-center">

        <div class="flex column no-wrap col-12 col-md text-h6">
            <div>
                Correo electrónico
                <q-input type="email" outlined v-model="loginEmail" placeholder="demo@keepitsafe.com"/>
            </div>
            <div>
                Contraseña
                <q-input outlined type="password" v-model="loginPassword" class="q-py-md" placeholder="*********" />
            </div>
            <q-btn color="primary" label="Entra" size="md" class="button-login  q-mt-md" @click="doLogin"/>

            <q-item clickable class="flex items-center justify-center q-mt-lg item-border-radius-40 q-pd-xs col" @click="changeView">
                <q-icon color="grey-9" name="mdi-account-circle-outline" size="50px" class="q-mr-md" />
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

        <q-separator vertical v-if="!$q.screen.lt.md" inset class="q-mx-md" />
        <!-- TODO insual error, not apear horizontal q-spacer, but when adding padding style if it apear -->
        <q-separator inset style="padding:0.25px;" class="q-my-md" v-else />

        <div class="flex column no-wrap justify-center col-12 col-md text-h6 ">
            <LoginWithSocialMedia />
        </div>
    </q-card-section>
</q-card>
<q-card class="bg-grey-12" v-else>
    <q-card-section class="col-12 bg-grey-4">
        <div class="text-h5 text-center text-grey-9">¡Bien venido a Keep it Safe!</div>
        <div class="text-subtitle2 text-center text-grey-9">Regístrate y podrás reservar equipaje gratuitamente</div>
    </q-card-section>
    <q-separator class="col-12" />
    <q-card-section class="col-12 row flex justify-center">

        <div class="flex column no-wrap col-12 col-md text-h6">
            <div>
                Nombre
                <q-input outlined v-model="name" class="" dense />
            </div>
            <div>
                Primer apellido
                <q-input outlined v-model="surname" class="input-register" dense />
            </div>
            <div>
                Segundo apellido
                <q-input outlined v-model="secondSurname" class="input-register" dense />
            </div>
            <div>
                DNI/NIE
                <q-input outlined v-model="dni" class="input-register" dense placeholder="aqui iran las restrigciones"/>
            </div>
            <div>
                Correo electrónico
                <q-input type="email" outlined v-model="email" class="input-register" dense />
            </div>
            <div>
                Contraseña
                <q-input outlined type="password" v-model="password" class="input-register" dense placeholder="tipo mayusculas y tal XD" />
            </div>
            <div>
                Repite contraseña
                <q-input outlined type="password" v-model="repeatPassword" class="input-register" dense placeholder="o que solo 8 como mucho" />
            </div>
            <q-btn color="primary" label="Registrarse" size="md" class="button-login  q-mt-md" @click="doRegister"/>

            <q-item clickable class="flex items-center justify-center q-mt-lg item-border-radius-40 q-pd-xs col" @click="changeView">
                <q-icon color="grey-9" name="mdi-account-circle-outline" size="50px" class="q-mr-md" />
                <div class="flex column no-wrap justify-center">
                    <div class="text-center text-weight-light text-body2">
                        ¿Ya tienes cuenta?
                    </div>
                    <div class="text-center ">
                        Incia sesion aquí
                    </div>
                </div>
            </q-item>
        </div>
        <q-separator vertical v-if="!$q.screen.lt.md" inset class="q-mx-md" />
        <!-- TODO insual error, not apear horizontal q-spacer, but when adding padding style if it apear -->
        <q-separator inset style="padding:0.25px;" class="q-my-md" v-else />

        <div class="flex column no-wrap justify-center col-12 col-md text-h6 ">
          <LoginWithSocialMedia />
        </div>
    </q-card-section>
</q-card>
</div>
</template>

<script>
import LoginWithSocialMedia from './LoginWithSocialMedia'

export default {
    name: 'LoginCard',
    data() {
        return {
            loginEmail: '',
            loginPassword:'',
            name:'',
            surname:'',
            secondSurname:'',
            dni:'',
            email:'',
            password:'',
            repeatPassword:'',
            isLoging: true
        }
    },
    components: {
        LoginWithSocialMedia
    },
    methods:{
      changeView(){
        this.isLoging = !this.isLoging
      },
      doLogin(){
        console.log("do something - Login");
      },
      doRegister(){
        console.log("do something - Register");
      }
    }
}
</script>

<style>
</style>
