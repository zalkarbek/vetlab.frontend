<template>
  <div class="crud">
    <div class="d-sm-flex align-items-center justify-content-between mg-b-20 mg-lg-b-25 mg-xl-b-30">
      <h4 class="mg-b-0 tx-spacing--1 mg-b-7">{{ $t(`${restName}.title`) }}</h4>
      <div class="d-sm-block d-lg-block d-md-block" />
    </div>
    <b-row class="mg-t-10 row-xs">
      <b-col cols="12">
        <vnyt-napravlenie-list
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
          <crud-form-modal
            :id="modal.id"
            :title="$t(modal.title)"
            :size="modal.size"
            :crud-data="crudData"
            :modal="modal"
            :form-data="modalFormDataByRestName"
            @on-action="onModalAction"
          />
        </template>
        <template v-if="modal.type === modalTypes.confirm">
          <crud-form-modal
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
import VnytNapravlenieList from './VnytNapravlenieList'
import VnytNapravlenieComponentMixin from './VnytNapravlenieComponentMixin'
import _ from 'lodash'
import { mapState } from 'vuex'
import CrudFormModal from './VnytNapravlenieFormModal'
import toastMixin from '~/mixins/toastMixin'

export default {
  components: {
    VnytNapravlenieList,
    CrudFormModal,
  },
  mixins: [toastMixin, VnytNapravlenieComponentMixin],
  computed: {
    ...mapState({
      busEvents: (state) => state.busEvents,
    }),
  },
  created() {
    this.$eventBus.$on(
      this.busEvents.VNYT_NAPRAVLENIE_ACCEPT_SUCCESS,
      this.acceptSuccess
    )

    this.$eventBus.$on(
      this.busEvents.VNYT_NAPRAVLENIE_REJECT_FINISH,
      this.rejectSuccess
    )

    this.$eventBus.$on(
      this.busEvents.VNYT_NAPRAVLENIE_START_ISLEDOVANIE_RESPONSE,
      this.reSearchStartResponse
    )

    this.$eventBus.$on(
      this.busEvents.VNYT_NAPRAVLENIE_UPDATED,
      this.napravlenieUpdated
    )

  },
  beforeDestroy() {
    this.$eventBus.$off(
      this.busEvents.VNYT_NAPRAVLENIE_ACCEPT_SUCCESS,
      this.acceptSuccess
    )

    this.$eventBus.$on(
      this.busEvents.VNYT_NAPRAVLENIE_REJECT_FINISH,
      this.rejectSuccess
    )

    this.$eventBus.$off(
      this.busEvents.VNYT_NAPRAVLENIE_START_ISLEDOVANIE_RESPONSE,
      this.reSearchStartResponse
    )

    this.$eventBus.$off(
      this.busEvents.VNYT_NAPRAVLENIE_UPDATED,
      this.napravlenieUpdated
    )
  },
  methods: {
    openDialog({ modalId }, data) {
      if (modalId) {
        this.$bvModal.show(modalId)
      }
      const cloneData = _.cloneDeep(data)
      this.$set(this.modalFormData, this.crudData.restName, cloneData)
    },
    acceptOk({ data }) {
      const { id, napravlenieId } = data
      this.$store.dispatch('emit/vnytNapravlenieAccept', {
        id,
        napravlenieId,
      })
    },
    napravlenieUpdated(data) {
      console.log(data)
      this.updateItemInDataset(data.id, data, this.crudData.datasetName)
    },
    acceptSuccess(data) {
      this.toastSuccess('Направление принято')
      this.updateItemInDataset(data.id, data, this.crudData.datasetName)
    },

    rejectOk({ data, cb }) {
      const { id, napravlenieId, rejectionDescription } = data
      if (!rejectionDescription || rejectionDescription && rejectionDescription.length <= 0) {
        const success = false
        const message = this.$t('vnytNapravlenie.error.rejectDescriptionNotWritten')
        cb(success, {
          ok: success,
          message,
        })
        return false
      }
      this.$store.dispatch('emit/vnytNapravlenieReject', {
        id,
        napravlenieId,
        rejectionDescription
      })
    },
    rejectSuccess(data) {
      this.toastSuccess('Направление отклонено')
      this.updateItemInDataset(data.id, data, this.crudData.datasetName)
    },

    reSearchOk({ data, cb }) {
      const {
        id:vnytNapravlenieId,
        napravlenieId,
        metodJSON,
        opPokazatelJSON,
      } = data

      let success = false
      if(!metodJSON || Array.isArray(metodJSON) && metodJSON.length === 0) {
        success = false
        cb(success, {
          ok: success,
          message: this.$t('vnytNapravlenie.error.metodNotSelected'),
        })
        return false
      }

      if(!opPokazatelJSON || Array.isArray(opPokazatelJSON) && opPokazatelJSON.length === 0) {
        success = false
        cb(success, {
          ok: success,
          message: this.$t('vnytNapravlenie.error.opPokazatelNotSelected'),
        })
        return false
      }

      this.$store.dispatch('emit/vnytNapravlenieStartIsledovanie', {
        vnytNapravlenieId,
        napravlenieId,
        metodJSON,
        opPokazatelJSON
      })
    },

    reSearchStartResponse(data) {
      if(data && data.id && data.vnytNapravlenieId) {
        this.pushValueToItemInDataset(data.vnytNapravlenieId, 'isledovanies', data)
        this.updateVnytNapravlenieStatus(data.vnytNapravlenieId, 'research')
        this.toastSuccess('Проба успешно перемещен на исследование')
      }
    }
  },
}
</script>
