<template>
  <q-page padding class="items-start justify-center">
    <div class="row flex column items-start">
      <q-btn v-model="visible" label="Filtrar" color="primary" class="q-mb-md" @click="setVisible"/>
      <q-slide-transition class="q-my-md">
        <q-card v-show="visible" id="card-filter">
          <q-card-section>
            <div class="row no-wrap justify-between">
              <p class="font-search q-mr-md"> Email </p>
              <q-input outlined dense class="input-search"></q-input>
            </div>
            <div class="row no-wrap justify-between">
              <p class="font-search q-mr-md"> Identificador de factura </p>
              <q-input outlined dense class="input-search"></q-input>
            </div>
            <div class="row no-wrap justify-between">
              <p class="font-search q-mr-md">Fecha</p>
              <q-input outlined v-model="date" dense class="input-search">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="date">
                      <q-date
                        v-model="date"
                        mask="DD-MM-YYYY"
                        minimal
                        today-btn
                        @input="() => $refs.date.hide()"
                      />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </q-card-section>
        </q-card>
      </q-slide-transition>
    </div>
    <q-card>
      <q-card-section class="scroll">
        <q-list>
          <q-item v-for="invoice in invoices" :key="invoice.invoice_id" clickable v-ripple>
            Identificador: {{invoice.invoice_id}}
            <q-btn class="q-pa-md" icon="event" />
            <div class="column">
              {{invoice.start_date}} hasta {{invoice.end_date}}
            </div>
            {{invoice.luggages | filtro}}
            {{}}
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import moment from 'moment';

export default {
  // name: 'PageName',
  data() {
    return {
      visible: false,
      date: "",
      invoices: []
    };
  },
  methods: {
    setVisible() {
      this.visible = !this.visible;
    }
  }, 
  created() {
    this.$classes.Utils.verifyTokenSignature(
        localStorage.getItem("token"),
        JSON.parse(localStorage.getItem("user"))
    );

    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.rol_user == "EMPLOYEE") {
      this.$axios
        .get("http://localhost:8081/invoices/current")
        .then(response => {

          let invoices = response.data;

          invoices.forEach(invoice => {

            moment.locale('es');

            invoice.start_date = moment(invoice.start_date.substring(0, 10)).format("dddd DD/MM/YYYY");
            invoice.end_date = moment(invoice.end_date.substring(0, 10)).format("dddd DD/MM/YYYY");
              

            this.invoices.push(invoice);
          });

        })
        .catch(error => {
          console.log("get invoices error: " + error)
        });
    } else if (user && user.rol_user == "ADMIN") {
        this.$axios
        .get("http://localhost:8081/invoices")
        .then(response => {

          let invoices = response.data;

          invoices.forEach(invoice => {
            this.invoices.push(invoice);
          });

        })
        .catch(error => {
          console.log("Get Invoices error: " + error)
        });
    } 
    
  },
  filters:{
    filtro(luggages) {
      // Cuando haces return en el filtro es lo que se pintará en la vista.
      // En el created, guardar en una variable reactiva los tres tipos de maletas, que se pillan del Servidor.
      // Hay un ejemplo en admin/edit/price y en /prices.
      
    }
  }
};
</script>

<style>
.font-search {
  font-size: 2em;
}
#card-filter{
  width: 400px;
}

.input-search{
  width: 200px;
}
</style>
