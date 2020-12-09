<template>
  <v-container fluid>
    <v-progress-linear
      v-if="custodiansLoading"
      indeterminate
    ></v-progress-linear>
    <div v-if="custodians">
      <div class="headline">Highcharts</div>
      <network-graph-highcharts
        title="Custodian Interaction"
        :chartData="getEmailSentByCustodian.data"
        :nodes="getEmailSentByCustodian.nodes"
        :handleClick="handleClick"
      />
      <div class="headline">ECharts</div>
      <network-graph-e-charts
        title="Custodian Interaction"
        :chartData="getEmailSentByCustodian.data"
        :nodes="getEmailSentByCustodian.nodes"
        :handleClick="handleClick"
      />
    </div>
    <button hidden @click="() => handleSelect('foo')">handleSelect</button>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import NetworkGraphHighcharts from '@/components/Highcharts/NetworkGraphHighcharts.vue'
import NetworkGraphECharts from '@/components/ECharts/NetworkGraphECharts'

export default {
  data() {
    return {}
  },
  inject: ['theme'],
  components: {
    NetworkGraphHighcharts,
    NetworkGraphECharts,
  },
  computed: {
    ...mapState(['custodiansLoading', 'custodians']),
    ...mapGetters(['getEmailSentByCustodian']),
  },
  methods: {
    ...mapActions(['getEmailAsync']),
    ...mapMutations(['clearSearch', 'setFrom', 'setTo']),
    handleClick(from, to) {
      this.clearSearch()
      from ? this.setFrom(from.slice(0, from.search(/,/))) : ''
      to ? this.setTo(to.slice(0, to.search(/,/))) : ''
      this.getEmailAsync()
      this.$router.push({ name: 'SearchView' }).catch((e) => console.error(e))
    },
  },
}
</script>
