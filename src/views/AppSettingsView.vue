<template>
  <v-container fluid> <theme-picker /></v-container>
</template>

<script>
import ThemePicker from '@/components/ThemePicker.vue'
import { mapMutations, mapState } from 'vuex'

export default {
  components: { ThemePicker },
  methods: {
    ...mapMutations([]),
  },
  computed: {
    ...mapState(['darkMode']),
  },
}
</script>
