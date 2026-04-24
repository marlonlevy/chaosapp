<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" temporary>
      <!--  -->
      <v-list>
        <v-list-item link :to="{ name: 'Home' }">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link :to="{ name: 'Pods' }">
          <v-list-item-icon>
            <v-icon>mdi-pod</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>Pods</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <!-- Add more navigation items here -->
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
