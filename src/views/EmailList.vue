<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="emails"
      :items-per-page="limit"
      :server-items-length="totalEmails"
      :loading="loading"
      @update:options="updateOptions"
      class="elevation-1"
      :footer-props="{
        itemsPerPageOptions: [5, 10, 25, 50, 100]
      }"
    >
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

export default {
  data: () => ({
    loading: false,
    searchAllText: '',
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
  computed: {
    ...mapGetters(['emails', 'totalEmails', 'limit', 'allTextSearchString'])
  },
  methods: {
    ...mapActions(['queryEmails']),
    async updateOptions(options) {
      const query = {
        skip: (options.page - 1) * this.limit,
        limit: options.itemsPerPage
      }

      if (options.sortBy.length) {
        query.sortField = options.sortBy[0]
        query.sortOrder = options.sortDesc[0] ? -1 : 1
      }

      await this.doQuery(query)
    },
    async doQuery(query) {
      this.loading = true
      await this.queryEmails(query)
      this.loading = false
    }
  },
  watch: {
    searchAllText(newValue, oldValue) {
      this.debouncedSearchAllText()
    }
  },
  created() {
    this.debouncedSearchAllText = _.debounce(
      () => this.doQuery({ skip: 0, allTextSearchString: this.searchAllText }),
      500
    )
  }
}
</script>
