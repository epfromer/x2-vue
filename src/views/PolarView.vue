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
          <polar-highcharts
            title="Senders"
            search="from"
            :chartData="getEmailSenders"
            :handleClick="handleClick"
          />
        </v-col>
        <v-col cols="12" md="6">
          <polar-highcharts
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
import { mapState, mapActions, mapGetters } from 'vuex'
import PolarHighcharts from '@/components/Highcharts/PolarHighcharts.vue'

export default {
  components: { PolarHighcharts },
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
      // this.$router.push({ name: 'SearchView' }).catch((e) => console.error(e))
    },
  },
}
</script>

<style scoped>
.title {
  padding-bottom: 10px;
}
</style>
