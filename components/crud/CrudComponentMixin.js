import _ from 'lodash'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('api')

export default {
  props: {
    crud: {
      type: Object,
      default: () => {}
    },
    crudDataName: {
      type: String,
      default: () => ''
    }
  },
  computed: {
    crudData() {
      return this.crud[this.crudDataName]
    },
    restName() {
      return this.crudData.restName || ''
    },
    ...mapState({
      fieldTypes: (state) => state.fieldTypes
    })
  },
  data() {
    return {
      dataset: {},
      selectedRecord: {},
      crudListRecords: [],
      crudListCurrentPage: 1,
      crudListTotalRows: 0,
      crudListPageSize: 10,
      crudListPaginateType: 'local',
      PAGINATION_TYPES: {
        LOCAL: 'local',
        SERVER: 'server',
        STORAGE: 'storage'
      }
    }
  },
  async beforeMount() {
    await this.crudListGetRecordsInit()
    this.selectedRecord = this.initFields({}, this.crudData)
  },
  methods: {
    findInDataset(query, columnName, datasetName) {
      if (this.dataset && this.dataset[datasetName].length >= 1) {
        return this.$filterObjectArray(
          query,
          columnName,
          this.dataset[datasetName]
        )
      }
      return []
    },
    updateDatasetItem(id, data, datasetName) {
      const initConfig = this.crudData.initConfig
      if (initConfig && initConfig.getRecordList) {
        const configGetRecordList = initConfig.getRecordList
        if (configGetRecordList.paginate === this.PAGINATION_TYPES.LOCAL) {
          const elementIndex = _.findIndex(this.crudListRecords, { id })
          if (elementIndex >= 0) {
            this.$set(this.crudListRecords, elementIndex, data)
          }
        }
        if (configGetRecordList.paginate === this.PAGINATION_TYPES.STORAGE) {
          this.$store.dispatch('api/updateItemInDataset', {
            id,
            data,
            datasetName
          })
        }
        if (configGetRecordList.paginate === this.PAGINATION_TYPES.SERVER) {
          const elementIndex = _.findIndex(this.crudListRecords, {
            id
          })
          if (elementIndex >= 0) {
            this.$set(this.crudListRecords, elementIndex, data)
          }
        }
      } else {
        const elementIndex = _.findIndex(this.crudListRecords, (d) => {
          return Number(d.id) === Number(id)
        })
        if (elementIndex >= 0) {
          this.$set(this.crudListRecords, elementIndex, data)
        }
      }
    },
    async onCreate(data) {
      try {
        const res = await this.$store.dispatch('api/req', {
          req: this.crudData.rest.create,
          data
        })
        const message = (res.data && res.data.message) || ''
        if (res.data && !res.data.error && res.data.data) {
          this.clearForm()
          this.crudListRecords.push(res.data.data)
        }
        this.$bvToast.toast(message, {
          title: this.$i18n.t('success.title'),
          variant: 'success',
          solid: true,
          append: true
        })
      } catch (e) {
        const message =
          (e.response.data && e.response.data.message) || e.message
        this.$bvToast.toast(message, {
          title: this.$i18n.t('error.title'),
          variant: 'danger',
          solid: true,
          append: true
        })
      }
    },
    async onUpdate(data) {
      try {
        const res = await this.$store.dispatch('api/req', {
          req: this.crudData.rest.update,
          data
        })
        const message = (res.data && res.data.message) || ''
        if (!res.data.error) {
          this.updateDatasetItem(data.id, data, this.crudData.datasetName)
          this.clearForm()
        }
        this.$bvToast.toast(message, {
          title: this.$i18n.t('success.title'),
          variant: 'info',
          solid: true,
          append: true
        })
      } catch (e) {
        const message =
          (e.response.data && e.response.data.message) || e.message
        this.$bvToast.toast(message, {
          title: this.$i18n.t('error.title'),
          variant: 'danger',
          solid: true,
          append: true
        })
      }
    },
    async onDestroy(data) {
      try {
        const res = await this.$store.dispatch('api/req', {
          req: this.crudData.rest.destroy,
          data
        })
        const message = (res.data && res.data.message) || ''
        this.$bvModal
          .msgBoxConfirm(this.$t('dialog.confirm.delete.message'), {
            title: this.$t('dialog.confirm.delete.title'),
            size: 'sm',
            okVariant: 'danger',
            okTitle: this.$t('button.yes'),
            cancelTitle: this.$t('button.cancel'),
            footerClass: 'p-2',
            hideHeaderClose: false,
            centered: true
          })
          .then((value) => {
            if (res && res.data) {
              this.crudListRecords.splice(this.crudListRecords.indexOf(data), 1)
            }
            this.$bvToast.toast(message, {
              title: this.$i18n.t('success.title'),
              variant: 'info',
              solid: true,
              append: true
            })
          })
      } catch (e) {
        const message =
          (e.response.data && e.response.data.message) || e.message
        this.$bvToast.toast(message, {
          title: this.$i18n.t('error.title'),
          variant: 'danger',
          solid: true,
          append: true
        })
      }
    },
    onClear() {
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
          params
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
          if (_.isNil(record[foreign.crudName])) {
            if (foreign.type === this.fieldTypes.array) {
              this.$set(record, foreign.crudName, [])
            }
            if (foreign.type === this.fieldTypes.object) {
              this.$set(record, foreign.crudName, {})
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
        if (field.type === this.fieldTypes.json) {
          this.$set(record, field.key, {})
        } else {
          this.$set(record, field.key, null)
        }
      })
      if (Array.isArray(crudData.foreign) && crudData.foreign.length >= 1) {
        crudData.foreign.forEach((foreign) => {
          if (foreign.type === this.fieldTypes.array) {
            this.$set(record, foreign.crudName, [])
          }
          if (foreign.type === this.fieldTypes.object) {
            this.$set(record, foreign.crudName, {})
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
              datasetName: configGetRecordList.datasetName
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
          append: true
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
              datasetName: configGetRecordList.datasetName
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
          append: true
        })
      }
    },
    async onCrudListSearch({ search, page = 1, pageSize }) {
      if (search && String(search).length >= 1) {
        const initConfig = this.crudData.initConfig
        let req = this.crudData.rest.all
        let totalRows = 0
        let rows = []
        let paginateType = 'local'

        if (initConfig && initConfig.getRecordList) {
          const configGetRecordList = initConfig.getRecordList
          pageSize = pageSize || configGetRecordList.pageSize
          paginateType = configGetRecordList.paginate
          const searchColumn = configGetRecordList.searchColumn

          if (configGetRecordList.paginate === this.PAGINATION_TYPES.SERVER) {
            const rest = this.crudData.rest
            req = rest[configGetRecordList.methodOnSearch] || rest.search

            const { data } = await this.$store.dispatch('api/req', {
              req,
              params: {
                pageSize,
                page,
                search,
                searchColumn
              }
            })
            rows = data.rows
            totalRows = data.count
          }

          if (configGetRecordList.paginate === this.PAGINATION_TYPES.STORAGE) {
            const data = await this.$store.dispatch('api/findInDataset', {
              datasetName: configGetRecordList.datasetName,
              columnName: searchColumn,
              query: search
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
            restMethod: configGetRecordList.methodIfPaginateLocal
          })
          totalRows = (rows && Array.isArray(rows) && rows.length) || 0
          this.$store.dispatch('api/setDataset', {
            datasetName: configGetRecordList.datasetName,
            datalist: rows
          })
        }

        if (configGetRecordList.paginate === this.PAGINATION_TYPES.LOCAL) {
          rows = await this.crudListGetRecords({
            restMethod: configGetRecordList.methodIfPaginateLocal
          })
          totalRows = (rows && Array.isArray(rows) && rows.length) || 0
          this.$set(this.dataset, configGetRecordList.datasetName, rows)
          rows = this.dataset[configGetRecordList.datasetName]
        }

        if (configGetRecordList.paginate === this.PAGINATION_TYPES.SERVER) {
          const data = await this.crudListGetRecords({
            params: {
              page,
              pageSize
            },
            restMethod: configGetRecordList.methodIfPaginateServer
          })
          rows = data.rows
          totalRows = data.count
        }
      } else {
        rows = await this.crudListGetRecords({
          restMethod: 'all'
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
          params
        })
        return data || []
      } catch (e) {
        return []
      }
    }
  }
}
