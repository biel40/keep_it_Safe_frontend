<template>
  <q-page class="flex row">
    <div class="flex column items-center col-12 col-md-8 row q-mt-md">
        <p class="text-primary header">HORARIO</p>

        <p class="q-mb-xl">
          Nuestro horario es de
          <b>09:00h</b> hasta las
          <b>20:00h</b>.
          Podrás encontrarnos en la Calle Ficticia nº5
        </p>

        <gmap-map 
          class="q-mb-xs"
          :center="{ lat: 39.500155, lng: 2.753312} "
          :zoom="16"
          map-type-id="terrain"
          style="width: 600px; max-width: 90vw; height: 500px"
        >
          <gmap-marker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            @click="center=m.position"
            :icon="{ url: require('../../assets/marker.png')}"
          />
        </gmap-map>
    </div>

    <div class="col-12 col-md-4 q-mt-md" v-if="!$q.screen.lt.md">
      <p id="commentaryText" class="text-primary justify-center">Comentarios</p>
      <client-comments></client-comments>
    </div>
  </q-page>
</template>


<style>
</style>

<script>
import ClientComments from "../../components/ClientComments.vue";

export default {
  name: "PageSchedule",
  data() {
    return {
      KeepItSafePosition: { lat: 39.500155, lng: 2.753312 },
      markers:[],
    };
  },
  created() {
    this.$classes.Utils.verifyTokenSignature(
        localStorage.getItem("token"),
        JSON.parse(localStorage.getItem("user"))
    );
  },
  mounted(){
    this.markers.push({ position: this.KeepItSafePosition});
  },
  components: {
    ClientComments
  }
};
</script>
