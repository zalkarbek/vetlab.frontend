<template>
  <div class="card card-body">
    <h4>{{ $t('form.add') }}</h4>
    <b-container fluid>
      <!--==================================================================-->
      <b-form-row>
        <template v-for="(field, index) in modelData.fields">
          <!--==============================FIELD TYPE OTHER====================================-->
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
                v-model="recordItem[field.key]"
                @multi-input="onMultiInput"
                :record="recordItem"
                :field="field"
                :crud-data="modelData"
                :id="`${modelData.restName}_${field.key}_crud_${index}`"
                :placeholder="
                  $t(field.placeholder || `form.placeholder.${field.key}`)
                "
              />
            </b-form-group>
          </b-col>
          <!--==================================================================-->
          <!--================================FIELD TYPE JSON==================================-->
          <b-col
            v-if="
              !field.disabled && toLowerCase(field.type) === fieldTypes.json
            "
            cols="12"
          >
            <h5 class="mg-b-10">{{ $t(`form.label.${field.key}`) }}</h5>
            <crud-field-json
              v-model="recordItem[field.key]"
              :field="field"
              :crud-data="modelData"
            />
            <hr />
          </b-col>
          <!--==================================================================-->
        </template>
      </b-form-row>
      <!--================================FOREIGN MODELS==================================-->
      <template
        v-if="Array.isArray(modelData.foreign) && modelData.foreign.length >= 1"
      >
        <template v-for="foreignCrud in modelData.foreign">
          <!-- ============================FOREIGN ARRAY======================================-->
          <div v-if="foreignCrud.type === fieldTypes.array" class="mg-b-20">
            <h5>
              {{ $t(`${foreignCrud.crudName}.title`) }} &nbsp;
              <button
                @click="
                  addNewObjectToDataArray(recordItem, foreignCrud.crudName)
                "
                type="button"
                class="btn btn-xs btn-outline-primary"
              >
                добавить
              </button>
            </h5>
            <div class="divider-text">
              {{ $t(`${foreignCrud.crudName}.title`) }}
            </div>
            <crud-form-array
              :crud-data="crud[foreignCrud.crudName]"
              v-model="recordItem[foreignCrud.crudName]"
              @remove-element="
                (index) => recordItem[foreignCrud.crudName].splice(index, 1)
              "
            />
          </div>
          <!--==================================================================-->
          <!--============================FOREIGN OBJECT======================================-->
          <div v-if="foreignCrud.type === fieldTypes.object" class="mg-b-20">
            <h5 class="mg-b-10">{{ $t(`${foreignCrud.crudName}.title`) }}</h5>
            <div class="divider-text">
              {{ $t(`${foreignCrud.crudName}.title`) }}
            </div>
            <crud-form-object
              :crud-data="crud[foreignCrud.crudName]"
              v-model="recordItem[foreignCrud.crudName]"
            />
          </div>
          <!--==================================================================-->
        </template>
      </template>
    </b-container>

    <b-button-group class="col-sm-12 col-md-4 col-xs-8 col-lg-4">
      <b-button v-if="!record.id" @click="createEvent()" variant="success">
        <i class=" fal fa-save" />
        {{ $t('form.save') }}
      </b-button>
      <b-button v-if="record.id" @click="updateEvent()" variant="warning">
        <i class=" fal fa-undo" />
        {{ $t('form.update') }}
      </b-button>
      <b-button @click="clearEvent()" variant="danger">
        <i class=" fal fa-trash-alt" />
        {{ $t('form.clear') }}
      </b-button>
    </b-button-group>
  </div>
</template>
<script>
import CrudField from './CrudField'
import CrudFieldJson from './CrudFieldJson'
import CrudFormArray from './CrudFormArray'
import CrudFormObject from './CrudFormObject'
import _ from 'lodash'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('api')

export default {
  components: {
    CrudField,
    CrudFieldJson,
    CrudFormArray,
    CrudFormObject
  },
  // model: {
  //   prop: 'record',
  //   event: 'on-clear'
  // },
  props: {
    crudData: {
      type: Object,
      default() {
        return {}
      }
    },
    record: {
      type: Object,
      default() {
        return null
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
    recordItem: {
      get() {
        return this.record
      },
      set(value) {
        this.$emit('input', value)
      }
    },
    ...mapState({
      crud: (state) => state.crud,
      fieldTypes: (state) => state.fieldTypes
    })
  },
  beforeMount() {
    this.initFields()
  },
  mounted() {},
  methods: {
    onMultiInput(multiValues) {
      if (multiValues && _.isObject(multiValues)) {
        const keys = Object.keys(multiValues)
        keys.forEach((key) => {
          this.$set(this.recordItem, key, multiValues[key])
        })
      }
    },
    createEvent() {
      this.$emit('on-create', this.recordItem)
    },
    updateEvent() {
      this.$emit('on-update', this.recordItem)
    },
    clearEvent() {
      this.initFields()
    },
    addNewObjectToDataArray(record, crudName) {
      const newArray = record[crudName] || []
      newArray.push({})
      this.$set(record, crudName, newArray)
    },
    toLowerCase(value) {
      return _.toLower(value)
    },
    toUpperCase(value) {
      return _.toUpper(value)
    },
    initFields() {
      if (this.recordItem && this.recordItem.id) {
        delete this.recordItem.id
      }
      this.modelData.fields.forEach((field) => {
        if (field.type === this.fieldTypes.json) {
          this.$set(this.recordItem, field.key, {})
        } else {
          this.$set(this.recordItem, field.key, null)
        }
      })

      if (
        Array.isArray(this.modelData.foreign) &&
        this.modelData.foreign.length >= 1
      ) {
        this.modelData.foreign.forEach((foreign) => {
          if (foreign.type === this.fieldTypes.array) {
            this.$set(this.recordItem, foreign.crudName, [])
          }
          if (foreign.type === this.fieldTypes.object) {
            this.$set(this.recordItem, foreign.crudName, {})
          }
        })
      }
    }
  }
}
</script>