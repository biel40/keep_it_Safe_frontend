<template>
  <q-page class="flex">

    <div class="col-8 column inline items-center">

      <p id="reservationHeader" class="text-primary q-ml-xs q-mt-md header"> Reservar Equipaje </p>

      <div id="divReservationForm" class="column q-mb-md">

        <p class="formText"> DNI </p>
        <q-input class="q-ma-md" outlined v-model="modelDNI" label="DNI" />

        <p class="formText"> Nombre </p>
        <q-input class="q-ma-md" outlined v-model="modelNombre" label="Nombre" />

        <p class="formText"> Primer Apellido </p>
        <q-input class="q-ma-md" outlined v-model="modelPrimerApellido" label="Primer Apellido" />

        <p class="formText"> Segundo Apellido </p>
        <q-input class="q-ma-md" outlined v-model="modelSegundoApellido" label="Segundo Apellido" />

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

        <p class="formText" > Tipo equipaje </p>

        <q-select class="q-mb-xl" filled v-model="model" :options="options" label="Tipo del Equipaje" />

        <q-btn color="primary" label="GENERAR FACTURA"  />

      </div>

    </div>

    <div class="col-8 column q-mr-xl q-ml-xl q-mt-md">

      <p id="commentaryText" class="text-primary justify-center"> Comentarios </p>

      <!-- HACER ESTO COMPONENTE + OTRA PANTALLA -->
      <div id="scrollAreaDiv" class="col-4">
        <q-scroll-area style="height: 200px; max-width: 800px;">
          <div v-for="n in 4" :key="n" class="q-py-xs q-pa-md">
            Lorem ipsum dolor sit amet, consectetur adipisicing
            elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </div>

        </q-scroll-area>

        <div class="flex row items-center">
          <q-input class="q-ma-md col-9" rounded outlined v-model="modelComments" label="Mensaje" />
          <q-btn class="" round color="primary" icon="send" />
        </div>

      </div>

    </div>

  </q-page>
</template>


<style>
</style>

<script>

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
}

</script>
