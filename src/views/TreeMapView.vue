<template>
  <v-container fluid>
    <v-progress-linear v-if="contactsLoading" indeterminate></v-progress-linear>
    <div class="headline">Named Senders to Any Recipient</div>
    <div class="root">
      <TreeMap :data="getSenders" search="from" />
    </div>
    <div class="headline">Named Receivers from Any Sender</div>
    <div class="root">
      <TreeMap :data="getReceivers" search="to" />
    </div>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import TreeMap from '../components/TreeMap'

export default {
  components: { TreeMap },
  computed: {
    ...mapState(['contactsLoading', 'contacts']),
    getSenders() {
      const data = []
      if (this.contacts) {
        this.contacts.forEach((contact) => {
          if (contact.senderTotal) {
            data.push({
              name: contact.name,
              value: contact.senderTotal,
              color: contact.color,
            })
          }
        })
      }
      return data
    },
    getReceivers() {
      const data = []
      if (this.contacts) {
        this.contacts.forEach((contact) => {
          if (contact.receiverTotal) {
            data.push({
              name: contact.name,
              value: contact.receiverTotal,
              color: contact.color,
            })
          }
        })
      }
      return data
    },
  },
}
</script>

<style scoped>
.root {
  height: 300px;
}
</style>
