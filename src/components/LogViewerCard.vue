<template>
  <div>
    <pre class="text-label-medium mt-2 text-green">{{ logs }}</pre>
  </div>
</template>

<script setup>
const props = defineProps({
  logs: {
    type: String,
    required: true,
  },
})
</script>
