<template>
  <v-card>
    <v-card-title>{{ pvData.name }}</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <p><strong>Status:</strong> {{ pvData.status }}</p>
      <p><strong>Capacity:</strong> {{ pvData.capacity }}</p>
      <p><strong>Access Modes:</strong> {{ pvData.access_modes.join(', ') }}</p>
      <p><strong>Reclaim Policy:</strong> {{ pvData.reclaim_policy }}</p>
      <p><strong>Storage Class:</strong> {{ pvData.storage_class || 'N/A' }}</p>
      <p><strong>Volume Mode:</strong> {{ pvData.volume_mode || 'N/A' }}</p>
    </v-card-text>
  </v-card>
</template>
<script setup>
const props = defineProps({
  pvData: {
    type: Object,
    required: true,
  },
})
</script>
