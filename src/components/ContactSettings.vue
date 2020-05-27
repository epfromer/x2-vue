<template>
  <v-container fluid>
    <v-data-table
      :headers="headers"
      :items="computedContacts"
      class="elevation-1"
      item-key="_id"
      :loading="contactsLoading"
      :dense="densePadding"
      loading-text="Loading... Please wait"
      hide-default-footer
      :items-per-page="50"
    >
      <template v-slot:item.color="{ item }">
        <v-btn
          small
          :elevation="0"
          class="ma-2"
          @click="() => selectColor(item.name)"
          :style="{ color: item.color }"
        >
          {{ item.color.toUpperCase() }}
        </v-btn>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  data() {
    return {
      loading: false,
      openFilterDate: false,
      expanded: [],
      headers: [
        {
          text: 'Contact',
          sortable: false,
          value: 'name',
        },
        {
          text: 'Title',
          sortable: false,
          value: 'title',
        },
        {
          text: 'Sent',
          align: 'right',
          sortable: false,
          value: 'senderTotal',
        },
        {
          text: 'Received',
          align: 'right',
          sortable: false,
          value: 'receiverTotal',
        },
        {
          text: 'Color',
          align: 'left',
          sortable: false,
          value: 'color',
        },
      ],
    }
  },
  computed: {
    ...mapState(['contactsLoading', 'contacts', 'darkMode', 'densePadding']),
    computedContacts: {
      get() {
        return this.contacts ? this.contacts : []
      },
    },
  },
  methods: {
    ...mapMutations(['setVuexState', 'saveAppSettings']),
    selectColor(contact) {
      console.log(contact)
    },
  },
}
</script>
