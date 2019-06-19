<template>
<q-page class="flex column items-center justify-center">

    <div class="flex column items-start justify-start">
      <p class="text-primary header q-mt-md"> Validar Factura </p>
      <div class="flex row col-5 justify-around space-between items-center">
        <q-input
          class="q-mb-md"
          outlined
          v-model="EmailModel"
          dense
          type="email"
          v-on:keyup.enter="loadInvoices()"
          error-message="Usuario no válido"
        />
        <q-btn class="q-mb-md q-ml-md" color="primary" icon="save_alt" size="10px" @click="loadInvoice()" />
      </div>
    </div>

  </q-page>
</template>

<script>

import InvoiceForm from "../../components/InvoiceForm.vue";
import Tiket from "../../components/Tiket.vue";

export default {
  name: "ValidateInvoice",
  data() {
    return {
      date: null,
      luggages: null,
      employee: null,
      EmailModel: '',
      isFound: false,
      reservations: {}
    };
  },
  created() {

    this.$classes.Utils.verifyTokenSignature(
      localStorage.getItem("token"),
      JSON.parse(localStorage.getItem("user"))
    );

    let user = JSON.parse(localStorage.getItem("user"));
    this.employee = new this.$classes.User(user.user_id, user.rol_user, user.email, user.name, user.surnames, user.userLoginSocial);
  },
  methods: {
    loadInvoice() {

       if (this.EmailModel == "") {
        this.$q.notify({
          message: "Por favor, introduzca un correo electrónico.",
          color: "negative",
          icon: "error",
          timeout: 2000
        });
      }

      console.log(this.EmailModel);

      let userFromEmail = this.obtainUserfromEmail(this.EmailModel);

      this.$axios.get('http://localhost:8081/invoice/user/notVerified/' + userFromEmail.client_id  )
      .then((response) => {  
  
      })
      .catch(function (error) {
        console.log(error);
      })
    },
  },
  components: {
    InvoiceForm,
    Tiket
  },
};
</script>
