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

            <div v-for="luggageType in luggageTypes" :key="luggageType.luggage_id">
              <br>
              {{ luggageTypes | filtroCantidad(luggageTypes, invoice.luggages) }}
              x
              {{luggageType.luggage_type}} 

            </div>

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
      invoices: [],
      luggageTypes: []
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

    this.luggageTypes = this.$axios
    .get('http://localhost:8081/luggages')
    .then(response => {
        this.luggageTypes = response.data;
        console.log("Luggage Types", this.luggageTypes);
    })
    .catch(error => {
      console.log(error)
    })
    

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
    filtroCantidad(luggagesArray, luggagesInInvoice) {

      console.log("FILTRO LUGGAGES --->", luggagesArray);
      console.log("Luggages in current Invoice --> " , luggagesInInvoice);

      let cantidad = 0;

      luggagesArray.forEach(luggage => {

        cantidad = 0;

        let luggageType = luggage.luggage_type;

        //FIXME: CREO QUE YA ESTÁ SOLUCIONADO
        luggagesInInvoice.forEach(luggageInInvoice => {
          // Si el tipo de la maleta que hay en la factura y el tipo de maleta concreto
          // que estamos revisando actualmente coinciden, entonces incrementamos la cantidad en una unidad.
          if (luggageInInvoice.luggage_type == luggageType) {
            cantidad++;
            console.log("Incrementando Cantidad");
          }

        });

       

      });
      
       console.log("Cantidad -->", cantidad);
      return cantidad;

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
