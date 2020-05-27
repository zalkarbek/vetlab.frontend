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
import ComponentMixin from './ComponentMixin'
import _ from 'lodash'
import { mapState } from 'vuex'
import CrudFormModal from '~/components/crud/CrudFormModal'
import toastMixin from '~/mixins/toastMixin'

export default {
  components: {
    VnytNapravlenieList,
    CrudFormModal,
  },
  mixins: [toastMixin, ComponentMixin],
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
  },
  beforeDestroy() {
    this.$eventBus.$off(
      this.busEvents.VNYT_NAPRAVLENIE_ACCEPT_SUCCESS,
      this.acceptSuccess
    )
  },
  methods: {
    acceptDialog({ modalId }, data) {
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
    acceptSuccess(data) {
      this.toastSuccess('Направление принято')
      this.updateItemInDataset(data.id, data, this.crudData.datasetName)
    },
  },
}
</script>
