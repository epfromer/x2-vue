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
    :items-per-page.sync="itemsPerPage"
    must-sort
    :sort-by.sync="sortBy"
    :sort-desc.sync="sortOrder"
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
            v-model="querySent"
            label="Filter Sent"
            clearable
          ></v-text-field>
        </td>
        <td>
          <v-text-field
            v-model="query.senderSearchString"
            label="Filter From"
            clearable
          ></v-text-field>
        </td>
        <td>
          <v-text-field
            v-model="query.to"
            label="Filter To"
            clearable
          ></v-text-field>
        </td>
        <td>
          <v-text-field
            v-model="query.subjectSearchString"
            label="Filter Subject"
            clearable
          ></v-text-field>
        </td>
      </tr>
    </template>
    <template v-slot:top>
      <v-text-field
        v-model="queryAllText"
        label="Filter (all text fields)"
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

const DEFAULT_LIMIT = 5
const DEBOUNCE_MS = 500
const EXPANDED_BODY_LENGTH = 1000

export default {
  data: () => ({
    loading: false,
    expanded: [],
    emailSelected: [],
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
    ...mapMutations(['setVuexState']),
    encodeQuery(q) {
      // encode query for URL
      let params = ''
      Object.keys(q).forEach((key) => {
        if (
          (typeof q[key] == 'string' && q[key]) ||
          typeof q[key] == 'number'
        ) {
          params += '&' + key + '=' + q[key]
        }
      })
      return '?' + params.slice(1)
    },
    async doQuery() {
      // todo: move this to separate file like react
      const query = {
        skip: (this.page - 1) * this.emailListItemsPerPage,
        limit: this.emailListItemsPerPage,
        sort: this.querySort,
        order: this.queryOrder,
      }

      if (this.allText) query.allText = this.allText
      if (this.sent) query.sent = this.sent

      const encodedQuery = this.encodeQuery(query)

      this.loading = true
      const url = `${process.env.VUE_APP_EMAIL_SERVER}/email/${encodedQuery}`
      console.log(url)
      const resp = await fetch(url)
      resp
        .json()
        .then((resp) => {
          // prettify email sent dates
          this.emailList = resp.listDocs.map((email) => ({
            ...email,
            sent: email.sent.slice(0, 10) + ' ' + email.sent.slice(11, 19),
          }))
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
      this.page = 1
    },
  },
  computed: {
    ...mapState([
      'emails',
      'totalEmails',
      'emailListPage',
      'emailListItemsPerPage',
      'querySort',
      'queryOrder',
      'sent',
      'timeSpan',
      'from',
      'to',
      'subject',
      'allText',
      'densePadding',
      'darkMode',
    ]),

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
    itemsPerPage: {
      get() {
        return this.emailListItemsPerPage
      },
      set(v) {
        this.setVuexState({ k: 'emailListItemsPerPage', v })
      },
    },
    sortBy: {
      get() {
        return [this.querySort]
      },
      set(arr) {
        this.setVuexState({ k: 'querySort', v: arr[0] })
      },
    },
    sortOrder: {
      get() {
        return [this.queryOrder > 0 ? false : true]
      },
      set(arr) {
        this.setVuexState({ k: 'queryOrder', v: arr[0] ? -1 : 1 })
      },
    },
    queryAllText: {
      get() {
        return this.allText
      },
      set(v) {
        this.setVuexState({ k: 'allText', v })
      },
    },
    querySent: {
      get() {
        return this.sent
      },
      set(v) {
        this.setVuexState({ k: 'sent', v })
      },
    },
  },
  watch: {
    itemsPerPage() {
      this.doQuery()
    },
    page() {
      this.doQuery()
    },
    sortBy() {
      this.doQuery()
    },
    sortOrder() {
      this.doQuery()
    },
    queryAllText() {
      this.debouncedQuery()
    },
    querySent() {
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
    this.debouncedQuery = _.debounce(() => this.doQuery(), DEBOUNCE_MS)

    this.doQuery()
    // if (this.savedQuery && this.savedQuery.hasOwnProperty('skip')) {
    //   // been here before - just restore settings
    //   this.restoreState()
    // }
  },
}
</script>
