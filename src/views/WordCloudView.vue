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
    <button
      hidden
      @click="() => handleClick('to')"
      data-testid="handleClick"
    ></button>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import WordCloudHighcharts from '@/components/Highcharts/WordCloudHighcharts.vue'

export default {
  components: {
    WordCloudHighcharts,
  },
  computed: {
    ...mapState(['wordCloudLoading', 'wordCloud']),
  },
  methods: {
    ...mapActions(['getEmailAsync']),
    ...mapMutations(['clearSearch', 'setAllText']),
    handleClick(word) {
      this.clearSearch()
      this.setAllText(word)
      this.getEmailAsync()
      this.$router.push({ name: 'SearchView' }).catch((e) => console.error(e))
    },
  },
}
</script>
