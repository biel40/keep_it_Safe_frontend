<template>
  <q-page class="flex row items-center justify-center">
    <div class="col-12 col-md-8 row q-mt-md">
      <div class="column q-mb-md col-8 q-ml-xl">
        <invoice-form ref="invoice" title="Generar factura"/>
      </div>
    </div>
    <div class="col-12 col-md-4" v-if="!$q.screen.lt.md">
      <tiket :luggages="luggages" :invoice="invoice" :user="user"/>
    </div>
  </q-page>
</template>


<style>
</style>

<script>

import InvoiceForm from "../../components/InvoiceForm.vue";
import Tiket from "../../components/Tiket.vue";
export default {
  name: "CheckingLuggage",
  data() {
    return {
      invoice: null,
      luggages: null,
      user: null
    };
  },
  components: {
    InvoiceForm,
    Tiket
  },
  mounted() {
    this.invoice = this.$refs.invoice.getInvoice();
    this.luggages = this.$refs.invoice.getLuggages();
  },
  created(){
    this.user =JSON.parse(localStorage.getItem("user")) ;
  }
};

</script>
