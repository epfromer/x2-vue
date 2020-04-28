<template>
  <v-dialog v-model="isOpen" width="300">
    <v-card>
      <v-date-picker v-model="filterDate"></v-date-picker>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="onClear">
          Clear
        </v-btn>
        <v-btn
          text
          @click="
            () => onClose(filterDate, filterSpan > 0 ? filterSpan : -filterSpan)
          "
        >
          Ok
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      filterDate: this.date,
      filterSpan: this.span,
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
    span: {
      type: Number,
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
}
</script>
