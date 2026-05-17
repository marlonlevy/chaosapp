<template>
  <v-container fluid>
    <h1 class="my-0">Dashboard</h1>
    <v-row comfortable>
      <v-col cols="12" md="4" v-for="(item, index) in dashboardData" :key="index">
        <DashboardCard :item="item" />
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useResourceStore } from '@/stores/ResourceStore'
import { storeToRefs } from 'pinia'

import DashboardCard from '@/components/ui/DashboardCard.vue'

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
  { title: 'Nodes', value: getNodes, path: '/nodes', icon: 'mdi-server' },
  { title: 'Pods', value: getPods, path: '/pods', icon: 'mdi-cube-outline' },
  { title: 'Deployments', value: getDeployments, path: '/deployments', icon: 'mdi-application' },
  { title: 'Services', value: getServices, path: '/services', icon: 'mdi-cog' },
  {
    title: 'Persistent Volume Claims',
    value: getPersistentVolumeClaims,
    path: '/persistentvolumeclaims',
    icon: 'mdi-database',
  },
  {
    title: 'Persistent Volumes',
    value: getPersistentVolumes,
    path: '/persistentvolumes',
    icon: 'mdi-server-network',
  },
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
