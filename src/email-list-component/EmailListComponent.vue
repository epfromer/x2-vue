<template>
  <div>
    <v-data-table
      :headers="headers"
      :items=this.$store.state.listEmails
      :pagination.sync="pagination"
      :total-items=this.$store.state.totalEmails
      class="elevation-1"
    >
      <template slot="headers" slot-scope="props">
        <tr>
          <th
            v-for="header in props.headers"
            :key="header.text"
            :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
            @click="changeSort(header.value, pagination.descending)"
          >
            <v-icon small>arrow_upward</v-icon>
            {{ header.text }}
          </th>
        </tr>
      </template>
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
      pagination: {
        sortBy: 'clientSubmitTime'
      },
      headers: [
        {
          text: 'Created',
          align: 'left',
          sortable: false,
          value: 'clientSubmitTime'
        },
        {
          text: 'From',
          align: 'left',
          sortable: false,
          value: 'senderName'
        },
        {
          text: 'Subject',
          align: 'left',
          sortable: false,
          value: 'subject'
        }
      ]
    };
  },
  watch: {
    pagination: {
      handler() {
        console.log('pagination');
        // const { sortBy, descending, page, rowsPerPage } = this.pagination;
        const skip = this.pagination.rowsPerPage * (this.pagination.page - 1);
        this.$store.commit('setSkip', skip);
        this.$store.commit('setLimit', this.pagination.rowsPerPage);
        this.loading = true;
        this.doSearch();
      },
      deep: true
    }
  },
  methods: {
    changeSort(column, descending) {
      this.$store.commit('setSortField', column);
      const sortOrder = descending ? 'asc' : 'desc';
      this.$store.commit('setSortOrder', sortOrder);
      this.pagination.descending = !this.pagination.descending;
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
