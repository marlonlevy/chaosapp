<template>
  <h1>Persistent Volume Claims</h1>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-data-table :items="getPersistentVolumeClaims" :headers="pvcHeaders">
          <template #no-results>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-col class="text-center" cols="12">
                <v-icon size="64">mdi-database</v-icon>
                <p class="text-subtitle-1 mt-2">No Persistent Volume Claims found.</p>
              </v-col>
            </v-row>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn variant="outlined" @click="describePVC(item.name, item.namespace)"
              >Describe</v-btn
            >
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
  <span class="ma-2 text-caption"
    >{{ getPersistentVolumeClaims.length }} Persistent Volume Claims found.</span
  >
  <informational-dialog v-model="showDescribeDialog" :title="`Describe: ${nameOfSelectedPVC}`">
    <template #body>
      <p-v-c-describe-info-card :pvc-data="describeData" />
    </template>
  </informational-dialog>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useResourceStore } from '@/stores/ResourceStore'
import { storeToRefs } from 'pinia'

import InformationalDialog from '@/components/InformationalDialog.vue'
import PVCDescribeInfoCard from '@/components/pvc/PVCDescribeInfoCard.vue'

const resourceStore = useResourceStore()
const { getPersistentVolumeClaims } = storeToRefs(resourceStore)
const describeData = ref('')
const nameOfSelectedPVC = ref('')
const showDescribeDialog = ref(false)

const pvcHeaders = [
  { title: 'Name', value: 'name' },
  { title: 'Age', value: 'age' },
  { title: 'Namespace', value: 'namespace' },
  { title: 'Status', value: 'status' },
  { title: 'Volume', value: 'volume' },
  { title: 'Capacity', value: 'capacity' },
  { title: 'Access Modes', value: 'access_modes' },
  { title: '', value: 'actions', sortable: false },
]

onMounted(async () => {
  try {
    await resourceStore.fetchPersistentVolumeClaims()
  } catch (error) {
    console.error('Error fetching Persistent Volume Claims:', error)
  }
})

const describePVC = async (name, namespace) => {
  try {
    describeData.value = await resourceStore.describeResource(
      'persistentvolumeclaims',
      name,
      namespace,
    )
    nameOfSelectedPVC.value = name

    showDescribeDialog.value = true
  } catch (error) {
    console.error('Error describing Persistent Volume Claim:', error)
  }
}
</script>
