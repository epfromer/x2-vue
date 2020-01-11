<template>
  <!-- https://vuetifyjs.com/en/components/data-tables#data-tables -->
  <v-data-table
    :headers="headers"
    :items="emails"
    :items-per-page="queryParams.limit"
    :server-items-length="totalEmails"
    :loading="loading"
    @update:options="updateOptions"
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
            v-model="queryParams.senderSearchString"
            label="Search From"
            clearable
          ></v-text-field>
        </td>
        <td>
          <v-text-field
            v-model="queryParams.toSearchString"
            label="Search To"
            clearable
          ></v-text-field>
        </td>
        <td>
          <v-text-field
            v-model="queryParams.subjectSearchString"
            label="Search Subject"
            clearable
          ></v-text-field>
        </td>
      </tr>
    </template>
    <template v-slot:top>
      <v-text-field
        v-model="queryParams.allTextSearchString"
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
// TODO: multi-sort - https://vuetifyjs.com/en/components/data-tables#sort-on-multiple-columns
// TODO: dense - https://vuetifyjs.com/en/components/data-tables#dense
// TODO: footer props for end of list - https://vuetifyjs.com/en/components/data-tables#footer-props
// TODO: combine name + email addr into column for both send + received
import { mapMutations } from 'vuex'
import _ from 'lodash'

const DEFAULT_LIMIT = 5
const DEBOUNCE_MS = 500
const EXPANDED_BODY_LENGTH = 1000

export default {
  data: () => ({
    loading: false,
    emails: [],
    totalEmails: 0,
    expanded: [],
    queryParams: {
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
  mounted() {
    // prime the pump and get initial set of emails
    this.doQuery()
  },
  methods: {
    ...mapMutations(['setEmails']),
    // process events from data table
    async updateOptions(options) {
      this.queryParams.limit = options.itemsPerPage
      this.queryParams.skip = (options.page - 1) * this.queryParams.limit
      if (options.sortBy.length) {
        this.queryParams.sort = options.sortBy[0]
        this.queryParams.order = options.sortDesc[0] ? -1 : 1
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
          this.setEmails(this.emails) // to walk list
          this.totalEmails = data.total
        })
        // ignore errors
        .catch(() => {})
      this.loading = false
    },
    rowClick(details) {
      const i = this.emails.findIndex(email => email._id === details._id)
      this.$router.push({ name: 'EmailDetail', params: { i } })
    }
  },
  computed: {
    // encodes params as string
    encodedParams() {
      let params = ''
      Object.keys(this.queryParams).forEach(key => {
        if (
          (typeof this.queryParams[key] == 'string' && this.queryParams[key]) ||
          typeof this.queryParams[key] == 'number'
        ) {
          params += '&' + key + '=' + this.queryParams[key]
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
    'queryParams.allTextSearchString'(newValue, oldValue) {
      this.debouncedQuery()
    },
    'queryParams.toSearchString'(newValue, oldValue) {
      this.debouncedQuery()
    },
    'queryParams.senderSearchString'(newValue, oldValue) {
      this.debouncedQuery()
    },
    'queryParams.subjectSearchString'(newValue, oldValue) {
      this.debouncedQuery()
    },
    'queryParams.bodySearchString'(newValue, oldValue) {
      this.debouncedQuery()
    }
  },
  created() {
    this.debouncedQuery = _.debounce(() => this.doQuery(), DEBOUNCE_MS)
  }
}
</script>
