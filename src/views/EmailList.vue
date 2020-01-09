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
        console.log(options)
        console.log('sort by')
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
    ...mapGetters(['emails', 'totalEmails', 'limit'])
  }
}
</script>
