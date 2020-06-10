<template>
  <div>
    <v-card class="elevation-1" data-testid="emailcard">
      <EmailCardActions :id="email._id" />
      <v-card-title><span v-html="highlight(email.subject)" /></v-card-title>
      <v-card-text class="text--primary">
        <div>Sent: <span v-html="highlight(email.sent)" /></div>
        <div>From: <span v-html="highlight(email.from)" /></div>
        <div>To: <span v-html="highlight(email.to)" /></div>
        <div>CC: <span v-html="highlight(email.cc)" /></div>
        <div>BCC: <span v-html="highlight(email.bcc)" /></div>
        <p></p>
        <span v-html="highlight(email.body.replace(/\n/g, '<br />'))" />
      </v-card-text>
      <EmailCardActions :id="email._id" />
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import EmailCardActions from '../components/emaillist/EmailCardActions'

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
    highlight(str) {
      let s = str
      if (!s) return ''
      this.highlightedTerms.forEach((term) => {
        s = s.replace(
          new RegExp(`(${term})`, 'gi'),
          `<span style="background-color:yellow; color:black">$1</span>`
        )
      })
      return s
    },
  },
  computed: {
    ...mapGetters(['getEmailById']),
    ...mapState(['emails', 'allText', 'to', 'from', 'subject', 'body']),
    highlightedTerms() {
      const terms = []
      if (this.allText) terms.push(this.allText)
      if (this.to) terms.push(this.to)
      if (this.from) terms.push(this.from)
      if (this.subject) terms.push(this.subject)
      if (this.body) terms.push(this.body)
      return terms
    },
  },
}
</script>
