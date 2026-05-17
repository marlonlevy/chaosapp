<template>
  <div class="mt-1">
    <v-chip v-for="(val, key) in labelsObject" :key="key" size="x-small" class="mr-1 text-green">
      {{ key }}: {{ val }}
    </v-chip>
  </div>
</template>
<script setup>
defineProps({
  labelsObject: {
    type: Object,
    required: true,
  },
})
</script>
