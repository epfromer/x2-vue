<template>
  <v-dialog @click:outside="handleClose" v-model="isOpen" width="308">
    <v-color-picker
      hide-inputs
      class="ma-2"
      v-model="color"
      show-swatches
    ></v-color-picker>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      selectedColor: '',
    }
  },
  props: {
    open: {
      type: Boolean,
      required: true,
    },
    defaultColor: {
      type: String,
      default: '#2196f3',
    },
    onClose: {
      type: Function,
      required: true,
    },
  },
  methods: {
    handleClose() {
      this.onClose(this.selectedColor)
      this.selectedColor = ''
    },
  },
  computed: {
    color: {
      get() {
        return this.selectedColor ? this.selectedColor : this.defaultColor
      },
      set(c) {
        // lop off last two digits to convert from RGBA to RGB
        this.selectedColor = c.slice(0, 7)
      },
    },
    isOpen: {
      get() {
        return this.open
      },
    },
  },
}
</script>
