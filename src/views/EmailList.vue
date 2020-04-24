<template>
  <!-- https://vuetifyjs.com/en/components/data-tables#data-tables -->
  <v-data-table
    :headers="headers"
    :items="emails"
    :server-items-length="total"
    :loading="loading"
    @click:row="rowClick"
    class="elevation-1"
    :page.sync="page"
    :items-per-page.sync="emailListItemsPerPage"
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
            v-model="query.to"
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
        v-model="query.allText"
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
    expanded: [],
    emailSelected: [],
    options: {
      sortBy: [],
      sortDesc: [],
    },
    query: {
      skip: 0,
      limit: DEFAULT_LIMIT,
      allText: '',
      sort: '',
      order: '',
      to: '',
      senderSearchString: '',
      subjectSearchString: '',
      bodySearchString: '',
      clientSubmitTimeSearchString: '',
      clientSubmitTimeSpan: '',
    },
    headers: [
      {
        text: 'Sent',
        sortable: true,
        value: 'sent',
      },
      {
        text: 'From',
        sortable: true,
        value: 'from',
      },
      {
        text: 'To',
        sortable: true,
        value: 'to',
      },
      {
        text: 'Subject',
        sortable: true,
        value: 'subject',
      },
    ],
  }),
  methods: {
    ...mapMutations([
      'saveQuery',
      'saveOptions',
      'setSelected',
      'setEmailListItemsPerPage',
      'setVuexState',
    ]),
    // performs query of database REST interface
    async doQuery() {
      // todo: move this to separate file like react
      this.query.skip = (this.page - 1) * this.emailListItemsPerPage
      this.query.limit = this.emailListItemsPerPage
      if (this.options.sortBy.length) {
        this.query.sort = this.options.sortBy[0]
        this.query.order = this.options.sortDesc[0] ? -1 : 1
      }

      this.loading = true
      const url = `${process.env.VUE_APP_EMAIL_SERVER}/email/${this.encodedParams}`
      console.log(url)
      const resp = await fetch(url)
      resp
        .json()
        .then((resp) => {
          this.emailList = resp.listDocs
          this.total = resp.total
        })
        .catch(() => {}) // TODO: handle errors
        .then(() => (this.loading = false))
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
    ...mapState([
      'savedQuery',
      'savedOptions',
      'selected',
      'emails',
      'totalEmails',
      'emailListPage',
      'emailListItemsPerPage',
    ]),
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
    emailList: {
      get() {
        return this.emails
      },
      set(v) {
        this.setVuexState({ k: 'emails', v })
      },
    },
    total: {
      get() {
        return this.totalEmails
      },
      set(v) {
        this.setVuexState({ k: 'totalEmails', v })
      },
    },
    page: {
      get() {
        return this.emailListPage
      },
      set(v) {
        this.setVuexState({ k: 'emailListPage', v })
      },
    },
  },
  watch: {
    'options.itemsPerPage'() {
      this.doQuery()
    },
    page() {
      this.doQuery()
    },
    'options.sortBy'() {
      this.doQuery()
    },
    'options.sortDesc'() {
      this.doQuery()
    },
    'query.allText'() {
      this.debouncedQuery()
    },
    'query.to'() {
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
