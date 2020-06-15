<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6" md="3">
        <DashboardCard
          data-testid="chord"
          image="/chord.png"
          title="Chord"
          description="Chord diagram of Enron key contact communication."
          link="ChordView"
        />
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <DashboardCard
          image="/wordcloud.png"
          title="Word Cloud"
          description="Word cloud of key terms and fraudulent project names."
          link="WordCloudView"
        />
      </v-col>
      <v-col cols="12" sm="6" md="3"
        ><DashboardCard
          image="/volumetimeline.png"
          title="Volume Timeline"
          description="XY timeline of Enron email per day with drill down."
          link="VolumeTimelineView"
        />
      </v-col>
      <v-col cols="12" sm="6" md="3"
        ><DashboardCard
          image="/NetworkGraph.png"
          title="Network Graph"
          description="Network graph of named Enron contact communication."
          link="NetworkGraphView"
        />
      </v-col>
      <v-col cols="12" sm="6" md="3"
        ><DashboardCard
          image="/treemap.png"
          title="Tree Map"
          description="Tree map of email volume of Enron key contacts."
          link="TreeMapView"
        />
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <DashboardCard
          image="/eventTimeline.png"
          title="Event Timeline"
          description="Event timeline of Enron fraud and litigation."
          link="EventTimelineView"
      /></v-col>
      <v-col cols="12" sm="6" md="3">
        <DashboardCard
          image="/barchart.png"
          title="Bar Chart"
          description="Bar chart of email volume of Enron key contacts."
          link="BarChartView"
      /></v-col>
      <v-col cols="12" sm="6" md="3">
        <DashboardCard
          image="/search.png"
          title="Search"
          description="Full text search with field filtering and hit highlighting."
          link="SearchView"
      /></v-col>
    </v-row>
  </v-container>
</template>

<script>
import DashboardCard from '../components/DashboardCard.vue'

export default {
  components: {
    DashboardCard,
  },
}
</script>
