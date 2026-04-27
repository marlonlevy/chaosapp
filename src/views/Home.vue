<template>
  <v-container fluid>
    <h1>Dashboard</h1>

    <v-row>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Nodes</v-card-title>
          <v-card-text>{{ getNodes.length }}</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Pods</v-card-title>
          <v-card-text>{{ getPods.length }}</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Deployments</v-card-title>
          <v-card-text>{{ getDeployments.length }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Services</v-card-title>
          <v-card-text>{{ getServices.length }}</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>PVC</v-card-title>
          <v-card-text>{{ getPersistentVolumeClaims.length }}</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>PV</v-card-title>
          <v-card-text>{{ getPersistentVolumes.length }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { onMounted } from 'vue'
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
