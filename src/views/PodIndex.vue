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
          <template #item.actions="{ item }">
            <v-btn @click="fetchPodLogs(item.name)"> Logs </v-btn>
            <v-btn @click="() => console.log('View details for', item.name)"> Describe </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    {{ getPods.length }} pods available
  </v-container>
  <v-dialog v-model="showLogsDiaog" max-width="600px" max-height="600px" persistent scrollable>
    <v-card>
      <v-card-title>Logs for : {{ nameOfSlectedPod }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row compact class="fill-height ma-0">
          <v-col cols="12">
            <p class="text-subtitle-1 mt-2">{{ podLogs.logs }}</p>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn @click="() => (showLogsDiaog = false)">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useResourceStore } from '@/stores/ResourceStore'
import { storeToRefs } from 'pinia'

const showLogsDiaog = ref(false)
const podLogs = ref('')
const nameOfSlectedPod = ref('')
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
  { title: '', value: 'actions' },
]
let intervalId = null

onMounted(async () => {
  intervalId = setInterval(async () => {
    await resourceStore.fetchPods()
  }, 30000)
  await resourceStore.fetchPods()
  console.log('Pods component mounted')
})

const fetchPodLogs = async (podName) => {
  // Placeholder for fetching pod logs
  showLogsDiaog.value = true
  console.log(`Fetching logs for pod: ${podName}`)
  nameOfSlectedPod.value = podName
  podLogs.value = await resourceStore.fetchPodLogs(podName)
  //console.log(podLogs.value)
}

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>
