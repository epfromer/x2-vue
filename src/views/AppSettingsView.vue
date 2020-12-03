<template>
  <v-container fluid> </v-container>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import ColorPicker from '../components/ColorPicker'
import ContactSettings from '../components/ContactSettings'

export default {
  components: {},
  methods: {
    ...mapMutations([]),
  },
  computed: {
    ...mapState(['darkMode']),
  },
}
</script>
