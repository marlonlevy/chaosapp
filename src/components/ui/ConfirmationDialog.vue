<template>
  <v-dialog v-model="showDialog" persistent scrollable v-bind="$attrs">
    <v-card>
      <v-card-title v-if="showTitle">{{ dialogTitle }} <v-divider></v-divider> </v-card-title>
      <v-card-text><slot>Are you sure you want to do this ?</slot></v-card-text>
      <v-card-actions>
        <v-btn color="green" @click="onConfirmActionClicked">{{ confirmActiontitle }}</v-btn>
        <v-btn color="red" @click="onCancelActionClicked">{{ cancelActiontitle }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script setup>
const showDialog = defineModel({ require: true, defualt: false })

const props = defineProps({
  showTitle: { type: Boolean, default: true },
  dialogTitle: { type: String, default: 'Confirm Action' },
  confirmActiontitle: { type: String, default: 'Confirm' },
  cancelActiontitle: { type: String, default: 'Cancel' },
})
const emits = defineEmits(['onConfirm', 'onCancel'])

const onConfirmActionClicked = () => {
  emits('onConfirm')
  showDialog.value = false
}

const onCancelActionClicked = () => {
  emits('onCancel')
  showDialog.value = false
}
</script>
