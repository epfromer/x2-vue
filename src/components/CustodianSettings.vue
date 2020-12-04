<template>
  <div>
    <color-picker-dlg
      :open="colorPickerDlgOpen"
      :defaultColor="pickedColor"
      :onClose="handleColorChosen"
    />
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Custodian</th>
            <th class="text-left">Title</th>
            <th class="text-left">Sent</th>
            <th class="text-left">Received</th>
            <th class="text-center">Color</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="custodian in custodians" :key="custodian.name">
            <td class="text-left">{{ custodian.name }}</td>
            <td class="text-left">{{ custodian.title }}</td>
            <td class="text-left">{{ custodian.senderTotal }}</td>
            <td class="text-left">{{ custodian.receiverTotal }}</td>
            <td class="text-center">
              <v-btn
                @click="() => handleClick(custodian)"
                :style="{ backgroundColor: custodian.color }"
              >
              </v-btn>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import request, { gql } from 'graphql-request'
import ColorPickerDlg from './ColorPickerDlg.vue'

export default {
  components: { ColorPickerDlg },
  data() {
    return {
      colorPickerDlgOpen: false,
      pickedColor: '',
      custodianId: '',
    }
  },
  computed: {
    ...mapState(['custodiansLoading', 'custodians']),
  },
  methods: {
    ...mapMutations(['setCustodians']),
    handleClick(custodian) {
      this.custodianId = custodian.id
      this.pickedColor = custodian.color
      this.colorPickerDlgOpen = true
    },
    handleColorChosen(color) {
      this.colorPickerDlgOpen = false
      if (!color) return
      const server = process.env.VUE_APP_X2_SERVER
      const mutation = gql`
        mutation setCustodianColor($id: ID, $color: String) {
          setCustodianColor(id: $id, color: $color) {
            id
            name
            title
            color
            senderTotal
            receiverTotal
            toCustodians {
              custodianId
              total
            }
          }
        }
      `
      request(`${server}/graphql/`, mutation, { id: this.custodianId, color })
        .then((data) => this.setCustodians(data.setCustodianColor))
        .catch((e) => console.error(e))
    },
  },
}
</script>
