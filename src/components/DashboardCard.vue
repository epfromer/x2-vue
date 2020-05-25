<template>
  <v-card @click="handleClick">
    <v-img :src="this.image" height="340px"></v-img>
    <v-card-title> {{ this.title }} </v-card-title>
    <v-card-subtitle>{{ this.description }} </v-card-subtitle>
    <v-card-actions>
      <v-btn @click="handleClick" text>More Detail</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
// https://vuetifyjs.com/en/components/cards/

export default {
  props: {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleClick() {
      this.$router.push({ name: this.link })
    },
  },
}
</script>
