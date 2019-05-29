<template>
  <q-page padding class="row justify-center items-start">
    <div class="  q-mt-md col-4 flex column">
      <div class="flex no-wrap items-center justify-between q-mb-md">
        <span class="text-h5 q-mr-md">Equipaje pequeño</span>
        <div class="flex no-wrap items-center">
          <q-input outlined class="price-luggage"/>
          <span class="text-h5">€/dia</span>
        </div>
      </div>
      <div class="flex no-wrap items-center justify-between q-mb-md">
        <span class="text-h5 q-mr-md">Equipaje mediano</span>
        <div class="flex no-wrap items-center">
          <q-input outlined class="price-luggage"/>
          <span class="text-h5">€/dia</span>
        </div>
      </div>
      <div class="flex no-wrap items-center justify-between q-mb-lg">
        <span class="text-h5 q-mr-md">Equipaje grande</span>
        <div class="flex no-wrap items-center">
          <q-input outlined class="price-luggage"/>
          <span class="text-h5">€/dia</span>
        </div>
      </div>
      <q-btn label="Guardar cambios" color="primary" class="col-12" @click="saveChanges"/>
    </div>
  </q-page>
</template>

<script>
import Luggage from '../../class/Luggage';

export default {
  name: 'EditPrices',
  data(){
    return{
      luggage: {
        luggage_type: "",
        deep_dimension: "",
        high_dimension: "",
        price: 0,
        widht_dimension: "",
      },
      luggages: []
    }
  },
  methods: {
    saveChanges(){
      this.$axios
        .get("http://localhost:8081/luggage")
        .then(response => {
          let hola = response.data[0]
          let h = new Luggage(hola.luggage_type);
          console.log(h);
        })
        .catch(error => {
          console.log(error)
          this.$q.notify({
            message:
              "Ha ocurrido un error al obtener el equipaje, intentelo de nuevo más tarde",
            color: "red-10",
            icon: "error",
            timeout: 2000
          });
        });
    }
  }
};
</script>

<style>
</style>
