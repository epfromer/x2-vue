<template>
  <v-container fluid>
    <v-row>
      <v-col cols="auto">
        <div class="headline">Theme</div>
        <theme-picker />
      </v-col>
      <v-col cols="auto">
        <div class="headline">Custodians</div>
        <custodian-settings />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CustodianSettings from '@/components/CustodianSettings.vue'
import ThemePicker from '@/components/ThemePicker.vue'

export default {
  components: { ThemePicker, CustodianSettings },
}
</script>
