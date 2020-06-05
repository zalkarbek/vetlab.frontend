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
        return null
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
  computed: {
    headerBgVariant() {
      return this.modal.headerBgVariant
    },
    headerTextVariant() {
      return this.modal.headerTextVariant
    },
    bodyBgVariant() {
      return this.modal.bodyBgVariant
    },
    bodyTextVariant() {
      return this.modal.bodyTextVariant
    },
    footerBgVariant() {
      return this.modal.footerBgVariant
    },
    footerTextVariant() {
      return this.modal.footerTextVariant
    },
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
      if (this.modalCrud
          && this.modalCrud.modalRequireField
          && this.formData
          && this.formData[this.modalCrud.modalRequireField]) {
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
