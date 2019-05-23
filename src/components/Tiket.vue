<template>
  <q-card style="height: 80vh; width: 500px; max-width: 80vw">
    <p class="text-h2">Factura simplificada</p>
    
    {{lugagges}}   
  </q-card>
</template>

<script>
export default {
  name: 'Tiket',
  data () {
    return {
      data:""
    }
  },
  props: ['lugagges', 'date']
}
</script>

<style>
</style>
