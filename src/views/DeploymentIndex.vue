<template>
  <v-container fluid>
    <h1>Deployments</h1>
    <v-row>
      <v-col cols="12">
        <v-data-table :items="getDeployments" :headers="deploymentHeaders" hide-default-footer>
          <template #no-results>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-col class="text-center" cols="12">
                <v-icon size="64">mdi-application</v-icon>
                <p class="text-subtitle-1 mt-2">No deployments found.</p>
              </v-col>
            </v-row>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <!-- Placeholder for future actions like scaling or deleting deployments -->
            <v-btn variant="outlined" @click="describeDeployment(item.name)"> Describe </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <span class="text-caption">{{ getDeployments.length }} deployments available</span>
  </v-container>
  <informational-dialog
    v-model="showDescribeDialog"
    :title="`Describe: ${nameOfSelectedDeployment}`"
    :show-title="false"
  >
    <template #body>
      <DeploymentDescribeCard :deployment="describeData" />
    </template>
  </informational-dialog>
</template>
<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useResourceStore } from '@/stores/ResourceStore'
import { storeToRefs } from 'pinia'

//components
import InformationalDialog from '@/components/InformationalDialog.vue'
import DeploymentDescribeCard from '@/components/deployment/DeploymentDescribeCard.vue'

const resourceStore = useResourceStore()
const { getDeployments } = storeToRefs(resourceStore)
const showDescribeDialog = ref(false)
const nameOfSelectedDeployment = ref('')
const describeData = ref('')

let intervalId = null
const deploymentHeaders = [
  { title: 'Name', value: 'name' },
  { title: 'Reade', value: 'ready' },
  { title: 'Available', value: 'available' },
  { title: 'Age', value: 'age' },
  { title: '', value: 'actions' },
]

onMounted(async () => {
  console.log('DeploymentIndex component mounted')
  // You can set up any necessary data fetching or intervals here
  intervalId = setInterval(async () => {
    await resourceStore.fetchDeployments()
  }, 30000) // Fetch deployments every 30 seconds
  resourceStore.fetchDeployments() // Initial fetch on mount
})

onUnmounted(() => {
  console.log('DeploymentIndex component unmounted')
  if (intervalId) {
    clearInterval(intervalId)
  }
  // Clean up any intervals or resources here
})

const describeDeployment = async (deploymentName) => {
  console.log(`Describing deployment: ${deploymentName}`)
  nameOfSelectedDeployment.value = deploymentName

  describeData.value = await resourceStore.describeResource('deployment', deploymentName)
  showDescribeDialog.value = true

  // Placeholder for fetching and displaying deployment details
}
</script>
