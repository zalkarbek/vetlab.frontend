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
          <vnyt-napravlenie-form-modal
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
import VnytNapravlenieFormModal from './VnytNapravlenieFormModal'
import VnytNapravlenieComponentMixin from './VnytNapravlenieComponentMixin'
import toastMixin from '~/mixins/toastMixin'

export default {
  components: {
    VnytNapravlenieList,
    VnytNapravlenieFormModal,
  },
  mixins: [toastMixin, VnytNapravlenieComponentMixin],
  created() {
    const localEvents = this.$store.state.busEvents
    this.$eventBus.$on(localEvents.NAPRAVLENIE_SEND_TO_OTDEL_SUCCESS, this.sendNapravlenieSuccess)
  },
  methods: {
    sendNapravlenieSuccess(response) {
      if(response && !response.error) {
        this.pushItemInDataset(response.data)
      }
    },
  },
}
</script>
