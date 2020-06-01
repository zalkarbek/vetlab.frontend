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
      </crud-form>
    </b-col>
  </b-modal>
</template>
<script>
import CrudFormModalMixin from '~/components/crud/CrudFormModalMixin'
export default {
  mixins: [CrudFormModalMixin]
}
</script>
