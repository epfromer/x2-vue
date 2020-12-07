<template>
  <div class="text-center">
    <v-menu bottom left>
      <template v-slot:activator="{ on }">
        <v-btn color="primary" depressed v-on="on">
          <v-avatar size="36px">
            <img :src="$auth.user.picture" />
          </v-avatar>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title>{{ $auth.user.name }}</v-list-item-title>
        </v-list-item>
        <v-divider />
        <v-list-item link @click="() => goToRoute('AppSettingsView')">
          <v-list-item-action>
            <v-icon>settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="signOut">
          <v-list-item-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Sign Out</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    goToRoute(name) {
      this.$router.push({ name }).catch((e) => console.error(e))
    },
    signOut() {
      this.$auth.logout({
        returnTo: window.location.origin,
      })
    },
  },
}
</script>
