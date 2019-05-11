<template>

  <div id="scrollAreaDiv" class="col-6">
        <q-scroll-area style="height: 300px; max-width: 700px;">
          <div v-for="number in 4" :key="number" class="q-py-xs q-pa-md">
            Lorem ipsum dolor sit amet, consectetur adipisicing
            elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </div>

        </q-scroll-area>

        <div class="flex row items-center q-mt-xs">
          <q-input class="q-ma-xs col-10" rounded outlined v-model="model" label="Mensaje" />
          <q-btn class="" round color="primary" icon="send" />
        </div>
        
    </div>

</template>

<script>
export default {
  name: 'Comments',
  data () {
    return {
        model: '',
    }
  }
}
</script>

<style>
</style>
