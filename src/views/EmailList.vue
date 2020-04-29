<template>
  <!-- https://vuetifyjs.com/en/components/data-tables#data-tables -->
  <div>
    <v-data-table
      :headers="headers"
      :items="emailList"
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
      :dense="densePadding"
      :footer-props="{ itemsPerPageOptions: [5, 10, 25, 50, 100] }"
    >
      <template v-slot:body.prepend>
        <tr>
          <td colspan="1">
            <v-btn @click="() => (openFilterDate = true)" text>
              <v-icon>calendar_today</v-icon>
            </v-btn>
          </td>
          <td>
            <v-text-field
              v-model="querySent"
              label="Filter Sent"
              clearable
            ></v-text-field>
          </td>
          <td>
            <v-text-field
              v-model="queryFrom"
              label="Filter From"
              clearable
            ></v-text-field>
          </td>
          <td>
            <v-text-field
              v-model="queryTo"
              label="Filter To"
              clearable
            ></v-text-field>
          </td>
          <td>
            <v-text-field
              v-model="querySubject"
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
    <FilterDate
      :open="openFilterDate"
      :date="sent ? sent : '2000-10-04'"
      :span="timeSpan"
      :onClear="() => handleTimeSpan('', 0)"
      :onClose="(sent, span) => handleTimeSpan(sent, span)"
    />
  </div>
</template>

<script>
// TODO multi-sort - https://vuetifyjs.com/en/components/data-tables#sort-on-multiple-columns
// TODO dense - https://vuetifyjs.com/en/components/data-tables#dense
// TODO footer props for end of list - https://vuetifyjs.com/en/components/data-tables#footer-props
import { mapMutations, mapGetters, mapState } from 'vuex'
import FilterDate from '../components/FilterDate'
import _ from 'lodash'

const DEBOUNCE_MS = 500
const EXPANDED_BODY_LENGTH = 1000

export default {
  data() {
    return {
      loading: false,
      openFilterDate: false,
      expanded: [],
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
    }
  },
  components: {
    FilterDate,
  },
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
      const {
        emailListPage,
        emailListItemsPerPage,
        querySort,
        queryOrder,
        sent,
        timeSpan,
        from,
        to,
        subject,
        allText,
      } = this

      const query = {
        skip: (emailListPage - 1) * emailListItemsPerPage,
        limit: emailListItemsPerPage,
        sort: querySort,
        order: queryOrder,
      }
      if (sent) query.sent = sent
      if (timeSpan) query.timeSpan = timeSpan
      if (from) query.from = from
      if (to) query.to = to
      if (subject) query.subject = subject
      if (allText) query.allText = allText

      const encodedQuery = this.encodeQuery(query)

      this.loading = true
      const url = `${process.env.VUE_APP_EMAIL_SERVER}/email/${encodedQuery}`
      console.log(url)
      const resp = await fetch(url)
      resp
        .json()
        .then((resp) => {
          // prettify email sent dates
          this.emailList = resp.emails.map((email) => ({
            ...email,
            sent: email.sent.slice(0, 10) + ' ' + email.sent.slice(11, 19),
          }))
          this.total = resp.total
        })
        .catch(() => {}) // TODO: handle errors
        .then(() => (this.loading = false))
    },
    rowClick(details) {
      this.$router.push({ name: 'EmailDetail', params: { id: details._id } })
    },
    handleTimeSpan(sent, span) {
      this.openFilterDate = false
      if (sent != undefined) this.querySent = sent
      if (span != undefined) this.queryTimeSpan = span
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
    queryTimeSpan: {
      get() {
        return this.timeSpan
      },
      set(v) {
        this.setVuexState({ k: 'timeSpan', v })
      },
    },
    queryFrom: {
      get() {
        return this.from
      },
      set(v) {
        this.setVuexState({ k: 'from', v })
      },
    },
    queryTo: {
      get() {
        return this.to
      },
      set(v) {
        this.setVuexState({ k: 'to', v })
      },
    },
    querySubject: {
      get() {
        return this.subject
      },
      set(v) {
        this.setVuexState({ k: 'subject', v })
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
    queryTimeSpan() {
      this.doQuery()
    },
    queryAllText() {
      this.debouncedQuery()
    },
    querySent() {
      this.debouncedQuery()
    },
    queryFrom() {
      this.debouncedQuery()
    },
    queryTo() {
      this.debouncedQuery()
    },
    querySubject() {
      this.debouncedQuery()
    },
  },
  created() {
    this.debouncedQuery = _.debounce(() => this.doQuery(), DEBOUNCE_MS)
    this.doQuery()
  },
}
</script>
