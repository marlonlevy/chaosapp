<template>
  <v-card variant="outlined" class="mx-auto" max-width="800">
    <!-- Header: Pod Name and Phase -->
    <v-card-item>
      <template v-slot:prepend>
        <v-icon :color="statusColor" icon="mdi-cube-outline" size="large"></v-icon>
      </template>
      <v-card-title class="text-h6">
        {{ podData.name }}
      </v-card-title>
      <v-card-subtitle>
        Namespace: <v-chip size="x-small" label>{{ podData.namespace }}</v-chip>
      </v-card-subtitle>
      <template v-slot:append>
        <v-chip :color="statusColor" variant="flat" size="small" class="text-uppercase">
          {{ podPhase }}
        </v-chip>
      </template>
    </v-card-item>

    <v-divider></v-divider>

    <v-tabs v-model="tab" bg-color="transparent" color="primary" grow>
      <v-tab value="overview">Overview</v-tab>
      <v-tab value="containers">Containers</v-tab>
      <v-tab value="conditions">Conditions</v-tab>
    </v-tabs>

    <v-window v-model="tab">
      <!-- Tab 1: Overview -->
      <v-window-item value="overview">
        <v-list lines="two" density="compact">
          <v-list-item title="UID" :subtitle="podData.metadata.uid"></v-list-item>
          <v-list-item
            title="Created At"
            :subtitle="podData.metadata.creation_timestamp"
          ></v-list-item>
          <v-list-item
            title="Restarted At"
            :subtitle="podData.metadata.annotations['kubectl.kubernetes.io/restartedAt']"
          ></v-list-item>
          <v-list-item title="Labels">
            <template v-slot:subtitle>
              <div class="mt-1">
                <v-chip
                  v-for="(val, key) in podData.metadata.labels"
                  :key="key"
                  size="x-small"
                  class="mr-1"
                >
                  {{ key }}: {{ val }}
                </v-chip>
              </div>
            </template>
          </v-list-item>
        </v-list>
      </v-window-item>

      <!-- Tab 2: Containers -->
      <v-window-item value="containers">
        <v-list density="compact">
          <v-list-item
            v-for="container in podData.status.container_statuses"
            :key="container.name"
            :title="container.name"
            :subtitle="container.image"
          >
            <template v-slot:prepend>
              <v-icon :color="container.ready ? 'success' : 'error'">mdi-circle-medium</v-icon>
            </template>
            <template v-slot:append>
              <v-badge
                color="grey"
                :content="`Restarts: ${container.restart_count}`"
                inline
              ></v-badge>
            </template>
          </v-list-item>
        </v-list>
      </v-window-item>

      <!-- Tab 3: Conditions -->
      <v-window-item value="conditions">
        <v-table density="compact">
          <thead>
            <tr>
              <th>Type</th>
              <th>Status</th>
              <th>Last Transition</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="condition in podData.status.conditions" :key="condition.type">
              <td>{{ condition.type }}</td>
              <td>
                <v-icon :color="condition.status === 'True' ? 'success' : 'warning'">
                  {{ condition.status === 'True' ? 'mdi-check-circle' : 'mdi-alert' }}
                </v-icon>
              </td>
              <td class="text-caption text-grey">
                {{ formatDate(condition.last_transition_time) }}
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  podData: {
    type: Object,
    required: true,
  },
})

const tab = ref('overview')

const podPhase = computed(() => {
  // Using 'Ready' condition as a proxy since phase wasn't fully visible in snippet
  const ready = props.podData.status.conditions.find((c) => c.type === 'Ready')
  return ready?.status === 'True' ? 'Running' : 'Pending'
})

const statusColor = computed(() => {
  return podPhase.value === 'Running' ? 'success' : 'warning'
})

const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A'
  // Handle Python datetime strings or standard JS dates
  return new Date(dateStr).toLocaleString()
}
</script>
