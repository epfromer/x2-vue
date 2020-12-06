<template>
  <div class="text-center">
    <v-menu bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark v-bind="attrs" v-on="on"> gravatar </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title>{{ name }}</v-list-item-title>
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
    return {
      authenticated: true,
      name: 'epfromer@gmail.com',
    }
  },
  methods: {
    goToRoute(name) {
      this.$router.push({ name }).catch((e) => console.error(e))
    },
    signOut() {
      console.log('sign out')
    },
  },
}
</script>
