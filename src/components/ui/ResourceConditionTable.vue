<template>
  <v-table density="compact">
    <thead>
      <tr>
        <th>Type</th>
        <th>Status</th>
        <th>Last Transition</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="condition in items" :key="condition.type">
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
</template>
<script setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
})

const formatDate = (dateStr) => {
  if (!dateStr) return 'N/A'
  const date = new Date(dateStr)
  return date.toLocaleString()
}
</script>
