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
        sortable: false,
        value: 'clientSubmitTime'
      },
      {
        text: 'From',
        align: 'left',
        sortable: false,
        value: 'senderName'
      },
      {
        text: 'To',
        align: 'left',
        sortable: false,
        value: 'displayTo'
      },
      {
        text: 'Subject',
        align: 'left',
        sortable: false,
        value: 'subject'
      }
    ]
  }),
  methods: {
    ...mapActions(['queryEmails']),
    async updateOptions(options) {
      // perform query when something changes
      this.loading = true
      await this.queryEmails({
        skip: (options.page - 1) * this.limit,
        limit: options.itemsPerPage
      })
      this.loading = false
    }
  },
  computed: {
    ...mapGetters(['emails', 'totalEmails', 'limit'])
  }
}
</script>
