<template>
  <div>
    <template v-for="(item, index) in recordItems">
      <h5>
        #{{ index + 1 }} &nbsp;
        <i
          @click="removeCurrentElement(index)"
          class="fal fa-times cursor-pointer hover-size-24"
        ></i>
      </h5>
      <hr />
      <b-form-row>
        <template v-for="field in modelData.fields">
          <!--==================================================================-->
          <b-col
            v-if="
              !field.disabled && toLowerCase(field.type) !== fieldTypes.json
            "
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
                v-model="item[field.key]"
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
            v-if="
              !field.disabled && toLowerCase(field.type) === fieldTypes.json
            "
            cols="12"
          >
            <h5 class="mg-b-10">
              {{ field.label || $t(`form.label.${field.key}`) }}
            </h5>
            <crud-field-json
              v-model="item[field.key]"
              :field="field"
              :crud-data="modelData"
            />
          </b-col>
          <!--==================================================================-->
        </template>
      </b-form-row>
    </template>
  </div>
</template>
<script>
import CrudField from './CrudField'
import CrudFieldJson from './CrudFieldJson'
import _ from 'lodash'
import { createNamespacedHelpers } from 'vuex'
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
      type: Array,
      default() {
        return []
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
    recordItems() {
      return this.value
    },
    ...mapState({
      crud: (state) => state.crud,
      fieldTypes: (state) => state.fieldTypes
    })
  },
  beforeMount() {
    this.initJsonFields()
  },
  beforeUpdate() {
    this.initJsonFields()
  },
  methods: {
    initJsonFields() {
      this.modelData.fields.forEach((field) => {
        if (field.type === this.fieldTypes.json) {
          this.recordItems.forEach((record) => {
            if (record && !record[field.key]) {
              this.$set(record, field.key, {})
            }
          })
        }
      })
    },
    toLowerCase(value) {
      return _.toLower(value)
    },
    toUpperCase(value) {
      return _.toUpper(value)
    },
    removeCurrentElement(index) {
      this.$emit('remove-element', { index })
    }
  }
}
</script>
