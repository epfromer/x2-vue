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
              v-model="searchFrom"
              label="Search From"
            ></v-text-field>
          </td>
          <td>
            <v-text-field v-model="searchTo" label="Search To"></v-text-field>
          </td>
          <td>
            <v-text-field
              v-model="searchSubject"
              label="Search Subject"
            ></v-text-field>
          </td>
        </tr>
      </template>
      <template v-slot:top>
        <v-text-field
          v-model="searchAllText"
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
// TODO: filtering for each column - https://vuetifyjs.com/en/components/data-tables#custom-filtering
// TODO: expandable rows - https://vuetifyjs.com/en/components/data-tables#expandable-rows
// TODO: multi-sort - https://vuetifyjs.com/en/components/data-tables#sort-on-multiple-columns
// TODO: dense - https://vuetifyjs.com/en/components/data-tables#dense
// TODO: footer props for end of list - https://vuetifyjs.com/en/components/data-tables#footer-props
// TODO: combine name + email addr into column for both send + received
import { mapGetters, mapActions } from 'vuex'
import _ from 'lodash'

const DEFAULT_SKIP = 0
const DEFAULT_LIMIT = 10

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
      order: ''
    },
    searchAllText: '',
    searchFrom: '',
    searchTo: '',
    searchSubject: '',
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
      let params = `?skip=${this.queryParams.skip}&limit=${this.queryParams.limit}`
      params += this.toSearchString
        ? `&toSearchString=${encodeURIComponent(this.toSearchString)}`
        : ''
      params += this.senderSearchString
        ? `&senderSearchString=${encodeURIComponent(this.senderSearchString)}`
        : ''
      params += this.subjectSearchString
        ? `&subjectSearchString=${encodeURIComponent(this.subjectSearchString)}`
        : ''
      params += this.bodySearchString
        ? `&bodySearchString=${encodeURIComponent(this.bodySearchString)}`
        : ''
      params += this.clientSubmitTimeSearchString
        ? `&clientSubmitTimeSearchString=${encodeURIComponent(
            this.clientSubmitTimeSearchString
          )}`
        : ''
      params += this.clientSubmitTimeSpan
        ? `&clientSubmitTimeSpan=${encodeURIComponent(
            this.clientSubmitTimeSpan
          )}`
        : ''
      params += this.allTextSearchString
        ? `&allTextSearchString=${encodeURIComponent(this.allTextSearchString)}`
        : ''
      params += this.queryParams.sort
        ? `&sort=${this.queryParams.sort}&order=${this.queryParams.order}`
        : ''
      console.log(params)
      return params
    }
  },
  watch: {
    searchAllText(newValue, oldValue) {
      this.debouncedSearchAllText()
    },
    searchFrom(newValue, oldValue) {
      this.debouncedSearchFrom()
    }
  },
  created() {
    this.debouncedSearchAllText = _.debounce(
      () => this.doQuery({ skip: 0, allTextSearchString: this.searchAllText }),
      500
    )
    this.debouncedSearchFrom = _.debounce(() => {
      this.searchAllText = ''
      this.doQuery({
        skip: 0,
        allTextSearchString: '',
        senderSearchString: this.searchFrom
      })
    }, 500)
  }
}
</script>
