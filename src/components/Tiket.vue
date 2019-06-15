<template>
  <q-card style="height: 80vh; width: 500px; max-width: 80vw" class="q-pa-lg scroll">
    <p class="text-h3 text-center">Factura simplificada</p>
    <p class="text-primary text-h4 text-center q-mt-lg q-mb-md">Keep it Safe</p>
    <p class="text-weight-bolder text-h6 q-mt-xl text-center">
      Le atendío
      <span class="text-weight-light">{{user.name}} {{user.surnames}}</span>
    </p>
    <div v-for="luggage in luggages" :key="luggage.luggage_type" class="text-h6 q-mt-xl">
      <div v-if="luggage.count > 0" class="flex no-wrp justify-between">
        <div class="flex no-wrap">
          <p class="q-mr-md">{{luggage.count}}x</p>
          <p>
            Reserva de equipaje
            <span>{{luggage.getFullName()}}</span>
          </p>
        </div>
        <p>{{luggage | getPrice(invoice)}}€</p>
      </div>
    </div>
    <div class="text-body1 q-mt-lg ">
      <p v-if="invoice">
        <span class="text-h6">Fecha de entrega:</span>
        {{invoice.start_date | getDateFormat}}
      </p>
      <p v-if="invoice">
        <span class="text-h6">Fecha de recogida:</span>
        {{invoice.end_date | getDateFormat}}
      </p>
    </div>
    <p v-if="invoice" class="text-center text-h5 q-mt-lg">
      <span class="text-h4">Total:</span>
      {{invoice.total_price}}€
    </p>
  </q-card>
</template>

<script>
import moment from "../../node_modules/moment";
export default {
  name: "Tiket",
  data() {
    return {};
  },
  filters: {
    getDateFormat: function(date) {

      moment.locale("es");
      let dateToFormat = moment(date, "DD-MM-YYYY");
      let formtedDate = dateToFormat.format("DD MMMM YYYY");
      let arr = formtedDate.split(" ");
      
      arr[0] = arr[0] + " de ";
      arr[1] = arr[1] + " de ";
      
      let formating = arr.toString();
      
      formating = formating.replace(/,/g, " ");
      
      return formating;

    },
    getPrice: function(luggage, invoice) {
      
      let start = moment(invoice.start_date, "DD-MM-YYYY HH:mm");
      let end = moment(invoice.end_date, "DD-MM-YYYY HH:mm");
      let duration = moment.duration(end.diff(start)).asDays();
      duration++;

      return Math.round(luggage.price * luggage.count * duration * 100) / 100;
    
    }
  },
  props: ["luggages", "invoice", "user"]
};
</script>

<style>
</style>
