<template>
  <div>
    <div v-if="authenticated">
      <settings-menu />
    </div>
    <div v-if="!authenticated">
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
    </div>
  </div>
</template>

<script>
import SettingsMenu from './SettingsMenu'

export default {
  data() {
    return {
      authenticated: true,
      username: 'epfromer@gmail.com',
    }
  },
  components: {
    SettingsMenu,
  },
}
</script>
