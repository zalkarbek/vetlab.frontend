<template>
  <b-form-row>
    <template v-for="(form, index) in field.json">
      <b-col
        v-if="!form.disabled"
        :key="form.key"
        :sm="(form.col && form.col.sm) || 12"
        :md="(form.col && form.col.md) || 4"
        :xs="(form.col && form.col.xs) || 12"
        :lg="(form.col && form.col.lg) || 3"
        class="mg-lg-r-10 mg-xl-r-10"
      >
        <b-form-group
          :label="$t(form.label || `form.label.${form.key}`)"
          :label-for="`${modelData.restName}_${field.key}_${form.key}_crud_json_${index}`"
          :description="$t(form.description || `form.description.${form.key}`)"
        >
          <crud-field
            v-model="recordItem[form.key]"
            :field="form"
            :crud-data="modelData"
            :placeholder="
              $t(form.placeholder || `form.placeholder.${form.key}`)
            "
            @multi-input="onMultiInput"
          />
        </b-form-group>
      </b-col>
    </template>
  </b-form-row>
</template>
<script>
import CrudField from './CrudField'
import _ from 'lodash'
import { createNamespacedHelpers } from 'vuex'
const { mapState, mapGetters } = createNamespacedHelpers('api')

export default {
  components: {
    CrudField,
  },
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
    value: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  computed: {
    modelData() {
      return this.crudData
    },
    recordItem: {
      get() {
        if (_.isNil(this.value)) {
          this.$emit('input', {})
        }
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
    ...mapState({
      crud: (state) => state.crud,
      fieldTypes: (state) => state.fieldTypes,
    }),
    ...mapGetters({
      datasetList: 'dataset',
    }),
  },
  methods: {
    onMultiInput(multiValues) {
      if (multiValues && _.isObject(multiValues)) {
        const keys = Object.keys(multiValues)
        keys.forEach((key) => {
          this.$set(this.recordItem, key, multiValues[key])
        })
      }
    },
    toLowerCase(value) {
      return _.toLower(value)
    },
    toUpperCase(value) {
      return _.toUpper(value)
    },
  },
}
</script>
