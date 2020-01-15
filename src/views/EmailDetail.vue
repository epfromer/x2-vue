<template>
  <div>
    <v-card class="elevation-1 ">
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
          :disabled="selected >= savedEmails.length - 1"
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
  data: () => ({
    email: {}
  }),
  mounted() {
    this.email = { ...this.savedEmails[this.selected] }
  },
  methods: {
    ...mapMutations(['setSelected'])
  },
  computed: {
    ...mapState(['selected', 'savedEmails']),
    formattedBody() {
      return this.email.body ? this.email.body.replace(/\n/g, '<br />') : ''
    }
  },
  watch: {
    selected(newVal) {
      this.email = { ...this.savedEmails[this.selected] }
    }
  }
}
</script>
