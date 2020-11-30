<template>
  <v-container fluid>
    <v-progress-linear
      v-if="custodiansLoading"
      indeterminate
    ></v-progress-linear>
    <div v-if="custodians">
      <div class="headline">Highcharts</div>
      <pie-highcharts
        title="Senders"
        search="from"
        :chartData="getEmailSenders"
        :handleClick="handleClick"
      />
      <pie-highcharts
        title="Receivers"
        search="to"
        :chartData="getEmailReceivers"
        :handleClick="handleClick"
      />
    </div>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import PieHighcharts from '@/components/Highcharts/PieHighcharts.vue'

export default {
  components: { PieHighcharts },
  methods: {},
  computed: {
    ...mapState(['custodiansLoading', 'custodians']),
    ...mapGetters(['getEmailSenders', 'getEmailReceivers']),
  },
  methods: {
    // ...mapMutations(['clearSearch', 'setVuexState']),
    handleClick(word) {
      // this.clearSearch()
      // this.setVuexState({ k: 'allText', v: word })
      // this.$router.push({ name: 'SearchView' }).catch((err) => {})
    },
  },
}
</script>

<style scoped>
.title {
  padding-bottom: 10px;
}
</style>
