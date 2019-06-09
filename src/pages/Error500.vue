<template>
  <div class="fixed-center text-center">
    <p>
      <img
        src="~assets/500.jpg"
        style="width:30vw;max-width:150px;"
      >
    </p>
    <p class="text-faded">El servidor no responde. <strong>(500)</strong></p>
    <!-- Aquí se puede poner la imagen del meme -->
    <q-btn
      color="secondary"
      style="width:200px;"
      @click="$router.push('/')"
    >Volver atrás</q-btn>
  </div>
</template>

<script>

export default {
  name: 'Error500'
}

</script>
