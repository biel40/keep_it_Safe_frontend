<template>
  <div class="flex column">
    <p class="text-primary header">Reservar Equipaje</p>

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
    <q-list padding class="rounded-borders text-primary text-h6 q-mb-md">
      <q-item class="flex row no-wrap justify-between items-center q-pa-md" v-for="luggage in sizes" :key="luggage.type">
        Maleta {{luggage}}
        <div class="text-h6 flex column no-wrap items-center">
          <div class="q-mb-xs">
            <span class="text-center">Cantidad</span>
          </div>
          <div>
            <q-btn dense color="green-9" class="q-mr-md" icon="add" round @click="addLuggage('m')"/>
            {{ this.sizes[1].count }}
            <q-btn dense color="red" class="q-ml-md" icon="remove" round @click="removeLuggage('m')"/>
          </div>
        </div>
      </q-item>
    </q-list>
    <q-btn color="primary" label="GENERAR FACTURA"/>
  </div>
</template>

<script>
import moment from "../../node_modules/moment";
let Luggage = function(type, fullName) {
  this.type = type;
  this.count = 0;
  this.fullName = fullName;
};
export default {
  name: "InvoiceForm",
  data() {
    return {
      DNI: "",
      nombre: "",
      primerApellido: "",
      segundoApellido: "",
      initDate: "",
      initTime: "",
      finishTime: "",
      finishDate: "",
      sizes: [new Luggage("s", "mequeña"), new Luggage("m", "mediana"), new Luggage("g", "grande")],
      message: "Unicamente se pueden añadir 5 matelas como máximo"
    };
  },
  created() {
    let now = moment();
    this.initDate = now.format("YYYY/MM/DD");
    this.finishDate = now.format("YYYY/MM/DD");
    this.initTime = now.format("HH:mm");
    this.finishTime = now.format("HH:mm");
  },
  methods: {
    addLuggage(type) {
        let luggage = this.findLuggage(type);
        if (type === luggage.type) {
          luggage;
          if (luggage.count === 5) {
            this.$q.notify({ message: this.message, color: "primary" });
          } else {
            luggage.count++;
          }
        }
    },
    removeLuggage(type) {
      let luggage = this.findLuggage(type);
      if (luggage.count !== 0) {
        luggage.count--;
      }
    },
    findLuggage(type){
      return this.sizes.find(luggage => {
        return type === luggage.type; 
      });
    }
  }
};
</script>

<style>
</style>
