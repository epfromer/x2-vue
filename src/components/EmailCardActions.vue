<template>
  <v-card-actions>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn @click="() => $router.push('/emaillist')" v-on="on" text>
          <v-icon>mdi-arrow-left-bold</v-icon>
        </v-btn>
      </template>
      <span>Back to list</span>
    </v-tooltip>
    <v-spacer></v-spacer>
    <span v-if="totalEmails">{{ emailIndex }} of {{ totalEmails }}</span>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          @click="() => $router.push(`/emaildetail/${previousEmailId}`)"
          v-on="on"
          text
          :disabled="!previousEmailId"
        >
          <v-icon>mdi-menu-left</v-icon>
        </v-btn>
      </template>
      <span>Previous email</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <v-btn
          @click="() => $router.push(`/emaildetail/${nextEmailId}`)"
          v-on="on"
          text
          :disabled="!nextEmailId"
        >
          <v-icon>mdi-menu-right</v-icon>
        </v-btn>
      </template>
      <span>Next email</span>
    </v-tooltip>
  </v-card-actions>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  props: { id: { type: String } },
  computed: {
    ...mapState(['emails']),
    ...mapGetters(['getPreviousEmail', 'getNextEmail', 'getEmailIndex']),
    previousEmailId() {
      const email = this.getPreviousEmail(this.id)
      return email ? email._id : null
    },
    nextEmailId() {
      const email = this.getNextEmail(this.id)
      return email ? email._id : null
    },
    emailIndex() {
      return this.getEmailIndex(this.id)
    },
    totalEmails() {
      return this.emails.length
    },
  },
}
</script>
