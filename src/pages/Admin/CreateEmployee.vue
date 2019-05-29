<template>
  <q-page padding class="row justify-center">
    <div class="col-6 q-mt-md">
      <register-form buttonName="Crear cuenta empleado" />
    </div>
  </q-page>
</template>

<script>
import RegisterForm from '../../components/RegisterForm'
export default {
  name: "CreateEmployee",
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: ""
    };
  },
  components:{
    RegisterForm
  }
};
</script>

<style>
</style>
