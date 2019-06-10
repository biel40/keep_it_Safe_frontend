<template>
  <div class="flex column">
    <p class="text-primary header">{{title}}</p>
    <div class="flex column no-wrap">
      <div class="col-12 flex row no-wrap justify-between">
        <div class="col-5">
          <p class="formText">Nombre</p>
          <q-input class="q-mb-md" outlined v-model="Client.nombre" dense/>
        </div>
        <div class="col-5">
          <p class="formText">Apellidos</p>
          <q-input class="q-mb-md" outlined v-model="Client.primerApellido" dense/>
        </div>
      </div>
      <div class="col-12 flex row no-wrap justify-between">
        <div class="col-5">
          <p class="formText">Correo electrónico</p>
          <q-input class="q-mb-md" outlined v-model="Client.segundoApellido" dense/>
        </div>
      </div>
    </div>
    <div class="flex row row justify-between">
      <div class="flex column col-5">
        <p class="formText">Día de Reserva</p>
        <q-input outlined v-model="InvoiceDate.initDate" dense label="Día" class="q-mb-lg">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="initDate">
                <q-date
                  v-model="InvoiceDate.initDate"
                  mask="DD-MM-YYYY"
                  minimal
                  today-btn
                  :options="setAllowedDays"
                  @input="() => $refs.initDate.hide()"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input outlined v-model="InvoiceDate.initTime" dense label="Hora">
          <template v-slot:append>
            <q-icon name="access_time" class="cursor-pointer">
              <q-popup-proxy ref="initTime">
                <q-time v-model="InvoiceDate.initTime" @input="() => $refs.initTime.hide()"/>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>

      <div class="flex column col-5">
        <p class="formText">Día de Recogida</p>
        <q-input outlined v-model="InvoiceDate.finishDate" dense label="Día" class="q-mb-lg">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="finishDate">
                <q-date
                  v-model="InvoiceDate.finishDate"
                  mask="DD-MM-YYYY"
                  minimal
                  today-btn
                  :options="setAllowedDays"
                  @input="() => $refs.finishDate.hide()"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-input
          outlined
          v-model="InvoiceDate.finishTime"
          mask="time"
          :rules="['time']"
          dense
          label="Hora"
        >
          <template v-slot:append>
            <q-icon name="access_time" clatar xfzss="cursor-pointer">
              <q-popup-proxy ref="finishTime">
                <q-time v-model="InvoiceDate.finishTime" @input="() => $refs.finishTime.hide()"/>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </div>

    <p class="formText">Tipo de equipaje</p>
    <q-list padding class="rounded-borders text-primary text-h6 q-mb-md">
      <q-item
        class="flex row no-wrap justify-between items-center ç"
        v-for="luggage in luggages"
        :key="luggage.type"
      >
        <span>Maleta {{luggage.fullName}}</span>
        <div class="text-h6 flex column no-wrap items-center">
          <div class="q-mb-xs">
            <span class="text-center">Cantidad</span>
          </div>
          <div>
            <q-btn
              dense
              color="red"
              class="q-mr-md"
              icon="remove"
              round
              @click="removeLuggage(luggage.type)"
            />
            {{luggage.count}}
            <q-btn
              dense
              color="green-9"
              class="q-ml-md"
              icon="add"
              round
              @click="addLuggage(luggage.type)"
            />
          </div>
        </div>
      </q-item>
    </q-list>
    <q-btn color="primary" label="GENERAR FACTURA" @click="createInvoice"/>
  </div>
</template>

<script>
import moment from "../../node_modules/moment";
import { constants } from 'fs';
let Luggage = function(type, fullName) {
  this.type = type;
  this.count = 0;
  this.fullName = fullName;
};
export default {
  name: "InvoiceForm",
  data() {
    return {
      date: "",
      moment: null,
      Client: {
        DNI: "",
        nombre: "",
        primerApellido: "",
        segundoApellido: ""
      },
      InvoiceDate: {
        initDate: "",
        initTime: "",
        finishTime: "",
        finishDate: ""
      },
      luggages: [],
      message: "Unicamente se pueden añadir 5 matelas de este tipo como máximo"
    };
  },
  created() {
    this.moment = moment();
    this.InvoiceDate.initDate = this.moment.format("DD-MM-YYYY");
    this.InvoiceDate.finishDate = this.moment.format("DD-MM-YYYY");
    this.InvoiceDate.initTime = this.moment.format("HH:mm");
    this.InvoiceDate.finishTime = this.moment.format("HH:mm");
  },
  methods: {
    addLuggage(type) {
      let luggage = this.findLuggage(type);
      if (type === luggage.type) {
        if (luggage.count === 5) {
          this.$q.notify({
            message: this.message,
            color: "red-10",
            timeout: 1500
          });
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
    findLuggage(type) {
      return this.luggages.find(luggage => {
        return type === luggage.type;
      });
    },

    setAllowedDays(date) {
      return this.moment.format("YYYY/MM/DD") <= date;
    },
    getDate() {
      return this.InvoiceDate;
    },
    getLuggages() {
      return this.luggages;
    },
    createInvoice() {
      let a = this.luggages[0];
      let obj = {
        deep_dimension: a.deep_dimension,
        high_dimension: a.high_dimension,
        luggage_type: a.luggage_type,
        price: a.price,
        width_dimension: a.width_dimension
      };
      console.log(a)
      this.$axios
        .post("http://localhost:8081/luggages", a)
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
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
      .catch(error => {
        console.log(error);
      });
  },
  props: ["title"]
};
</script>

<style>
</style>