<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="emails"
      :items-per-page="25"
      class="elevation-1"
    ></v-data-table>
    <!-- <router-link :to="{ name: 'EmailDetail', params: { id: 'abc123' } }"
      >abc123</router-link
    > -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: () => ({
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
  computed: {
    ...mapGetters(['emails', 'totalEmails'])
  }
}
</script>
