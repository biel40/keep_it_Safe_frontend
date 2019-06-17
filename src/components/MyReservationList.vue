<template>
  <q-card
    style="width: 900px; max-width:90vw;"
    class="background-color-app-light"
    v-if="reservations.length > 0"
  >
    <div class="flex justify-end q-pa-xs">
      <q-btn size="10px" icon="close" flat round dense v-close-popup/>
    </div>
    <q-card-section class="row justify-between">
      <p class="text-center col-12 q-py-lg text-h4">Mis reservas</p>
      <q-card
        bordered
        class="fex column justify-between col-12 q-mb-md q-pa-md list-reservation-card"
        v-for="reservation in reservations"
        :key="reservation.id"
      >
        <div>
          <span class="text-h6 q-mr-xs"> Código reserva: </span>
          {{ reservation.invoice_id }}
        </div>
         <div>
          <span class="text-h6 q-mr-xs"> Usuario: </span>
          {{ reservation.user.email }}
        </div>
        <div>
          <span class="text-h6 q-mr-xs"> Día: </span>
          <span>
            <b>{{ reservation.start_date }}</b> hasta
            <b>{{ reservation.end_date }}</b>
          </span>
        </div>
        <div class="flex row no-wrap items-center">
          <span class="text-h6 q-mr-xs"> Cantidad de maletas: </span>
          <span class="text-h6 q-mr-xs">
            {{reservation.luggages.length}}
          </span>
        </div>
        <div>
          <span class="text-h6 q-mr-xs">Precio</span>
          {{ reservation.total_price}}€
        </div>
        <q-btn @click="removeReservation(reservation.invoice_id)" color="negative"> Cancelar </q-btn>
      </q-card>
    </q-card-section>
  </q-card>

  <q-card v-else>
    <div class="flex justify-end q-pa-xs">
      <q-btn ref="close" size="10px" icon="close" flat round dense v-close-popup/>
    </div>
    <q-card-section class="row justify-center row">
      <p class="text-center q-py-lg text-h4 col-12">Mis reservas</p>
      <p class="text-h3 text-center text-green col-12">¡Vaya!</p>
      <p
        class="text-h6 text-center q-py-lg text-green col-8"
      > Parece que no tienes ninguan reserva, puedes reservar ahora mismo clicando al boton de abajo! </p>
      <q-btn v-if="this.$router.currentRoute.path =='/reservation'" color="primary col-12 q-py-md" v-close-popup> Reserva ahora </q-btn>
      <q-btn v-else color="primary col-12 q-py-md" @click="redirect()"> Reserva ahora </q-btn>
    </q-card-section>
  </q-card>
</template>

<script>
import { timeout } from 'q';
import moment from 'moment'

export default {
  // name: 'ComponentName',
  data() {
    return {
      reservations: []
    };
  },
  props: ["user"],
  created() {

      let userParsed = JSON.parse(localStorage.getItem('user'));
      console.log(userParsed);

      let user = new this.$classes.Client(userParsed.userId ,userParsed.rol_user, userParsed.email, userParsed.name, userParsed.surnames);
      console.log(user);

      this.$axios.get('http://localhost:8081/invoice/user/notVerified', {
        params: {
          string: user
        }
      })
      .then((response) => {

        console.log(response);
        response.data.forEach(invoice => {
          
          moment.locale('es');
          invoice.start_date = moment(invoice.start_date.substring(0, 10)).format("dddd DD/MM/YYYY");
          invoice.end_date = moment(invoice.end_date.substring(0, 10)).format("dddd DD/MM/YYYY");

          this.reservations.push(invoice);
        });

      })
      .catch((error) => {
        console.log(error);
      }); 

  },
  methods: {
    removeReservation(id) {

      this.$axios.post('http://localhost:8081/deleteInvoice', id)
      .then((response) => {

        this.reservations = this.reservations.filter(reservation => {
          return id != reservation.invoice_id;
        });

      })
      .catch(function (error) {
        console.log(error);
      }); 

    },
    redirect() {
      this.$router.push("/reservation");
    }
  }
};

</script>

<style>
</style>
