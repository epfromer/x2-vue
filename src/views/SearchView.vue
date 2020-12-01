<template>
  <!-- https://vuetifyjs.com/en/components/data-tables#data-tables -->
  <div>
    <v-data-table
      :headers="headers"
      :items="email"
      :server-items-length="computedTotalEmails"
      :loading="loading"
      @click:row="rowClick"
      class="elevation-1"
      :page.sync="computedEmailListPage"
      :items-per-page.sync="computedEmailListItemsPerPage"
      must-sort
      :sort-by.sync="computedSort"
      :sort-desc.sync="computedOrder"
      show-expand
      item-key="_id"
      :single-expand="true"
      :expanded.sync="expanded"
      :dense="true"
      :footer-props="{ itemsPerPageOptions: [5, 10, 25, 50, 100] }"
      data-testid="datatable"
    >
      <template v-slot:body.prepend>
        <tr>
          <td colspan="1">
            <v-btn @click="() => (openFilterDate = true)" text>
              <v-icon>calendar_today</v-icon>
            </v-btn>
          </td>
          <td>
            <v-text-field
              v-model="computedSent"
              label="Filter Sent"
              clearable
              data-testid="computedSent"
            ></v-text-field>
          </td>
          <td>
            <v-text-field
              v-model="computedFrom"
              label="Filter From"
              clearable
              data-testid="computedFrom"
            ></v-text-field>
          </td>
          <td>
            <v-text-field
              v-model="computedTo"
              label="Filter To"
              clearable
              data-testid="computedTo"
            ></v-text-field>
          </td>
          <td>
            <v-text-field
              v-model="computedSubject"
              label="Filter Subject"
              clearable
              data-testid="computedSubject"
            ></v-text-field>
          </td>
        </tr>
      </template> -->
      <!-- <template v-slot:top>
        <v-text-field
          v-model="computedAllText"
          label="Filter (all text fields)"
          clearable
          class="mx-4"
          data-testid="computedAllText"
        ></v-text-field>
      </template>
      <template v-slot:expanded-item="{ headers }">
        <td :colspan="headers.length">{{ expandedBody }}</td>
      </template>
    </v-data-table>
    <!-- <div v-intersect="onIntersect" /> -->
    <FilterDate
      :open="openFilterDate"
      :date="sent ? sent : '2000-10-04'"
      :span="timeSpan"
      :onClear="() => handleTimeSpan('', 0)"
      :onClose="(sent, span) => handleTimeSpan(sent, span)"
    />
    <button
      hidden
      @click="() => handleTimeSpan('2001-01-01', 1)"
      data-testid="handleTimeSpan"
    ></button>
    <button
      hidden
      @click="() => rowClick({ _id: 'foo' })"
      data-testid="rowClick"
    ></button>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapState, mapActions } from 'vuex'
import FilterDate from '../components/emaillist/FilterDate'
import _ from 'lodash'

const DEBOUNCE_MS = 500
const EXPANDED_BODY_LENGTH = 1000

export default {
  data() {
    return {
      loading: false,
      openFilterDate: false,
      expanded: [],
      headers: [
        {
          text: 'Sent',
          sortable: true,
          value: 'sentShort',
          width: '110px',
        },
        {
          text: 'From',
          sortable: true,
          value: 'from',
        },
        {
          text: 'To',
          sortable: true,
          value: 'to',
        },
        {
          text: 'Subject',
          sortable: true,
          value: 'subject',
        },
      ],
    }
  },
  components: {
    FilterDate,
  },
  methods: {
    ...mapActions(['getEmailAsync']),
    ...mapMutations([
      'setVuexState',
      'setEmailListPage',
      'setOrder',
      'setSort',
    ]),
    // TODO SearchViewInfinite.vue
    // onIntersect(entries, observer) {
    //   // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    //   console.log('intersecting', entries[0].isIntersecting)
    // },
    doQuery() {
      console.log('do query')
    },
    rowClick(details) {
      this.$router.push({
        name: 'EmailDetailView',
        params: { id: details._id },
      })
    },
  },
  computed: {
    ...mapState([
      'emailLoading',
      'email',
      'emailTotal',
      'emailListPage',
      'sort',
      'order',
      'sent',
      'timeSpan',
      'from',
      'to',
      'subject',
      'allText',
      'densePadding',
      'darkMode',
    ]),

    // row is expanded, display a portion of email body
    expandedBody() {
      if (this.expanded.length) {
        return this.expanded[0].body.slice(0, EXPANDED_BODY_LENGTH)
      }
      return ''
    },
    computedTotalEmails: {
      get() {
        return this.emailTotal
      },
      set(v) {
        this.setVuexState({ k: 'emailTotal', v })
      },
    },
    computedEmailListPage: {
      get() {
        return this.emailListPage
      },
      set(v) {
        this.setVuexState({ k: 'emailListPage', v })
      },
    },
    computedEmailListItemsPerPage: {
      get() {
        return this.emailListItemsPerPage
      },
      set(v) {
        this.setVuexState({ k: 'emailListItemsPerPage', v })
      },
    },
    computedSort: {
      get() {
        return [this.sort]
      },
      set(arr) {
        this.setEmailListPage(0)
        this.setOrder(1)
        this.setSort(arr[0] === 'sentShort' ? 'sent' : arr[0])
        this.getEmailAsync()
      },
    },
    computedOrder: {
      get() {
        return [this.order > 0 ? false : true]
      },
      set(arr) {
        this.setEmailListPage(0)
        this.setOrder(arr[0] ? -1 : 1)
        this.getEmailAsync()
      },
    },
    computedAllText: {
      get() {
        return this.allText
      },
      set(v) {
        this.setVuexState({ k: 'allText', v })
      },
    },
    computedSent: {
      get() {
        return this.sent
      },
      set(v) {
        this.setVuexState({ k: 'sent', v })
      },
    },
    computedFrom: {
      get() {
        return this.from
      },
      set(v) {
        this.setVuexState({ k: 'from', v })
      },
    },
    computedTo: {
      get() {
        return this.to
      },
      set(v) {
        this.setVuexState({ k: 'to', v })
      },
    },
    computedSubject: {
      get() {
        return this.subject
      },
      set(v) {
        this.setVuexState({ k: 'subject', v })
      },
    },
  },
  watch: {
    computedEmailListPage() {
      this.doQuery()
    },
    computedEmailListItemsPerPage() {
      this.doQuery()
    },
    computedSort() {
      this.doQuery()
    },
    computedOrder() {
      this.doQuery()
    },
    computedAllText() {
      this.debouncedQuery()
    },
    computedSent() {
      this.debouncedQuery()
    },
    computedFrom() {
      this.debouncedQuery()
    },
    computedTo() {
      this.debouncedQuery()
    },
    computedSubject() {
      this.debouncedQuery()
    },
  },
  created() {
    this.debouncedQuery = _.debounce(() => this.doQuery(), DEBOUNCE_MS)
    this.doQuery()
  },
}
</script>
