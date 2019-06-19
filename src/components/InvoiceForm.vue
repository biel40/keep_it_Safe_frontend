<template>
  <div class="flex column">
    <p class="text-primary header">{{title}}</p>
    <div class="flex column no-wrap">
      <div class="col-12 flex row no-wrap justify-between">
        <div class="col-5">
          <p class="formText">Correo electrónico</p>
          <q-input
            v-if="isClientReservation"
            disable
            class="q-mb-md"
            outlined
            v-model="Invoice.user.email"
            dense
            type="email"
            :error="$v.Invoice.user.email.$error"
            @blur="$v.Invoice.user.email.$touch"
            error-message="correo electrónico invalido"
          />
          <q-input
            v-else
            class="q-mb-md"
            outlined
            v-model="Invoice.user.email"
            dense
            type="email"
            :error="$v.Invoice.user.email.$error"
            @blur="$v.Invoice.user.email.$touch"
            error-message="correo electrónico invalido"
          />
        </div>
      </div>
    </div>
    <div class="flex row row justify-between">
      <div class="flex column col-5">
        <p class="formText">Día de Reserva</p>
        <q-input v-if="isInvoiceEditing" outlined v-model="Invoice.start_date" dense label="Día" class="q-mb-lg">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="initDate">
                <q-date
                  v-model="Invoice.start_date"
                  mask="DD-MM-YYYY"
                  minimal
                  today-btn
                  @input="closeDate('initDate')"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input v-else outlined v-model="Invoice.start_date" dense label="Día" class="q-mb-lg">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="initDate">
                <q-date
                  v-model="Invoice.start_date"
                  mask="DD-MM-YYYY"
                  minimal
                  :options="setAllowedDays"
                  today-btn
                  @input="closeDate('initDate')"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>

      <div class="flex column col-5">
        <p class="formText">Día de Recogida</p>
        <q-input v-if="isInvoiceEditing" outlined v-model="Invoice.end_date" dense label="Día" class="q-mb-lg">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="finishDate">
                <q-date
                  v-model="Invoice.end_date"
                  mask="DD-MM-YYYY"
                  minimal
                  today-btn
                  @input="closeDate('finishDate')"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-input v-else outlined v-model="Invoice.end_date" dense label="Día" class="q-mb-lg">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy ref="finishDate">
                <q-date
                  v-model="Invoice.end_date"
                  mask="DD-MM-YYYY"
                  minimal
                  :options="setAllowedDays"
                  today-btn
                  @input="closeDate('finishDate')"
                />
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
        :key="luggage.luggage_type"
      >
        <span>Equipaje {{luggage.getFullName()}}</span>
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
              @click="removeLuggage(luggage.luggage_type)"
            />

            {{ luggage.count }}
            <q-btn
              dense
              color="green-9"
              class="q-ml-md"
              icon="add"
              round
              @click="addLuggage(luggage.luggage_type)"
            />
          </div>
        </div>
      </q-item>
    </q-list>

    <q-btn
      v-if="!this.isInvoiceEditing"
      color="primary"
      label="GENERAR FACTURA"
      @click="createInvoice"
    />

    <q-btn v-else color="primary" label="EDITAR LA FACTURA" @click="editInvoice"/>
  </div>
</template>

<script>
import moment, { locale } from "../../node_modules/moment";
import {
  required,
  minLength,
  alpha,
  sameAs,
  email
} from "vuelidate/lib/validators";

let Luggage = function(type, fullName) {
  this.type = type;
  this.count = 0;
  this.fullName = fullName;
};
export default {
  name: "InvoiceForm",
  data() {
    return {
      moment: null,
      Invoice: null,
      isInvoiceEditing: false,
      InvoiceDate: {
        initDate: "",
        finishDate: ""
      },
      luggages: [],
      message: "Unicamente se pueden añadir 5 matelas de este tipo como máximo"
    };
  },
  methods: {
    addLuggage(type) {
      let difference = this.getDifferenceDays();
      if (difference > 0) {
        let luggage = this.findLuggage(type);
        if (type === luggage.luggage_type) {
          if (luggage.count === 5) {
            this.$q.notify({
              message: this.message,
              color: "red-10",
              timeout: 1500
            });
          } else {
            this.Invoice.luggages.push(luggage);
            luggage.count++;
            this.updateFullPrice();
          }
        }
      } else {
        this.sowErrorDay();
      }
    },
    removeLuggage(type) {
      let luggage = this.findLuggage(type);
      if (luggage.count !== 0) {
        luggage.count--;
        let index = this.Invoice.luggages.findIndex(findLuggage => {
          return luggage.luggage_type === findLuggage.luggage_type;
        });
        this.Invoice.luggages.splice(index, 1);
        this.updateFullPrice();
      }
    },
    findLuggage(type) {
      return this.luggages.find(luggage => {
        return type === luggage.luggage_type;
      });
    },
    closeDate(name) {
      this.updateFullPrice();
      this.$refs[name].hide();
    },
    createInvoice() {
      this.$v.$touch();
      if (this.$v.$error) return;

      if (this.Invoice.luggages.length == 0) {
        this.$q.notify({
          message: "Debe añadir almenos un tipo de equipaje",
          color: "red-10",
          icon: "error",
          timeout: 3000
        });

        return;
      }

      if (this.isClientReservation) {
        this.Invoice.verified = false;
      } else {
        this.Invoice.verified = true;
      }
      this.$axios
        .post("http://localhost:8081/invoice", this.Invoice)
        .then(response => {
          let message = "Se ha creado la factura correctamente";

          if (this.isClientReservation) {
            message = "Se ha creado la reserva correctamente";
          }

          this.$q.notify({
            message: message,
            color: "primary",
            icon: "check",
            timeout: 3000
          });
        })
        .catch(error => {
          let errorMessage = error.response.data;
          if (!errorMessage) {
            errorMessage =
              "Ha ocurrido un error al registrar la factura, intentelo de nuevo";
          }
          this.$q.notify({
            message: errorMessage,
            color: "red-10",
            icon: "error",
            timeout: 2000
          });
        });
    },
    editInvoice() {
      this.$v.$touch();

      if (this.$v.$error) return;

      if (this.Invoice.luggages.length == 0) {
        this.$q.notify({
          message: "Debe añadir almenos un tipo de equipaje",
          color: "red-10",
          icon: "error",
          timeout: 3000
        });

        return;
      }

      this.$axios
        .put("http://localhost:8081/invoices/edit", this.Invoice)
        .then(response => {
          let message = "Se ha modificado la factura correctamente.";
          this.$q.notify({
            message: message,
            color: "primary",
            icon: "check",
            timeout: 3000
          });
        })
        .catch(error => {
          let errorMessage = error.response.data;
          if (!errorMessage) {
            errorMessage =
              "Ha ocurrido un error al registrar la factura, intentelo de nuevo";
          }
          this.$q.notify({
            message: errorMessage,
            color: "red-10",
            icon: "error",
            timeout: 2000
          });
        });
    },
    updateFullPrice() {
      let duration = this.getDifferenceDays();
  
      if (duration < 0) {
        this.sowErrorDay();
      } else {
        let total_price = this.luggages.reduce((price, lugagge) => {
          if (lugagge.count > 0) {
            return (price += lugagge.price * lugagge.count * duration);
          }
          return price;
        }, 0);
        this.Invoice.total_price = Math.round(total_price * 100) / 100;
      }
    },
    getDifferenceDays() {
      let start = moment(this.Invoice.start_date, "DD-MM-YYYY HH:mm");
      let end = moment(this.Invoice.end_date, "DD-MM-YYYY HH:mm");
      if (moment(start).isAfter(end)) {
        this.sowErrorDay();
      } else {
        let duration = moment.duration(end.diff(start)).asDays();
        duration++;
        return duration;
      }
    },
    sowErrorDay() {
      this.Invoice.total_price = 0;
      this.Invoice.luggages = [];
      this.luggages.forEach(luggage => {
        luggage.count = 0;
      });
      this.$q.notify({
        message:
          "Por favor introduzca una fecha de entrega menor o igual a la fecha de recogida",
        color: "red-10",
        icon: "error",
        position: "center",
        timeout: 2000
      });
    },
    setAllowedDays(date) {
      return this.moment.format("YYYY/MM/DD") <= date;
    },
    getLuggages() {
      return this.luggages;
    },
    getInvoice() {
      return this.Invoice;
    },
    updateLuggageCounters() {
      let count = 0;
      this.luggages.forEach(luggage => {
        let countLuggage = this.InvoiceProps.luggages.forEach(lugg => {
          if (luggage.luggage_type == lugg.luggage_type) {
            count++;
          }
        });
        let luggageFound = this.findLuggage(luggage.luggage_type);

        luggageFound.count = count;
        count = 0;
      });
    }
  },
  created() {
    // Esto se tiene que rellenar siempre
    this.$axios
      .get("http://localhost:8081/luggages")
      .then(response => {
        let luggages = response.data;
       
        this.luggageFind = [];
        luggages.forEach(luggage => {
          let lugg = new this.$classes.Luggage(
            luggage.luggage_type,
            luggage.deep_dimension,
            luggage.high_dimension,
            luggage.price,
            luggage.width_dimension
          );
          this.luggages.push(lugg);
        });

        if (this.InvoiceProps != null) {
          this.updateLuggageCounters();
        }
      })
      .catch(error => {
        console.log(error);
      });

    if (this.InvoiceProps != null) {
      this.Invoice = JSON.parse(JSON.stringify(this.InvoiceProps));
      this.isInvoiceEditing = true;
      this.moment = moment();
    } else {
      let invoice = new this.$classes.Invoice();
      invoice.user = new this.$classes.User();

      this.Invoice = invoice;

      this.moment = moment();
      this.Invoice.start_date = this.moment.format("DD-MM-YYYY");
      this.Invoice.end_date = this.moment.format("DD-MM-YYYY");

      if (this.isClientReservation) {
        this.Invoice.user.email = JSON.parse(
          localStorage.getItem("user")
        ).email;
      }
    }
  },
  props: { title: String, isClientReservation: Boolean, InvoiceProps: Object },
  validations: {
    Invoice: {
      user: {
        email: {
          required,
          email
        }
      }
    }
  }
};
</script>

<style>
</style>