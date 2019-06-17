<template>
  <q-page padding class="row justify-center items-start">
    <div class="q-mt-md col-4 flex column">
      <div
        class="flex no-wrap items-center justify-between q-mb-md"
        v-for="luggage in luggages"
        :key="luggage.luggage_type"
      >
        <span class="text-h5 q-mr-md">Equipaje {{luggage.getFullName()}}</span>
        <div class="flex no-wrap items-center">
          <q-input
            outlined
            class="price-luggage"
            v-model="luggage.price"
          />
          <span class="text-h5">€/dia</span>
        </div>
      </div>
      <q-btn label="Guardar cambios" color="primary" class="col-12" @click="saveChanges"/>
    </div>
  </q-page>
</template>

<script>
import { locale } from 'moment';

export default {
  name: "EditPrices",
  data() {
    return {
      luggages: []
    };
  },
  methods: {
    saveChanges() {
      this.$axios
        .put("http://localhost:8081/luggages/price", this.luggages)
        .then(response => {
          this.$q.notify({
            message:
              "Se han gardado los cambios correctamente",
            color: "primary",
            icon: "error",
            timeout: 2000
          });
        })
        .catch(error => {
          this.$q.notify({
            message:
              "Ha ocurrido un error al intentar guardar los cambios, intentelo de nuevo más tarde",
            color: "red-10",
            icon: "error",
            timeout: 2000
          });
        });
    }
  },
  created() {
    this.$classes.Utils.verifyTokenSignature(
        localStorage.getItem("token"),
        JSON.parse(localStorage.getItem("user"))
    );


    this.$axios
      .get("http://localhost:8081/luggages")
      .then(response => {

        let luggages = response.data;
        luggages.forEach(luggage => {
          this.luggages.push(
            new this.$classes.Luggage(
              luggage.luggage_type,
              luggage.deep_dimension,
              luggage.high_dimension,
              luggage.price,
              luggage.width_dimension
            )
          );
        });
      })
      .catch(function(error) {

        console.log(error);

        if (error == 401){
          this.$router.push('/error401');
        }         

      });
  }
};
</script>

<style>
</style>
