<template>
  <v-app-bar app color="indigo" dark>
    <v-app-bar-nav-icon @click.stop="() => setDrawerOpen(true)" />
    <v-toolbar-title>X2 Vue</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn @click="() => $router.push(`/settings`)" icon>
      <v-icon>brightness_high</v-icon>
    </v-btn>
    <v-btn @click="() => console.log('foo')" icon>
      <v-icon>settings</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  props: {
    setDrawerOpen: {
      type: Function,
      required: true,
    },
  },
}
</script>
