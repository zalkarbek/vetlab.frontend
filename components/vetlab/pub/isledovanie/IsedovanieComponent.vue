<template>
  <div class="crud">
    <div class="d-sm-flex align-items-center justify-content-between mg-b-20 mg-lg-b-25 mg-xl-b-30">
      <h4 class="mg-b-0 tx-spacing--1 mg-b-7">{{ $t(`${restName}.title`) }}</h4>
      <div class="d-sm-block d-lg-block d-md-block" />
    </div>
    <b-row class="mg-t-10 row-xs">
      <b-col cols="12">
        <isledovanie-list
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
  import IsledovanieList from './IsledovanieList'
  import IsledovanieComponentMixin from './IsledovanieComponentMixin'
  import _ from 'lodash'
  import { mapState } from 'vuex'
  import CrudFormModal from './IsledovanieFormModal'
  import toastMixin from '~/mixins/toastMixin'

  export default {
    components: {
      IsledovanieList,
      CrudFormModal,
    },
    mixins: [toastMixin, IsledovanieComponentMixin],
    computed: {
      ...mapState({
        busEvents: (state) => state.busEvents,
      }),
    },
    created() {

    },
    methods: {
      openDialog({ modalId }, data) {
        if (modalId) {
          this.$bvModal.show(modalId)
        }
        const cloneData = _.cloneDeep(data)
        this.$set(this.modalFormData, this.crudData.restName, cloneData)
      },
    },
  }
</script>
