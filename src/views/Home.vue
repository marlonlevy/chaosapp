<template>
  <v-container fluid>
    <h1>Dashboard</h1>

    <v-row comfortable>
      <v-col cols="12" md="4" v-for="(item, index) in dashboardData" :key="index">
        <v-card class="pa-2" outlined :to="item.path || '#'">
          <v-card-title>{{ item.title }}</v-card-title>
          <v-card-text>{{ item.value.length }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useResourceStore } from '@/stores/ResourceStore'
import { storeToRefs } from 'pinia'

const resourceStore = useResourceStore()
const {
  getNodes,
  getPods,
  getDeployments,
  getPersistentVolumeClaims,
  getPersistentVolumes,
  getServices,
} = storeToRefs(resourceStore)

const dashboardData = ref([
  { title: 'Nodes', value: getNodes, path: '/nodes' },
  { title: 'Pods', value: getPods, path: '/pods' },
  { title: 'Deployments', value: getDeployments, path: '/deployments' },
  { title: 'Services', value: getServices, path: '/services' },
  {
    title: 'Persistent Volume Claims',
    value: getPersistentVolumeClaims,
    path: '/persistentvolumeclaims',
  },
  { title: 'Persistent Volumes', value: getPersistentVolumes, path: '/persistentvolumes' },
])

onMounted(async () => {
  try {
    await Promise.all([
      resourceStore.fetchNodes(),
      resourceStore.fetchPods(),
      resourceStore.fetchDeployments(),
      resourceStore.fetchServices(),
      resourceStore.fetchPersistentVolumeClaims(),
      resourceStore.fetchPersistentVolumes(),
    ])
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})
</script>
