<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <NaviListItem icon="mdi-home" name="Home" route="EmailList" />
        <NaviListItem icon="mdi-contact-mail" name="Foo" route="Foo" />
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Application</v-toolbar-title>
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
import NaviListItem from '@/components/NaviListItem.vue'

export default {
  name: 'App',
  data: () => ({
    drawer: null
  }),
  components: {
    NaviListItem
  }
}
</script>
