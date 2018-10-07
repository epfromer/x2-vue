<template>
  <div>
    <v-data-table
      :headers="headers"
      :items=this.$store.state.listEmails
      :pagination.sync="pagination"
      :total-items=this.$store.state.totalEmails
      :loading=this.$store.state.loading
      :rows-per-page-items=rowsPerPage
      must-sort
      class="elevation-1"
    >

      <template slot="items" slot-scope="props">
        <td>{{ props.item.clientSubmitTime }}</td>
        <td>{{ props.item.senderName }}</td>
        <td>{{ props.item.subject }}</td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  name: 'EmailListComponent',
  props: {
    doSearch: Function
  },
  data() {
    return {
      pagination: {},
      rowsPerPage: [5, 10, 25, 100],
      headers: [
        {
          text: 'Created',
          align: 'left',
          sortable: true,
          value: 'clientSubmitTime'
        },
        {
          text: 'From',
          align: 'left',
          sortable: true,
          value: 'senderName'
        },
        {
          text: 'Subject',
          align: 'left',
          sortable: true,
          value: 'subject'
        }
      ]
    };
  },
  watch: {
    pagination: {
      handler() {
        const skip = this.pagination.rowsPerPage * (this.pagination.page - 1);
        this.$store.commit('setSkip', skip);
        this.$store.commit('setLimit', this.pagination.rowsPerPage);
        this.$store.commit('setSortField', this.pagination.sortBy);
        const sortOrder = this.pagination.descending ? 'asc' : 'desc';
        this.$store.commit('setSortOrder', sortOrder);
        this.loading = true;
        this.doSearch();
      },
      deep: true
    }
  },
  created() {
    this.doSearch();
  }
  // beforeUpdate() {
  //   console.log('beforeUpdate');
  // },
  // updated() {
  //   console.log('updated');
  // }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  border: 1px solid blue;
}
</style>
