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
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn variant="outlined" @click="fetchPodLogs(item.name)"> Logs </v-btn>
            <v-btn variant="outlined" @click="describePod(item.name)"> Describe </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    {{ getPods.length }} pods available
  </v-container>

  <informational-dialog v-model="showDialog" :title="dialogTitle">
    <template #body>
      <pre class="text-subtitle-1 mt-2 text-green">{{ dialogData }}</pre>
    </template>
  </informational-dialog>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useResourceStore } from '@/stores/ResourceStore'
import { storeToRefs } from 'pinia'

//components
import InformationalDialog from '@/components/InformationalDialog.vue'

const showDialog = ref(false)
const dialogData = ref('')
const dialogTitle = ref('')
const nameOfSelectedPod = ref('')
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
  dialogTitle.value = `Logs: ${podName}`
  showDialog.value = true
  console.log(`Fetching logs for pod: ${podName}`)
  nameOfSelectedPod.value = podName
  dialogData.value = await resourceStore.fetchPodLogs(podName)
  //console.log(podLogs.value)
}

const describePod = async (podName) => {
  // Placeholder for describing a pod
  dialogTitle.value = `Describe: ${podName}`
  showDialog.value = true
  nameOfSelectedPod.value = podName
  console.log(`Describing pod: ${podName}`)
  dialogData.value = await describeResource('pod', podName)
  //console.log(describeData.value)
}

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>
