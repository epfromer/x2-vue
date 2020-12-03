<template>
  <v-container fluid>
    <ColorPicker
      :open="openColorPicker"
      :defaultColor="pickedColor"
      :onClose="(color) => handleColorChosen(color)"
    />
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
      <!-- <template v-slot:item.color="{ item }">
        <v-btn
          small
          :elevation="0"
          class="ma-2"
          @click="() => selectColor(item._id, item.color)"
          :style="{ color: item.color }"
        >
          {{ item.color.toUpperCase() }}
        </v-btn>
      </template> -->
    </v-data-table>
    <button hidden @click="() => selectColor('foo', 'bar')">selectColor</button>
    <button hidden @click="() => handleColorChosen('bar')">
      handleColorChosen
    </button>
  </v-container>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'
import ColorPicker from './ColorPicker'

export default {
  data() {
    return {
      openColorPicker: false,
      contactId: '',
      pickedColor: '',
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
  components: {
    ColorPicker,
  },
  methods: {
    ...mapActions(['fetchContactsIfNeeded']),
    selectColor(id, color) {
      this.contactId = id
      this.pickedColor = color
      this.openColorPicker = true
    },
    handleColorChosen(color) {
      this.openColorPicker = false
      if (!color) return
      const url = `${process.env.VUE_APP_X2_SERVER}/contacts/${this.contactId}`
      const payload = {
        method: 'PUT',
        body: JSON.stringify({ color }),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      }
      fetch(url, payload)
        // .then(() => this.fetchContactsIfNeeded(true))
        .catch(() => {}) // TODO: handle errors
    },
  },
}
</script>
