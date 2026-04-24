<template>
  <v-container fluid>
    <h1>Pods</h1>
    <v-row>
      <v-col cols="12">
        <v-data-table :items="getPods" :headers="podHeaders" hide-default-footer>
          <template #no-results>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-col class="text-center" cols="12">
                <v-icon size="64">mdi-pod</v-icon>
                <p class="text-subtitle-1 mt-2">No pods found.</p>
              </v-col>
            </v-row>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    {{ getPods.length }} pods available
    {{ getPods }}
  </v-container>
</template>
<script setup>
import { onMounted, onUnmounted } from 'vue'
import { useResourceStore } from '@/stores/ResourceStore'
import { storeToRefs } from 'pinia'

const resourceStore = useResourceStore()
const { getPods } = storeToRefs(resourceStore)
const podHeaders = [
  { title: 'Name', value: 'name' },
  { title: 'Status', value: 'status' },
  { title: 'Restarts', value: 'restarts' },
  { title: 'Age', value: 'age' },
  { title: 'Pod IP', value: 'pod_ip' },
  { title: 'Node', value: 'node' },
  { title: 'Namespace', value: 'namespace' },
]
let intervalId = null

onMounted(async () => {
  intervalId = setInterval(async () => {
    await resourceStore.fetchPods()
  }, 30000)
  await resourceStore.fetchPods()
  console.log('Pods component mounted')
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>
