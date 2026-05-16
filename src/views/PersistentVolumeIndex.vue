<template>
  <v-container fluid>
    <h1>Persistent Volumes</h1>

    <v-row>
      <v-col>
        <v-data-table :items="getPersistentVolumes" :loading="loading" :headers="pvHeaders">
          <!-- "#" is the same as "v-slot:" -->
          <template #[`item.actions`]="{ item }">
            <v-btn small color="primary" @click="() => displayDescribeDialog(item)">Describe</v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <span class="ma-2 text-label-small"
      >{{ getPersistentVolumes.length }} Persistent Volumes found.</span
    >
  </v-container>
  <informational-dialog
    :show-title="false"
    v-model="showDescribeDialog"
    :title="`Describe: ${nameOfSelectedPV}`"
  >
    <template #body>
      <p-v-describe-info-card :pv-data="describeData" />
    </template>
  </informational-dialog>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { useResourceStore } from '@/stores/ResourceStore'
import { storeToRefs } from 'pinia'

import PVDescribeInfoCard from '@/components/pv/PVDescribeInfoCard.vue'
import InformationalDialog from '@/components/InformationalDialog.vue'

const resourceStore = useResourceStore()
const { getPersistentVolumes } = storeToRefs(resourceStore)
const describeData = ref('')
const nameOfSelectedPV = ref('')
const showDescribeDialog = ref(false)
const loading = ref(false)
const pvHeaders = [
  { title: 'Name', value: 'name' },
  { title: 'Capacity', value: 'capacity' },
  { title: 'Access Modes', value: 'access_modes' },
  { title: 'Reclaim Policy', value: 'reclaim_policy' },
  { title: 'Status', value: 'status' },
  { title: 'Claim', value: 'claim' },
  { title: 'Storage Class', value: 'storage_class' },
  { title: 'Reason', value: 'reason' },
  { title: 'Volume Mode', value: 'volume_mode' },
  { title: 'Age', value: 'age' },
  { title: 'Actions', value: 'actions', sortable: false },
]

onMounted(async () => {
  loading.value = true
  try {
    await resourceStore.fetchPersistentVolumes()
  } catch (error) {
    console.error('Error fetching persistent volumes:', error)
  } finally {
    loading.value = false
  }
})

const displayDescribeDialog = (selectedPv) => {
  nameOfSelectedPV.value = selectedPv.name
  describeData.value = selectedPv
  showDescribeDialog.value = true
}
</script>
