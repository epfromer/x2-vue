<template>
  <div>
    <v-card :loading="loading" class="elevation-1 ">
      <v-card-title>{{ email.subject }}</v-card-title>
      <v-card-text class="text--primary">
        <div>Sent: {{ email.clientSubmitTime }}</div>
        <div>From: {{ email.senderName }} ({{ email.senderEmailAddress }})</div>
        <div>To: {{ email.displayTo }}</div>
        <div>CC: {{ email.displayCC }}</div>
        <p></p>
        <span v-html="formattedBody"></span>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="() => this.$router.go(-1)" text>
          Back to list
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn @click="previousEmail" icon :disabled="idx <= 0">
          <v-icon>mdi-arrow-left-bold</v-icon>
        </v-btn>
        <v-btn @click="nextEmail" icon :disabled="idx >= getNumSavedEmails - 1">
          <v-icon>mdi-arrow-right-bold</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    i: {
      type: [Number, String], // could come in as string from route
      required: true,
      default: 0
    }
  },
  data: () => ({
    loading: false,
    idx: 0,
    email: {}
  }),
  mounted() {
    console.log('mounted')
    this.idx = Number(this.i)
    this.email = this.getSavedEmail(this.idx)

    // if came here by bookmarked route, then go back to email list
    // so that results list is populated
    if (!this.email._id) {
      this.$router.push({ name: 'EmailList' })
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.idx = to.params.i
    this.email = this.getSavedEmail(this.idx)
    next()
  },
  methods: {
    nextEmail() {
      if (this.idx < this.getNumSavedEmails - 1) {
        this.$router.push({ name: 'EmailDetail', params: { i: this.idx + 1 } })
      }
    },
    previousEmail() {
      if (this.idx > 0) {
        this.$router.push({ name: 'EmailDetail', params: { i: this.idx - 1 } })
      }
    }
  },
  computed: {
    ...mapGetters(['getSavedEmail', 'getNumSavedEmails']),
    formattedBody() {
      return this.email.body ? this.email.body.replace(/\n/g, '<br />') : ''
    }
  }
}
</script>
