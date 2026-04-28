<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" temporary>
      <!--  -->
      <v-card flat height="100px">
        <v-img :src="k8s_logo" contain height="100px" cover> </v-img>
      </v-card>
      <v-list>
        <v-list-item
          v-for="(navBarItem, idx) in navBarItems"
          :key="idx"
          link
          :to="{ path: navBarItem.route }"
        >
          <template v-slot:prepend>
            <v-icon>{{ navBarItem.icon }}</v-icon>
          </template>

          <v-list-item-title>{{ navBarItem.title }}</v-list-item-title>
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
import k8s_logo from '@/assets/img/kubernetes-blue-logo.png'

const drawer = ref(null)
const navBarItems = [
  { title: 'Home', icon: 'mdi-home', route: '/' },
  { title: 'Nodes', icon: 'mdi-server', route: '/nodes' },
  { title: 'Pods', icon: 'mdi-memory', route: '/pods' },
  { title: 'Deployments', icon: 'mdi-application', route: '/deployments' },
  { title: 'Services', icon: 'mdi-cog', route: '/services' },
  { title: 'PVC', icon: 'mdi-database', route: '/persistentvolumeclaims' },
  { title: 'Persistent Volumes', icon: 'mdi-database', route: '/persistentvolumes' },
]
</script>

<style scoped></style>
