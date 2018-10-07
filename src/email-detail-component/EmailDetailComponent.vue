<template>
  <div v-if=this.$store.state.selectedEmail>
    {{ this.$store.state.selectedEmail.clientSubmitTime }}
    <br />

  </div>
</template>

<script>
export default {
  name: 'EmailDetailComponent',
  props: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  border: 1px solid yellow;
}
</style>
