<template>
  <div>
    <v-btn
      @click="startImport"
      text
      class="button"
      elevation="2"
      color="secondary"
    >
      Import Email
    </v-btn>
    <v-simple-table dense height="300px">
      <template v-slot:default>
        <tbody>
          <tr v-for="logEntry in log" :key="logEntry.id">
            <td>
              {{ logEntry.entry }}
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import request, { gql } from 'graphql-request'
import { importLoc } from '@/store/constants'

export default {
  data() {
    return {
      log: [],
      importInterval: undefined,
    }
  },
  mounted() {
    if (!this.importInterval) {
      this.importInterval = setInterval(this.getImportStatus, 2000)
    }
  },
  beforeDestroy() {
    if (this.importInterval) {
      clearInterval(this.importInterval)
      this.importInterval = undefined
    }
  },
  methods: {
    foo() {
      return JSON.stringify(this.log)
    },
    getImportStatus() {
      const server = process.env.VUE_APP_X2_SERVER
      const query = gql`
        {
          getImportStatus {
            id
            timestamp
            entry
          }
        }
      `
      request(`${server}/graphql/`, query)
        .then((data) => {
          this.log = data.getImportStatus
        })
        .catch((e) => console.error(e))
    },
    startImport() {
      const server = process.env.VUE_APP_X2_SERVER
      const mutation = gql`
        mutation importPST($loc: String) {
          importPST(loc: $loc)
        }
      `
      request(`${server}/graphql/`, mutation, { loc: importLoc })
    },
  },
}
</script>

<style scoped>
.button {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
