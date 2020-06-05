<template>
  <div class="crud">
    <div class="d-sm-flex align-items-center justify-content-between mg-b-20 mg-lg-b-25 mg-xl-b-30">
      <h4 class="mg-b-0 tx-spacing--1 mg-b-7">{{ $t(`${restName}.title`) }}</h4>
      <div class="d-sm-block d-lg-block d-md-block" />
    </div>
    <b-row class="mg-t-10 row-xs">
      <b-col cols="12">
        <napravlenie-list
          v-model="crudListRecords"
          :crud-data="crudData"
          :paginate-type="crudListPaginateType"
          :total-rows="crudListTotalRows"
          :page-size="crudListPageSize"
          :page="crudListCurrentPage"
          @on-edit="onEditSelect"
          @on-delete="onDestroy"
          @on-page="onCrudListChangePage"
          @on-page-size="onCrudListChangePageSize"
          @on-search="onCrudListSearch"
          @on-action="onListAction"
        />
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
          />
        </template>
      </template>
    </div>
  </div>
</template>
<script>
import NapravlenieList from './NapravlenieList'
import NapravlenieComponentMixin from './NapravlenieComponentMixin'
import NapravlenieFormModal from './NapravlenieFormModal'
import _ from 'lodash'
import toastMixin from '~/mixins/toastMixin'

export default {
  components: {
    NapravlenieList,
    NapravlenieFormModal,
  },
  mixins: [toastMixin, NapravlenieComponentMixin],
  props: {
    vnytNapravlenieCrudName: {
      type: String,
      default: () => '',
    },
  },
  beforeMount() {
    const localEvents = this.$store.state.busEvents
    this.$eventBus.$on(localEvents.NAPRAVLENIE_SEND_TO_OTDEL_SUCCESS, this.sendNapravlenieSuccess)
  },
  methods: {
    openSendDialog({ modalId, ...other }, data) {
      if (modalId) {
        this.$bvModal.show(modalId)
      }
      this.modalFormDataByRestName = _.cloneDeep(data)
    },
    async sendToOtdelOk({ data, modalCrud, cb }) {
      let success = false
      let message = ''
      if (!data.napravlenOtdelId) {
        success = false
        message = this.$t('otdel.error.notSelected')
        cb(success, {
          ok: success,
          message,
        })
        return false
      }
      if (!data.dateVremyaOtpravki) {
        success = false
        message = this.$t('otdel.error.dateVremyaOtpravkiNotSelected')
        cb(success, {
          ok: success,
          message,
        })
        return false
      }
      const postData = {}
      modalCrud.fields.forEach((field) => {
        postData[field.key] = data[field.key]
      })
      postData.napravlenieId = data.id
      await this.$store.dispatch('emit/napravlenieSendToOtdel', postData)
      return false
    },

    sendNapravlenieSuccess(response) {
      if(response && !response.error) {
        this.toastSuccess(this.$t('napravlenieEpic.label.sendToOtdelSuccess'))
        const datasetName = this.crudData.datasetName
        const napravlenie = this.findInDataset(response.data.napravlenieId, ['id'], datasetName)
        if(napravlenie && napravlenie[0])
          napravlenie[0].status = 'sended'
      }
    },
  },
}
</script>
