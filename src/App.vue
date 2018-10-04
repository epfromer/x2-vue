<template>
  <v-app>
    <v-content>
      <v-container fluid grid-list-md>
        <!-- <router-view></router-view> -->
        <v-layout row wrap>
          <v-flex xs6>
            <SearchComponent msg="hello from SearchComponent"/>
            <EmailListComponent
              :setSearchParams="setSearchParams"/>
          </v-flex>
          <v-flex xs6>
            <EmailDetailComponent msg="hello from EmailDetailComponent"/>
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
    setSearchParams() {
      this.doSearch();
    },

    getSearchParamsAsEncodedString() {
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

      // let params = `?skip=${skip}&limit=${limit}`;
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
      // params +=
      //  sortField ? `&sort=${sortField}&order=${sortOrder}` : '';

      // // console.log(params);
      // return params;
      return '';
    },

    doSearch() {
      // show the loading overlay
      // this.setState({ loading: true });

      const server = process.env.VUE_APP_EMAIL_SERVER;
      const searchParams = this.getSearchParamsAsEncodedString();
      return (
        fetch(`${server}/email/${searchParams}`)
          .then(resp => resp.json())
          .then(data => {
            console.log(`state = ${this.$store.state.emails}`);
            console.log(data);
            //   this.setState({
            //     listEmails: data.listDocs,
            //     loading: false,
            //     total: data.total
            //   });

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
    }
  }
};
</script>
