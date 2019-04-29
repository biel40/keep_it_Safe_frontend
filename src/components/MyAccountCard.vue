<template>
<div>
	<q-card  style="width: 400px; max-width:90vw;">
		<div class="flex justify-end q-pa-xs">
			<q-btn size="10px" icon="close" flat round dense v-close-popup />   
		</div>
		<q-card-section class="row flex items-center justify-center q-mb-md">
			<div class="col-10 flex column">
				<div class="text-h4 text-center q-mb-md">Mi cuenta</div>
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
			</div>
		</q-card-section>
		<q-card-section class="flex column">
				<q-btn color="primary q-mb-md" @click="changePassword=true">cambiar datos usuario</q-btn>
				<q-btn color="primary" @click="changeProfile=true">cambiar contraseña</q-btn>
		</q-card-section>
	</q-card>

    <!-- Dialog of changePassword -->

	<q-dialog v-model="changePassword" transition-show="slide-down">
		<q-card  style="width: 350px; max-width:90vw;">
			<div class="flex justify-end q-pa-xs">
				<q-btn size="10px" icon="close" flat round dense v-close-popup />   
			</div>
			<q-card-section class="row flex items-center justify-center q-mb-md">
				<div class="col-10 flex column">
					<div class="text-bold mi-account-label">Contraseña actual</div>
					<q-input type="password" outlined v-model="oldPassword" dense/>
					<div class="text-bold mi-account-label">Nueva contraseña</div>
					<q-input type="password" outlined v-model="newPassword" dense/>
					<div class="text-bold mi-account-label">Repite contraseña</div>
					<q-input type="password" outlined v-model="repeatNewPassword" dense/>
				</div>
			</q-card-section>
			<q-card-section class="flex column">
				<q-btn color="primary q-mb-md" @click="savePassword()">Guardar datos</q-btn>
			</q-card-section>
		</q-card>
	</q-dialog>

    <!-- Dialog of changeProfile -->

	<q-dialog v-model="changeProfile" transition-show="slide-down">
		<q-card  style="width: 350px; max-width:90vw;">
			<div class="flex justify-end q-pa-xs">
				<q-btn size="10px" icon="close" flat round dense v-close-popup />   
			</div>
			<q-card-section class="row flex items-center justify-center q-mb-md">
				<div class="col-10 flex column">
					<div class="text-bold mi-account-label">Nombre</div>
					<q-input type="text" outlined v-model="newName" dense/>
					<div class="text-bold mi-account-label">Primer apellido</div>
					<q-input type="text" outlined v-model="newSurname" dense/>
					<div class="text-bold mi-account-label">Segundo apellido</div>
					<q-input type="text" outlined v-model="newSecondSurname" dense/>
					<div class="text-bold mi-account-label">Correo electrónico</div>
					<q-input type="email" outlined v-model="newEmail" dense/>
				</div>
			</q-card-section>
			<q-card-section class="flex column">
				<q-btn color="primary q-mb-md" @click="saveProfile()">Guardar datos</q-btn>
			</q-card-section>
		</q-card>
	</q-dialog>
</div>
</template>

<script>
export default {
    name: 'MyAccountDialog',
    data() {
			return {
				changePassword: false,
				changeProfile: false,
				oldPassword: '',
				newPassword: '',
				repeatNewPassword : '',
				newName: '',
				newSurname: '',
				newSecondSurname: '',
				newEmail: '',
			}
    },
    methods:{
			savePassword() {
				alert("this is a example mola ehh")
			},
			saveProfile() {
				alert("this is a example mola ehh x2")
			}
    },
    props:['user']
}
</script>

<style>
</style>
