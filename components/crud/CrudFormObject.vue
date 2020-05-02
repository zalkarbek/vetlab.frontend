<template>
  <div>
    <b-form-row>
      <template v-for="(field, index) in modelData.fields">
        <!--==================================================================-->
        <b-col
          v-if="!field.disabled && toLowerCase(field.type) !== fieldTypes.json"
          :key="field.key"
          :sm="(field.col && field.col.sm) || 12"
          :md="(field.col && field.col.md) || 4"
          :xs="(field.col && field.col.xs) || 12"
          :lg="(field.col && field.col.lg) || 3"
          class="mg-lg-r-10 mg-xl-r-10"
        >
          <b-form-group
            :label="$t(field.label || `form.label.${field.key}`)"
            :label-for="`${modelData.restName}_${field.key}_crud_${index}`"
            :description="
              $t(field.description || `form.description.${field.key}`)
            "
          >
            <crud-field
              v-model="recordItem[field.key]"
              :field="field"
              :crud-data="modelData"
              :id="`${modelData.restName}_${field.key}_crud_${index}`"
              :placeholder="
                $t(field.placeholder || `form.placeholder.${field.key}`)
              "
            >
            </crud-field>
          </b-form-group>
        </b-col>
        <!--==================================================================-->
        <!--==================================================================-->
        <b-col
          v-if="!field.disabled && toLowerCase(field.type) === fieldTypes.json"
          cols="12"
        >
          <h5 class="mg-b-10">{{ $t(field.key) }}</h5>
          <crud-field-json
            v-model="recordItem[field.key]"
            :field="field"
            :crud-data="modelData"
          />
        </b-col>
        <!--==================================================================-->
      </template>
    </b-form-row>
  </div>
</template>
<script>
import _ from 'lodash'
import { createNamespacedHelpers } from 'vuex'
import CrudField from './CrudField'
import CrudFieldJson from './CrudFieldJson'
const { mapState } = createNamespacedHelpers('api')

export default {
  components: {
    CrudField,
    CrudFieldJson
  },
  props: {
    crudData: {
      type: Object,
      default() {
        return {}
      }
    },
    value: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      created: false,
      update: false
    }
  },
  computed: {
    modelData() {
      return this.crudData
    },
    recordItem() {
      return this.value
    },
    ...mapState({
      crud: (state) => state.crud,
      fieldTypes: (state) => state.fieldTypes
    })
  },
  beforeMount() {
    this.modelData.fields.forEach((field) => {
      if (field.type === this.fieldTypes.json) {
        this.$set(this.recordItem, field.key, {})
      } else {
        this.$set(this.recordItem, field.key, null)
      }
    })
  },
  methods: {
    toLowerCase(value) {
      return _.toLower(value)
    },
    toUpperCase(value) {
      return _.toUpper(value)
    }
  }
}
</script>
