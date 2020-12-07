<template>
  <div>
    <div v-if="!$auth.loading && $auth.isAuthenticated">
      <settings-menu />
    </div>
    <div v-if="!$auth.loading && !$auth.isAuthenticated">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" @click="signIn" icon>
            <v-icon>build</v-icon>
          </v-btn>
        </template>
        <span>Settings</span>
      </v-tooltip>
    </div>
  </div>
</template>

<script>
import SettingsMenu from './SettingsMenu'

export default {
  components: {
    SettingsMenu,
  },
  methods: {
    signIn() {
      this.$auth.loginWithRedirect({
        appState: { targetUrl: '/AppSettingsView' },
      })
    },
  },
}
</script>
