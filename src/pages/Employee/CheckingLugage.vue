<template>
  <q-page class="flex row">
    <div class="col-12 col-md-8 row q-mt-md">
      <div class="column q-mb-md col-8 q-ml-xl">
        <invoice-form ref="invoice" title="ALGO"/>
      </div>
    </div>

    <tiket :lugagges="lugagges" :date="date"/>
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
      lugagges: null
    };
  },
  components: {
    InvoiceForm,
    Tiket
  },
  mounted() {
    this.date = this.$refs.invoice.getDate();
    this.lugagges = this.$refs.invoice.getLugagges();
  }
};
</script>
