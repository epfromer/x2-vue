<template>
  <v-container fluid>
    <v-progress-linear
      v-if="emailSentByDayLoading"
      indeterminate
    ></v-progress-linear>
    <div v-if="emailSentByDay">
      <div class="headline">Highcharts</div>
      <volume-timeline-highcharts
        title="Email Volume per Day"
        :chartData="emailSentByDay"
        :handleClick="handleClick"
      />
    </div>
    <button hidden @click="() => handleSelect('foo')">handleSelect</button>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import VolumeTimelineHighcharts from '@/components/Highcharts/VolumeTimelineHighcharts.vue'

export default {
  data() {
    return {}
  },
  inject: ['theme'],
  components: {
    VolumeTimelineHighcharts,
  },
  computed: {
    ...mapState(['emailSentByDayLoading', 'emailSentByDay']),
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
