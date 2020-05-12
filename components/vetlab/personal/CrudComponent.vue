<template>
  <div class="crud">
    <div
      class="d-sm-flex align-items-center justify-content-between mg-b-20 mg-lg-b-25 mg-xl-b-30"
    >
      <div>
        <h4 class="mg-b-0 tx-spacing--1 mg-b-7">
          {{ $t(`${restName}.title`) }}
        </h4>
      </div>
      <div class=" d-sm-block d-lg-block d-md-block"></div>
    </div>
    <b-row class="mg-t-20 row-xs">
      <b-col cols="12">
        <crud-form
          @on-create="onCreate"
          @on-update="onUpdate"
          @on-clear="onClear"
          :crud-data="crudData"
          :record="selectedRecord"
        ></crud-form>
      </b-col>
    </b-row>
    <b-row class="mg-t-10 row-xs">
      <b-col cols="12">
        <crud-list
          v-model="crudListRecords"
          @on-edit="onEditSelect"
          @on-delete="onDestroy"
          @on-page="onCrudListChangePage"
          @on-page-size="onCrudListChangePageSize"
          @on-search="onCrudListSearch"
          @on-action="onListAction"
          :crud-data="crudData"
          :paginate-type="crudListPaginateType"
          :total-rows="crudListTotalRows"
          :page-size="crudListPageSize"
          :page="crudListCurrentPage"
        ></crud-list>
      </b-col>
    </b-row>
    <div class="crud-dialogs">
      <template v-for="modal in modals">
        <template v-if="modal.type === modalTypes.form">
          <crud-form-modal
            :id="modal.id"
            :title="$t(modal.title)"
            :size="modal.size"
            :crud-data="crudData"
            :modal="modal"
            :form-data="modalFormDataByRestName"
            @on-action="onModalAction"
          >
          </crud-form-modal>
        </template>
      </template>
    </div>
    <div class="footer-full-content"></div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import CrudMixins from '~/components/crud/CrudComponentMixin'
import CrudForm from '~/components/crud/CrudForm'
import CrudFormModal from '~/components/crud/CrudFormModal'
import CrudList from '~/components/crud/CrudList'
import toastMixin from '~/mixins/toastMixin'

export default {
  components: {
    CrudForm,
    CrudList,
    CrudFormModal
  },
  mixins: [toastMixin, CrudMixins],

  computed: {
    modals() {
      return this.crudData.modals
    },
    ...mapState('dash', {
      modalTypes: (state) => state.modalTypes
    }),
    modalFormDataByRestName() {
      return this.modalFormData[this.crudData.restName]
    }
  },
  mounted() {},
  methods: {
    onListAction({ actionButton, data }) {
      this[actionButton.actionMethod](actionButton, data)
    },
    onModalAction({ actionMethod, ...other }) {
      this[actionMethod]({ ...other })
    },

    changePassword({ modalId }, data) {
      if (modalId) {
        this.$bvModal.show(modalId)
      }
      this.$set(this.modalFormData, this.crudData.restName, data)
    },
    async changePasswordOk({ data, cb }) {
      let success = false
      let message = ''
      if (data && !data.password) {
        success = false
        message = this.$t('user.password.notPassword')
        cb(success, {
          ok: success,
          message
        })
        return false
      }
      if (data && data.password && data.password.length < 4) {
        success = false
        message = this.$t('user.password.lowPassword4')
        cb(success, {
          ok: success,
          message
        })
        return false
      }
      try {
        const res = await this.$store.dispatch('api/req', {
          req: this.crudData.rest.changePassword,
          data: {
            user: data,
            personalId: this.modalFormDataByRestName.id
          }
        })
        if (res.data && !res.data.error) {
          success = true
          message = (res.data && res.data.message) || ''
          data.password = ''
        } else {
          success = false
          message = 'error.server'
        }
      } catch (e) {
        success = false
        message = (e.response.data && e.response.data.message) || e.message
      }
      cb(success, {
        ok: success,
        message
      })
      return false
    },
    changePasswordHidden({ data, cb }) {
      const success = true
      if (data) {
        data.password = ''
      }
      cb(success)
    }
  }
}
</script>
