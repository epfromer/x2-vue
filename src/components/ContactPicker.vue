<template>
  <div class="root">
    <template v-for="contact in contactList">
      <template v-if="contact.show">
        <v-chip
          :key="contact.name"
          :color="getContactColor(contact.name)"
          class="ma-1"
          text-color="black"
          close
          @click:close="handleDelete(contact.name)"
        >
          {{ contact.name }}
        </v-chip>
      </template>
      <template v-else>
        <v-chip
          :key="contact.name"
          :color="getContactColor(contact.name)"
          class="ma-1"
          text-color="black"
          @click="handleClick(contact.name)"
        >
          {{ contact.name }}
        </v-chip>
      </template>
    </template>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  props: {
    contactsToShow: {
      type: Map,
      required: true,
    },
    onChange: {
      type: Function,
      required: true,
    },
  },
  methods: {
    handleDelete(k) {
      const newContacts = new Map(this.contactsToShow)
      newContacts.set(k, false)
      this.onChange(newContacts)
    },
    handleClick(k) {
      const newContacts = new Map(this.contactsToShow)
      newContacts.set(k, true)
      this.onChange(newContacts)
    },
  },
  computed: {
    ...mapState(['contacts']),
    ...mapGetters(['getContactColor']),
    contactList() {
      const items = []
      this.contactsToShow.forEach((v, k) => items.push({ name: k, show: v }))
      return items
    },
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
