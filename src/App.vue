<template>
  <v-app id="inspire">
    <AppDrawer :open="drawerOpen" :setOpen="(v) => (drawerOpen = v)" />
    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawerOpen = !drawerOpen" />
      <v-toolbar-title>X2 Vue</v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <template v-if="$route.name === 'EmailDetail'">
        <v-btn
          @click="() => setSelected(selected - 1)"
          icon
          :disabled="selected <= 0"
        >
          <v-icon>mdi-arrow-left-bold</v-icon>
        </v-btn>
        <v-btn
          @click="() => setSelected(selected + 1)"
          icon
          :disabled="selected >= savedEmails.length - 1"
        >
          <v-icon>mdi-arrow-right-bold</v-icon>
        </v-btn>
      </template> -->
    </v-app-bar>
    <v-content>
      <v-container fluid>
        <v-row align="start">
          <v-col>
            <router-view />
          </v-col>
        </v-row>
      </v-container>
    </v-content>

    <v-footer color="indigo" app>
      <span class="white--text">&copy; 2020</span>
    </v-footer>
  </v-app>
</template>

<script>
// TODO login/out, as with bikes
// TODO dark mode toggle
import { mapGetters, mapState, mapMutations } from 'vuex'
import AppDrawer from './components/AppDrawer'

export default {
  name: 'App',
  data: () => ({
    drawerOpen: false,
  }),
  components: {
    AppDrawer,
  },
  methods: {
    ...mapMutations(['setSelected']),
  },
  computed: {
    ...mapState(['selected', 'savedEmails']),
  },
}
</script>
