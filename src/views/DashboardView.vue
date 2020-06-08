<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6" md="3">
        <DashboardCard
          image="/chord.png"
          title="Chord"
          description="Chord diagram of communication between named Enron contacts."
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
          image="/timeline.png"
          title="Volume Timeline"
          description="XY timeline of Enron email per day with drill down."
          link="VolumeTimelineView"
        />
      </v-col>
      <v-col cols="12" sm="6" md="3"
        ><DashboardCard
          image="/fdt.png"
          title="FDT"
          description="Force directed tree of named Enron contact communication."
          link="FDTView"
        />
      </v-col>
      <v-col cols="12" sm="6" md="3"
        ><DashboardCard
          image="/treemap.png"
          title="Tree Map"
          description="Tree map of named Enron contacts to any sender / receiver."
          link="TreeMapView"
        />
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <DashboardCard
          image="/serpentine.png"
          title="Serpentine"
          description="Serpentine timeline of Enron fraud and litigation."
          link="VerticalTimelineView"
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
