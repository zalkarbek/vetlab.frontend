import { mapState } from 'vuex'
export default {
  data() {
    return {
      localDataset: {},
      searchDataset: {},
    }
  },
  computed: {
    ...mapState('api', {
      crud: (state) => state.crud,
      fieldTypes: (state) => state.fieldTypes,
      inputMask: (state) => state.inputMask,
      datasetList: (state) => state.dataset,
    }),
  },
  methods: {
    async storageLoadDataSet({
      foreign_dataset: datasetName,
      foreign_crud: datasetCrudName,
      foreign_crud_method: datasetCrudMethod,
      foreign_attributes: attributes,
      foreign_by_params: params = [],
    }) {
      const reqParams = {}
      if (params && Array.isArray(params) && params.length >= 1) {
        params.forEach((param) => {
          reqParams[param.paramName] = this.record[param.parentColumnName]
        })
      }
      await this.$store.dispatch('api/getDataset', {
        datasetName,
        datasetCrudName,
        datasetCrudMethod,
        params: {
          attributes,
          ...reqParams,
        },
      })
    },

    // загружает предварительные данные в локальное хранилище компонента
    async localLoadDataset({
      foreign_dataset: datasetName,
      foreign_crud: datasetCrudName,
      foreign_crud_method: datasetCrudMethod,
      foreign_attributes: attributes,
      foreign_by_params: params = [],
    }) {
      try {
        const reqParams = {}
        if (params && Array.isArray(params) && params.length >= 1) {
          params.forEach((param) => {
            reqParams[param.paramName] = this.record[param.parentColumnName]
          })
        }
        const crud = this.crud[datasetCrudName]
        const { data } = await this.$store.dispatch('api/req', {
          req: crud.rest[datasetCrudMethod] || crud.rest.all,
          params: {
            attributes,
            ...reqParams,
          },
        })
        this.$set(this.localDataset, datasetName, [...data])
        this.$emit('get-init-dataset', { datasetName, datasetCrudName })
      } catch (e) {
        this.$set(this.localDataset, datasetName, [])
      }
    },

    async search(text, field) {
      const crud = this.crud[field.foreign_crud]
      const req = crud.rest[field.foreign_crud_method]
      try {
        const { data } = await this.$store.dispatch('api/req', {
          req,
          params: {
            search: text,
            searchColumn: field.foreign_label,
            attributes: field.foreign_attributes,
          },
        })
        this.$set(this.searchDataset, field.foreign_dataset, data || [])
      } catch (e) {
        this.$set(this.searchDataset, field.foreign_dataset, [])
      }
    },
  },
}
