<template>
  <div class="card card-body">
    <h4 v-if="crudButtonsEnabled">{{ $t('form.add') }}</h4>
    <b-container fluid="true">
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
            :md="(field.col && field.col.md) || 3"
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
              <slot
                :name="field.key"
                v-bind:field="field"
                v-bind:item="recordItem"
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
              </slot>
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
            <h5 class="mg-b-10">
              {{ $t(field.label || `form.label.${field.key}`) }}
            </h5>
            <slot
              :name="field.key"
              v-bind:field="field"
              v-bind:item="recordItem"
            >
              <crud-field-json
                v-model="recordItem[field.key]"
                :field="field"
                :crud-data="modelData"
              />
            </slot>
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
                @click="addNewToForeignArray(recordItem, foreignCrud, 1)"
                type="button"
                class="btn btn-xs btn-outline-primary"
              >
                {{ $t('form.label.add') }} 1
              </button>
              <button
                @click="addNewToForeignArray(recordItem, foreignCrud, 5)"
                type="button"
                class="btn btn-xs btn-outline-primary"
              >
                {{ $t('form.label.add') }} 5
              </button>
              <button
                @click="addNewToForeignArray(recordItem, foreignCrud, 7)"
                type="button"
                class="btn btn-xs btn-outline-primary"
              >
                {{ $t('form.label.add') }} 7
              </button>
              <button
                @click="addNewToForeignArray(recordItem, foreignCrud, 10)"
                type="button"
                class="btn btn-xs btn-outline-primary"
              >
                {{ $t('form.label.add') }} 10
              </button>
              <button
                @click="addNewToForeignArray(recordItem, foreignCrud, 13)"
                type="button"
                class="btn btn-xs btn-outline-primary"
              >
                {{ $t('form.label.add') }} 13
              </button>
              <button
                @click="addNewToForeignArray(recordItem, foreignCrud, 15)"
                type="button"
                class="btn btn-xs btn-outline-primary"
              >
                {{ $t('form.label.add') }} 15
              </button>
              <button
                @click="addNewToForeignArray(recordItem, foreignCrud, 20)"
                type="button"
                class="btn btn-xs btn-outline-primary"
              >
                {{ $t('form.label.add') }} 20
              </button>
              <button
                @click="clearDataArray(recordItem, foreignCrud)"
                type="button"
                class="btn btn-xs btn-outline-danger"
              >
                {{ $t('form.label.clear') }}
              </button>
            </h5>
            <div class="divider-text">
              {{ $t(`${foreignCrud.crudName}.title`) }}
            </div>
            <crud-form-array
              :crud-data="crud[foreignCrud.crudName]"
              v-model="
                recordItem[foreignCrud.datasetName || foreignCrud.crudName]
              "
              @remove-element="
                (index) =>
                  recordItem[
                    foreignCrud.datasetName || foreignCrud.crudName
                  ].splice(index, 1)
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

    <template v-if="crudButtonsEnabled">
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
    </template>
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
        return {}
      }
    },
    crudButtonsEnabled: {
      type: Boolean,
      default() {
        return true
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
    actionButtons() {
      const buttons = this.modelData.actionButtons
      if (buttons && buttons.crudForm) {
        return buttons.crudForm
      }
      return []
    },
    ...mapState({
      crud: (state) => state.crud,
      fieldTypes: (state) => state.fieldTypes
    })
  },
  mounted() {},
  methods: {
    // attributes shares
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
      this.$emit('on-clear', {})
    },
    actionButtonEvent(actionName, actionMethod) {
      this.$emit('on-action', {
        actionName,
        actionMethod,
        data: this.recordItem
      })
    },
    addNewToForeignArray(record, foreignCrud, count = 1) {
      const crudName = foreignCrud.datasetName || foreignCrud.crudName
      const newArray = record[crudName] || []
      for (let i = 0; i < count; i++) {
        newArray.push({})
      }
      this.$set(record, crudName, newArray)
    },
    clearDataArray(record, foreignCrud) {
      const crudName = foreignCrud.datasetName || foreignCrud.crudName
      this.$set(record, crudName, [])
    },
    toLowerCase(value) {
      return _.toLower(value)
    },
    toUpperCase(value) {
      return _.toUpper(value)
    }
  }
}
</script>
