<template>
  <q-page class="flex row">
    <div class="col-12 col-md-8 row q-mt-md">
      <div class="column q-mb-md col-8 q-ml-xl">
        <invoice-form title="Reservar Equipaje"/>
      </div>
    </div>

    <div class="col-12 col-md-4 q-mt-md" v-if="!$q.screen.lt.md">
      <p id="commentaryText" class="text-primary justify-center">Comentarios</p>
      <client-comments></client-comments>
    </div>
  </q-page>
</template>


<style>
</style>

<script>
import ClientComments  from "../../components/ClientComments.vue";
import InvoiceForm  from "../../components/InvoiceForm.vue";


export default {
  name: "PageReservation",
  data() {
    return {
      size: "",
      DNI: "",
      nombre: "",
      primerApellido: "",
      segundoApellido: "",
      initDate: "",
      initTime: "",
      finishTime: "",
      finishDate: "",
      // La información se tiene que extraer del back-end. Esto es temporal.
      options: [
        { label: "Maleta Pequeña", value: 0 },
        { label: "Maleta Mediana", value: 1 },
        { label: "Maleta Grande", value: 3 }
      ]
    };
  },
  created() {
    this.$classes.Utils.verifyTokenSignature(
        localStorage.getItem("token"),
        JSON.parse(localStorage.getItem("user"))
    );
  },
  components: {
    ClientComments,
    InvoiceForm
  }
};
</script>
