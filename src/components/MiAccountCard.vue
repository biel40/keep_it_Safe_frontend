<template>
<div style="width: 400px; max-width:90vw;">
    <q-card class="bg-grey-4">
        <div class="row flex items-center justify-center q-mp-md">
            <q-card-section class="col-10 flex column">
                <div class="text-h4 text-center">Mi cuenta</div>
                <div class="text-bold mi-account-label">Nombre</div>
                <span class="mi-account-value text-weight-light">Esto será una variable reactiva</span>
                <div class="text-bold mi-account-label">Primer apellido</div>
                <span class="mi-account-value text-weight-light">Esto será una variable reactiva</span>
                <div class="text-bold mi-account-label">Segundo apellido</div>
                <span class="mi-account-value text-weight-light">Esto será una variable reactiva</span>
                <div class="text-bold mi-account-label">DNI/NIE</div>
                <span class="mi-account-value text-weight-light">Esto será una variable reactiva</span>
                <div class="text-bold mi-account-label">Correo electronico</div>
            <span class="mi-account-value text-weight-light">Esto será una variable reactiva</span>
        </q-card-section>
        </div>
        <q-card-section class="flex column">
            <q-btn color="primary q-mb-md">cambiar datos usuario</q-btn>
            <q-btn color="primary">cambiar contraseña</q-btn>
        </q-card-section>
    </q-card>
</div>
</template>

<script>
export default {
    name: 'MiAccountDialog',
    data() {
        return {}
    },
    props:['user']
}
</script>

<style>
</style>
