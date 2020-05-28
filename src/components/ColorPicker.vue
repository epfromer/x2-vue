<template>
  <v-color-picker class="ma-2" v-model="color" show-swatches></v-color-picker>
</template>

<script>
// TODO make like react, with dialog box
export default {
  data() {
    return {
      col: this.defaultColor,
    }
  },
  props: {
    defaultColor: {
      type: String,
      default: '#2196f3',
    },
    onChange: {
      type: Function,
      required: true,
    },
  },
  computed: {
    color: {
      get() {
        return this.col
      },
      set(v) {
        this.col = v
        this.onChange(v)
      },
    },
  },
}
</script>
