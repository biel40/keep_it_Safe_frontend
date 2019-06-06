<template>
<div style="width: 800px; max-width:  90vw;">
  <q-card class="bg-grey-12" v-if="isLoging">
    <q-card-section class="col-12 bg-grey-4 q-pb-md">
        <div class="col-12 flex justify-end">
            <q-btn size="10px" icon="close" flat round dense v-close-popup />
        </div>
        <div class="text-h5 text-center text-grey-9">¡Bien venido a Keep it Safe!</div>
        <div class="text-subtitle2 text-center text-grey-9">Regístrate y podrás reservar equipaje gratuitamente</div>
    </q-card-section>
    <q-separator class="col-12" />
    <q-card-section class="col-12 row flex justify-center">
      <div class="flex column no-wrap col-12 col-md text-h6">
        <div>
            Correo electrónico
            <q-input type="email" outlined v-model="loginEmail" placeholder="demo@keepitsafe.com" />
        </div>
        <div>
            Contraseña
            <q-input outlined type="password" v-model="loginPassword" class="q-py-md" placeholder="*********" />
        </div>
        <q-btn color="primary" label="Entra" size="md" class="button-login  q-mt-md" @click="doLogin" />
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
          <login-with-social-media />
      </div>
    </q-card-section>
  </q-card>
  <q-card class="bg-grey-12" v-else>
    <q-card-section class="col-12 bg-grey-4 q-pb-md">
      <div class="col-12 flex justify-end">
        <q-btn size="10px" icon="close" flat round dense v-close-popup />
      </div>
      <div class="text-h5 text-center text-grey-9">¡Bienvenido a Keep it Safe!</div>
      <div class="text-subtitle2 text-center text-grey-9">Regístrate y podrás reservar equipaje gratuitamente</div>
    </q-card-section>
    <q-separator class="col-12" />
    <q-card-section class="col-12 row flex justify-center">
      <div class="flex column no-wrap col-12 col-md text-h6">
        <q-item>
          <register-form buttonName="Registrate" isUserView/>
        </q-item>

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
            <login-with-social-media />
        </div>
    </q-card-section>
  </q-card>
</div>
</template>

<script>
import LoginWithSocialMedia from './LoginWithSocialMedia'
import RegisterForm from './RegisterForm'

export default {
    name: 'LoginCard',
    props: ['user'],
    data() {
        return {
            loginEmail: '',
            loginPassword: '',
            isLoging: true
        }
    },
    components: {
        LoginWithSocialMedia,
        RegisterForm
    },
    methods: {
        changeView() {
            this.isLoging = !this.isLoging
        },
        doLogin() {
          // Hacemos un POST con el email y la contraseña del usuario que quiere loguearse localmente
          this.$axios
          .post("http://localhost:8081/login/local", {
              email: this.loginEmail,
              password: this.loginPassword
          })
          .then(response => {
            console.log(response.data);
            let token = response.data;

            this.verifyToken(token);

            // Lo guardamos en el LocalStorage
            localStorage.setItem('token', token);
            
            this.$router.push("/?token=" + token);            
          })
          .catch(function(error) {
            console.log(error);
          });
        },
        doRegister() {
            this.$axios.post("http://localhost:8081/user")
            .then(function(response) {
              console.log(response.data);        
            })
            .catch(function(error) {
              console.log(error);
            });
        },
        verifyToken (token) {  
          this.$axios
            .post("http://localhost:8081/token/verify", token)
            .then(response => {

              localStorage.clear();

              // Recibiremos el JSON con la información deserializada.
              let user = JSON.parse(response.data[0]);
              let token = response.data[1];

              localStorage.setItem("user", user);
              localStorage.setItem("token", token);


              this.user.name = user.name;
              this.user.surnames = user.surnames;
              this.user.rol = user.role;
              this.user.imageUrl = "noImage";

              if (this.user.rol == "CLIENT") {
                this.$router.push("/price");
              } else {
                this.$router.push("/price");
              }

            })
            .catch(error => {
              localStorage.clear();
            });
        }
    }

}

</script>

<style>
</style>
