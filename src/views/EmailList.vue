<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="emails"
      :items-per-page="itemsPerPage"
      :server-items-length="totalEmails"
      @update:page="updatePage"
      @update:items-per-page="updateItemsPerPage"
      class="elevation-1"
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
    loading: true, // TODO
    options: {},
    itemsPerPage: 5,
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
    updatePage(page) {
      this.queryEmails({ skip: (page - 1) * this.limit })
    },
    updateItemsPerPage(itemsPerPage) {
      console.log(itemsPerPage)
      this.queryEmails({ skip: 0, limit: itemsPerPage })
    }
  },
  computed: {
    ...mapGetters(['emails', 'totalEmails', 'limit'])
  }
}
</script>
