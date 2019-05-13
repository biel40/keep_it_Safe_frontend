<template>
  <div style="height: 50vh; width: 350px; max-width: 80vw;">
    <q-card>
      <q-item>
        <q-scroll-area style="height: 50vh; width: 350px; max-width: 80vw;">
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
