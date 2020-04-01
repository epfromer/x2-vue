<template>
  <!-- https://vuetifyjs.com/en/components/data-tables#data-tables -->
  <v-data-table
    :headers="headers"
    :items="emails"
    :server-items-length="totalEmails"
    :loading="loading"
    @click:row="rowClick"
    class="elevation-1"
    :items-per-page.sync="options.itemsPerPage"
    :page.sync="options.page"
    :sort-by.sync="options.sortBy"
    :sort-desc.sync="options.sortDesc"
    show-expand
    item-key="_id"
    :single-expand="true"
    :expanded.sync="expanded"
    single-select
    show-select
    v-model="emailSelected"
    :footer-props="{
      itemsPerPageOptions: [5, 10, 25, 50, 100],
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
</template>

<script>
// TODO multi-sort - https://vuetifyjs.com/en/components/data-tables#sort-on-multiple-columns
// TODO dense - https://vuetifyjs.com/en/components/data-tables#dense
// TODO footer props for end of list - https://vuetifyjs.com/en/components/data-tables#footer-props
// TODO combine name + email addr into column for both send + received
import { mapMutations, mapGetters, mapState } from 'vuex'
import _ from 'lodash'

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 5
const DEBOUNCE_MS = 500
const EXPANDED_BODY_LENGTH = 1000

export default {
  data: () => ({
    loading: false,
    emails: [],
    totalEmails: 0,
    expanded: [],
    emailSelected: [],
    options: {
      page: DEFAULT_PAGE,
      itemsPerPage: DEFAULT_LIMIT,
      sortBy: [],
      sortDesc: [],
    },
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
      clientSubmitTimeSpan: '',
    },
    headers: [
      {
        text: 'Sent',
        align: 'left',
        sortable: true,
        value: 'clientSubmitTime',
      },
      {
        text: 'From',
        align: 'left',
        sortable: true,
        value: 'senderName',
      },
      {
        text: 'To',
        align: 'left',
        sortable: true,
        value: 'displayTo',
      },
      {
        text: 'Subject',
        align: 'left',
        sortable: true,
        value: 'subject',
      },
    ],
  }),
  methods: {
    ...mapMutations(['saveQuery', 'saveEmails', 'saveOptions', 'setSelected']),
    // performs query of database REST interface
    async doQuery() {
      this.query.skip = (this.options.page - 1) * this.query.limit
      this.query.limit = this.options.itemsPerPage
      if (this.options.sortBy.length) {
        this.query.sort = this.options.sortBy[0]
        this.query.order = this.options.sortDesc[0] ? -1 : 1
      }

      this.loading = true
      await fetch(
        `${process.env.VUE_APP_EMAIL_SERVER}/email/${this.encodedParams}`
      )
        .then((resp) => resp.json())
        .then((data) => {
          this.emails = data.listDocs
          this.totalEmails = data.total
        })
        .catch(() => {}) // TODO: handle errors
        .then(() => (this.loading = false))
    },
    saveState(sel) {
      // saves state to Vuex store
      this.setSelected(sel)
      this.saveQuery(this.query)
      this.saveEmails(this.emails)
      this.saveOptions(this.options)
    },
    restoreState() {
      // restores state from Vuex store
      this.query = { ...this.savedQuery }
      this.emails = this.savedEmails.map((email) => ({ ...email }))
      this.options = { ...this.savedOptions }
      this.emailSelected[0] = this.emails[this.selected]
    },
    rowClick(details) {
      const sel = this.emails.findIndex((email) => email._id === details._id)
      this.saveState(sel)
      this.$router.push({ name: 'EmailDetail' })
    },
    resetPage() {
      this.options.page = DEFAULT_PAGE
      this.doQuery()
    },
  },
  computed: {
    ...mapState(['savedEmails', 'savedQuery', 'savedOptions', 'selected']),
    // encodes params as string
    encodedParams() {
      let params = ''
      Object.keys(this.query).forEach((key) => {
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
    },
  },
  watch: {
    'options.itemsPerPage'() {
      this.doQuery()
    },
    'options.page'() {
      this.doQuery()
    },
    'options.sortBy'() {
      this.doQuery()
    },
    'options.sortDesc'() {
      this.doQuery()
    },
    'query.allTextSearchString'() {
      this.debouncedQuery()
    },
    'query.toSearchString'() {
      this.debouncedQuery()
    },
    'query.senderSearchString'() {
      this.debouncedQuery()
    },
    'query.subjectSearchString'() {
      this.debouncedQuery()
    },
    'query.bodySearchString'() {
      this.debouncedQuery()
    },
    emailSelected(newValue) {
      const sel = this.emails.findIndex(
        (email) => email._id === newValue[0]._id
      )
      this.saveState(sel)
      this.$router.push({ name: 'EmailDetail' })
    },
  },
  created() {
    this.debouncedQuery = _.debounce(() => this.resetPage(), DEBOUNCE_MS)

    this.doQuery()
    // if (this.savedQuery && this.savedQuery.hasOwnProperty('skip')) {
    //   // been here before - just restore settings
    //   this.restoreState()
    // }
  },
}
</script>
