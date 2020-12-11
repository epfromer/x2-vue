<template>
  <v-dialog v-model="isOpen" width="290">
    <v-card>
      <v-date-picker v-model="filterDate"></v-date-picker>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="handleClear"> Clear </v-btn>
        <v-btn text @click="handleClose"> Ok </v-btn>
      </v-card-actions>
    </v-card>
    <button hidden data-testid="handleClear" @click="handleClear"></button>
    <button hidden data-testid="handleClose" @click="handleClose"></button>
  </v-dialog>
</template>

<script>
// https://vuetifyjs.com/en/components/cards/

export default {
  data() {
    return {
      filterDate: this.date,
    }
  },
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    date: {
      type: String,
    },
    onClear: {
      type: Function,
      required: true,
    },
    onClose: {
      type: Function,
      required: true,
    },
  },
  computed: {
    isOpen: {
      get() {
        return this.open
      },
      set(v) {
        this.onClose()
      },
    },
  },
  methods: {
    handleClear() {
      this.filterDate = ''
      this.filterSpan = 0
      this.onClear()
    },
    handleClose() {
      this.onClose(this.filterDate, Number(this.filterSpan))
    },
  },
}
</script>
