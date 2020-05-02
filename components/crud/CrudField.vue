<template>
  <div>
    <!-- ----------------------- FORM TEXT ----------------------- -->
    <template v-if="!form.disabled && form.type === fieldTypes.text">
      <input
        v-model.trim="formValue"
        :placeholder="placeholder || defaultPlaceholder(form)"
        type="text"
        class="form-control"
      />
    </template>
    <!-- -----------------------/ FORM TEXT /----------------------- -->

    <!-- ----------------------- FORM TEXTAREA ----------------------- -->
    <template v-if="!form.disabled && form.type === fieldTypes.textarea">
      <b-form-textarea
        v-model.trim="formValue"
        :placeholder="placeholder || defaultPlaceholder(form)"
        class="form-control"
      ></b-form-textarea>
    </template>
    <!-- -----------------------/ FORM TEXTAREA /----------------------- -->

    <!-- ----------------------- FORM NUMBER ----------------------- -->
    <template v-else-if="!form.disabled && form.type === fieldTypes.number">
      <input
        v-model.trim="formValue"
        :placeholder="placeholder || defaultPlaceholder(form)"
        type="number"
        class="form-control"
      />
    </template>
    <!-- -----------------------/ FORM NUMBER /----------------------- -->

    <!-- ----------------------- FORM SELECT ----------------------- -->
    <template v-else-if="!form.disabled && form.type === fieldTypes.select">
      <v-select
        v-model.trim="formValue"
        :reduce="(item) => item[form.foreign_value]"
        :placeholder="placeholder || defaultPlaceholder(form)"
        :label="form.foreign_label"
        :options="datasetList[form.foreign_dataset]"
        @search:focus="storageLoadDataSet(form)"
      />
    </template>
    <!-- -----------------------/ FORM SELECT /----------------------- -->

    <!-- ----------------------- FORM SELECT:PRELOAD ----------------------- -->
    <template
      v-else-if="!form.disabled && form.type === fieldTypes.select_preload"
    >
      <v-select
        v-model.trim="formValue"
        :reduce="(item) => item[form.foreign_value]"
        :placeholder="placeholder || defaultPlaceholder(form)"
        :label="form.foreign_label"
        :options="localDatasetList[form.foreign_dataset]"
        @search:focus="localLoadDataset(form)"
      />
    </template>
    <!-- -----------------------/ FORM SELECT:PRELOAD /----------------------- -->

    <!-- ----------------------- FORM SELECT:SEARCH ----------------------- -->
    <template
      v-else-if="!form.disabled && form.type === fieldTypes.select_search"
    >
      <v-select
        v-model.trim="formValue"
        :reduce="(item) => item[form.foreign_value]"
        :placeholder="placeholder || defaultPlaceholder(form)"
        :label="form.foreign_label"
        :options="searchDataset[form.foreign_dataset]"
        @search:focus="setCurrentField(form)"
        @search="fetchSearch"
      />
    </template>
    <!-- -----------------------/ FORM SELECT:SEARCH /----------------------- -->

    <!-- ----------------------- FORM AUTOCOMPLETE ----------------------- -->
    <template
      v-else-if="!form.disabled && form.type === fieldTypes.autocomplete"
    >
      <v-suggest
        :placeholder="placeholder || defaultPlaceholder(form)"
        :data="datasetList[form.foreign_dataset]"
        :show-field="form.foreign_label"
        v-model="formValue"
        @values="(data) => onSelect(data, form)"
        @focus="storageLoadDataSet(form)"
        @clear="clear()"
      >
      </v-suggest>
    </template>
    <!-- -----------------------/ FORM AUTOCOMPLETE /----------------------- -->

    <!-- ----------------------- FORM AUTOCOMPLETE:PRELOAD ----------------------- -->
    <template
      v-else-if="
        !form.disabled && form.type === fieldTypes.autocomplete_preload
      "
    >
      <v-suggest
        :placeholder="placeholder || defaultPlaceholder(form)"
        :data="localDatasetList[form.foreign_dataset]"
        :show-field="form.foreign_label"
        v-model="formValue"
        @values="(data) => onSelect(data, form)"
        @focus="localLoadDataset(form)"
        @clear="clear()"
      >
      </v-suggest>
    </template>
    <!-- -----------------------/ FORM AUTOCOMPLETE:PRELOAD /----------------------- -->

    <!-- ----------------------- FORM AUTOCOMPLETE:SEARCH ----------------------- -->
    <template
      v-else-if="!form.disabled && form.type === fieldTypes.autocomplete_search"
    >
      <v-suggest
        :placeholder="placeholder || defaultPlaceholder(form)"
        :data="searchDataset[form.foreign_dataset]"
        :show-field="form.foreign_label"
        v-model="formValue"
        @values="(data) => onSelect(data, form)"
        @search="(text) => search(text, form)"
        @clear="clear()"
      >
      </v-suggest>
    </template>
    <!-- -----------------------/ FORM AUTOCOMPLETE:SEARCH /----------------------- -->

    <!-- ----------------------- FORM MULTI-SELECT ----------------------- -->
    <template
      v-else-if="!form.disabled && form.type === fieldTypes.multi_select"
    >
      <multiselect
        v-model.trim="formValue"
        :placeholder="placeholder || defaultPlaceholder(form)"
        :options="datasetList[form.foreign_dataset]"
        :label="form.foreign_label"
        :value="form.foreign_value"
        @open="storageLoadDataSet(form)"
        multiple
        track-by="name"
      />
    </template>
    <!-- -----------------------/ FORM MULTI-SELECT /----------------------- -->

    <!-- ----------------------- FORM MULTI-SELECT:PRELOAD ----------------------- -->
    <template
      v-else-if="
        !form.disabled && form.type === fieldTypes.multi_select_preload
      "
    >
      <multiselect
        v-model.trim="formValue"
        :placeholder="placeholder || defaultPlaceholder(form)"
        :options="localDatasetList[form.foreign_dataset]"
        :label="form.foreign_label"
        :value="form.foreign_value"
        @open="localLoadDataset(form)"
        multiple
        track-by="name"
      />
    </template>
    <!-- -----------------------/ FORM MULTI-SELECT:PRELOAD /----------------------- -->
    <!-- ----------------------- FORM DATE ----------------------- -->
    <template v-else-if="!form.disabled && form.type === fieldTypes.date">
      <v-date-picker
        v-model.trim="formValue"
        :placeholder="placeholder || defaultPlaceholder(form)"
        :attributes="dateAttrs"
        :locale="{
          id: 'ru-RU',
          firstDayOfWeek: 2,
          masks: { weekdays: 'WW' }
        }"
      />
    </template>
    <!-- -----------------------/ FORM DATE /----------------------- -->
    <!-- ----------------------- FORM DATETIME ----------------------- -->
    <template v-else-if="!form.disabled && form.type === fieldTypes.datetime">
      <v-datetime-picker
        v-model.trim="formValue"
        :placeholder="placeholder || defaultPlaceholder(form)"
        :show-second="false"
        format="DD.MM.YYYY HH:mm"
        lang="ru"
        type="datetime"
      />
    </template>
    <!-- -----------------------/ FORM DATETIME /----------------------- -->

    <!-- ----------------------- FORM MASK ----------------------- -->
    <template v-else-if="!form.disabled && form.type === fieldTypes.input_mask">
      <imask-input
        @accept="maskOnAccept"
        v-model="formValue"
        :mask="inputMask[form.mask.name] || form.mask.custom"
        :unmask="true"
        :placeholder="placeholder || defaultPlaceholder(form)"
        class="form-control"
      />
    </template>
    <!-- -----------------------/ FORM MASK /----------------------- -->
  </div>
</template>
<script>
import _ from 'lodash'
import { createNamespacedHelpers } from 'vuex'

const { mapState } = createNamespacedHelpers('api')

export default {
  props: {
    crudData: {
      type: Object,
      default() {
        return {}
      }
    },
    field: {
      type: Object,
      default() {
        return {}
      }
    },
    id: {
      type: String,
      default() {
        return null
      }
    },
    placeholder: {
      type: String,
      default() {
        return null
      }
    },
    // eslint-disable-next-line vue/require-default-prop
    value: [String, Number, Boolean, Array, Object, Date, Function],
    // eslint-disable-next-line vue/require-default-prop
    record: [Object, Array, String]
  },
  data() {
    return {
      localDataset: {},
      searchDataset: {},
      created: false,
      update: false,
      currentField: {},
      dateAttrs: [
        {
          key: 'today',
          highlight: {
            color: 'blue',
            fillMode: 'none'
          },
          dates: new Date(),
          popover: {
            label: 'Сегодня!'
          }
        }
      ]
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
      }
    },
    // defaultId() {
    //   return (form) => `${this.crudData.restName}_${form.key}_${form.type}`
    // },
    defaultPlaceholder() {
      return (form) => this.$t(`form.placeholder.${form.key}`)
    },
    ...mapState({
      crud: (state) => state.crud,
      fieldTypes: (state) => state.fieldTypes,
      inputMask: (state) => state.inputMask,
      datasetList: (state) => state.dataset
    })
  },
  methods: {
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
        data
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
            attributes: field.foreign_attributes
          }
        })
        this.$set(this.searchDataset, field.foreign_dataset, data || [])
      } catch (e) {
        console.error(e)
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
        ...requestParams
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
        console.error(e)
      }
    },

    foreignAttributesShare(attributes, fromData) {
      const values = {}
      attributes.forEach((attr) => {
        values[attr.destKey] = fromData[attr.sourceKey]
      })
      return values
    },

    fetchSearch: _.debounce(async function(search, loading) {
      loading(true)
      const field = this.currentField
      try {
        const { data } = await this.$store.dispatch('api/req', {
          req: this.crud[field.foreign_crud].rest.search,
          params: {
            search,
            searchColumn: field.foreign_label,
            attributes: field.foreign_attributes
          }
        })
        this.$set(this.searchDataset, field.foreign_dataset, data || [])
      } catch (e) {
        this.$set(this.searchDataset, field.foreign_dataset, [])
      }
      loading(false)
    }, 500),

    async storageLoadDataSet({
      foreign_dataset: datasetName,
      foreign_crud: datasetCrud,
      foreign_crud_method: datasetCrudMethod,
      foreign_attributes: attributes
    }) {
      await this.$store.dispatch('api/getDataset', {
        datasetName,
        datasetCrud,
        datasetCrudMethod,
        params: {
          attributes
        }
      })
    },

    // загружает предварительные данные в локальное хранилище компонента
    async localLoadDataset({
      foreign_dataset: datasetName,
      foreign_crud: datasetCrud
    }) {
      if (
        !this.localDataset[datasetName] ||
        !this.localDataset[datasetName].length
      ) {
        try {
          const { data } = await this.$store.dispatch('api/req', {
            req: this.crud[datasetCrud].rest.all
          })
          this.$set(this.localDataset, datasetName, [...data])
        } catch (e) {
          console.error(e)
          this.$set(this.localDataset, datasetName, [])
        }
      }
    }
  }
}
</script>
