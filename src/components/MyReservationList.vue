<template>
  <q-card style="width: 900px; max-width:90vw;">
    <q-card-sectio></q-card-sectio>
  </q-card>
</template>

<script>
export default {
  // name: 'ComponentName',
  data () {
    return {
      reservations: [{
        id:2442342,
        startDay: "10/10/2019 18:30h",
        endDay: "11/10/2019 18:30h",
        sizes:[0, 1],
        Price: 20.50
      },{
        id:2442343,
        startDay: "10/10/2019 18:30h",
        endDay: "11/10/2019 18:30h",
        sizes:[0, 1],
        Price: 20.50
      },{
        id:2442345,
        startDay: "10/10/2019 18:30h",
        endDay: "11/10/2019 18:30h",
        sizes:[0, 1],
        Price: 20.50
      },]
    }
  },
  props:['user']
}
</script>

<style>
</style>
