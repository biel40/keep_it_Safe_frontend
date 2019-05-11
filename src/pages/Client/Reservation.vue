<template>
  <q-page class="flex">

    <div class="col-10 row">

      <p id="reservationHeader" class="text-primary q-ml-xs q-mt-md header"> Reservar Equipaje </p>

      <div id="divReservationForm" class="column q-mb-md col-10 q-ml-xl">

        <p class="formText"> DNI </p>
        <q-input class="q-ma-md" outlined v-model="modelDNI"  />

        <p class="formText"> Nombre </p>
        <q-input class="q-ma-md" outlined v-model="modelNombre" />

        <p class="formText"> Primer Apellido </p>
        <q-input class="q-ma-md" outlined v-model="modelPrimerApellido" />

        <p class="formText"> Segundo Apellido </p>
        <q-input class="q-ma-md" outlined v-model="modelSegundoApellido" />

        <p class="formText"> Día de Reserva </p>

        <div class="q-pa-md" style="max-width: 300px">
          <q-input v-model="date" mask="date" :rules="['date']">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy>
                  <q-date v-model="date" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>

        <p class="formText" > Tipo de equipaje </p>

        <q-select class="q-mb-xl" filled v-model="model" :options="options" label="Tipo del Equipaje" />

        <q-btn color="primary" label="GENERAR FACTURA"  />

      </div>

    </div>

    <div class="row justify-end col-7 q-mr-md">
      <div class="col-7 column q-ml-xl q-mb-xs q-mt-md ">
        <p id="commentaryText" class="text-primary justify-center"> Comentarios </p>
        <Comments> </Comments>
      </div>
    </div>

  </q-page>
</template>


<style>
</style>

<script>

import Comments from '../../components/Comments.vue';

export default {
  name: 'PageReservation',
  data(){
    return {
      model: '',
      modelComments: '',
      modelDNI: '',
      modelNombre: '',
      modelPrimerApellido: '',
      modelSegundoApellido: '',
      date: '',
      // La información se tiene que extraer del back-end. Esto es temporal.
      options: ['Maleta Pequeña', 'Maleta Mediana', 'Maleta Grande'] 

    }
  }, methods: {
    
  },
  components:{
    Comments
  }
}

</script>
