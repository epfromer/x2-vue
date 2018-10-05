<template>
  <div>
    {{ this.$store.state.totalEmails }}
    <v-data-table
      :headers="headers"
      :items=this.$store.state.listEmails
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.subject }}</td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: 'EmailListComponent',
  props: {
    setSearchParams: Function
  },
  data() {
    return {
      headers: [
        {
          text: 'Subject',
          align: 'left',
          sortable: false,
          value: 'subject'
        }
      ]
    };
  },
  created() {
    console.log('created');
    this.setSearchParams();
  },
  beforeUpdate() {
    console.log('beforeUpdate');
  },
  updated() {
    console.log('updated');
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  border: 1px solid blue;
}
</style>
