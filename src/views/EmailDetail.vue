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
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
// make this into a local filter
// const formatBody = body => ({ __html: body.replace(/\n/g, '<br />') });
// <CardText align="left" dangerouslySetInnerHTML={formatBody(props.body)} />

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data: () => ({
    loading: false,
    email: {}
  }),
  mounted() {
    // prime the pump and get initial set of emails
    this.doQuery()
  },
  methods: {
    async doQuery() {
      this.loading = true
      await fetch(`${process.env.VUE_APP_EMAIL_SERVER}/email/${this.id}`)
        .then(resp => resp.json())
        .then(data => {
          this.email = data
        })
        // ignore errors
        .catch(() => {})
      this.loading = false
    }
  },
  computed: {
    formattedBody() {
      return this.email.body.replace(/\n/g, '<br />')
    }
  }
}
</script>

<style scoped></style>
