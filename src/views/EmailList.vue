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
    ></v-data-table>
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

export default {
  data: () => ({
    loading: false,
    options: {},
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

      // perform query when something changes
      this.loading = true
      await this.queryEmails(query)
      this.loading = false
    }
  },
  computed: {
    ...mapGetters(['emails', 'totalEmails', 'limit', 'dark'])
  }
}
</script>
