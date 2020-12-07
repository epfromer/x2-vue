<template>
  <div>chartjs</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      config: null,
    }
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    chartData: {
      type: Array,
      required: true,
    },
    search: {
      type: String,
      required: true,
    },
    handleClick: {
      type: Function,
      required: true,
    },
  },
  inject: ['theme'],
  components: {},
  computed: {
    ...mapState(['darkMode']),
  },
  mounted() {
    this.createChart()
  },
  methods: {
    createChart() {
      this.config = {}
    },
  },
  watch: {
    darkMode() {
      this.createChart()
    },
    chartData() {
      if (this.chartData && this.chartData.length) this.createChart()
    },
  },
}
</script>
