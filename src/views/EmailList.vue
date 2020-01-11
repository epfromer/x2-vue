<template>
  <!-- https://vuetifyjs.com/en/components/data-tables#data-tables -->
  <v-data-table
    :headers="headers"
    :items="emails"
    :items-per-page="query.limit"
    :server-items-length="totalEmails"
    :loading="loading"
    :options.sync="options"
    @update:options="queryChanged"
    @click:row="rowClick"
    class="elevation-1"
    show-expand
    item-key="_id"
    :single-expand="true"
    :expanded.sync="expanded"
    :footer-props="{
      itemsPerPageOptions: [5, 10, 25, 50, 100]
    }"
  >
    <template v-slot:body.prepend>
      <tr>
        <td colspan="2"></td>
        <td>
          <v-text-field
            v-model="query.senderSearchString"
            label="Search From"
            clearable
          ></v-text-field>
        </td>
        <td>
          <v-text-field
            v-model="query.toSearchString"
            label="Search To"
            clearable
          ></v-text-field>
        </td>
        <td>
          <v-text-field
            v-model="query.subjectSearchString"
            label="Search Subject"
            clearable
          ></v-text-field>
        </td>
      </tr>
    </template>
    <template v-slot:top>
      <v-text-field
        v-model="query.allTextSearchString"
        label="Search (all text fields)"
        clearable
        class="mx-4"
      ></v-text-field>
    </template>
    <template v-slot:expanded-item="{ headers }">
      <td :colspan="headers.length">{{ expandedBody }}</td>
    </template>
  </v-data-table>
  <!-- <router-link :to="{ name: 'EmailDetail', params: { id: 'abc123' } }"
      >abc123</router-link
    > -->
</template>

<script>
// TODO currently selected email
// TODO persist query in Vuex
// TODO multi-sort - https://vuetifyjs.com/en/components/data-tables#sort-on-multiple-columns
// TODO dense - https://vuetifyjs.com/en/components/data-tables#dense
// TODO footer props for end of list - https://vuetifyjs.com/en/components/data-tables#footer-props
// TODO combine name + email addr into column for both send + received
import { mapMutations, mapGetters, mapState } from 'vuex'
import _ from 'lodash'

const DEFAULT_LIMIT = 5
const DEBOUNCE_MS = 500
const EXPANDED_BODY_LENGTH = 1000

export default {
  data: () => ({
    loading: false,
    options: {},
    emails: [],
    totalEmails: 0,
    expanded: [],
    query: {
      skip: 0,
      limit: DEFAULT_LIMIT,
      allTextSearchString: '',
      sort: '',
      order: '',
      toSearchString: '',
      senderSearchString: '',
      subjectSearchString: '',
      bodySearchString: '',
      clientSubmitTimeSearchString: '',
      clientSubmitTimeSpan: ''
    },
    headers: [
      {
        text: 'Sent',
        align: 'left',
        sortable: true,
        value: 'clientSubmitTime'
      },
      {
        text: 'From',
        align: 'left',
        sortable: true,
        value: 'senderName'
      },
      {
        text: 'To',
        align: 'left',
        sortable: true,
        value: 'displayTo'
      },
      {
        text: 'Subject',
        align: 'left',
        sortable: true,
        value: 'subject'
      }
    ]
  }),
  methods: {
    ...mapMutations(['saveQuery', 'saveEmails', 'saveOptions']),
    // process events from data table
    async queryChanged() {
      this.query.limit = this.options.itemsPerPage
      this.query.skip = (this.options.page - 1) * this.query.limit
      if (this.options.sortBy.length) {
        this.query.sort = this.options.sortBy[0]
        this.query.order = this.options.sortDesc[0] ? -1 : 1
      }
      await this.doQuery()
    },
    // performs query of database REST interface
    async doQuery() {
      this.loading = true
      await fetch(
        `${process.env.VUE_APP_EMAIL_SERVER}/email/${this.encodedParams}`
      )
        .then(resp => resp.json())
        .then(data => {
          this.emails = data.listDocs
          this.totalEmails = data.total
        })
        // ignore errors
        .catch(() => {})
      this.loading = false
    },
    saveState() {
      // saves state to Vuex store
      this.saveQuery(this.query)
      this.saveEmails(this.emails)
      this.saveOptions(this.options)
    },
    restoreState() {
      // restores state from Vuex store
      this.query = { ...this.savedQuery }
      this.emails = this.savedEmails.map(email => ({ ...email }))
      this.options = { ...this.savedOptions }
    },
    rowClick(details) {
      this.saveState()
      const i = this.emails.findIndex(email => email._id === details._id)
      this.$router.push({ name: 'EmailDetail', params: { i } })
    },
    resetPage() {
      this.options.page = 1
      this.queryChanged()
    }
  },
  computed: {
    ...mapState(['savedEmails', 'savedQuery', 'savedOptions']),
    // encodes params as string
    encodedParams() {
      let params = ''
      Object.keys(this.query).forEach(key => {
        if (
          (typeof this.query[key] == 'string' && this.query[key]) ||
          typeof this.query[key] == 'number'
        ) {
          params += '&' + key + '=' + this.query[key]
        }
      })
      return '?' + params.slice(1)
    },
    // row is expanded, display a portion of email body
    expandedBody() {
      if (this.expanded.length) {
        return this.expanded[0].body.slice(0, EXPANDED_BODY_LENGTH)
      }
      return ''
    }
  },
  watch: {
    'query.allTextSearchString'(newValue, oldValue) {
      this.debouncedQuery()
    },
    'query.toSearchString'(newValue, oldValue) {
      this.debouncedQuery()
    },
    'query.senderSearchString'(newValue, oldValue) {
      this.debouncedQuery()
    },
    'query.subjectSearchString'(newValue, oldValue) {
      this.debouncedQuery()
    },
    'query.bodySearchString'(newValue, oldValue) {
      this.debouncedQuery()
    }
  },
  created() {
    this.debouncedQuery = _.debounce(() => this.resetPage(), DEBOUNCE_MS)
    if (this.savedQuery.hasOwnProperty('skip')) {
      // been here before - just restore settings
      this.restoreState()
    }
  }
}
</script>
