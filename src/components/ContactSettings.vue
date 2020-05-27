<template>
  <v-container fluid>
    <div>foo</div>
  </v-container>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  methods: {
    ...mapMutations(['setVuexState', 'saveAppSettings']),
  },
}
</script>
