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
          <span class="text-h6 q-mr-xs">Código reserva</span>
          {{ reservation.id }}
        </div>
        <div>
          <span class="text-h6 q-mr-xs">Día</span>
          <span>
            <b>{{ reservation.startDay }}</b> hasta
            <b>{{ reservation.endDay }}</b>
          </span>
        </div>
        <div class="flex row no-wrap items-center">
          <span class="text-h6 q-mr-xs">Medidas</span>
          <span v-for="size in reservation.sizes">{{size.count}}x {{ size.size }}</span>
        </div>
        <div>
          <span class="text-h6 q-mr-xs">Precio</span>
          {{ reservation.Price }}€
        </div>
        <q-btn @click="removeReservation(reservation.id)" color="negative">Cancelar</q-btn>
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
      >Parece que no tienes ninguan reserva, puedes reservar ahora mismo pinchando al boton de abajo</p>
      <q-btn v-if="this.$router.currentRoute.path =='/reservation'" color="primary col-12 q-py-md" v-close-popup>Reserva ahora</q-btn>
      <q-btn v-else color="primary col-12 q-py-md" @click="redirect()">Reserva ahora</q-btn>
    </q-card-section>
  </q-card>
</template>

<script>
import { timeout } from 'q';
export default {
  // name: 'ComponentName',
  data() {
    return {
      reservations: [
        {
          id: 2442342,
          startDay: "10/10/2019 18:30h",
          endDay: "11/10/2019 18:30h",
          sizes: [{ size: "Mediana", count: 2 }, { size: "Pequeña", count: 1 }],
          Price: 20.5
        },
        {
          id: 2442343,
          startDay: "10/10/2019 18:30h",
          endDay: "11/10/2019 18:30h",
          sizes: [{ size: "Mediana", count: 2 }, { size: "Pequeña", count: 1 }],
          Price: 20.5
        },
        {
          id: 2442345,
          startDay: "10/10/2019 18:30h",
          endDay: "11/10/2019 18:30h",
          sizes: [{ size: "Mediana", count: 2 }, { size: "Pequeña", count: 1 }],
          Price: 20.5
        }
      ]
    };
  },
  props: ["user"],
  methods: {
    removeReservation(id) {
      this.reservations = this.reservations.filter(reservation => {
        return id != reservation.id;
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
@click="redirect()