<template>
  <v-card variant="outlined" class="mx-auto" max-width="600" height="400px">
    <v-card-item>
      <v-card-title>{{ nodeData.metadata.name }}</v-card-title>
      <v-card-subtitle>{{ nodeData.metadata.namespace }}</v-card-subtitle>
      <template v-slot:append>
        <v-chip :color="statusColor" variant="flat" size="small" class="text-uppercase">
          {{ nodeStatus }}
        </v-chip>
      </template>
    </v-card-item>

    <v-tabs v-model="activeTab" background-color="transparent" grow>
      <v-tab value="details">Details</v-tab>
      <v-tab value="images">Images</v-tab>
      <v-tab value="conditions">Conditions</v-tab>
    </v-tabs>

    <v-window v-model="activeTab">
      <!-- Details window -->
      <v-window-item value="details">
        <v-list lines="two" density="compact">
          <v-list-item title="UID" :subtitle="nodeData.metadata.uid"></v-list-item>
          <v-list-item
            title="Created At"
            :subtitle="nodeData.metadata.creation_timestamp"
          ></v-list-item>
          <v-list-item title="Labels">
            <template v-slot:subtitle>
              <resource-label-chips
                :labels-object="nodeData.metadata.labels"
              ></resource-label-chips>
              <!-- <div class="mt-1">
                <v-chip
                  v-for="(val, key) in nodeData.metadata.labels"
                  :key="key"
                  size="x-small"
                  class="mr-1"
                >
                  {{ key }}: {{ val }}
                </v-chip>
              </div> -->
            </template>
          </v-list-item>
        </v-list>
      </v-window-item>
      <!-- Images window -->
      <v-window-item value="images">
        <v-list lines="two" comfortable v-if="nodeData?.status && nodeData?.status?.images.length">
          <v-list-item v-for="(image, idx) in nodeData.status.images" :key="'idx' + idx">
            {{ image?.names ? image?.names[0] : 'Image ' + idx }}
            <v-list-item-subtitle>{{
              `Size: ${Math.round(image?.size_bytes / (1024 * 1024))} MB`
            }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-window-item>
      <!-- Conditions window -->
      <v-window-item value="conditions">
        <resource-condition-table
          v-if="nodeData?.status?.conditions"
          :items="nodeData.status.conditions"
        ></resource-condition-table>
      </v-window-item>
    </v-window>
  </v-card>
</template>
<script setup>
import { computed, ref } from 'vue'

import ResourceConditionTable from '../ui/ResourceConditionTable.vue'
import ResourceLabelChips from '../ui/ResourceLabelChips.vue'

const props = defineProps({
  nodeData: {
    type: Object,
    required: true,
  },
})

const activeTab = ref('details')
const statusColor = computed(() => {
  const phase = nodeStatus.value || 'Unknown'
  switch (phase) {
    case 'Running':
      return 'green'
    case 'Pending':
      return 'orange'
    case 'Failed':
      return 'red'
    default:
      return 'grey'
  }
})

const nodeStatus = computed(() => {
  const conditions = props.nodeData.status?.conditions || []
  const readyCondition = conditions.find((c) => c.type === 'Ready')
  return readyCondition?.status === 'True' ? 'Running' : 'Pending'
})
</script>
