<template>
  <v-container fluid class="mt-0 pt-0">
    <h1>Services</h1>
    <v-row comfortable>
      <v-col>
        <v-data-table :items="getServices" :headers="serviceHeaders">
          <template #no-results>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-col class="text-center" cols="12">
                <v-icon size="64">mdi-cog</v-icon>
                <p class="text-subtitle-1 mt-2">No services found.</p>
              </v-col>
            </v-row>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn variant="outlined" @click="describeService(item.name, item.namespace)"
              >Describe</v-btn
            >
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
  <span class="ma-2 text-caption">{{ getServices.length }} Services found.</span>
  <informational-dialog v-model="showDescribeDialog" :title="`Describe: ${nameOfSelectedService}`">
    <template #body>
      <pre class="text-subtitle-1 mt-2 text-green">{{ describeData }}</pre>
    </template>
  </informational-dialog>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useResourceStore } from '@/stores/ResourceStore'
import { storeToRefs } from 'pinia'

//components
import InformationalDialog from '@/components/InformationalDialog.vue'

const resourceStore = useResourceStore()
const { getServices } = storeToRefs(resourceStore)
const describeData = ref('')
const nameOfSelectedService = ref('')
const showDescribeDialog = ref(false)

const serviceHeaders = [
  { title: 'Name', value: 'name' },
  { title: 'Age', value: 'age' },
  { title: 'Namespace', value: 'namespace' },
  { title: 'Type', value: 'type' },
  { title: 'Cluster IP', value: 'cluster_ip' },
  { title: 'External IPs', value: 'external_ips' },
  { title: 'Ports', value: 'ports' },
  { title: '', value: 'actions', sortable: false },
]

onMounted(async () => {
  try {
    await resourceStore.fetchServices()
  } catch (error) {
    console.error('Error fetching services:', error)
  }
})

const describeService = async (name, namespace) => {
  try {
    nameOfSelectedService.value = name
    showDescribeDialog.value = true
    describeData.value = await resourceStore.describeResource('service', name, namespace)
    //console.log(describeData.value)
  } catch (error) {
    console.error('Error describing service:', error)
  }
}
</script>
