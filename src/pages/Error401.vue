<template>
  <div class="fixed-center text-center">
    <p>
      <img
        src="~assets/401.png"
        style="width:30vw;max-width:150px;"
      >
    </p>
    <p class="text-faded">Usuario no Autorizado para ver esta página! <strong>(401)</strong></p>
    <q-btn
      color="secondary"
      style="width:200px;"
      @click="$router.push('/')"
    >Volver atrás</q-btn>
  </div>
</template>

<script>

export default {
  name: 'Error401'
}

</script>
