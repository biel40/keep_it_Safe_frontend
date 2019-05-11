<template>
  <q-page>

    <div class="col-4 column inline items-center">

      <p id="pricesHeader" class="text-primary q-ml-xs q-mt-xs header"> Nuestros Precios: </p>

      <div class="column items-center col-2 q-ml-xs float-left">
        <img class="luggage q-mr-md q-mt-xs" src="~assets/maleta.jpg" alt="smallLuggage">
        <p class="luggageText q-mt-md col-12"> Maleta pequeña: 4,95 €/día (60 x 40 x 20) </p>
      </div>

      <div class="column items-center col-2 q-ml-md float-left">
        <img class="luggage q-mr-md q-mt-xs" src="~assets/maleta2.jpg" alt="mediumLuggage">
        <p class="luggageText q-mt-md col-12"> Maleta mediana: 5,49 €/día (80 x 60 x 40) </p>
      </div>

      <div class=" column items-center col-2 q-mb-xl float-left">
        <img class="luggage q-mt-xs" src="~assets/maleta3.jpg" alt="bigLuggage">
        <p class="luggageText q-mt-md q-ml-md self-center"> Maleta grande: 6,95 €/día (Superior a: 80 x 60 x 40) </p>
      </div>

    </div>

    <div class="float-right column q-mt-md q-mr-xl">

      <p id="commentaryText" class="text-primary justify-center"> Comentarios </p>

      <Comments> </Comments>

    </div>
   

  </q-page>
</template>

<script>

import Comments from '../../components/Comments.vue';

export default {
  name: 'PageIndex',
  components: {
    Comments
  }
}

</script>

