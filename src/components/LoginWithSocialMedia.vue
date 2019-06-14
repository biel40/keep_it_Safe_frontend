<template>
  <div class="flex column no-wrap start justify-end">
    <p class="q-mb-xs text-center text-body1 text-grey-9 text-weight-light">o si lo prefieres</p>
    <q-btn
      id="google-login"
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
    }
  }
};
</script>

<style>
#google-login{
  height: 80px;
  border-radius: 50px
}
</style>
