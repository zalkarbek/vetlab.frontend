import _ from 'lodash'
import { mapState } from 'vuex'
import toastMixin from '~/mixins/toastMixin'

export default {
  mixins: [toastMixin],
  props: {
    crud: {
      type: Object,
      default: () => {},
    },
    crudDataName: {
      type: String,
      default: () => '',
    },
  },
  computed: {
    modals() {
      return this.crudData.modals
    },
    modalFormDataByRestName: {
      get() {
        return this.modalFormData[this.crudData.restName]
      },
      set(value) {
        this.$set(this.modalFormData, this.crudData.restName, value)
      }
    },
    ...mapState('dash', {
      modalTypes: (state) => state.modalTypes,
    }),
    ...mapState('api', {
      fieldTypes: (state) => state.fieldTypes,
    }),
    crudData() {
      return this.crud[this.crudDataName]
    },
    restName() {
      return this.crudData.restName || ''
    },
  },
  data() {
    return {
      modalFormData: {},
      dataset: {},
      selectedRecord: null,
      crudListRecords: [],
      crudListCurrentPage: 1,
      crudListTotalRows: 0,
      crudListPageSize: 10,
      crudListPaginateType: 'local',
      PAGINATION_TYPES: {
        LOCAL: 'local',
        SERVER: 'server',
        STORAGE: 'storage',
        OTHER: 'other'
      },
    }
  },
  async created() {
    await this.crudListGetRecordsInit()
    this.selectedRecord = this.initFields({}, this.crudData)
  },
  methods: {
    onListAction({ actionButton, data }) {
      if (this[actionButton.actionMethod])
        this[actionButton.actionMethod](actionButton, data)
    },
    onModalAction({ actionMethod, ...other }) {
      if (this[actionMethod]) this[actionMethod]({ ...other })
    },

    getPaginationType() {
      const initConfig = this.crudData.initConfig
      if(initConfig && initConfig.getRecordList) {
        const configGetRecordList = initConfig.getRecordList
        if(configGetRecordList.paginate === this.PAGINATION_TYPES.LOCAL)
          return this.PAGINATION_TYPES.LOCAL

        if(configGetRecordList.paginate === this.PAGINATION_TYPES.SERVER)
          return this.PAGINATION_TYPES.SERVER

        if(configGetRecordList.paginate === this.PAGINATION_TYPES.STORAGE)
          return this.PAGINATION_TYPES.STORAGE
      } else {
        return this.PAGINATION_TYPES.OTHER
      }
    },
    getStandDatasetName(datasetName) {
      if(datasetName)
        return datasetName
      const initConfig = this.crudData.initConfig
      if(initConfig && initConfig.getRecordList) {
        const configGetRecordList = initConfig.getRecordList
        return configGetRecordList.datasetName || this.crudData.datasetName
      }
      return this.crudData.datasetName
    },
    findInDataset(query, columnName, datasetName) {
      if(this.getPaginationType() === this.PAGINATION_TYPES.STORAGE) {
        this.$store.dispatch('api/findInDataset', {
          query,
          datasetName,
          columnName
        })
      }
      else if(this.getPaginationType() === this.PAGINATION_TYPES.SERVER) {
        return this.$filterObjectArray(
          query,
          columnName,
          this.crudListRecords
        )
      }
      else {
        if (this.dataset && this.dataset[datasetName].length >= 1) {
          return this.$filterObjectArray(
            query,
            columnName,
            this.dataset[datasetName]
          )
        }
      }
      return []
    },
    pushItemInDataset(data, datasetName) {
      datasetName = this.getStandDatasetName(datasetName)
      if (this.getPaginationType() === this.PAGINATION_TYPES.STORAGE) {
        this.$store.dispatch('api/pushItemToDataset', {
          data,
          datasetName,
        })
        return false
      }
      else if(this.getPaginationType() === this.PAGINATION_TYPES.SERVER) {
        this.$set(this.crudListRecords, this.crudListRecords.length, data)
        return false
      }
      else {
        this.$set(this.dataset[datasetName], this.dataset[datasetName].length, data)
        this.crudListRecords = this.dataset[datasetName]
        return false
      }
    },

    pushItemInDatasetFirst(data, datasetName) {
      datasetName = this.getStandDatasetName(datasetName)
      if (this.getPaginationType() === this.PAGINATION_TYPES.STORAGE) {
        this.$store.dispatch('api/pushItemToDatasetFirst', {
          data,
          datasetName,
        })
        return false
      }
      else if(this.getPaginationType() === this.PAGINATION_TYPES.SERVER) {
        this.crudListRecords.unshift(data)
        return false
      }
      else {
        if(this.dataset[datasetName] && Array.isArray(this.dataset[datasetName])) {
          this.dataset[datasetName].unshift(data)
          this.crudListRecords = this.dataset[datasetName]
        }
        return false
      }
    },

    updateItemInDataset(id, data, datasetName) {
      datasetName = this.getStandDatasetName(datasetName)
      if (this.getPaginationType() === this.PAGINATION_TYPES.STORAGE) {
        datasetName = datasetName || this.crudData.datasetName
        this.$store.dispatch('api/updateItemInDataset', {
          id,
          data,
          datasetName,
        })
      }
      else if(this.getPaginationType() === this.PAGINATION_TYPES.SERVER) {
        const elementIndex = _.findIndex(this.crudListRecords, { id })
        if (elementIndex >= 0) {
          this.$set(this.crudListRecords, elementIndex, data)
        }
      }
      else {
        const elementIndex = _.findIndex(this.dataset[datasetName], { id })
        if (elementIndex >= 0) {
          this.$set(this.dataset[datasetName], elementIndex, data)
        }
        this.crudListRecords = this.dataset[datasetName]
      }
    },
    removeItemInDataset(data, datasetName) {
      datasetName = this.getStandDatasetName(datasetName)
      if (this.getPaginationType() === this.PAGINATION_TYPES.STORAGE) {
        datasetName = datasetName || this.crudData.datasetName
        this.$store.dispatch('api/removeItemInDataset', {
          data,
          datasetName,
        })
      }
      else if(this.getPaginationType() === this.PAGINATION_TYPES.SERVER) {
        this.crudListRecords.splice(this.crudListRecords.indexOf(data), 1)
      }
      else {
        this.dataset[datasetName].splice(this.dataset[datasetName].indexOf(data), 1)
        this.crudListRecords = this.dataset[datasetName]
      }
    },

    async onCreate(data) {
      try {
        const res = await this.$store.dispatch('api/req', {
          req: this.crudData.rest.create,
          data,
        })
        const message = (res.data && res.data.message) || ''
        if (res.data && !res.data.error && res.data.data) {
          this.clearForm()
          this.pushItemInDatasetFirst(res.data.data, this.crudData.datasetName)
        }
        this.$bvToast.toast(message, {
          title: this.$i18n.t('success.title'),
          variant: 'success',
          solid: true,
          append: true,
        })
      } catch (e) {
        const message =
          (e.response.data && e.response.data.message) || e.message
        this.$bvToast.toast(message, {
          title: this.$i18n.t('error.title'),
          variant: 'danger',
          solid: true,
          append: true,
        })
      }
    },
    async onUpdate(data) {
      try {
        const res = await this.$store.dispatch('api/req', {
          req: this.crudData.rest.update,
          data,
        })
        const message = (res.data && res.data.message) || ''
        if (!res.data.error) {
          this.updateItemInDataset(data.id, data, this.crudData.datasetName)
          this.clearForm()
        }
        this.$bvToast.toast(message, {
          title: this.$i18n.t('success.title'),
          variant: 'info',
          solid: true,
          append: true,
        })
      } catch (e) {
        const message =
          (e.response.data && e.response.data.message) || e.message
        this.$bvToast.toast(message, {
          title: this.$i18n.t('error.title'),
          variant: 'danger',
          solid: true,
          append: true,
        })
      }
    },
    async onDestroy(data) {
      try {
        this.$bvModal
          .msgBoxConfirm(this.$t('dialog.confirm.delete.message'), {
            title: this.$t('dialog.confirm.delete.title'),
            size: 'sm',
            okVariant: 'danger',
            okTitle: this.$t('button.yes'),
            cancelTitle: this.$t('button.cancel'),
            footerClass: 'p-2',
            hideHeaderClose: false,
            centered: true,
          })
          .then(async (status) => {
            if (status) {
              const res = await this.$store.dispatch('api/req', {
                req: this.crudData.rest.destroy,
                data,
              })
              const message = (res.data && res.data.message) || ''
              if (res && res.data) {
                this.removeItemInDataset(data)
              }
              this.$bvToast.toast(message, {
                title: this.$i18n.t('success.title'),
                variant: 'info',
                solid: true,
                append: true,
              })
            }
          })
      } catch (e) {
        const message =
          (e.response.data && e.response.data.message) || e.message
        this.$bvToast.toast(message, {
          title: this.$i18n.t('error.title'),
          variant: 'danger',
          solid: true,
          append: true,
        })
      }
    },
    async onClear() {
      this.clearForm()
    },
    async onEditSelect(data) {
      const initConfig = this.crudData.initConfig
      if (
        initConfig &&
        initConfig.getEditRecord &&
        initConfig.getEditRecord.requireAttrs
      ) {
        const configEditRecord = initConfig.getEditRecord
        const params = {}
        configEditRecord.requireAttrs.forEach((attr) => {
          params[attr] = data[attr]
        })
        const crudData = this.crud[configEditRecord.crud] || this.crudData
        const req = crudData.rest[configEditRecord.method || 'id']
        const response = await this.$store.dispatch('api/req', {
          req,
          params,
        })
        this.selectedRecord = this.reInitFields(response.data, this.crudData)
        return false
      }
      this.selectedRecord = this.reInitFields(data, this.crudData)
      return false
    },

    reInitFields(record, crudData) {
      crudData.fields.forEach((field) => {
        if (_.isNil(record[field.key])) {
          if (field.type === this.fieldTypes.json) {
            this.$set(record, field.key, {})
          } else {
            this.$set(record, field.key, null)
          }
        }
      })
      if (Array.isArray(crudData.foreign) && crudData.foreign.length >= 1) {
        crudData.foreign.forEach((foreign) => {
          const foreignName = foreign.datasetName || foreign.crudName
          if (_.isNil(record[foreignName])) {
            if (foreign.type === this.fieldTypes.array) {
              this.$set(record, foreignName, [])
            }
            if (foreign.type === this.fieldTypes.object) {
              this.$set(record, foreignName, {})
            }
          }
        })
      }
      return record
    },
    initFields(record, crudData) {
      if (record && record.id) {
        this.$delete(record, 'id')
      }
      crudData.fields.forEach((field) => {
        if (!field.disabled && field.type === this.fieldTypes.json) {
          this.$set(record, field.key, {})
          if(field.json && field.json.length >= 1) {
            field.json.forEach((jsonField) => {
              this.$set(record[field.key], jsonField.key, null)
            })
          }
        } else if(!field.disabled) {
          this.$set(record, field.key, null)
        }
      })
      if (Array.isArray(crudData.foreign) && crudData.foreign.length >= 1) {
        crudData.foreign.forEach((foreign) => {
          if (foreign.type === this.fieldTypes.array) {
            const name = foreign.datasetName || foreign.crudName
            this.$set(record, name, [])
          }
          if (foreign.type === this.fieldTypes.object) {
            const name = foreign.datasetName || foreign.crudName
            this.$set(record, name, {})
          }
        })
      }
      return record
    },
    clearForm() {
      this.selectedRecord = this.initFields({}, this.crudData)
    },

    async onCrudListChangePage({ page, pageSize }) {
      try {
        const initConfig = this.crudData.initConfig
        if (initConfig && initConfig.getRecordList) {
          const configGetRecordList = initConfig.getRecordList

          if (configGetRecordList.paginate === this.PAGINATION_TYPES.LOCAL) {
            const rows = this.dataset[configGetRecordList.datasetName]
            this.crudListRecords = rows
            this.crudListTotalRows =
              (rows && Array.isArray(rows) && rows.length) || 0
          }

          if (configGetRecordList.paginate === this.PAGINATION_TYPES.STORAGE) {
            const rows = await this.$store.dispatch('api/getDataInDataset', {
              datasetName: configGetRecordList.datasetName,
            })
            this.crudListRecords = rows
            this.crudListTotalRows =
              (rows && Array.isArray(rows) && rows.length) || 0
          }

          if (configGetRecordList.paginate === this.PAGINATION_TYPES.SERVER) {
            await this.crudListGetRecordsInit({ page, pageSize })
            return false
          }
        } else {
          const rows = this.dataset[this.crudData.datasetName]
          this.crudListRecords = [...rows]
          this.crudListTotalRows =
            (rows && Array.isArray(rows) && rows.length) || 0
        }
        return false
      } catch (e) {
        this.$bvToast.toast('server error', {
          title: this.$i18n.t('server.error'),
          variant: 'info',
          solid: true,
          append: true,
        })
      }
    },
    async onCrudListChangePageSize({ page, pageSize }) {
      try {
        const initConfig = this.crudData.initConfig
        if (initConfig && initConfig.getRecordList) {
          const configGetRecordList = initConfig.getRecordList
          if (configGetRecordList.paginate === this.PAGINATION_TYPES.LOCAL) {
            const rows = this.dataset[configGetRecordList.datasetName]
            this.crudListRecords = [...rows]
            this.crudListTotalRows =
              (rows && Array.isArray(rows) && rows.length) || 0
            return false
          }

          if (configGetRecordList.paginate === this.PAGINATION_TYPES.STORAGE) {
            const rows = await this.$store.dispatch('api/getDataInDataset', {
              datasetName: configGetRecordList.datasetName,
            })
            this.crudListRecords = [...rows]
            this.crudListTotalRows =
              (rows && Array.isArray(rows) && rows.length) || 0
            return false
          }

          if (configGetRecordList.paginate === this.PAGINATION_TYPES.SERVER) {
            await this.crudListGetRecordsInit({ page, pageSize })
            return false
          }
        } else {
          const rows = this.dataset[this.crudData.datasetName]
          this.crudListRecords = [...rows]
          this.crudListTotalRows =
            (rows && Array.isArray(rows) && rows.length) || 0
        }
        return false
      } catch (e) {
        this.$bvToast.toast('server error', {
          title: this.$i18n.t('server.error'),
          variant: 'info',
          solid: true,
          append: true,
        })
      }
    },
    async onCrudListSearch({ search, page = 1, pageSize }) {
      if (search && search.length >= 1) {
        const initConfig = this.crudData.initConfig
        let totalRows = 0
        let rows = []
        let paginateType = 'local'

        if (initConfig && initConfig.getRecordList) {
          const configGetRecordList = initConfig.getRecordList
          const searchColumn = configGetRecordList.searchColumn || ['id']
          pageSize = pageSize || configGetRecordList.pageSize
          paginateType = configGetRecordList.paginate
          if (configGetRecordList.paginate === this.PAGINATION_TYPES.SERVER) {
            const rest = this.crudData.rest
            const req = rest[configGetRecordList.methodOnSearch] || rest.search || rest.all
            const { data } = await this.$store.dispatch('api/req', {
              req,
              params: {
                pageSize,
                page,
                search,
                searchColumn,
              },
            })
            rows = data.rows
            totalRows = data.count
          }
          if (configGetRecordList.paginate === this.PAGINATION_TYPES.STORAGE) {
            const data = await this.$store.dispatch('api/findInDataset', {
              datasetName: configGetRecordList.datasetName,
              columnName: searchColumn,
              query: search,
            })
            rows = data
            totalRows = data.length
          }
          if (configGetRecordList.paginate === this.PAGINATION_TYPES.LOCAL) {
            const data = this.findInDataset(
              search,
              searchColumn,
              this.crudData.datasetName
            )
            rows = data
            totalRows = data.length
          }
        } else {
          const columns = []
          this.crudData.fields.forEach((field) => {
            columns.push(field.key)
          })
          const data = this.findInDataset(
            search,
            columns,
            this.crudData.datasetName
          )
          rows = data
          totalRows = data.length
        }
        this.crudListRecords = [...rows]
        this.crudListTotalRows = totalRows
        this.crudListPaginateType = paginateType
        this.crudListPageSize = pageSize
        this.crudListCurrentPage = page
      }
    },
    async crudListGetRecordsInit({ page = 1, pageSize } = {}) {
      const initConfig = this.crudData.initConfig
      let totalRows = 0
      let rows = []
      let paginateType = 'local'

      if (initConfig && initConfig.getRecordList) {
        const configGetRecordList = initConfig.getRecordList
        pageSize = pageSize || configGetRecordList.pageSize
        paginateType = configGetRecordList.paginate
        if (configGetRecordList.paginate === this.PAGINATION_TYPES.STORAGE) {
          rows = await this.crudListGetRecords({
            restMethod: configGetRecordList.methodIfPaginateLocal,
          })
          totalRows = (rows && Array.isArray(rows) && rows.length) || 0
          await this.$store.dispatch('api/setDataset', {
            datasetName: configGetRecordList.datasetName,
            datalist: rows,
          })
        }
        if (configGetRecordList.paginate === this.PAGINATION_TYPES.LOCAL) {
          rows = await this.crudListGetRecords({
            restMethod: configGetRecordList.methodIfPaginateLocal,
          })
          totalRows = (rows && Array.isArray(rows) && rows.length) || 0
          this.$set(this.dataset, configGetRecordList.datasetName, rows)
          rows = this.dataset[configGetRecordList.datasetName]
        }
        if (configGetRecordList.paginate === this.PAGINATION_TYPES.SERVER) {
          const data = await this.crudListGetRecords({
            params: {
              page,
              pageSize,
            },
            restMethod: configGetRecordList.methodIfPaginateServer,
          })
          rows = data.rows
          totalRows = data.count
        }
      } else {
        rows = await this.crudListGetRecords({
          restMethod: 'all',
        })
        totalRows = (rows && Array.isArray(rows) && rows.length) || 0
        pageSize = pageSize || 10
        this.$set(this.dataset, this.crudData.datasetName, rows)
        rows = this.dataset[this.crudData.datasetName]
      }
      this.crudListRecords = [...rows]
      this.crudListTotalRows = totalRows
      this.crudListPaginateType = paginateType
      this.crudListPageSize = pageSize
      this.crudListCurrentPage = page
    },
    async crudListGetRecords({ params = {}, restMethod } = {}) {
      const req = this.crudData.rest[restMethod]
      try {
        const { data } = await this.$store.dispatch('api/req', {
          req,
          params,
        })
        return data || []
      } catch (e) {
        return []
      }
    },
  },
}
