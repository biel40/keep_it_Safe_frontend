<template>
  <q-page class="flex flex-center">

    <div class="col-10 column inline items-center">

      <p class="text-primary header"> HORARIO </p>

      <p class="col-3"> Nuestro horario es de <b> 09:00h </b> hasta las <b> 20:00h </b>. 
      Podrás encontrarnos en la Calle Ficticia nº5 </p>

      <GmapMap
        :center="{ lat: 39.500155, lng: 2.753312} "
        :zoom="16"
        map-type-id="terrain"
        style="width: 500px; height: 400px"
        >

        <GmapMarker
          :key="index"
          v-for="(m, index) in markers"
          :position="m.position"
          :clickable="true"
          :draggable="true"
          @click="center=m.position"
        />

      </GmapMap>

    </div>

    <div class="col-8 column q-mr-xl q-ml-xl">

      <p id="commentaryText" class="text-primary justify-center"> Comentarios </p>
      
      <Comments></Comments>

    </div>

  </q-page>
</template>


<style>
</style>

<script>

import Comments from '../../components/Comments.vue';

export default {

  name: 'PageSchedule',
  data(){
    return {
        markers: [
          { lat: 39.500155, lng: 2.753312}
        ],
        model: ''
    }
  },
  methods: {
    
  },
  components: {
    Comments
  }
}

</script>
