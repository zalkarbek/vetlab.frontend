<template>
  <div class="card card-body">
    <b-container fluid>
      <!-- User Interface controls -->
      <b-row>
        <b-col lg="3" class="my-1">
          <b-form-group
            :label="$t('form.label.sort')"
            :description="$t('form.description.sort')"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            label-for="sortBySelect"
            label-class="tx-bold"
            class="mb-0"
          >
            <b-input-group size="sm">
              <b-form-select
                id="sortBySelect"
                v-model="sortBy"
                :options="sortOptions"
                class="w-75"
              >
                <template v-slot:first>
                  <option value="">-- none --</option>
                </template>
              </b-form-select>
              <b-form-select
                v-model="sortDesc"
                :disabled="!sortBy"
                size="sm"
                class="w-25"
              >
                <option :value="false">Asc</option>
                <option :value="true">Desc</option>
              </b-form-select>
            </b-input-group>
          </b-form-group>
        </b-col>

        <b-col lg="9" class="my-1">
          <b-row>
            <b-col lg="5">
              <b-form-group
                :label="$t('form.label.search')"
                :description="$t('form.description.search')"
                label-cols-sm="2"
                label-align-sm="right"
                label-size="sm"
                label-for="filterInput"
                label-class="tx-bold"
                class="mb-0"
              >
                <b-input-group size="sm">
                  <b-form-input
                    v-model="searchItem"
                    @input="changeSearchInput"
                    :placeholder="$t('form.placeholder.search')"
                  ></b-form-input>
                  <b-input-group-append>
                    <b-button
                      :disabled="searchItem && searchItem.trim().length < 1"
                      @click="onAction('clear')"
                    >
                      {{ $t('form.label.clear') }}
                    </b-button>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>

            <b-col lg="4">
              <b-form-group
                :label="$t('form.label.filter')"
                :description="$t('form.description.filter')"
                label-cols-sm="2"
                label-align-sm="right"
                label-size="sm"
                label-for="filterInput"
                label-class="tx-bold"
                class="mb-0"
              >
                <b-input-group size="sm">
                  <b-form-input
                    v-model="filter"
                    :placeholder="$t('form.placeholder.filter')"
                    type="search"
                  ></b-form-input>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col lg="3">
              <b-form-group
                :label="$t('form.label.filter_on')"
                :description="$t('form.description.filter_on')"
                label-cols-sm="3"
                label-align-sm="right"
                label-class="tx-bold"
                class="mb-0"
              >
                <b-form-checkbox-group v-model="filterOn" class="mt-1">
                  <template v-for="column in sortOptions">
                    <b-form-checkbox :value="column.value">
                      {{ column.text }}
                    </b-form-checkbox>
                  </template>
                </b-form-checkbox-group>
              </b-form-group>
            </b-col>
          </b-row>
        </b-col>

        <b-col lg="9" class="my-1">
          <b-row>
            <b-col lg="4">
              <b-form-group
                :label="$t('form.label.per_page')"
                :description="$t('form.description.per_page')"
                label-cols-sm="3"
                label-align-sm="right"
                label-size="sm"
                label-for="perPageSelect"
                label-class="tx-bold"
                class="mb-0"
              >
                <b-form-select
                  id="perPageSelect"
                  @change="changePageSize"
                  v-model="perPageCount"
                  :options="pageOptions"
                  size="sm"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col lg="8">
              <b-pagination
                v-model="currentPage"
                @change="changePaginate"
                :total-rows="totalRowsCount"
                :per-page="perPageCount"
                limit="10"
                align="fill"
                size="sm"
                class="my-0"
              ></b-pagination>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <!--MAIN INTERFACE-->
      <template v-if="recordItems.length >= 1">
        <b-table
          :items="currentPageRecords"
          :fields="fields"
          :current-page="currentPage"
          :filter="filter"
          :filterIncludedFields="filterOn"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          show-empty
          small
          stacked="md"
          responsive
          bordered
          hover
        >
          <template v-slot:cell(index)="data">
            {{ data.index + 1 }}
          </template>

          <template v-slot:cell()="data">
            <template v-if="data.field.type === fieldTypes.json">
              <crud-list-view-json
                :field-data="data.field"
                :data="data.item[data.field.key]"
                view-type="inline"
              ></crud-list-view-json>
            </template>
            <template v-else-if="data.field.foreign_crud">
              <span>{{ viewForeignData(data.field, data.value) }}</span>
            </template>
            <template v-else>
              {{ data.value }}
            </template>
          </template>

          <template v-slot:cell(status)>
            <span class="tx-12 badge badge-primary">новый</span>
            <br />
            <span class="tx-12 badge badge-secondary">
              отправлен
            </span>
            <br />
            <span class="tx-12 badge badge-success">принят</span>
          </template>

          <template v-slot:cell(actions)="row">
            <b-button-toolbar>
              <b-button-group class="mr-1" size="sm">
                <template v-for="(button, index) in actionButtons">
                  <b-button
                    @click="onActionButton(button, row.item)"
                    :key="index"
                    :variant="button.variant || 'secondary'"
                  >
                    <i
                      :class="button.icon"
                      class="cursor-pointer"
                      aria-hidden="true"
                    ></i>
                    {{ $t(button.label) }}
                  </b-button>
                </template>
              </b-button-group>
            </b-button-toolbar>
          </template>
        </b-table>
      </template>
    </b-container>
  </div>
</template>
<script>
import CrudListViewJson from '~/components/crud/CrudListViewJson'
import _ from 'lodash'
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapGetters } = createNamespacedHelpers('api')

export default {
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
        label: '#'
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
    }, 300),

    async storageLoadDataSet({
      foreign_dataset: datasetName,
      foreign_crud: datasetCrudName,
      foreign_crud_method: datasetCrudMethod,
      foreign_attributes: attributes
    }) {
      await this.$store.dispatch('api/getDataset', {
        datasetName,
        datasetCrudName,
        datasetCrudMethod,
        params: {
          attributes
        }
      })
    }
  }
}
</script>
