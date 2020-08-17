<template>
  <div>
    <template v-for="(item, index) in recordItems">
      <h5>
        <span>
          {{ $t(`${modelData.restName}.label.one`) }} №{{ item.nomer }} &nbsp;
        </span>
        <i
            class="fal fa-times cursor-pointer hover-size-24"
            @click="removeCurrentElement(index)"
        />
      </h5>
      <div class="divider-text">
        <span class="tx-14">####### {{ index + 1 }} #######</span>
      </div>
      <b-form-row>
        <template v-for="(field) in modelData.fields">
          <!--==================================================================-->
          <b-col
              v-if="!field.disabled
              && notIn(notEqual, field.notIn)
              && toLowerCase(field.type) !== fieldTypes.json"
              :key="field.key"
              :sm="(field.col && field.col.sm) || 12"
              :md="(field.col && field.col.md) || 4"
              :xs="(field.col && field.col.xs) || 12"
              :lg="(field.col && field.col.lg) || 3"
              :xl="(field.col && field.col.xl) || 3"
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
                  :id="`${modelData.restName}_${field.key}_crud_${index}`"
                  v-model="item[field.key]"
                  :field="field"
                  :crud-data="modelData"
                  :placeholder="
                  $t(field.placeholder || `form.placeholder.${field.key}`)
                "
              />
            </b-form-group>
          </b-col>
          <!--==================================================================-->

          <!--======================FIELD TYPE JSON=============================-->
          <template
              v-if="!field.disabled
            && item[field.key]
            && notIn(notEqual, field.notIn)
            && toLowerCase(field.type) === fieldTypes.json"
          >
            <template v-for="(form, index) in field.json">
              <b-col
                  v-if="!form.disabled && isObject(item[field.key])"
                  :sm="(form.col && form.col.sm) || 12"
                  :md="(form.col && form.col.md) || 4"
                  :xs="(form.col && form.col.xs) || 12"
                  :lg="(form.col && form.col.lg) || 3"
                  :xl="(form.col && form.col.xl) || 3"
                  class="mg-lg-r-10 mg-xl-r-10"
              >
                <b-form-group
                    :label="$t(form.label || `form.label.${form.key}`)"
                    :label-for="`${modelData.restName}_${field.key}_${form.key}_crud_json_${index}`"
                    :description="$t(form.description || `form.description.${form.key}`)"
                >
                  <slot :name="form.key" :field="form" :item="item[field.key]">
                    <crud-field
                        v-model="item[field.key][form.key]"
                        :field="form"
                        :crud-data="modelData"
                        :placeholder="$t(form.placeholder || `form.placeholder.${form.key}`)"
                        @multi-input="(multiValues) => onMultiInputItem(item[field.key], multiValues)"
                    />
                  </slot>
                </b-form-group>
              </b-col>
            </template>
          </template>
          <!--==================================================================-->

        </template>
      </b-form-row>
    </template>
  </div>
</template>
<script>
  import CrudField from '~/components/crud/CrudField'
  import utilMixin from '~/mixins/utilMixin'
  import _ from 'lodash'
  import { createNamespacedHelpers } from 'vuex'
  const { mapState } = createNamespacedHelpers('api')

  export default {
    mixins: [utilMixin],
    components: {
      CrudField
    },
    props: {
      crudData: {
        type: Object,
        default() {
          return {}
        },
      },
      value: {
        type: Array,
        default() {
          return []
        },
      },
      notEqual: [Number, Object, String, Array]
    },
    data() {
      return {
        created: false,
        update: false,
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
        fieldTypes: (state) => state.fieldTypes,
      }),
    },
    beforeMount() {
      this.initFields()
    },
    methods: {
      initFields() {
        this.recordItems.forEach((record) => {
          this.modelData.fields.forEach((field) => {
            if (!field.disabled && field.type === this.fieldTypes.json) {
              if (record && !record[field.key]) {
                this.$set(record, field.key, {})
                if(field.json && field.json.length >= 1) {
                  field.json.forEach((jsonField) => {
                    this.$set(record[field.key], jsonField.key, null)
                  })
                }
              }
            } else if(!field.disabled) {
              this.$set(record, field.key, null)
            }
          })
        })
      },

      onMultiInputItem(item, multiValues) {
        if (multiValues && _.isObject(multiValues)) {
          const keys = Object.keys(multiValues)
          keys.forEach((key) => {
            this.$set(item, key, multiValues[key])
          })
        }
      },

      toLowerCase(value) {
        return _.toLower(value)
      },
      toUpperCase(value) {
        return _.toUpper(value)
      },
      removeCurrentElement(index) {
        this.$emit('remove-element', { index })
      },
    },
  }
</script>
