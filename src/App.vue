<template>
  <v-app>
    <v-content>
      <v-container fluid grid-list-md>
        <!-- <router-view></router-view> -->
        <v-layout row wrap>
          <v-flex xs6>
            <SearchComponent msg="hello from SearchComponent"/>
            <EmailListComponent :doSearch="doSearch" :selectEmail="selectEmail"/>
          </v-flex>
          <v-flex xs6>
            <EmailDetailComponent/>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import EmailDetailComponent from './email-detail-component/EmailDetailComponent';
import EmailListComponent from './email-list-component/EmailListComponent';
import SearchComponent from './search-component/SearchComponent';

export default {
  name: 'App',
  components: {
    EmailDetailComponent,
    EmailListComponent,
    SearchComponent
  },
  methods: {
    getSearchParamsAsEncodedString() {
      const skip = this.$store.state.skip;
      const limit = this.$store.state.limit;
      const sortField = this.$store.state.sortField;
      const sortOrder = this.$store.state.sortOrder;
      // const {
      //   skip,
      //   limit,
      //   toSearchString,
      //   senderSearchString,
      //   subjectSearchString,
      //   bodySearchString,
      //   clientSubmitTimeSearchString,
      //   clientSubmitTimeSpan,
      //   allTextSearchString,
      //   sortField,
      //   sortOrder
      // } = this.state;

      let params = `?skip=${skip}&limit=${limit}`;
      // params +=
      //  toSearchString ? `&toSearchString=${encodeURIComponent(toSearchString)}` : '';
      // params +=
      //  senderSearchString ? `&senderSearchString=${encodeURIComponent(senderSearchString)}` : '';
      // params +=
      //  subjectSearchString ? `&subjectSearchString=${encodeURIComponent(subjectSearchString)}` : '';
      // params +=
      //  bodySearchString ? `&bodySearchString=${encodeURIComponent(bodySearchString)}` : '';
      // params +=
      //  clientSubmitTimeSearchString ? `&clientSubmitTimeSearchString=${encodeURIComponent(clientSubmitTimeSearchString)}` : '';
      // params +=
      //  clientSubmitTimeSpan ? `&clientSubmitTimeSpan=${encodeURIComponent(clientSubmitTimeSpan)}` : '';
      // params +=
      //  allTextSearchString ? `&allTextSearchString=${encodeURIComponent(allTextSearchString)}` : '';
      params += sortField ? `&sort=${sortField}&order=${sortOrder}` : '';

      console.log(params);
      return params;
    },

    doSearch() {
      // show the loading progress bar
      this.$store.commit('setLoading', true);

      const server = process.env.VUE_APP_EMAIL_SERVER;
      const searchParams = this.getSearchParamsAsEncodedString();
      return (
        fetch(`${server}/email/${searchParams}`)
          .then(resp => resp.json())
          .then(data => {
            this.$store.dispatch('setEmailsAsync', {
              listEmails: data.listDocs,
              totalEmails: data.total
            });
            this.$store.commit('setLoading', false);

            //   // select last in list (used with onPrevious)
            //   if (this.state.selectLast) {
            //     this.setState({ selectLast: false });
            // return this.selectEmail(this.state.listEmails[this.state.listEmails.length - 1]._id);
            //   }

            //   if (this.state.listEmails.length > 0) {
            //     return this.selectEmail(this.state.listEmails[0]._id);
            //   }
          })
          // ignore errors
          .catch(() => {})
      );
    },

    selectEmail(id) {
      const server = process.env.VUE_APP_EMAIL_SERVER;
      return (
        fetch(`${server}/email/${id}`)
          .then(resp => resp.json())
          .then(data => {
            this.$store.dispatch('setSelectedEmailAsync', data);
          })
          // ignore errors
          .catch(() => {})
      );
    }
  }
};
</script>
