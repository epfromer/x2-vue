<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6" md="3">
        <HomeCard
          image="/pie.png"
          title="Pie"
          description="Email volume of Enron custodians."
          link="PieView"
        />
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <HomeCard
          image="/Bar.png"
          title="Bar"
          description="Email volume of Enron custodians."
          link="BarView"
      /></v-col>
      <v-col cols="12" sm="6" md="3">
        <HomeCard
          data-testid="chord"
          image="/chord.png"
          title="Chord"
          description="Enron custodian communication."
          link="ChordView"
        />
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <HomeCard
          image="/wordcloud.png"
          title="Word Cloud"
          description="Mentions of fraudulent project names."
          link="WordCloudView"
        />
      </v-col>
      <v-col cols="12" sm="6" md="3"
        ><HomeCard
          image="/volumetimeline.png"
          title="Volume Timeline"
          description="'Enron email per day with drill down."
          link="VolumeTimelineView"
        />
      </v-col>
      <v-col cols="12" sm="6" md="3"
        ><HomeCard
          image="/NetworkGraph.png"
          title="Network Graph"
          description="Enron custodian communication."
          link="NetworkGraphView"
        />
      </v-col>
      <v-col cols="12" sm="6" md="3"
        ><HomeCard
          image="/treemap.png"
          title="Tree Map"
          description="Email volume of Enron custodians."
          link="TreeMapView"
        />
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <HomeCard
          image="/eventTimeline.png"
          title="Event Timeline"
          description="Enron fraud and litigation events."
          link="EventTimelineView"
      /></v-col>
      <v-col cols="12" sm="6" md="3">
        <HomeCard
          image="/polar.png"
          title="Polar"
          description="Email volume of Enron custodians."
          link="PolarView"
      /></v-col>
      <v-col cols="12" sm="6" md="3">
        <HomeCard
          image="/search.png"
          title="Search"
          description="Full text search with hit highlighting."
          link="SearchView"
      /></v-col>
    </v-row>
  </v-container>
</template>

<script>
import HomeCard from '../components/HomeCard.vue'

export default {
  components: {
    HomeCard,
  },
}
</script>
