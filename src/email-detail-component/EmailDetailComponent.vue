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
    <div class="previousStyle">
      <v-btn fab dark small color="primary" class="previousStyle">
        <v-icon dark>keyboard_arrow_left</v-icon>
      </v-btn>
    </div>
    <div class="nextStyle">
      <v-btn fab dark small color="primary" >
        <v-icon dark>keyboard_arrow_right</v-icon>
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
.nextStyle {
  border: 1px solid blue;
  position: 'fixed';
  width: '60px';
  height: '60px';
  bottom: '40px';
  right: '40px';
}

.previousStyle {
  border: 1px solid red;
  position: 'fixed';
  width: '60px';
  height: '60px';
  bottom: '120px';
  right: '40px';
}
</style>
