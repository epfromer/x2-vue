<template>
  <div>
    <v-card class="elevation-1">
      <EmailCardActions :id="email._id" />
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
      <EmailCardActions :id="email._id" />
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import EmailCardActions from '../components/EmailCardActions'

export default {
  data() {
    return {
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
  beforeRouteUpdate(to, from, next) {
    const email = this.getEmailById(to.params.id)
    if (email) {
      this.email = email
    } else {
      this.doFetch()
    }
    next()
  },
  components: {
    EmailCardActions,
  },
  methods: {
    // ...mapMutations(['setelected']),
    async doFetch() {
      this.loading = true
      const url = `${process.env.VUE_APP_EMAIL_SERVER}/email/${this.$route.params.id}`
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
}
</script>