<template>
  <v-container fluid>
    <v-btn
      @click="onClearHistory"
      class="button"
      elevation="2"
      color="secondary"
    >
      Clear History
    </v-btn>
    <v-data-table
      :headers="headers"
      :items="log"
      :loading="logLoading"
      @click:row="onSearchHistory"
      class="elevation-1"
      must-sort
      item-key="id"
      :dense="true"
      data-testid="datatable"
    >
    </v-data-table>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'
import request, { gql } from 'graphql-request'

export default {
  data() {
    return {
      logLoading: false,
      log: [],
      headers: [
        {
          text: 'Date',
          sortable: true,
          value: 'timestamp',
        },
        {
          text: 'Search',
          sortable: true,
          value: 'entry',
        },
      ],
    }
  },
  mounted() {
    this.getSearchHistory()
  },
  methods: {
    ...mapActions(['getEmailAsync']),
    ...mapMutations([
      'clearSearch',
      'setAllText',
      'setBody',
      'setFrom',
      'setFrom',
      'setOrder',
      'setSent',
      'setSort',
      'setSubject',
      'setTo',
    ]),
    getSearchHistory() {
      this.logLoading = true
      const server = process.env.VUE_APP_X2_SERVER
      const query = gql`
        {
          getSearchHistory {
            id
            timestamp
            entry
          }
        }
      `
      request(`${server}/graphql/`, query)
        .then((data) => {
          this.log = data.getSearchHistory
          this.logLoading = false
        })
        .catch((e) => console.error(e))
    },
    onSearchHistory(e) {
      const o = JSON.parse(e.entry)
      this.clearSearch()
      if (o.hasOwnProperty('sort')) this.setSort(o.sort)
      if (o.hasOwnProperty('order')) this.setOrder(o.order)
      if (o.hasOwnProperty('sent')) this.setSent(o.sent)
      if (o.hasOwnProperty('from')) this.setFrom(o.from)
      if (o.hasOwnProperty('to')) this.setTo(o.to)
      if (o.hasOwnProperty('subject')) this.setSubject(o.subject)
      if (o.hasOwnProperty('allText')) this.setAllText(o.allText)
      if (o.hasOwnProperty('body')) this.setBody(o.body)
      this.getEmailAsync()
      this.$router.push({ name: 'SearchView' }).catch((e) => console.error(e))
    },
    onClearHistory() {
      const server = process.env.VUE_APP_X2_SERVER
      const mutation = gql`
        mutation {
          clearSearchHistory
        }
      `
      request(`${server}/graphql/`, mutation)
        .then(this.getSearchHistory)
        .catch((e) => console.error(e))
    },
  },
}
</script>

<style scoped>
.button {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
