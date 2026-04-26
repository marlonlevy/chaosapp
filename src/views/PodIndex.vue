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
            <v-btn @click="describePod(item.name)"> Describe </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    {{ getPods.length }} pods available
  </v-container>
  <v-dialog v-model="showLogsDialog" max-width="800px" max-height="600px" persistent scrollable>
    <v-card>
      <v-card-title>Logs for : {{ nameOfSlectedPod }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row compact class="fill-height ma-0">
          <v-col cols="12">
            <pre class="text-subtitle-1 mt-2 text-green">{{ podLogs.logs }}</pre>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn @click="() => (showLogsDialog = false)">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog persistent v-model="showDescribeDialog" max-width="800px" max-height="600px" scrollable>
    <v-card>
      <v-card-title>Describe : {{ nameOfSlectedPod }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-row compact class="fill-height ma-0">
          <v-col cols="12">
            <pre class="text-subtitle-1 mt-2 text-green">{{ describeData }}</pre>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn @click="() => (showDescribeDialog = false)">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useResourceStore } from '@/stores/ResourceStore'
import { storeToRefs } from 'pinia'

const showLogsDialog = ref(false)
const showDescribeDialog = ref(false)
const podLogs = ref('')
const describeData = ref('')
const nameOfSlectedPod = ref('')
const resourceStore = useResourceStore()
const { getPods } = storeToRefs(resourceStore)
const { describeResource } = resourceStore

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
  showLogsDialog.value = true
  console.log(`Fetching logs for pod: ${podName}`)
  nameOfSlectedPod.value = podName
  podLogs.value = await resourceStore.fetchPodLogs(podName)
  //console.log(podLogs.value)
}

const describePod = async (podName) => {
  // Placeholder for describing a pod
  showDescribeDialog.value = true
  nameOfSlectedPod.value = podName
  console.log(`Describing pod: ${podName}`)
  describeData.value = await describeResource('pod', podName)
  //console.log(describeData.value)
}

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>
