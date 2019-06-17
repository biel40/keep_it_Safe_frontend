<template>
  <q-page padding class="items-start justify-center">
    <div class="row flex column items-start">
      <q-btn v-model="visible" label="Filtrar" color="primary" class="q-mb-md" @click="setVisible"/>
      <q-slide-transition class="q-my-md">
        <q-card v-show="visible" id="card-filter">
          <q-card-section>
            <div class="row no-wrap justify-between">
              <p class="font-search q-mr-md">Email</p>
              <q-input outlined dense class="input-search"></q-input>
            </div>
            <div class="row no-wrap justify-between">
              <p class="font-search q-mr-md">Id factura</p>
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
      <q-card-section>
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-subtitle2">by John Doe</div>
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-h6">Our Changing Planet</div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  // name: 'PageName',
  data() {
    return {
      visible: false,
      date: ""
    };
  },
  methods: {
    setVisible() {
      this.visible = !this.visible;
    }
  }, 
  created(){
    this.$classes.Utils.verifyTokenSignature(
        localStorage.getItem("token"),
        JSON.parse(localStorage.getItem("user"))
    );

    this.$axios
        .get("http://localhost:8081/invoices")
        .then(response => {
          let invoices = response.data;
          console.log(invoices);
          console.log();
        })
        .catch(error => {
          // Con clear() quitamos todos los elementos del Local Storage
          console.log("get invoices error: " + error)
        });

         this.$axios
        .get("http://localhost:8081/invoices/current")
        .then(response => {
          let invoices = response.data;
          console.log("current",invoices);
          console.log();
        })
        .catch(error => {
          // Con clear() quitamos todos los elementos del Local Storage
          console.log("get invoices error: " + error)
        });
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
