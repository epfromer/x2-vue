<template>
  <v-container fluid>
    <v-progress-linear
      v-if="custodiansLoading"
      indeterminate
    ></v-progress-linear>
    <div v-if="custodians">
      <div class="headline">Highcharts</div>
      <event-timeline-highcharts
        title="Enron Fraud Timeline"
        :handleClick="handleClick"
      />
    </div>
    <button hidden @click="() => handleSelect('foo')">handleSelect</button>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import EventTimelineHighcharts from '@/components/Highcharts/EventTimelineHighcharts.vue'

export default {
  data() {
    return {}
  },
  inject: ['theme'],
  components: {
    EventTimelineHighcharts,
  },
  computed: {
    ...mapState(['custodiansLoading', 'custodians']),
  },
  methods: {
    ...mapMutations(['clearSearch', 'setVuexState']),
    handleClick(word) {
      this.clearSearch()
      this.setVuexState({ k: 'allText', v: word })
      this.$router.push({ name: 'SearchView' }).catch((e) => console.error(e))
    },
  },
}
</script>
