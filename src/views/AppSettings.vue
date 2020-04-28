<template>
  <div>
    <div class="display-1">Settings</div>
    <v-switch
      v-model="dense"
      class="mx-2"
      label="Dense padding for email list"
    ></v-switch>
    <div class="headline">Interface element colors</div>
    <v-switch v-model="dark" class="mx-2" label="Dark mode"></v-switch>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  methods: {
    ...mapMutations(['setVuexState', 'saveAppSettings']),
  },
  computed: {
    ...mapState(['densePadding', 'darkMode']),
    dense: {
      get() {
        return this.densePadding
      },
      set(v) {
        this.setVuexState({ k: 'densePadding', v })
        this.saveAppSettings()
      },
    },
    dark: {
      get() {
        return this.darkMode
      },
      set(v) {
        this.setVuexState({ k: 'darkMode', v })
        this.saveAppSettings()
      },
    },
  },
}
</script>
