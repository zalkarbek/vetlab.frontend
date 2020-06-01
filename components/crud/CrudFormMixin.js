import CrudField from './CrudField'
import CrudFieldJson from './CrudFieldJson'
import CrudFormArray from './CrudFormArray'
import CrudFormObject from './CrudFormObject'
import utilMixin from '~/mixins/utilMixin'
import _ from 'lodash'
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('api')

export default {
  mixins: [utilMixin],
  components: {
    CrudField,
    CrudFieldJson,
    CrudFormArray,
    CrudFormObject,
  },
  props: {
    crudData: {
      type: Object,
      default() {
        return {}
      },
    },
    record: {
      type: Object,
      default() {
        return {}
      },
    },
    crudButtonsEnabled: {
      type: Boolean,
      default() {
        return true
      },
    },
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
    recordItem: {
      get() {
        return this.record
      },
      set(value) {
        this.$emit('input', value)
      },
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
      fieldTypes: (state) => state.fieldTypes,
    }),
  },
  created() {},
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

    onMultiInputItem(item, multiValues) {
      if (multiValues && _.isObject(multiValues)) {
        const keys = Object.keys(multiValues)
        keys.forEach((key) => {
          this.$set(item, key, multiValues[key])
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
        data: this.recordItem,
      })
    },
    addNewToForeignArray(record, foreignCrud, count = 1) {
      const crudName = foreignCrud.datasetName || foreignCrud.crudName
      const newArray = record[crudName] || []
      for (let i = 0; i < count; i++) {
        const newForeignItem = this.initFields({}, this.crud[foreignCrud.crudName])
        newArray.push(newForeignItem)
      }
      this.$set(record, crudName, newArray)
    },

    clearDataArray(record, foreignCrud) {
      const crudName = foreignCrud.datasetName || foreignCrud.crudName
      this.$set(record, crudName, [])
    },

    initFields(record, crudData) {
      if (record && record.id) {
        this.$delete(record, 'id')
      }
      crudData.fields.forEach((field) => {
        if (!field.disabled && field.type === this.fieldTypes.json) {
          this.$set(record, field.key, {})
          if(field.json && field.json.length >= 1) {
            field.json.forEach((jsonField) => {
              this.$set(record[field.key], jsonField.key, null)
            })
          }
        } else if(!field.disabled) {
          this.$set(record, field.key, null)
        }
      })
      if (Array.isArray(crudData.foreign) && crudData.foreign.length >= 1) {
        crudData.foreign.forEach((foreign) => {
          if (foreign.type === this.fieldTypes.array) {
            const name = foreign.datasetName || foreign.crudName
            this.$set(record, name, [])
          }
          if (foreign.type === this.fieldTypes.object) {
            const name = foreign.datasetName || foreign.crudName
            this.$set(record, name, {})
          }
        })
      }
      return record
    },

  },
}
