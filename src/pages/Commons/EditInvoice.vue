<template>
  <q-page padding class="items-start justify-center">
    <div class="row flex column items-start">
      <q-btn v-model="visible" label="Filtrar" color="primary" class="q-mb-md" @click="setVisible"/>
      <q-slide-transition class="q-my-md">
        <q-card v-show="visible" id="card-filter">
          <q-card-section>
            <div class="row no-wrap justify-between">
              <p class="q-mr-md"> E-mail: </p>
              <q-input v-on:keyup="filterByEmail()" v-model="emailFilterModel" outlined dense class="input-search"></q-input>
            </div>
            <div class="row no-wrap justify-between">
              <p class="q-mt-md q-mr-md"> Identificador de factura: </p>
              <q-input v-on:keyup="filterByInvoiceId()" v-model="invoiceIdModel" outlined dense class="input-search"></q-input>
            </div>
            <div class="row no-wrap justify-between">
              <p class="q-mt-md q-mr-md"> Fecha Inicio: </p>
              <q-input v-on:keyup.enter="filterByStartDate()" v-on:change="filterByStartDate()" v-model="startDate" outlined dense class="input-search">
                
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="startDate">
                      <q-date
                        v-model="startDate"
                        mask="DD-MM-YYYY"
                        minimal
                        today-btn
                        @input="triggerStartDateFilter()"
                      />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>

            <div class="row no-wrap justify-between">
              <p class="q-mt-md q-mr-md"> Fecha Fin: </p>
              <q-input v-on:keyup.enter="filterByEndDate()" v-on:change="filterByEndDate()" v-model="endDate" outlined dense class="input-search">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="endDate">
                      <q-date
                        v-model="endDate"
                        mask="DD-MM-YYYY"
                        minimal
                        today-btn
                        @input="triggerEndDateFilter()"
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
          
          <q-item v-for="invoice in invoicesFiltered" :key="invoice.invoice_id" class="flex-row items-center justify-around">

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
                {{ invoice.start_date | filterFormat }}
              </div>

              <span style="font-weight: bold;"> hasta  </span>

              <div>
                {{ invoice.end_date | filterFormat }}
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
              <span style="font-weight: bold;"> E-mail del cliente </span> 
              <span> {{invoice.user.email}} </span>
            </div>

            <div>
              <q-icon size="40px" name="euro_symbol" />
            </div>
            <div>
              <b> Precio Total = </b> {{invoice.total_price | addDigit() }} €
            </div>

            <div>
              <q-btn @click="clickedEditButton(invoice)" color="primary" label="Edita!" icon="edit"  />
            </div>

          </q-item>
        </q-list>
      </q-card-section>
    </q-card>


    <q-dialog v-if="editReservationDialog" v-model="editReservationDialog" transition-show="slide-down">
      <q-card class="col-12" style=" width: 900px;">   
        <div class="flex justify-end q-pa-xs">
          <q-btn size="10px" icon="close" flat round dense v-close-popup />   
        </div>

        <InvoiceForm v-bind:InvoiceProps.sync="this.invoiceToEdit" class="q-pa-xl" />

      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>

import moment from 'moment';
import InvoiceForm from '../../components/InvoiceForm';

export default {

  data() {
    return {
      visible: false,
      startDate: '',
      endDate: '',
      invoices: [],
      invoicesFiltered: [],
      invoicesFilteredByEmail: [],
      invoicesFilteredByInvoiceId: [],
      invoicesFilteredByStartDate: [],
      invoicesFilteredByEndDate: [],
      luggageTypes: [],
      editReservationDialog: false,
      invoiceToEdit: null,
      emailFilterModel: '',
      invoiceIdModel: ''
    };
  },
  methods: {
    loadPage() {
        
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

            let invoiceClassObject = new this.$classes.Invoice(invoice.invoice_id, invoice.end_date, invoice.start_date, invoice.total_price, invoice.user, invoice.luggages, invoice.verified);

            this.invoices.push(invoiceClassObject);

          });

          this.invoicesFiltered = this.invoices;

        })
        .catch(error => {
          console.log(error)
        });
    } else if (user && user.rol_user == "ADMIN") {
        this.$axios
        .get("http://localhost:8081/invoices")
        .then(response => {

          let invoices = response.data;

          invoices.forEach(invoice => {

            let invoiceClassObject = new this.$classes.Invoice(invoice.invoice_id, invoice.end_date, invoice.start_date, invoice.total_price, invoice.user, invoice.luggages, invoice.verified);

            this.invoices.push(invoiceClassObject);

          });

          this.invoicesFiltered = this.invoices;

        })
        .catch(error => {
          console.log(error);
        });
    } 
    },
    clickedEditButton(invoice) {

      this.invoiceToEdit = invoice;
  
      this.editReservationDialog = true;

    },
    setVisible() {
      this.visible = !this.visible;
    },
    updateInvoice(invoice) {
      this.$axios.put('http://localhost:8081/invoices/edit', invoice)
      .then(function (response) {
        this.$q.notify({
          message: "Se ha actualizado la reserva correctamente.",
          color: "primary",
          icon: "check",
          position: "center",
          timeout: 3000
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    },
    filterByEmail() {

      this.invoicesFiltered = this.invoices.filter((invoice) => {
        return invoice.user.email.includes(this.emailFilterModel);
      })

      if(!this.invoicesFiltered) {
        this.invoicesFiltered = this.invoices;
      }
     
    },
    filterByInvoiceId() {

      this.invoicesFiltered = this.invoices.filter((invoice) => {
        let invoiceIdString = JSON.stringify(invoice.invoice_id);
        return invoiceIdString.includes(this.invoiceIdModel);
      })

      if(!this.invoicesFiltered) {
        this.invoicesFiltered = this.invoices;
      }

    }, 
    filterByStartDate() {
    
      let modelToMoment = moment(this.startDate, "DD-MM-yyyy");

      this.invoicesFiltered = this.invoices.filter((invoice) => {
        return moment(invoice.start_date).isSame(modelToMoment, 'day');
      })

      if(!this.invoicesFiltered || this.invoicesFiltered == "") {
        this.invoicesFiltered = this.invoices;
      }

    },filterByEndDate() {
    
      let modelToMoment = moment(this.endDate, "DD-MM-yyyy");

      this.invoicesFiltered = this.invoices.filter((invoice) => {
        return moment(invoice.end_date).isSame(modelToMoment, 'day');
      })

      if(!this.invoicesFiltered || this.invoicesFiltered == "") {
        this.invoicesFiltered = this.invoices;
      }

    },
    triggerStartDateFilter() {
      this.filterByStartDate();
      this.$refs.startDate.hide();
    },
    triggerEndDateFilter() {
      this.filterByEndDate();
      this.$refs.endDate.hide();
    }
  
  }, 
  created() {
    this.loadPage();
  },
  filters:{
    filtroCantidad(luggageType, luggagesInInvoice)  {
      
      let luggageTypeString = luggageType.luggage_type;

      let arrayFiltrado = luggagesInInvoice.filter(luggageInInvoice => {
        return luggageInInvoice.luggage_type == luggageTypeString;
      });

      return arrayFiltrado.length;

    },
    addDigit(precio) {
      return precio.toFixed(2);
    },
    filterFormat(dateToFilter) {
      moment.locale('es');
      return moment(dateToFilter.substring(0, 10)).format("dddd DD/MM/YYYY");
    }
  },
  components: {
    InvoiceForm
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
