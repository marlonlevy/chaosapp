<template>
  <v-container fluid>
    <h1>Persistent Volumes</h1>
    <v-row comfortable>
      <v-col>
        <v-data-table :items="getPersistentVolumes" :headers="persistentVolumeHeaders">
          <template #no-results>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-col class="text-center" cols="12">
                <v-icon size="64">mdi-database</v-icon>
                <p class="text-subtitle-1 mt-2">No persistent volumes found.</p>
              </v-col>
            </v-row>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn variant="outlined" @click="describePersistentVolume(item.name)">Describe</v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <span class="ma-2 text-caption"
      >{{ getPersistentVolumes.length }} Persistent Volumes found.</span
    >
  </v-container>
  <informational-dialog v-model="showDescribeDialog" :title="`Describe: ${nameOfSelectedPV}`">
    <template #body>
      <pre class="text-subtitle-1 mt-2 text-green">{{ describeData }}</pre>
    </template>
  </informational-dialog>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useResourceStore } from '@/stores/ResourceStore'
import { storeToRefs } from 'pinia'

import InformationalDialog from '@/components/InformationalDialog.vue'

const resourceStore = useResourceStore()
const { getPersistentVolumes } = storeToRefs(resourceStore)

const describeData = ref('')
const nameOfSelectedPV = ref('')
const showDescribeDialog = ref(false)

const persistentVolumeHeaders = [
  { title: 'Name', value: 'name' },
  { title: 'Status', value: 'status' },
  { title: 'Capacity', value: 'capacity' },
  { title: 'Access Modes', value: 'access_modes' },
  { title: 'Reclaim Policy', value: 'reclaim_policy' },
  { title: 'Storage Class', value: 'storage_class' },
  { title: 'Claim', value: 'claim' },
  { title: 'Age', value: 'age' },
  { title: '', value: 'actions' },
]

onMounted(async () => {
  try {
    await resourceStore.fetchPersistentVolumes()
  } catch (error) {
    console.error('Error fetching persistent volumes:', error)
  }
})

const describePersistentVolume = async (name) => {
  try {
    nameOfSelectedPV.value = name
    const response = await resourceStore.describeResource('persistentvolumes', name)
    describeData.value = response
    showDescribeDialog.value = true
  } catch (error) {
    console.error('Error describing persistent volume:', error)
  }
}
</script>
<style scoped></style>
