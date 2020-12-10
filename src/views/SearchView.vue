<template>
  <!-- https://vuetifyjs.com/en/components/data-tables#data-tables -->
  <div>
    <v-data-table
      :headers="headers"
      :items="email"
      :server-items-length="emailTotal"
      :loading="emailLoading"
      @click:row="onRowClick"
      class="elevation-1"
      must-sort
      hide-default-footer
      :sort-by.sync="computedSort"
      :sort-desc.sync="computedOrder"
      show-expand
      :expanded.sync="expanded"
      item-key="id"
      :dense="true"
      data-testid="datatable"
    >
      <template slot="body.prepend">
        <tr>
          <th>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-btn @click="onHistoryClick" v-on="on" text>
                  <v-icon>history</v-icon>
                </v-btn>
              </template>
              <span>Search History</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn @click="() => (datePickerOpen = true)" v-on="on" text>
                  <v-icon>date_range</v-icon>
                </v-btn>
              </template>
              <span>Select date</span>
            </v-tooltip>
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
    <div v-intersect="onIntersect" />
    <FilterDate
      :open="datePickerOpen"
      :date="sent ? sent : FILTER_DATE"
      :onClear="onDateClear"
      :onClose="onDateClose"
    />
    <button
      hidden
      @click="() => onRowClick({ _id: 'foo' })"
      data-testid="onRowClick"
    ></button>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'
import { defaultLimit } from '../store/constants'
import FilterDate from '@/components/emaillist/FilterDate'
import _ from 'lodash'

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
      'setEmailListPage',
      'setFrom',
      'setOrder',
      'setSent',
      'setSort',
      'setSubject',
      'setTo',
    ]),
    onIntersect(entries, observer, isIntersecting) {
      if (isIntersecting && this.hasMore) {
        this.setEmailListPage(this.emailListPage + 1)
        this.getEmailAsync(true)
      }
    },
    onHistoryClick() {
      this.$router
        .push({ name: 'SearchHistoryView' })
        .catch((e) => console.error(e))
    },
    onRowClick(details) {
      this.$router
        .push({
          name: 'EmailDetailView',
          params: { id: details.id },
        })
        .catch((e) => console.error(e))
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
    hasMore() {
      return (this.emailListPage + 1) * this.defaultLimit < this.totalEmails
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
      'from',
      'to',
      'subject',
      'allText',
    ]),
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
