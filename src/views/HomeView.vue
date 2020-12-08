<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6" md="3">
        <HomeCard
          image="/pie.png"
          title="Pie"
          description="Enron custodian email volume."
          link="PieView"
        />
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <HomeCard
          image="/bar.png"
          title="Bar"
          description="Enron custodian email volume."
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
          description="Fraudulent project names."
          link="WordCloudView"
        />
      </v-col>
      <v-col cols="12" sm="6" md="3"
        ><HomeCard
          image="/volumetimeline.png"
          title="Volume Timeline"
          description="Enron email per day."
          link="VolumeTimelineView"
        />
      </v-col>
      <v-col cols="12" sm="6" md="3"
        ><HomeCard
          image="/networkgraph.png"
          title="Network Graph"
          description="Enron custodian communication."
          link="NetworkGraphView"
        />
      </v-col>
      <v-col cols="12" sm="6" md="3"
        ><HomeCard
          image="/treemap.png"
          title="Tree Map"
          description="Enron custodian email volume."
          link="TreeMapView"
        />
      </v-col>
      <v-col cols="12" sm="6" md="3">
        <HomeCard
          image="/eventtimeline.png"
          title="Event Timeline"
          description="Enron fraud and litigation events."
          link="EventTimelineView"
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
