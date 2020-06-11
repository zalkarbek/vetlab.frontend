<template>
  <b-modal
    :id="id"
    :title="$t(title)"
    :size="size"
    :header-bg-variant="headerBgVariant"
    :header-text-variant="headerTextVariant"
    :body-bg-variant="bodyBgVariant"
    :body-text-variant="bodyTextVariant"
    :footer-bg-variant="footerBgVariant"
    :footer-text-variant="footerTextVariant"
    @ok="handleOk"
    @hidden="handleCancel"
  >
    <b-col cols="12">
      <template v-if="modal.type === modalTypes.form && modalFormData">
        <crud-form
          v-if="modalFormData"
          :crud-buttons-enabled="false"
          :crud-data="crudModalData"
          :record="modalFormData"
        >
          <template v-slot:posMaterials="props">
            <v-select
              v-model="modalFormData[props.field.key]"
              :reduce="(item) => item"
              :placeholder="$t(props.field.placeholder || `form.placeholder.${props.field.key}`)"
              :options="props.item.posMaterials"
              multiple
              label="id"
            >
              <template #option="option">
                (<span class="tx-bold tx-primary">
                  {{ option.nomer || option.id }}
                </span>)
                <span v-for="(material, index) in getProp(option, 'sMaterialJSON', [])">
                  {{ material.name }}
                  <b v-if="index < option.sMaterialJSON.length - 1">,</b>
                </span>
              </template>
              <template #selected-option="option">
                (<span class="tx-bold tx-primary">
                  {{ option.nomer || option.id }}
                </span>)
                <strong v-for="(material, index) in getProp(option, 'sMaterialJSON', [])">
                  {{ material.name }}
                  <b v-if="index < option.sMaterialJSON.length - 1">,</b>
                </strong>
              </template>
            </v-select>
          </template>
          <template v-slot:napravlenOtdelId="props">
            <v-select
              v-model.trim="modalFormData[props.field.key]"
              :reduce="(item) => item[props.field.foreign_value]"
              :label="props.field.foreign_label"
              :placeholder="$t(props.field.placeholder || `form.placeholder.${props.field.key}`)"
              :options="datasetList[props.field.foreign_dataset]"
              @search:focus="storageLoadDataSet(props.field)"
              @input="selectOtdel"
            />
          </template>
          <template v-slot:opPokazatelJSON="prop">
            <multiselect
              v-model="prop.item[prop.field.key]"
              :options="datasetList[prop.field.foreign_dataset]"
              :label="prop.field.foreign_label"
              :placeholder="$t(prop.field.placeholder || `form.label.${prop.field.key}`)"
              :selectLabel="$t('form.label.selectItem')"
              :selectedLabel="$t('form.label.selectedItem')"
              :deselectLabel="$t('form.label.deselectItem')"
              :tagPlaceholder="$t('form.label.addNewPokazatel')"
              multiple
              taggable
              track-by="name"
              @open="storageLoadDataSet(prop.field)"
              @tag="(pokazatel) => addPokazatel(pokazatel, prop.item, prop.field)"
            />
          </template>
        </crud-form>
      </template>
      <template v-if="modal.type === modalTypes.confirm">
        <p v-if="modal.message && modal.message.length >= 1" class="h5">
          {{ $t(modal.message) }}
        </p>
        <p v-if="modal.messageWithTranslate && modal.messageWithTranslate.length >= 1"
         class="h5"
        >
          {{ $t(modal.messageWithTranslate) }}
        </p>
      </template>
    </b-col>
  </b-modal>
</template>
<script>
import CrudFormModalMixin from '~/components/crud/CrudFormModalMixin'
import { vnytNapravlenieFields, otdelFields } from '~/data/fields'
import utilMixin from '~/mixins/utilMixin'

export default {
  mixins: [CrudFormModalMixin, utilMixin],
  computed: {
    modalCrud() {
      return this.modal.modalCrud
    },
    crudModalData() {
      const { restName, ...other } = this.modalCrud
      return {
        restName: restName || this.crudData.restName,
        ...other,
      }
    },
    modalFormData() {
      return this.formData
    },
  },

  mounted() {},
  methods: {
    async selectOtdel(id) {
      const otdel = await this.$api
        .getApi('otdel')
        .getWithOtdelenia({ params: { id } })

      if (otdel && otdel.sOtdelenia && otdel.sOtdelenia.name) {
        const findedOtdelField = otdelFields.find((otField) => {
          return (
            Number(otField.id) === Number(otdel.sOtdelenia.id)
          )
        })
        if (findedOtdelField) {
          this.$store.commit('api/CRUD_FIELDS_REPLACE', {
            crud: this.modal.modalCrud,
            fields: [
              ...vnytNapravlenieFields.fields,
              ...findedOtdelField.fields,
            ],
          })
        } else {
          this.$store.commit('api/CRUD_FIELDS_REPLACE', {
            crud: this.modal.modalCrud,
            fields: [...vnytNapravlenieFields.fields],
          })
        }
      }
    },
    async addPokazatel(pokazatel, item, field) {
      const res = await this.$api.getApi('pokazatel')
        .create({
          name: pokazatel,
          pokazatel
        })
      if(res && !res.error) {
        this.pushItemInStoreDatasetFirst(res.data, field.foreign_dataset)
        if(!item[field.key]) {
          item[field.key] = []
        }
        item[field.key].push({
          name: res.data.name,
          id: res.data.id
        })
      } else {
        this.toastDanger('Ошибка не могу добавить новый показатель')
      }
    }
  }
}
</script>
