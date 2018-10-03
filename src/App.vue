<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>web</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>menu</v-icon>
      </v-btn>
    </v-toolbar>
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
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
      app
    >
      <v-list>
        <v-list-tile @click="right = !right">
          <v-list-tile-action>
            <v-icon>compare_arrows</v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Switch drawer (click me)</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span>&copy; 2017</span>
    </v-footer>
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
  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'bubble_chart',
          title: 'Inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js'
    };
  },
  methods: {
    setSearchParams() {
      console.log('app setSearchParams; yahoo!');
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

      console.log('doSearch');
      return (
        fetch(`${process.env.EMAIL_SERVER}/email/${this.getSearchParamsAsEncodedString()}`)
          .then(resp => resp.json())
          .then(data => {
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
