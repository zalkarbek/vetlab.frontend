<template>
  <b-modal
    :id="id"
    :title="$t(title)"
    :size="size"
    @ok="handleOk"
    @hidden="handleCancel"
  >
    <b-col cols="12">
      <template v-if="modal.type === modalTypes.form">
        <crud-form
          :crud-buttons-enabled="false"
          :crud-data="crudModalData"
          :record="modalFormData"
        />
      </template>
      <template v-if="modal.type === modalTypes.confirm">
        <p v-if="modal.message && modal.message.length >= 1"
           class="h5"
        >
          {{ $t(modal.message) }}
        </p>
        <p
          v-if="
            modal.messageWithTranslate && modal.messageWithTranslate.length >= 1
          "
          class="h5"
        >
          {{ $t(modal.messageWithTranslate) }}
        </p>
      </template>
    </b-col>
  </b-modal>
</template>
<script>
import { mapState } from 'vuex'
import CrudForm from '~/components/crud/CrudForm'
import toastMixin from '~/mixins/toastMixin'
import loadDatasetMixin from '~/mixins/loadDatasetMixin'

export default {
  components: {
    CrudForm,
  },
  mixins: [toastMixin, loadDatasetMixin],
  props: {
    id: {
      type: String,
      default() {
        return ''
      },
    },
    title: {
      type: String,
      default() {
        return ''
      },
    },
    size: {
      type: String,
      default() {
        return 'md'
      },
    },
    formData: {
      type: Object,
      default() {
        return {}
      },
    },
    crudData: {
      type: Object,
      default() {
        return {}
      },
    },
    modal: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {}
  },
  computed: {
    ...mapState('dash', {
      modalTypes: (state) => state.modalTypes,
    }),
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
      let formData = this.formData
      if (this.modalCrud && this.modalCrud.modalRequireField) {
        formData = this.formData[this.modalCrud.modalRequireField]
      }
      return formData
    },
  },

  methods: {
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
        },
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
        },
      })
    },
  },
}
</script>
