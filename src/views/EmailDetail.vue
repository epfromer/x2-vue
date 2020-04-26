<template>
  <div>
    <v-card class="elevation-1">
      <v-card-title>{{ email.subject }}</v-card-title>
      <v-card-text class="text--primary">
        <div>Sent: {{ email.sent }}</div>
        <div>From: {{ email.from }}</div>
        <div>To: {{ email.to }}</div>
        <div>CC: {{ email.cc }}</div>
        <div>BCC: {{ email.bcc }}</div>
        <p></p>
        <span v-html="formattedBody"></span>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="() => this.$router.push('/emaillist')" text>
          Back to list
        </v-btn>
        <v-spacer></v-spacer>
        <!-- <v-btn
          @click="() => setSelected(selected - 1)"
          icon
          :disabled="selected <= 0"
        >
          <v-icon>mdi-arrow-left-bold</v-icon>
        </v-btn>
        <v-btn
          @click="() => setSelected(selected + 1)"
          icon
          :disabled="selected >= savedEmails.length - 1"
        >
          <v-icon>mdi-arrow-right-bold</v-icon>
        </v-btn> -->
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  data() {
    return {
      id: this.$route.params.id,
      loading: false,
      email: {},
    }
  },
  mounted() {
    const email = this.getEmailById(this.$route.params.id)
    if (email) {
      this.email = email
    } else {
      this.doFetch()
    }
  },
  methods: {
    // ...mapMutations(['setelected']),
    async doFetch() {
      this.loading = true
      const url = `${process.env.VUE_APP_EMAIL_SERVER}/email/${this.id}`
      console.log(url)
      const resp = await fetch(url)
      resp
        .json()
        .then((resp) => (this.email = resp))
        .catch(() => {}) // TODO: handle errors
        .then(() => (this.loading = false))
      // .then(() => console.log('fetch complete'))
    },
  },
  computed: {
    ...mapGetters(['getEmailById']),
    ...mapState(['emails']),
    formattedBody() {
      return this.email.body ? this.email.body.replace(/\n/g, '<br />') : ''
    },
  },
  watch: {
    // selected(newVal) {
    //   this.email = { ...this.savedEmails[this.selected] }
    // },
  },
}
</script>
