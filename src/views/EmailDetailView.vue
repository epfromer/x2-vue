<template>
  <div>
    <v-card class="elevation-1" data-testid="emailcard">
      <EmailCardActions :id="email.id" />
      <v-card-title><span v-html="highlight(email.subject)" /></v-card-title>
      <v-card-text class="text--primary">
        <div>Sent: <span v-html="highlight(email.sent)" /></div>
        <div>From: <span v-html="highlight(email.from)" /></div>
        <div>To: <span v-html="highlight(email.to)" /></div>
        <div>CC: <span v-html="highlight(email.cc)" /></div>
        <div>BCC: <span v-html="highlight(email.bcc)" /></div>
        <p></p>
        <span
          v-html="
            highlight(email.body ? email.body.replace(/\n/g, '<br />') : '')
          "
        />
      </v-card-text>
      <EmailCardActions :id="email.id" />
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import request, { gql } from 'graphql-request'
import EmailCardActions from '../components/emaillist/EmailCardActions'

export default {
  data() {
    return {
      loading: false,
      id: '',
      email: {},
    }
  },
  mounted() {
    this.getEmail(this.$route.params.id)
  },
  beforeRouteUpdate(to, from, next) {
    this.getEmail(to.params.id)
    next()
  },
  components: {
    EmailCardActions,
  },
  methods: {
    getEmail(id) {
      this.id = id
      const email = this.getEmailById(this.id)
      if (email) {
        this.email = email
      } else {
        this.doFetch()
      }
    },
    async doFetch() {
      console.log('do fetch')
      this.loading = true
      const server = process.env.VUE_APP_X2_SERVER
      const query = gql`
        query getEmail($id: ID) {
          getEmail(id: $id) {
            emails {
              id
              sent
              sentShort
              from
              fromCustodian
              to
              toCustodians
              cc
              bcc
              subject
              body
            }
            total
          }
        }
      `
      request(`${server}/graphql/`, query, { id: this.id })
        .then((data) => {
          this.email = data.getEmail.emails[0]
          this.loading = false
        })
        .catch((e) => console.error(e))
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
    ...mapState(['allText', 'to', 'from', 'subject', 'body']),
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
