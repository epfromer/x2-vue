<template>
  <div>
    <v-row>
      <v-col cols="auto">
        <v-btn
          @click="startImport"
          class="button"
          elevation="2"
          color="secondary"
        >
          Import Email
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-checkbox
          v-model="scrollIntoView"
          label="Auto-scroll to latest entries"
          color="secondary"
        ></v-checkbox>
      </v-col>
    </v-row>
    <div v-if="!log.length" class="text">No log entries</div>
    <div v-if="log.length">
      <v-simple-table dense height="300px">
        <template v-slot:default>
          <tbody>
            <tr v-for="logEntry in log" :key="logEntry.id">
              <td>
                {{ logEntry.timestamp + ' ' + logEntry.entry }}
              </td>
            </tr>
            <div id="lastrow"></div>
          </tbody>
        </template>
      </v-simple-table>
    </div>
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
      scrollIntoView: true,
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
          let e = document.querySelector(`#lastrow`)
          if (e && this.scrollIntoView) e.scrollIntoView({ behavior: 'smooth' })
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
.text {
  margin-left: 15px;
  padding-bottom: 15px;
}
</style>
