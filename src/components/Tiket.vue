<template>
  <q-card style="height: 80vh; width: 500px; max-width: 80vw" class="q-pa-lg scroll">
    <p class="text-h3 text-center">Factura simplificada</p>
    <p class="text-primary text-h4 text-center q-mt-lg q-mb-md">Keep it Safe</p>
    <p class="text-weight-bolder text-h6 q-mt-xl text-center">
      Le atendío
      <span class="text-weight-light">{{user}}</span>
    </p>
    <div v-for="luggage in luggages" :key="luggage.type" class="text-h6 q-mt-xl">
      <div v-if="luggage.count > 0" class="flex no-wrp justify-between">
        <div class="flex no-wrap">
          <p class="q-mr-md">{{luggage.count}}x</p>
          <p> Reserva de equipaje <span>{{luggage.type | getName}}</span></p>
        </div>
        <p>1000€</p>
      </div>
    </div>
    <div class="text-body1 q-mt-lg">
      <p><span class="text-h6">Fecha de entrega: </span>{{date.initDate | getDateFormat}} a las {{date.initTime}}</p> 
      <p><span class="text-h6">Fecha de recogida: </span>{{date.finishDate | getDateFormat}} a las {{date.finishTime}}</p> 
    </div>
    <p class="text-center text-h5 q-mt-lg"><span  class="text-h4">Total:</span> MUCHOS DINEROS</p>
  </q-card>
</template>

<script>
import moment from "../../node_modules/moment";
export default {
  name: "Tiket",
  data() {
    return {
      data: ""
    };
  },
  filters: {
    getName: function(luggageType) {
      switch (luggageType) {
        case 's':
          return "pequeño"
          break;

        case 'm':
          return "mediano"
          break;
        case 'g':
          return "grande"
          break;
      }
    },
    getDateFormat: function(date) {
      moment.locale('es');
      let dateToFormat = moment(date, "DD-MM-YYYY");
      let formtedDate = dateToFormat.format("DD MMMM YYYY");
      let arr =  formtedDate.split(" ");
      arr[0] = arr[0]+ " de ";
      arr[1] = arr[1]+ " de ";
      let formating =   arr.toString();
      formating = formating.replace(/,/g, " ")
      return formating;
    }
  },
  props: ["luggages", "date", "user"]
};
</script>

<style>
</style>
