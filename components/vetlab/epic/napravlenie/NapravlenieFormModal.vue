<template>
  <b-modal
    :id="id"
    :title="$t(title)"
    :size="size"
    @ok="handleOk"
    @hidden="handleCancel"
  >
    <b-col cols="12">
      <crud-form
        :crud-buttons-enabled="false"
        :crud-data="crudModalData"
        :record="modalFormData"
      >
        <template v-slot:posMaterialId="props">
          <v-select
            v-model.trim="modalFormData[props.field.key]"
            :reduce="(item) => item.id"
            :placeholder="
              $t(
                props.field.placeholder || `form.placeholder.${props.field.key}`
              )
            "
            :options="props.item.posMaterials"
            label="id"
          >
            <template #option="option">
              <span>
                {{ option.sMaterial.name }}
              </span>
            </template>
            <template #selected-option="option">
              <strong>{{ option.sMaterial.name }}</strong>
            </template>
          </v-select>
        </template>
        <template v-slot:napravlenOtdelId="props">
          <v-select
            v-model.trim="modalFormData[props.field.key]"
            :reduce="(item) => item[props.field.foreign_value]"
            :label="props.field.foreign_label"
            :placeholder="
              $t(
                props.field.placeholder || `form.placeholder.${props.field.key}`
              )
            "
            :options="datasetList[props.field.foreign_dataset]"
            @search:focus="storageLoadDataSet(props.field)"
            @input="selectOtdel"
          />
        </template>
      </crud-form>
    </b-col>
  </b-modal>
</template>
<script>
import CrudForm from '~/components/crud/CrudForm'
import toastMixin from '~/mixins/toastMixin'
import loadDatasetMixin from '~/mixins/loadDatasetMixin'
import { vnytNapravlenieFields, otdelFields } from '~/data/fields'

export default {
  components: {
    CrudForm
  },
  mixins: [toastMixin, loadDatasetMixin],
  props: {
    id: {
      type: String,
      default() {
        return ''
      }
    },
    title: {
      type: String,
      default() {
        return ''
      }
    },
    size: {
      type: String,
      default() {
        return 'md'
      }
    },
    formData: {
      type: Object,
      default() {
        return {}
      }
    },
    crudData: {
      type: Object,
      default() {
        return {}
      }
    },
    modal: {
      type: Object,
      default() {
        return {}
      }
    },
    selectData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      test: true,
      formDataItem: {}
    }
  },
  computed: {
    modalCrud() {
      return this.modal.modalCrud
    },
    crudModalData() {
      const { restName, ...other } = this.modalCrud
      return {
        restName: restName || this.crudData.restName,
        ...other
      }
    },
    modalFormData() {
      return this.formData
    }
  },

  methods: {
    async selectOtdel(id) {
      const otdel = await this.$api
        .getApi('otdel')
        .getWithOtdelenia({ params: { id } })

      if (otdel && otdel.sOtdelenia && otdel.sOtdelenia.name) {
        const findedOtdelField = otdelFields.find((otField) => {
          return (
            this.$toLowerCase(otField.name) ===
            this.$toLowerCase(otdel.sOtdelenia.name)
          )
        })
        if (findedOtdelField) {
          this.$store.commit('api/CRUD_FIELDS_REPLACE', {
            crud: this.modal.modalCrud,
            fields: [
              ...vnytNapravlenieFields.fields,
              ...findedOtdelField.fields
            ]
          })
        } else {
          this.$store.commit('api/CRUD_FIELDS_REPLACE', {
            crud: this.modal.modalCrud,
            fields: [...vnytNapravlenieFields.fields]
          })
        }
      }
    },

    handleOk(event) {
      this.$emit('on-action', {
        actionMethod: this.modal.okAction,
        data: this.modalFormData,
        modalCrud: this.modalCrud,
        cb: (validated, { message }) => {
          if (!validated) {
            event.preventDefault()
            this.toastDanger(message, 'error.title')
          } else {
            this.toastSuccess(message)
          }
        }
      })
    },
    handleCancel(event) {
      this.$emit('on-action', {
        actionMethod: this.modal.hiddenAction,
        data: this.modalFormData,
        modalCrud: this.modalCrud,
        cb: (validated) => {
          if (!validated) {
            event.preventDefault()
          }
        }
      })
    }
  }
}
</script>
