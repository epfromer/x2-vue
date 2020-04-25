<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <NaviListItem icon="mdi-home" name="List" route="EmailList" />
        <NaviListItem icon="mdi-contact-mail" name="Foo" route="Foo" />
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>X2</v-toolbar-title>
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
import NaviListItem from '@/components/NaviListItem.vue'

export default {
  name: 'App',
  data: () => ({
    drawer: null,
  }),
  components: {
    NaviListItem,
  },
  methods: {
    ...mapMutations(['setSelected']),
  },
  computed: {
    ...mapState(['selected', 'savedEmails']),
  },
}
</script>
