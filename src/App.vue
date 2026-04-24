<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" temporary>
      <!--  -->
    </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>Homelab Kubernetes</v-app-bar-title>
    </v-app-bar>

    <v-main class="bg-grey-lighten-2">
      <!-- --  -->

      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(null)
</script>

<style scoped></style>
