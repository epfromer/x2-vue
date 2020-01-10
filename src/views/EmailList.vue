<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="emails"
      :items-per-page="queryParams.limit"
      :server-items-length="totalEmails"
      :loading="loading"
      @update:options="updateOptions"
      class="elevation-1"
      :footer-props="{
        itemsPerPageOptions: [5, 10, 25, 50, 100]
      }"
    >
      <template v-slot:body.prepend>
        <tr>
          <td></td>
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
    </v-data-table>
    <!-- <router-link :to="{ name: 'EmailDetail', params: { id: 'abc123' } }"
      >abc123</router-link
    > -->
  </div>
</template>

<script>
// TODO: expandable rows - https://vuetifyjs.com/en/components/data-tables#expandable-rows
// TODO: multi-sort - https://vuetifyjs.com/en/components/data-tables#sort-on-multiple-columns
// TODO: dense - https://vuetifyjs.com/en/components/data-tables#dense
// TODO: footer props for end of list - https://vuetifyjs.com/en/components/data-tables#footer-props
// TODO: combine name + email addr into column for both send + received
import { mapGetters, mapActions } from 'vuex'
import _ from 'lodash'

const DEFAULT_SKIP = 0
const DEFAULT_LIMIT = 10
const DEBOUNCE_MS = 500

export default {
  data: () => ({
    loading: false,
    emails: [],
    totalEmails: 0,
    queryParams: {
      skip: DEFAULT_SKIP,
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
          this.totalEmails = data.total
        })
        // ignore errors
        .catch(() => {})
      this.loading = false
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
