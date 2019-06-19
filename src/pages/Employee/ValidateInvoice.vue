<template>
  <q-page class="row justify-center">
    <div class="col-8 items-center justify-center">
      <div class="column justify-center items-center">
        <p class="text-primary header q-mt-md">Validar Factura</p>
        <div class="flex row col-5 justify-around space-between items-center">
          <q-input
            class="q-mb-md"
            outlined
            v-model="idInvoice"
            dense
            type="email"
            v-on:keyup.enter="loadInvoices()"
            error-message="Usuario no válido"
          />
          <q-btn
            class="q-mb-md q-ml-md"
            color="primary"
            icon="save_alt"
            size="10px"
            @click="loadInvoice()"
          />
        </div>
      </div>

      <div>
        <q-card
          bordered
          class="fex column justify-between col-12 q-mb-md q-pa-md list-invoiceToCheck-card"
          v-if="invoiceToCheck != null"
        >
          <div>
            <span class="text-h6 q-mr-xs">Código reserva:</span>
            {{ invoiceToCheck.invoice_id }}
          </div>
          <div>
            <span class="text-h6 q-mr-xs">Usuario:</span>
            {{ invoiceToCheck.user.email }}
          </div>
          <div>
            <span class="text-h6 q-mr-xs">Día:</span>
            <span>
              <b>{{ invoiceToCheck.start_date }}</b> hasta
              <b>{{ invoiceToCheck.end_date }}</b>
            </span>
          </div>
          <div class="flex row no-wrap items-center">
            <span class="text-h6 q-mr-xs">Cantidad de maletas:</span>
            <span class="text-h6 q-mr-xs">{{invoiceToCheck.luggages.length}}</span>
          </div>
          <div>
            <span class="text-h6 q-mr-xs">Precio</span>
            {{ invoiceToCheck.total_price}}€
          </div>
          <q-btn class="q-mb-md" @click="checkValidation()" color="primary">Validar</q-btn>
          <q-btn @click="removeReservation(invoiceToCheck.invoice_id)" color="negative">Cancelar</q-btn>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import moment from "../../../node_modules/moment";

export default {
  name: "ValidateInvoice",
  data() {
    return {
      idInvoice: "",
      invoiceToCheck: null
    };
  },
  created() {
    this.$classes.Utils.verifyTokenSignature(
      localStorage.getItem("token"),
      JSON.parse(localStorage.getItem("user"))
    );
  },
  methods: {
    loadInvoice() {
      this.$axios
        .get("http://localhost:8081/invoice/id/" + this.idInvoice)
        .then(response => {
          console.log(response.data);
          let invoiceData = response.data;
          let invoice = new this.$classes.Invoice(
            invoiceData.invoice_id,
            invoiceData.end_date,
            invoiceData.start_date,
            invoiceData.total_price,
            invoiceData.user,
            invoiceData.luggages,
            invoiceData.verified
          );
          this.formatDay(invoice);
          this.invoiceToCheck = invoice;
        })
        .catch(error => {
          console.log(error);
        });
    },
    checkValidation() {
      this.$axios
        .put("http://localhost:8081/invoice/validate/", this.invoiceToCheck)
        .then(response => {
          this.invoiceToCheck = null;
          this.idInvoice = "";
          this.$q.notify({
            message: "Se ha guadado correctamente la factura",
            color: "primary",
            icon: "check",
            position: "center",
            timeout: 3000
          });
        })
        .catch(error => {
          this.$q.notify({
            message: "Ha ocurrido un error al intentar eliminar la factura",
            color: "red-10",
            icon: "error",
            position: "center",
            timeout: 3000
          });
        });
    },
    removeReservation(id) {
      this.$axios
        .delete("http://localhost:8081/invoice/" + id)
        .then(response => {
          this.invoiceToCheck = null;
          this.idInvoice = "";

          this.$q.notify({
            message: "Se ha eliminado correctamente la reserva",
            color: "primary",
            icon: "check",
            position: "center",
            timeout: 3000
          });
        })
        .catch(error => {
          this.$q.notify({
            message: "Ha ocurrido un error al intentar eliminar la reserva",
            color: "red-10",
            icon: "error",
            position: "center",
            timeout: 3000
          });
        });
    },
    formatDay(invoice) {
      console.log(invoice);
      let start = moment(invoice.start_date);
      invoice.start_date = start.format("DD-MM-YYYY");
      let end = moment(invoice.end_date);
      invoice.end_date = end.format("DD-MM-YYYY");
    }
  }
};
</script>
