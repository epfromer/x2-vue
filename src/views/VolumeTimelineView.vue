<template>
  <v-container fluid>
    <v-progress-linear
      v-if="emailSentByDayLoading"
      indeterminate
    ></v-progress-linear>
    <div v-if="emailSentByDay">
      <div class="headline">Highcharts</div>
      <volume-timeline-highcharts
        title="Email Volume per Day"
        :chartData="emailSentByDay"
        :handleClick="handleClick"
      />
      <div class="headline">ChartJS</div>
      <volume-timeline-chart-j-s
        title="Email Volume per Day"
        :chartData="emailSentByDay"
        :handleClick="handleClick"
      />
      <div class="headline">ECharts</div>
      <volume-timeline-e-charts
        title="Email Volume per Day"
        :chartData="emailSentByDay"
        :handleClick="handleClick"
      />
    </div>
    <button hidden @click="() => handleSelect('foo')">handleSelect</button>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import VolumeTimelineHighcharts from '@/components/Highcharts/VolumeTimelineHighcharts.vue'
import VolumeTimelineChartJS from '@/components/ChartJS/VolumeTimelineChartJS'
import VolumeTimelineECharts from '@/components/ECharts/VolumeTimelineECharts.vue'

export default {
  data() {
    return {}
  },
  inject: ['theme'],
  components: {
    VolumeTimelineHighcharts,
    VolumeTimelineChartJS,
    VolumeTimelineECharts,
  },
  computed: {
    ...mapState(['emailSentByDayLoading', 'emailSentByDay']),
  },
  methods: {
    ...mapActions(['getEmailAsync']),
    ...mapMutations(['clearSearch', 'setSent']),
    handleClick(date) {
      this.clearSearch()
      this.setSent(date)
      this.getEmailAsync()
      this.$router.push({ name: 'SearchView' }).catch((e) => console.error(e))
    },
  },
}
</script>
