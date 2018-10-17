<template>
  <div v-if=this.$store.state.selectedEmail>
    {{ this.$store.state.selectedEmail.clientSubmitTime }}
    <br/>
    <strong>From: </strong>{{ this.$store.state.selectedEmail.senderEmailAddress }}
    <br/>
    <strong>To: </strong>{{ this.$store.state.selectedEmail.displayTo }}
    <br/>
    <strong>Subject: </strong>{{ this.$store.state.selectedEmail.subject }}
    <br/>
    <strong>CC: </strong>{{ this.$store.state.selectedEmail.displayCC }}
    <br/>
    <strong>BCC: </strong>{{ this.$store.state.selectedEmail.displayBCC }}
    <br/>
    <span v-html="formatBody(this.$store.state.selectedEmail.body)"></span>

  </div>
</template>

<script>
export default {
  name: 'EmailDetailComponent',
  props: {},
  methods: {
    formatBody: body => body.replace(/\n/g, '<br />')
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
}
</style>
