<template>
  <!-- https://vuetifyjs.com/en/components/data-tables#data-tables -->
  <div>
    <v-data-table
      :headers="headers"
      :items="email"
      :server-items-length="computedTotalEmails"
      :loading="emailLoading"
      @click:row="rowClick"
      class="elevation-1"
      must-sort
      :sort-by.sync="computedSort"
      :sort-desc.sync="computedOrder"
      show-expand
      :expanded.sync="expanded"
      item-key="id"
      :dense="true"
      :footer-props="{ itemsPerPageOptions: [5, 10, 25, 50, 100] }"
      data-testid="datatable"
    >
      <template slot="body.prepend">
        <tr>
          <th colspan="1">
            <v-btn @click="() => (datePickerOpen = true)" text>
              <v-icon>date_range</v-icon>
            </v-btn>
          </th>
          <th key="sent">
            <v-text-field
              v-model="computedSent"
              label="Filter Sent"
              clearable
              data-testid="computedSent"
            ></v-text-field>
          </th>
          <th>
            <v-text-field
              v-model="computedFrom"
              label="Filter From"
              clearable
              data-testid="computedFrom"
            ></v-text-field>
          </th>
          <th>
            <v-text-field
              v-model="computedTo"
              label="Filter To"
              clearable
              data-testid="computedTo"
            ></v-text-field>
          </th>
          <th>
            <v-text-field
              v-model="computedSubject"
              label="Filter Subject"
              clearable
              data-testid="computedSubject"
            ></v-text-field>
          </th>
        </tr>
      </template>
      <template v-slot:top>
        <v-text-field
          v-model="computedAllText"
          label="Filter (all text fields)"
          clearable
          class="mx-4"
          data-testid="computedAllText"
        ></v-text-field>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length">
          {{ item.body.slice(0, EXPANDED_BODY_LENGTH) }}
        </td>
      </template>
    </v-data-table>
    <!-- <div v-intersect="onIntersect" /> -->
    <FilterDate
      :open="datePickerOpen"
      :date="sent ? sent : FILTER_DATE"
      :onClear="onDateClear"
      :onClose="onDateClose"
    />
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

// TODO INFINITE SCROLL
// TODO COMPARE TO NG, REACT

export default {
  data() {
    return {
      DEBOUNCE_MS: 1000,
      FILTER_DATE: '2000-10-04',
      EXPANDED_BODY_LENGTH: 1000,
      loading: false,
      datePickerOpen: false,
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
      'setAllText',
      'setVuexState',
      'setEmailListPage',
      'setFrom',
      'setOrder',
      'setSent',
      'setSort',
      'setSubject',
      'setTo',
    ]),
    // TODO SearchViewInfinite.vue
    // onIntersect(entries, observer) {
    //   // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    //   console.log('intersecting', entries[0].isIntersecting)
    // },
    rowClick(details) {
      this.$router.push({
        name: 'EmailDetailView',
        params: { id: details._id },
      })
    },
    onDateClear() {
      this.datePickerOpen = false
      this.setSent('')
      this.getEmailAsync()
    },
    onDateClose(date) {
      this.datePickerOpen = false
      this.setSent(date)
      this.getEmailAsync()
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
    // TODO - NEED THIS?
    computedTotalEmails: {
      get() {
        return this.emailTotal
      },
      set(v) {
        this.setVuexState({ k: 'emailTotal', v })
      },
    },
    // TODO - NEED THIS?
    // computedEmailListPage: {
    //   get() {
    //     return this.emailListPage
    //   },
    //   set(v) {
    //     this.setVuexState({ k: 'emailListPage', v })
    //   },
    // },
    // TODO - NEED THIS?
    // computedEmailListItemsPerPage: {
    //   get() {
    //     return this.emailListItemsPerPage
    //   },
    //   set(v) {
    //     this.setVuexState({ k: 'emailListItemsPerPage', v })
    //   },
    // },
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
        this.setAllText(v)
      },
    },
    computedSent: {
      get() {
        return this.sent
      },
      set(v) {
        this.setSent(v)
      },
    },
    computedFrom: {
      get() {
        return this.from
      },
      set(v) {
        this.setFrom(v)
      },
    },
    computedTo: {
      get() {
        return this.to
      },
      set(v) {
        this.setTo(v)
      },
    },
    computedSubject: {
      get() {
        return this.subject
      },
      set(v) {
        this.setSubject(v)
      },
    },
  },
  watch: {
    // TODO - NEED THIS?
    // computedEmailListPage() {
    //   this.doQuery()
    // },
    // TODO - NEED THIS?
    // computedEmailListItemsPerPage() {
    //   this.doQuery()
    // },
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
    this.debouncedQuery = _.debounce(this.getEmailAsync, this.DEBOUNCE_MS)
  },
}
</script>
