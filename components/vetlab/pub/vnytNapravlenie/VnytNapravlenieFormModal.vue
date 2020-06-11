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
              :reduce="(item) => item.id"
              :placeholder="$t(props.field.placeholder || `form.placeholder.${props.field.key}`)"
              :options="getProp(props.item, 'posMaterials', [])"
              multiple
              label="id"
            >
              <template #option="option">
                <span v-for="(material, index) in getProp(option, 'sMaterialJSON', [])">
                  (<b class="bg-lightblue-light tx-bold">
                    {{ option.nomer || option.id }}
                  </b>)
                  {{ material.name }}
                  <b v-if="index < option.sMaterialJSON.length - 1">,</b>
                </span>
              </template>
              <template #selected-option="option">
                <strong v-for="(material, index) in getProp(option, 'sMaterialJSON', [])">
                  (<b class="bg-lightblue-light tx-bold">
                    {{ option.nomer || option.id }}
                  </b>)
                  {{ material.name }}
                  <b v-if="index < option.sMaterialJSON.length - 1">,</b>
                </strong>
              </template>
            </v-select>
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
export default {
  mixins: [CrudFormModalMixin]
}
</script>
