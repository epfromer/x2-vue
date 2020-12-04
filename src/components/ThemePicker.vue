<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-center">Color</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="theme in themes" :key="theme.name">
          <td class="text-center">
            <v-btn
              @click="() => handleClick(theme.name)"
              :style="{ backgroundColor: theme.primary }"
            >
            </v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import { mapActions } from 'vuex'
import { appThemes } from '@/utils/appThemes'

export default {
  props: {},
  computed: {
    themes: {
      get() {
        return appThemes
      },
    },
  },
  methods: {
    ...mapActions(['setThemeNameAsync']),
    handleClick(themeName) {
      this.setThemeNameAsync(themeName)
    },
  },
}
</script>
