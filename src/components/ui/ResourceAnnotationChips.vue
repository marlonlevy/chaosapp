<template>
  <div class="mt-1">
    <v-chip v-bind="$attrs" v-for="(val, key) in annotationsObject" :key="key">
      {{ key }}: {{ val }}
    </v-chip>
  </div>
</template>
<script setup>
defineProps({
  annotationsObject: {
    type: Object,
    required: true,
  },
})

defineOptions({
  inheritAttrs: false,
})
</script>
