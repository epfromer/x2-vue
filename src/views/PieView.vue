<template>
  <v-container fluid>
    <v-progress-linear
      v-if="custodiansLoading"
      indeterminate
    ></v-progress-linear>
    <div v-if="custodians">
      <div class="headline">Highcharts</div>
      <v-row>
        <v-col cols="12" md="6">
          <pie-highcharts
            title="Senders"
            search="from"
            :chartData="getEmailSenders()"
            :handleClick="handleClick"
          />
        </v-col>
        <v-col cols="12" md="6">
          <pie-highcharts
            title="Receivers"
            search="to"
            :chartData="getEmailReceivers()"
            :handleClick="handleClick"
          />
        </v-col>
      </v-row>
      <div class="headline">ChartJS</div>
      <v-row>
        <v-col align="center" justify="center" cols="12" md="6">
          <div class="chartjs">
            <pie-chart-j-s
              title="Senders"
              search="from"
              :chartData="getEmailSenders()"
              :handleClick="handleClick"
            />
          </div>
        </v-col>
        <v-col align="center" justify="center" cols="12" md="6">
          <div class="chartjs">
            <pie-chart-j-s
              title="Receivers"
              search="to"
              :chartData="getEmailReceivers()"
              :handleClick="handleClick"
            />
          </div>
        </v-col>
      </v-row>
      <div class="headline">ECharts</div>
      <v-row>
        <v-col cols="12" md="6">
          <pie-e-charts
            title="Senders"
            search="from"
            :chartData="getEmailSenders()"
            :handleClick="handleClick"
          />
        </v-col>
        <v-col cols="12" md="6">
          <pie-e-charts
            title="Receivers"
            search="to"
            :chartData="getEmailReceivers()"
            :handleClick="handleClick"
          />
        </v-col>
      </v-row>
    </div>
    <button
      hidden
      @click="() => handleClick('to', 'foo')"
      data-testid="handleClick"
    ></button>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import PieHighcharts from '@/components/Highcharts/PieHighcharts.vue'
import PieChartJS from '@/components/ChartJS/PieChartJS'
import PieECharts from '@/components/ECharts/PieECharts'

export default {
  components: { PieHighcharts, PieChartJS, PieECharts },
  computed: {
    ...mapState(['custodiansLoading', 'custodians']),
    ...mapGetters(['getEmailSenders', 'getEmailReceivers']),
  },
  methods: {
    ...mapActions(['getEmailAsync']),
    ...mapMutations(['clearSearch', 'setFrom', 'setTo']),
    handleClick(search, value) {
      this.clearSearch()
      const name = value.slice(0, value.search(/,/))
      search === 'from' ? this.setFrom(name) : this.setTo(name)
      this.getEmailAsync()
      this.$router.push({ name: 'SearchView' }).catch((e) => console.error(e))
    },
  },
}
</script>

<style scoped>
.title {
  padding-bottom: 10px;
}
.chartjs {
  width: 400px;
}
</style>
