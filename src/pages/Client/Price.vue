<template>
  <q-page class="flex row">
    <div class="col-12 col-md-8 row q-mt-md">
      <div class="column col-8 q-ml-xl">
        <p id="pricesHeader" class="text-primary text-center q-mt-md header">Nuestros Precios</p>

        <div class="flex column items-center justify-center">
          <img class="luggage q-mr-md q-mt-lg" src="~assets/maleta1.svg" alt="smallLuggage">
          <div>
            <p class="luggageText q-mt-md col-12">Maleta pequeña: 4,95 €/día (60 x 40 x 20)</p>
          </div>
        </div>

        <div class="column items-center justify-center">
          <img class="luggage q-mt-md" src="~assets/maleta2.svg" alt="mediumLuggage">
          <div>
            <p class="luggageText q-mt-md col-12">Maleta mediana: 5,49 €/día (80 x 60 x 40)</p>
          </div>
        </div>

        <div class="column items-center justify-center">
          <img class="luggage q-mt-md" src="~assets/maleta3.svg" alt="bigLuggage">
          <div>
            <p class="luggageText q-mt-md">Maleta grande: 6,95 €/día (Superior a: 80 x 60 x 40)</p>
          </div>
        </div>
      </div>
    </div>

    <div class="col-12 col-md-4 q-mt-md" v-if="!$q.screen.lt.md">
      <p id="commentaryText" class="text-primary justify-center">Comentarios</p>
      <Comments></Comments>
    </div>
  </q-page>
</template>


<style>
</style>

<script>
import Comments from "../../components/Comments.vue";
import moment from "../../../node_modules/moment";
export default {
  name: "PageIndex",
  components: {
    Comments
  }
};
</script>
