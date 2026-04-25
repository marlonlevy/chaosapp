<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h1>Nodes</h1>
        <div>{{ getNodes.length }} nodes available</div>

        <v-data-table :items="getNodes" :headers="nodeHeaders"> </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useResourceStore } from '@/stores/ResourceStore'
import { storeToRefs } from 'pinia'

const resourceStore = useResourceStore()
const { getNodes } = storeToRefs(resourceStore)
let intervalId = null

const nodeHeaders = [
  { title: 'Name', value: 'name' },
  { title: 'Status', value: 'status' },
  { title: 'Roles', value: 'roles' },
  { title: 'Age', value: 'age' },
  { title: 'Version', value: 'version' },
  { title: 'Version', value: 'version' },
  { title: 'Internal-IP', value: 'internal_ip' },
  { title: 'External-IP', value: 'external_ip' },
  { title: 'OS-Image', value: 'os_image' },
  { title: 'Kernel-Version', value: 'kernel_version' },
  { title: 'Container-Runtime', value: 'container_runtime' },
]

onMounted(async () => {
  intervalId = setInterval(async () => {
    await resourceStore.fetchNodes()
  }, 30000)
  await resourceStore.fetchNodes()
  console.log('Home component mounted')
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
    console.log('Home component unmounted, interval cleared')
  }
})
</script>
