<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <h1>Nodes</h1>
        <div>{{ getNodes.length }} nodes available</div>

        <v-data-table :items="getNodes" :headers="nodeHeaders">
          <template #no-results>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-col class="text-center" cols="12">
                <v-icon size="64">mdi-server</v-icon>
                <p class="text-subtitle-1 mt-2">No nodes found.</p>
              </v-col>
            </v-row>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn variant="outlined" @click="describeNode(item.name)">Describe</v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>

  <informational-dialog v-model="showDescribeDialog" :title="`Describe: ${nameOfSelectedNode}`">
    <template #body>
      <pre class="text-subtitle-1 mt-2 text-green">{{ describeData }}</pre>
    </template>
  </informational-dialog>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useResourceStore } from '@/stores/ResourceStore'
import { storeToRefs } from 'pinia'

//components
import InformationalDialog from '@/components/InformationalDialog.vue'

const resourceStore = useResourceStore()
const { getNodes } = storeToRefs(resourceStore)
const { describeResource } = resourceStore
const describeData = ref('')
const nameOfSelectedNode = ref('')
const showDescribeDialog = ref(false)

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
  { title: '', value: 'actions' },
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

const describeNode = async (nodeName) => {
  //console.log(`Describing node: ${nodeName}`)
  nameOfSelectedNode.value = nodeName
  showDescribeDialog.value = true
  describeData.value = await describeResource('node', nodeName)
  //console.log(describeData)
}
</script>
