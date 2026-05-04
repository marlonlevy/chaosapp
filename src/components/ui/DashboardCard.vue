<template>
  <v-card class="pa-2" outlined :to="item.path || '#'">
    <v-card-title>
      <v-icon class="mr-2">{{ item.icon }}</v-icon
      >{{ item.title }}</v-card-title
    >
    <v-card-text>{{ item.value.length }}</v-card-text>
  </v-card>
</template>
<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
})
</script>
<style scoped></style>
