<template>
    <q-card style="height: 70vh; width: 350px; max-width: 80vw;" ref="card"  class="background-color-app-light flex column no-wrap justify-between  "> 
      <q-item>
        <q-scroll-area   ref="scrollAreaComments" style="height: 55vh; width: 350px; max-width: 80vw;" :thumb-style="scrollStyle">
          <div v-for="number in 10" :key="number" class="q-py-xs q-pa-md">
            Lorem ipsum dolor sit amet, consectetur adipisicing
            elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </div>
        </q-scroll-area>
      </q-item>
      

      <div class="flex row items-center q-mt-md">
        <q-input class="q-ma-md col-9" rounded outlined v-model="model" label="Mensaje" />
        <q-btn class="" round color="primary" icon="send" />
      </div>
    </q-card>
</template>

<script>
export default {
  name: 'ClientComments',
  data () {
    return {
        model: '',
    }
  },
  computed:{
    scrollStyle () {
      return {
        borderRadius: '5px',
        backgroundColor: '#43a047',
        width: '5px',
        opacity: 0.75
      }
    }
  },
  mounted(){
    // TODO get height and change the 1000 number
    this.$refs.scrollAreaComments.setScrollPosition (1000, 0) ;
  }
}
</script>

<style>
</style>
