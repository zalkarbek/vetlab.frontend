import _ from 'lodash'
import { createNamespacedHelpers } from 'vuex'
import CrudListViewJson from './CrudListViewJson'
import loadDatasetMixin from '~/mixins/loadDatasetMixin'

const { mapState, mapGetters } = createNamespacedHelpers('api')

export default {
  mixins: [loadDatasetMixin],
  components: {
    CrudListViewJson
  },
  model: {
    prop: 'records',
    event: 'change'
  },
  props: {
    // crud модель
    crudData: {
      type: Object,
      default() {
        return {}
      }
    },
    // массив записей
    records: {
      type: Array,
      default() {
        return []
      }
    },
    // общее количество записей
    totalRows: {
      type: Number,
      default() {
        return 0
      }
    },
    // текущая страница
    page: {
      type: Number,
      default() {
        return 1
      }
    },
    // количество эементов в странице
    pageSize: {
      type: Number,
      default() {
        return null
      }
    },
    // тип пагинации local / server
    paginateType: {
      type: String,
      default() {
        return 'local'
      }
    }
  },
  data() {
    return {
      datasetCache: {},
      currentPage: 1,
      perPage: 10,
      total: null,
      pageOptions: [1, 5, 10, 15, 20, 25, 50, 100, 200],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      searchText: '',
      filterOn: [],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: ''
      },
      PAGINATION_TYPES: {
        LOCAL: 'local',
        SERVER: 'server',
        STORAGE: 'storage'
      }
    }
  },
  computed: {
    searchItem: {
      get() {
        return this.searchText
      },
      set(value) {
        this.searchText = value
      }
    },
    perPageCount: {
      get() {
        return this.perPage
      },
      set(value) {
        this.perPage = value
      }
    },
    recordItems: {
      get() {
        if (this.paginateType === this.PAGINATION_TYPES.LOCAL) {
          return _.chunk(this.records, this.perPageCount)
        }
        if (this.paginateType === this.PAGINATION_TYPES.STORAGE) {
          return _.chunk(this.records, this.perPageCount)
        }
        if (this.paginateType === this.PAGINATION_TYPES.SERVER) {
          return this.records
        }
        return _.chunk(this.records, this.perPageCount)
      }
    },
    currentPageRecords() {
      if (this.paginateType === this.PAGINATION_TYPES.SERVER) {
        return this.recordItems
      }
      if (this.paginateType === this.PAGINATION_TYPES.LOCAL) {
        return this.recordItems[this.currentPage - 1]
      }
      if (this.paginateType === this.PAGINATION_TYPES.STORAGE) {
        return this.recordItems[this.currentPage - 1]
      }
      return this.recordItems[this.currentPage - 1]
    },
    totalRowsCount() {
      return this.totalRows || this.records.length
    },
    modelData() {
      return this.crudData
    },
    restName() {
      return this.modelData.restName
    },
    actionButtons() {
      const buttons = this.modelData.actionButtons
      if (buttons && buttons.crudList) {
        return buttons.crudList
      }
      return []
    },
    fields() {
      const index = {
        key: 'index',
        label: '№'
      }
      const id = {
        key: 'id',
        label: this.$t('form.field.id')
      }
      const actions = {
        key: 'actions',
        label: '#'
      }
      const modelFields = this.modelData.fieldsForTable || this.modelData.fields
      const enabledFields = modelFields.filter((field) => {
        return !field.hidden
      })
      const list = enabledFields.map(({ type, key, label, ...other }) => {
        label = this.$t(label || `form.label.${key}`)
        return {
          key,
          type,
          label,
          sortable: true,
          sortByFormatted: true,
          filterByFormatted: true,
          ...other
        }
      })
      return [index, id, ...list, actions]
    },
    sortOptions() {
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key }
        })
    },
    ...mapState({
      crud: (state) => state.crud,
      fieldTypes: (state) => state.fieldTypes
    }),
    ...mapGetters(['elementInDataset'])
  },
  watch: {
    pageSize(newValue) {
      this.perPageCount = newValue
    }
  },
  mounted() {
    this.dependencyLoad(this.modelData)
  },
  methods: {
    viewForeignData(field, value) {
      const datasetName = field.foreign_dataset
      const columnValue = field.foreign_value
      const columnLabel = field.foreign_label
      if (
        this.datasetCache[datasetName] &&
        this.datasetCache[datasetName][value]
      ) {
        return this.datasetCache[datasetName][value]
      }

      if (!this.datasetCache[datasetName]) {
        this.datasetCache[datasetName] = {}
      }

      const element = this.elementInDataset(datasetName, columnValue, value)
      if (element && element[columnValue] && element[columnLabel]) {
        this.datasetCache[datasetName][value] = element[columnLabel]
        return this.datasetCache[datasetName][value]
      }
      return value
    },
    findElementInDataset(datasetName, columnName, value) {
      return this.$store.dispatch('api/findElementInDataset', {
        datasetName,
        columnName,
        value
      })
    },
    dependencyLoad(modelData) {
      if (
        modelData &&
        Array.isArray(modelData.foreign) &&
        modelData.foreign.length >= 1
      ) {
        this.foreignDependencyDatasetLoad(modelData.foreign)
      }
      if (
        modelData.fields &&
        Array.isArray(modelData.fields) &&
        modelData.fields.length >= 1
      ) {
        this.dependencyDatasetLoad(modelData.fields)
      }
    },
    foreignDependencyDatasetLoad(foreign) {
      if (foreign.length >= 1) {
        foreign.forEach((f) => {
          const crudData = this.crud[f.crudName]
          if (crudData) {
            this.dependencyLoad(crudData)
          }
        })
      }
    },
    dependencyDatasetLoad(fields) {
      fields.forEach((field) => {
        if (!field.hidden && !field.disabled) {
          if (field.type === this.fieldTypes.json) {
            this.dependencyDatasetLoad(field.json)
          }

          if (field.foreign_crud) {
            this.storageLoadDataSet(field)
          }
        }
      })
    },
    changePaginate(page) {
      if (this.paginateType === this.PAGINATION_TYPES.SERVER) {
        if (this.searchItem && this.searchItem.trim().length >= 2) {
          this.onSearch(this.searchItem, page, this.perPageCount)
          return false
        }
        this.onPaginate(page, this.perPageCount)
        return false
      }
    },
    changePageSize(pageSize) {
      if (this.paginateType === this.PAGINATION_TYPES.SERVER) {
        if (this.searchItem && this.searchItem.trim().length >= 2) {
          this.onSearch(this.searchItem, this.currentPage, pageSize)
          return false
        }
        this.$emit('on-page-size', { page: this.currentPage, pageSize })
        return false
      }
      if (this.paginateType === this.PAGINATION_TYPES.LOCAL) {
        if (this.searchItem && this.searchItem.trim().length >= 2) {
          this.onSearch(this.searchItem, this.currentPage, pageSize)
          return false
        }
      }
      if (this.paginateType === this.PAGINATION_TYPES.STORAGE) {
        if (this.searchItem && this.searchItem.trim().length >= 2) {
          this.onSearch(this.searchItem, this.currentPage, pageSize)
          return false
        }
      }
    },
    changeSearchInput(value) {
      if (value && value.trim().length > 1) {
        if (this.paginateType === this.PAGINATION_TYPES.LOCAL) {
          this.debounceSearchLocal(value, this.currentPage, this.perPageCount)
        }
        if (this.paginateType === this.PAGINATION_TYPES.STORAGE) {
          this.debounceSearchLocal(value, this.currentPage, this.perPageCount)
        }
        if (this.paginateType === this.PAGINATION_TYPES.SERVER) {
          this.debounceSearchServer(value, this.currentPage, this.perPageCount)
        }
      }
    },
    onAction(action, data) {
      if (action === 'edit-item') {
        this.onEditSelect(data)
      } else if (action === 'delete-item') {
        this.onDelete(data)
      } else if (action === 'search') {
        this.onSearch(this.searchItem, this.currentPage, this.perPageCount)
      } else if (action === 'clear') {
        this.onClear(this.currentPage, this.perPageCount)
      }
    },
    onActionButton(actionButton, data) {
      this.$emit('on-action', {
        actionButton,
        data
      })
    },
    onEditSelect(data) {
      const cloneData = _.cloneDeep(data)
      this.$emit('on-edit', cloneData)
    },
    onDelete(data) {
      this.$emit('on-delete', data)
    },
    onSearch(search, page, pageSize) {
      this.$emit('on-search', { search, page, pageSize })
    },
    onPaginate(page, pageSize) {
      this.$emit('on-page', { page, pageSize })
    },
    onPageSize(page, pageSize) {
      this.$emit('on-page-size', { page, pageSize })
    },
    onClear(page, pageSize) {
      this.searchItem = ''
      this.$emit('on-page', { page, pageSize })
    },
    debounceSearchServer: _.debounce(function(search, page, pageSize) {
      this.onSearch(search, page, pageSize)
    }, 1000),

    debounceSearchLocal: _.debounce(function(search, page, pageSize) {
      this.onSearch(search, page, pageSize)
    }, 300)
  }
}
