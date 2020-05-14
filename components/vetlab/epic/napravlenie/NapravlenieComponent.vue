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
    <b-row class="mg-t-10 row-xs">
      <b-col cols="12">
        <napravlenie-list
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
        ></napravlenie-list>
      </b-col>
    </b-row>
    <div class="crud-dialogs">
      <template v-for="modal in modals">
        <template v-if="modal.type === modalTypes.form">
          <napravlenie-form-modal
            :id="modal.id"
            :title="$t(modal.title)"
            :size="modal.size"
            :crud-data="crudData"
            :modal="modal"
            :form-data="modalFormDataByRestName"
            @on-action="onModalAction"
          >
          </napravlenie-form-modal>
        </template>
      </template>
    </div>
  </div>
</template>
<script>
import NapravlenieList from './NapravlenieList'
import NapravlenieCrud from './NapravlenieCrud'
import NapravlenieFormModal from './NapravlenieFormModal'
import _ from 'lodash'
import toastMixin from '~/mixins/toastMixin'

export default {
  components: {
    NapravlenieList,
    NapravlenieFormModal
  },
  mixins: [toastMixin, NapravlenieCrud],
  methods: {
    openSendDialog({ modalId, ...other }, data) {
      if (modalId) {
        this.$bvModal.show(modalId)
      }
      const cloneData = _.cloneDeep(data)
      this.$set(this.modalFormData, this.crudData.restName, cloneData)
    },
    async sendToOtdelOk({ data, modalCrud, cb }) {
      let success = false
      let message = ''
      if (!data.napravlenOtdelId) {
        success = false
        message = this.$t('otdel.error.notSelected')
        cb(success, {
          ok: success,
          message
        })
        return false
      }
      if (!data.dateVremyaOtpravki) {
        success = false
        message = this.$t('otdel.error.dateVremyaOtpravkiNotSelected')
        cb(success, {
          ok: success,
          message
        })
        return false
      }

      const postData = {}
      modalCrud.fields.forEach((field) => {
        postData[field.key] = data[field.key]
      })
      postData.napravlenieId = data.id
      try {
        const res = await this.$store.dispatch('api/req', {
          req: this.crudData.rest.sendToOtdel,
          data: {
            ...postData
          }
        })
        if (res.data && !res.data.error) {
          success = true
          message = (res.data && res.data.message) || ''
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
    }
  }
}
</script>
