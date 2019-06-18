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
        <q-list separator>
          <q-item v-for="invoice in invoices" :key="invoice.invoice_id" class="flex-row items-center justify-around">

            <div class="flex column items-center">
              <span style="font-weight: bold;"> Identificador de reserva </span>
              <span> {{invoice.invoice_id}} </span>
            </div>
              
            <div>
              <q-icon size="40px" name="calendar_today" />
            </div>

            <div class="flex column items-center">
              <span style="font-weight: bold;"> Fechas de reserva </span>
              <div>
                {{invoice.start_date}}
              </div>

              <span style="font-weight: bold;"> hasta  </span>

              <div>
                {{invoice.end_date}}
              </div>
              
            </div>

            <div class="flex column items-center">
              <span style="font-weight: bold;"> Maletas </span>
              <div class="justify-between">
                <div v-for="luggageType in luggageTypes" :key="luggageType.luggage_id"> 
                  {{ luggageType | filtroCantidad(invoice.luggages) }}
                  x
                  {{ luggageType.getFullName() }} 
                </div>
              </div>
            </div>

            <div>
              <q-icon name="perm_identity" size="60px" />
            </div>

            <div class="flex column items-center">
              <span style="font-weight: bold;"> E-mail </span> 
              <span> {{invoice.user.email}} </span>
            </div>

            <div>
              <q-icon size="40px" name="euro_symbol" />
            </div>
            <div>
              <b>Precio:</b> {{invoice.total_price | addDigit() }} €
            </div>

            <div>
              <q-btn color="primary" label="Edita!" icon="edit"  />
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

    
    this.$axios
    .get('http://localhost:8081/luggages')
    .then(response => {

        response.data.forEach(luggageTypeInArray => {

          let luggageTypeReactive = new this.$classes.Luggage(luggageTypeInArray.luggage_type);

          this.luggageTypes.push(luggageTypeReactive);
        });

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
            
            moment.locale('es');
            invoice.start_date = moment(invoice.start_date.substring(0, 10)).format("dddd DD/MM/YYYY");
            invoice.end_date = moment(invoice.end_date.substring(0, 10)).format("dddd DD/MM/YYYY");

            this.invoices.push(invoice);

          });

        })
        .catch(error => {
          console.log("Get Invoices error: " + error)
        });
    } 
    
  },
  filters:{
    filtroCantidad(luggageType, luggagesInInvoice)  {
      

      console.log("FILTRO LUGGAGES, current luggage type --->", luggageType);
      console.log("Luggages in current Invoice --> " , luggagesInInvoice);

      // Pasarle atributo por atributo?
      let luggageTypeString = luggageType.luggage_type;

      let arrayFiltrado = luggagesInInvoice.filter(luggageInInvoice => {
        return luggageInInvoice.luggage_type == luggageTypeString;
      });
      
      console.log("Cantidad -->", arrayFiltrado.length);

      return arrayFiltrado.length;

    },
    addDigit(precio) {
      return precio.toFixed(2);
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
