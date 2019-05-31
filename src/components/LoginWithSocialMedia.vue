<template>
  <div class="flex column no-wrap justify-center">
    <div class="q-mb-xs text-center text-body1 text-grey-9 text-weight-light">o si lo prefieres</div>
    <q-btn class="q-my-md" color="blue-10" icon="mdi-facebook" size="lg" no-wrap align="left" @click="loginWithFacebook">
      <div class="q-pl-md">ENTRA CON FACEBOOK</div>
    </q-btn>
    <q-btn
      class="q-mt-md"
      color="blue-7"
      icon="mdi-google"
      size="lg"
      no-wrap
      align="left"
      @click="loginWithGoogle"
    >
      <div class="q-pl-md">ENTRA CON GOOGLE</div>

    </q-btn>
  </div>
</template>

<script>
export default {
  name: "LoginWithSocialMedia",
  data() {
    return {};
  },
  methods: {
    loginWithGoogle() {
      this.$axios
        .post("http://localhost:8081/oAuth/google")
        .then(function(response) {
          window.location.href = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    loginWithFacebook(){
        this.$axios
        .post("http://localhost:8081/loginFacebook")
        .then(function(response) {
          window.location.href = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style>
</style>
