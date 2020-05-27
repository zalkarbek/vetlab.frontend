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
    <b-row class="mg-t-20 row-xs">
      <b-col cols="12">
        <crud-form
          :crud-data="crudData"
          :record="selectedRecord"
          @on-create="onCreate"
          @on-update="onUpdate"
          @on-clear="onClear"
        />
      </b-col>
    </b-row>
    <b-row class="mg-t-10 row-xs">
      <b-col cols="12">
        <crud-list
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
        />
      </b-col>
    </b-row>
    <div class="crud-dialogs">
      <template v-for="(modal, index) in modals">
        <template v-if="modal.type === modalTypes.form">
          <crud-form-modal
            :key="index"
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
import CrudMixins from '~/components/crud/CrudComponentMixin'
import CrudForm from '~/components/crud/CrudForm'
import CrudList from '~/components/crud/CrudList'
import CrudFormModal from '~/components/crud/CrudFormModal'

export default {
  components: {
    CrudForm,
    CrudList,
    CrudFormModal,
  },
  mixins: [CrudMixins],
}
</script>
