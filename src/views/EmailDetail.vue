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
        <v-btn
          @click="() => setSelected(selected - 1)"
          icon
          :disabled="selected <= 0"
        >
          <v-icon>mdi-arrow-left-bold</v-icon>
        </v-btn>
        <v-btn
          @click="() => setSelected(selected + 1)"
          icon
          :disabled="selected >= getNumSavedEmails - 1"
        >
          <v-icon>mdi-arrow-right-bold</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapState, mapMutations } from 'vuex'

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
    email: {}
  }),
  mounted() {
    this.email = this.getSavedEmail(this.selected)

    // if came here by bookmarked route, then go back to email list
    // so that results list is populated
    if (!this.email._id) {
      this.$router.push({ name: 'EmailList' })
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.email = this.getSavedEmail(to.params.i)
    next()
  },
  methods: {
    ...mapMutations(['setSelected'])
  },
  computed: {
    ...mapState(['selected']),
    ...mapGetters(['getSavedEmail', 'getNumSavedEmails']),
    formattedBody() {
      return this.email.body ? this.email.body.replace(/\n/g, '<br />') : ''
    }
  },
  watch: {
    selected(newValue, oldValue) {
      this.$router.push({ name: 'EmailDetail', params: { i: this.selected } })
    }
  }
}
</script>
