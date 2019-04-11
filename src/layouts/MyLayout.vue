<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title class="flex row items-center">
          <q-avatar square size="80px" class="q-my-md" >
            <img src="~assets/icono.png" alt="icon keep it safe">
          </q-avatar>
          <div class="text-h4">
            Keep it Safe  
          </div>                   
        </q-toolbar-title>
      </q-toolbar>

      <q-tabs align="left" class="text-teal">
        <q-route-tab to="/page1" label="Page One" />
        <q-route-tab to="/page2" label="Page Two" />
        <q-route-tab to="/page3" label="Page Three" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>