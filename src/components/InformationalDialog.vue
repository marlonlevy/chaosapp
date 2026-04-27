<template>
  <v-dialog v-model="dialog" :max-width="maxWidth" persistent scrollable>
    <v-card>
      <v-card-title class="d-flex align-center justify-space-between">
        <div>
          <div class="text-h6">{{ title }}</div>
          <div v-if="subtitle" class="text-subtitle-2 text-secondary">{{ subtitle }}</div>
        </div>

        <v-btn icon @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        <slot name="body" />
      </v-card-text>

      <v-divider />

      <v-card-actions class="justify-end">
        <slot name="actions">
          <v-btn variant="outlined" @click="close">{{ closeLabel }}</v-btn>
        </slot>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: '' },
  subtitle: { type: String, default: '' },
  maxWidth: { type: [Number, String], default: 960 },
  closeLabel: { type: String, default: 'Close' },
  density: { type: String, default: 'comfortable' },
})

const emit = defineEmits(['update:modelValue', 'update:search'])

const dialog = ref(props.modelValue)

watch(
  () => props.modelValue,
  (value) => {
    dialog.value = value
  },
)

watch(dialog, (value) => {
  emit('update:modelValue', value)
})

const close = () => {
  dialog.value = false
}
</script>
