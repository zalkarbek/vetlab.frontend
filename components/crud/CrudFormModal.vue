<template>
  <b-modal
    :id="id"
    :title="$t(title)"
    :size="size"
    @ok="handleOk"
    @hidden="handleCancel"
    size="xl"
  >
    <b-col cols="12">
      <crud-form
        :crud-buttons-enabled="false"
        :crud-data="crudModalData"
        :record="modalFormData"
      ></crud-form>
    </b-col>
  </b-modal>
</template>
<script>
import CrudForm from '~/components/crud/CrudForm'
import toastMixin from '~/mixins/toastMixin'
export default {
  components: {
    CrudForm
  },
  mixins: [toastMixin],
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
    }
  },
  data() {
    return {
      test: true
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
      let formData = this.formData
      if (this.modalCrud && this.modalCrud.modalRequireField) {
        formData = this.formData[this.modalCrud.modalRequireField]
      }
      return formData
    }
  },

  methods: {
    handleOk(event) {
      this.$emit('on-action', {
        actionMethod: this.modal.okAction,
        data: this.modalFormData,
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
