<template>
  <div class="root">
    <v-chip
      v-for="contact in contacts"
      :key="contact.name"
      class="ma-2"
      color="indigo"
      text-color="white"
      close
      @click:close="handleDelete(contact.name)"
    >
      {{ contact.name }}
    </v-chip>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    selectedContacts: {
      type: Array,
      // required: true,
    },
  },
  methods: {
    handleDelete(k) {
      console.log(k)
    },
  },
  computed: {
    ...mapState(['contacts']),
  },
}
</script>

<style scoped>
.root {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
