<template>
  <q-page class="flex row items-center justify-center">
    <div class="col-12 col-md-8 row q-mt-md">
      <div class="column q-mb-md col-8 q-ml-xl">
        <invoice-form ref="invoice" title="Generar factura"/>
      </div>
    </div>
    <div class="col-12 col-md-4" v-if="!$q.screen.lt.md">
      <tiket :luggages="luggages" :date="date" user="Juan Ramón Giménez"/>
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
      date: null,
      luggages: null
    };
  },
  components: {
    InvoiceForm,
    Tiket
  },
  mounted() {
    this.date = this.$refs.invoice.getDate();
    this.luggages = this.$refs.invoice.getLuggages();
  }
};
</script>
