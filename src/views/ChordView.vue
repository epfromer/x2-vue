<template>
  <v-container fluid>
    <v-progress-linear
      v-if="custodiansLoading"
      indeterminate
    ></v-progress-linear>
    <div v-if="custodians">
      <div class="headline">Highcharts</div>
      <chord-highcharts
        title="Custodian Interaction"
        :chartData="getEmailSentByCustodian.data"
        :nodes="getEmailSentByCustodian.nodes"
        :handleClick="handleClick"
      />
      <div class="headline">ECharts</div>
      <chord-e-charts
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
import ChordHighcharts from '@/components/Highcharts/ChordHighcharts'
import ChordECharts from '@/components/ECharts/ChordECharts'

export default {
  components: {
    ChordHighcharts,
    ChordECharts,
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
