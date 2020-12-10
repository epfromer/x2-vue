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
          <bar-highcharts
            title="Senders"
            search="from"
            :chartData="getEmailSenders()"
            :handleClick="handleClick"
          />
        </v-col>
        <v-col cols="12" md="6">
          <bar-highcharts
            title="Receivers"
            search="to"
            :chartData="getEmailReceivers()"
            :handleClick="handleClick"
          />
        </v-col>
      </v-row>
      <div class="headline">ChartJS</div>
      <v-row>
        <v-col cols="12" md="6">
          <bar-chart-j-s
            title="Senders"
            search="from"
            :chartData="getEmailSenders()"
            :handleClick="handleClick"
          />
        </v-col>
        <v-col cols="12" md="6">
          <bar-chart-j-s
            title="Receivers"
            search="to"
            :chartData="getEmailReceivers()"
            :handleClick="handleClick"
          />
        </v-col>
      </v-row>
      <div class="headline">ECharts</div>
      <v-row>
        <v-col cols="12" md="6">
          <bar-e-charts
            title="Senders"
            search="from"
            :chartData="getEmailSenders()"
            :handleClick="handleClick"
          />
        </v-col>
        <v-col cols="12" md="6">
          <bar-e-charts
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
import BarHighcharts from '@/components/Highcharts/BarHighcharts.vue'
import BarChartJS from '@/components/ChartJS/BarChartJS'
import BarECharts from '@/components/ECharts/BarECharts'

export default {
  components: { BarHighcharts, BarChartJS, BarECharts, BarECharts },
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
