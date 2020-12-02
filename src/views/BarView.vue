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
            :chartData="getEmailSenders"
            :handleClick="handleClick"
          />
        </v-col>
        <v-col cols="12" md="6">
          <bar-highcharts
            title="Receivers"
            search="to"
            :chartData="getEmailReceivers"
            :handleClick="handleClick"
          />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import BarHighcharts from '@/components/Highcharts/BarHighcharts.vue'

export default {
  components: { BarHighcharts },
  methods: {},
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
</style>
