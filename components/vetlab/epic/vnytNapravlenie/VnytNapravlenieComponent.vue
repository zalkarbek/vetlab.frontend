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
        <vnyt-napravlenie-list
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
        ></vnyt-napravlenie-list>
      </b-col>
    </b-row>
    <div class="crud-dialogs">
      <template v-for="modal in modals">
        <template v-if="modal.type === modalTypes.form">
          <vnyt-napravlenie-form-modal
            :id="modal.id"
            :title="$t(modal.title)"
            :size="modal.size"
            :crud-data="crudData"
            :modal="modal"
            :form-data="modalFormDataByRestName"
            @on-action="onModalAction"
          >
          </vnyt-napravlenie-form-modal>
        </template>
      </template>
    </div>
  </div>
</template>
<script>
import VnytNapravlenieList from './VnytNapravlenieList'
import VnytNapravlenieFormModal from './VnytNapravlenieFormModal'
import VnytNapravlenieComponentMixin from './VnytNapravlenieComponentMixin'
import _ from 'lodash'
import toastMixin from '~/mixins/toastMixin'

export default {
  components: {
    VnytNapravlenieList,
    VnytNapravlenieFormModal
  },
  mixins: [toastMixin, VnytNapravlenieComponentMixin],
  created() {
    this.$eventBus.$on('napravlenie:sendToOtdel', this.onNapravlenieSendToOtdel)
  },
  methods: {
    openDialog({ modalId, ...other }, data) {
      if (modalId) {
        this.$bvModal.show(modalId)
      }
      const cloneData = _.cloneDeep(data)
      this.$set(this.modalFormData, this.crudData.restName, cloneData)
    },
    onNapravlenieSendToOtdel(data) {
      console.log('Направление ушел', data)
    }
  }
}
</script>
