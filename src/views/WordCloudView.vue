<template>
  <v-container fluid>
    <v-progress-linear
      v-if="wordCloudLoading"
      indeterminate
    ></v-progress-linear>
    <div v-if="wordCloud">
      <div class="headline">Highcharts</div>
      <word-cloud-highcharts
        title="Enron Project Names"
        :chartData="wordCloud"
        :handleClick="handleClick"
      />
    </div>
    <button hidden @click="() => handleSelect('foo')">handleSelect</button>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import WordCloudHighcharts from '@/components/Highcharts/WordCloudHighcharts.vue'

export default {
  data() {
    return {}
  },
  inject: ['theme'],
  components: {
    WordCloudHighcharts,
  },
  computed: {
    ...mapState(['wordCloudLoading', 'wordCloud']),
  },
  methods: {
    ...mapMutations(['clearSearch', 'setVuexState']),
    handleClick(word) {
      this.clearSearch()
      this.setVuexState({ k: 'allText', v: word })
      this.$router.push({ name: 'SearchView' }).catch((err) => {})
    },
  },
}
</script>
