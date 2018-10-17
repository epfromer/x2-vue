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
    <br/>
    <span v-html="formatBody(this.$store.state.selectedEmail.body)"></span>
    <div style="border: 1px solid red">
      <v-btn fab dark small color="primary" >
        <v-icon dark>remove</v-icon>
      </v-btn>
    </div>
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
left {
  border: 1px solid red;
}
</style>
