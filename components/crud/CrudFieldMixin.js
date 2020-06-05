import _ from 'lodash'
import { createNamespacedHelpers } from 'vuex'
import loadDatasetMixin from '~/mixins/loadDatasetMixin'
const { mapState } = createNamespacedHelpers('api')

export default {
  mixins: [loadDatasetMixin],
  props: {
    crudData: {
      type: Object,
      default() {
        return {}
      },
    },
    field: {
      type: Object,
      default() {
        return {}
      },
    },
    id: {
      type: String,
      default() {
        return null
      },
    },
    placeholder: {
      type: String,
      default() {
        return null
      },
    },
    // eslint-disable-next-line vue/require-default-prop
    value: [String, Number, Boolean, Array, Object, Date, Function],
    // eslint-disable-next-line vue/require-default-prop
    record: [Object, Array, String],
  },
  data() {
    return {
      localDataset: {},
      searchDataset: {},
      created: false,
      update: false,
      currentField: {},
      dateAttrs: [],
    }
  },
  computed: {
    localDatasetList() {
      return this.localDataset
    },
    modelData() {
      return this.crudData
    },
    form() {
      return this.field
    },
    formValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
    defaultPlaceholder() {
      return (form) => this.$t(`form.placeholder.${form.key}`)
    },
    ...mapState({
      crud: (state) => state.crud,
      fieldTypes: (state) => state.fieldTypes,
      inputMask: (state) => state.inputMask,
      datasetList: (state) => state.dataset,
    }),
  },
  mounted() {
    if (this.form.type === this.fieldTypes.date && this.formValue) {
      this.formValue = new Date(this.formValue)
    }

    if (this.form.type === this.fieldTypes.datetime && this.formValue) {
      this.formValue = new Date(this.formValue)
    }
  },
  methods: {
    async addNewTag(newTag, field) {
      const data = {}
      data[field.foreign_label] = newTag
      const req = this.crud[field.foreign_crud].rest.create
      try {
        const result = await this.request({ req, data })
        let res = result
        if(result.data)
          res = result.data

        if(res.data && !res.error) {
          this.pushItemInStoreDatasetFirst(res.data, field.foreign_dataset)
          let tagArr = []

          if(field.foreign_attributes && Array.isArray(field.foreign_attributes)) {
            const itemOnAttr = {}
            field.foreign_attributes.forEach((attr) => {
              itemOnAttr[attr] = res.data[attr]
            })
            tagArr.push(itemOnAttr)
          } else {
            tagArr.push({
              [field.foreign_label]: res.data[field.foreign_label],
              id: res.data.id
            })
          }

          if(this.formValue && Array.isArray(this.formValue)) {
            this.formValue = [...tagArr, ...this.formValue]
          } else {
            this.formValue = [...tagArr]
          }

        } else {
          this.toastDanger(this.$t(`${field.foreign_crud}.error.notAdd.${field.key}`))
        }
      }catch (e) {
        this.toastDanger(this.$t(`${field.foreign_crud}.error.notAdd.${field.key}`))
      }
    },

    translateForeignValues(values = []) {
      if (values && Array.isArray(values) && values.length >= 1) {
        return values.map((val) => {
          return {
            label: this.$t(val.label),
            value: val.value,
          }
        })
      }
      return []
    },
    maskOnAccept(value) {},
    setCurrentField(field) {
      this.currentField = field
    },
    clear() {
      this.formValue = null
    },
    request({ req, params = {}, data = {} }) {
      return this.$store.dispatch('api/req', {
        req,
        params,
        data,
      })
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

    async onSelect(item, field) {
      if (field.foreign_attributes_share) {
        const multiValues = this.foreignAttributesShare(
          field.foreign_attributes_share,
          item
        )
        this.$emit('multi-input', multiValues)
        return false
      }
      if (field.foreign_on_select && _.isObject(field.foreign_on_select)) {
        const fieldOnSelect = field.foreign_on_select
        const rest = this.crud[fieldOnSelect.foreign_crud].rest
        const req = rest[fieldOnSelect.foreign_crud_method]
        const multiValues = await this.foreignRequest(item, fieldOnSelect, req)
        this.$emit('multi-input', multiValues)
        return false
      }
      this.formValue = item[field.foreign_value]
    },

    async foreignRequest(item, field, req) {
      const requestProps = field.foreign_request_props
      const requestParams = {}
      if (
        requestProps &&
        Array.isArray(requestProps) &&
        requestProps.length >= 1
      ) {
        requestProps.forEach((propName) => {
          requestParams[propName] = item[propName]
        })
      } else {
        requestParams.id = item.id
      }

      const params = {
        attributes: field.foreign_attributes,
        ...requestParams,
      }
      try {
        const { data } = await this.request({ req, params })
        if (field.foreign_attributes_share) {
          return this.foreignAttributesShare(
            field.foreign_attributes_share,
            data
          )
        }
      } catch (e) {
        return {}
      }
    },

    foreignAttributesShare(attributes, fromData) {
      const values = {}
      attributes.forEach((attr) => {
        values[attr.destKey] = fromData[attr.sourceKey]
      })
      return values
    },

    fetchSearch: _.debounce(async function (search, loading) {
      loading(true)
      const field = this.currentField
      try {
        const { data } = await this.$store.dispatch('api/req', {
          req: this.crud[field.foreign_crud].rest.search,
          params: {
            search,
            searchColumn: field.foreign_label,
            attributes: field.foreign_attributes,
          },
        })
        this.$set(this.searchDataset, field.foreign_dataset, data || [])
      } catch (e) {
        this.$set(this.searchDataset, field.foreign_dataset, [])
      }
      loading(false)
    }, 500),

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
  },
}
