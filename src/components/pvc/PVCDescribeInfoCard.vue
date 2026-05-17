<template>
  <v-card variant="outlined" flat>
    <v-card-title>{{ pvcData.name }}</v-card-title>
    <v-card-text>
      <p><strong>Namespace:</strong> {{ pvcData.namespace }}</p>
      <p><strong>Status:</strong> {{ pvcData.status.phase }}</p>
      <p><strong>Capacity:</strong> {{ pvcData.status.capacity.storage }}</p>
      <p><strong>Access Modes:</strong> {{ pvcData.status.access_modes.join(', ') }}</p>
      <p><strong>Storage Class:</strong> {{ pvcData.spec?.storageClassName || 'N/A' }}</p>
      <p><strong>Volume Name:</strong> {{ pvcData.spec?.volumeName || 'N/A' }}</p>
    </v-card-text>
  </v-card>
</template>
<script setup>
const props = defineProps({
  pvcData: {
    type: Object,
    required: true,
  },
})
</script>
