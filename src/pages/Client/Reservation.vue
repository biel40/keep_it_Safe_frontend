<template>
  <q-page class="flex row">
    <div class="col-12 col-md-8 row q-mt-md">
      <div class="column q-mb-md col-8 q-ml-xl">
        <p class="text-primary q-ml-xs header">Reservar Equipaje</p>

        <p class="formText">DNI</p>
        <q-input class="q-mb-md" outlined v-model="DNI" dense/>

        <p class="formText">Nombre</p>
        <q-input class="q-mb-md" outlined v-model="nombre" dense/>

        <p class="formText">Primer Apellido</p>
        <q-input class="q-mb-md" outlined v-model="primerApellido" dense/>

        <p class="formText">Segundo Apellido</p>
        <q-input class="q-mb-md" outlined v-model="segundoApellido" dense/>
        <div class="flex row row justify-between">
          <div class="flex column col-5">
            <p class="formText">Día de Reserva</p>
            <q-input outlined v-model="initDate" mask="date" :rules="['date']" dense>
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy>
                    <q-date v-model="initDate" minimal today-btn/>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>

            <q-input outlined v-model="initTime" mask="time" :rules="['time']" dense>
              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy>
                    <q-time v-model="initTime"/>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>

          <div class="flex column col-5">
            <p class="formText">Día de Recogida</p>
            <q-input outlined v-model="finishDate" mask="date" :rules="['date']" dense>
              <template v-slot:append>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy>
                    <q-date v-model="finishDate" minimal today-btn/>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>

            <q-input outlined v-model="finishTime" mask="time" :rules="['time']" dense>
              <template v-slot:append>
                <q-icon name="access_time" clatar xfzss="cursor-pointer">
                  <q-popup-proxy>
                    <q-time v-model="finishTime"/>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </div>

        <p class="formText">Tipo de equipaje</p>

        <q-select class="q-mb-xl" outlined v-model="size" :options="options" dense/>
        <q-btn color="primary" label="GENERAR FACTURA"/>
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
  name: "PageReservation",
  data() {
    return {
      size: "",
      DNI: "",
      nombre: "",
      primerApellido: "",
      segundoApellido: "",
      initDate: "",
      initTime: "",
      finishTime: "",
      finishDate: "",
      // La información se tiene que extraer del back-end. Esto es temporal.
      options: [
        { label: "Maleta Pequeña", value: 0 },
        { label: "Maleta Mediana", value: 1 },
        { label: "Maleta Grande", value: 3 }
      ]
    };
  },
  methods: {},
  components: {
    Comments
  },
  filters: {
    capitalize: function(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  },
  created() {
    let now = moment();
    this.initDate = now.format("YYYY/MM/DD");
    this.finishDate = now.format("YYYY/MM/DD");
    this.initTime = now.format("HH:mm");
    this.finishTime = now.format("HH:mm");
  }
};
</script>
