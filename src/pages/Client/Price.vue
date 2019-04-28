<template>
  <q-page>

    <div class="col-12 column inline items-center">

      <p id="pricesHeader" class="text-primary q-ml-xs q-mt-md header"> Nuestros Precios: </p>

      <div class="column items-center col-3 q-ml-xs float-left">
        <img class="luggage q-mr-md q-mt-xl" src="~assets/maleta.jpg" alt="smallLuggage">
        <p class="luggageText q-mt-md col-12"> Maleta pequeña: 4,95 €/día (60 x 40 x 20) </p>
      </div>

      <div class="column items-center col-3 q-ml-md float-left">
        <img class="luggage q-mr-md q-mt-xl" src="~assets/maleta2.jpg" alt="mediumLuggage">
        <p class="luggageText q-mt-md col-12"> Maleta mediana: 5,49 €/día (80 x 60 x 40) </p>
      </div>

      <div class=" column items-center col-3 q-mb-xl float-left">
        <img class="luggage q-mt-xl" src="~assets/maleta3.jpg" alt="bigLuggage">
        <p class="luggageText q-mt-md q-ml-md self-center"> Maleta grande: 6,95 €/día (Superior a: 80 x 60 x 40) </p>
      </div>

    </div>

    <div class="float-right column q-mt-md q-mr-xl">

      <p id="commentaryText" class="text-primary justify-center"> Comentarios </p>

      <!-- HACER ESTO COMPONENTE + OTRA PANTALLA -->
      <div id="scrollAreaDiv" class="col-12">
        <q-scroll-area style="height: 200px; max-width: 800px;">
          <div v-for="n in 4" :key="n" class="q-py-xs q-pa-md">
            Lorem ipsum dolor sit amet, consectetur adipisicing
            elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </div>
        </q-scroll-area>

        <div class="flex row items-center">
          <q-input class="q-ma-md col-9" rounded outlined v-model="text" label="Mensaje" />
          
          <q-btn class="" round color="primary" icon="send" />
          
        </div>
      </div>

    </div>
   

  </q-page>
</template>

<script>

export default {
  name: 'PageIndex'
}

</script>

