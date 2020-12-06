<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-btn
        v-on="on"
        @click="() => $router.push(`/AppSettingsView`).catch((err) => {})"
        icon
      >
        <v-icon>build</v-icon>
      </v-btn>
    </template>
    <span>Settings</span>
  </v-tooltip>
</template>

<script>
export default {
  data() {
    return {
      authenticated: true,
      username: 'epfromer@gmail.com',
    }
  },
}
</script>
