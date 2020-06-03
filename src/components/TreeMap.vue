<template>
  <div class="chart" :id="`${search}TreeMap`" />
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      chart: null,
    }
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
    search: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.createChart()
  },
  beforeDestroy() {
    if (this.chart) this.chart.dispose()
  },
  methods: {
    ...mapMutations(['clearSearch', 'setVuexState']),
    handleSelect(ev) {
      this.clearSearch()
      this.setVuexState({
        k: this.search,
        v: `(${ev.target.dataItem.dataContext.dataContext.name})`,
      })
      this.$router.push({ name: 'SearchView' }).catch((err) => {})
    },
    createChart() {},
  },
  watch: {
    data() {
      this.createChart()
    },
  },
}
</script>

<style scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
