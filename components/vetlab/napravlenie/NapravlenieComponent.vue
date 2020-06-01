<template>
  <div class="crud">
    <div class="d-sm-flex align-items-center justify-content-between mg-b-20 mg-lg-b-25 mg-xl-b-30">
      <div>
        <h4 class="mg-b-0 tx-spacing--1 mg-b-7">
          {{ $t(`${restName}.title`) }}
        </h4>
      </div>
      <div class="d-sm-block d-lg-block d-md-block" />
    </div>
    <b-row class="mg-t-20 row-xs">
      <b-col cols="12">
        <napravlenie-form
          v-if="selectedRecord"
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
        <napravlenie-list
          v-if="crudListRecords"
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
  </div>
</template>
<script>
import NapravlenieList from './NapravlenieList'
import NapravlenieForm from './NapravlenieForm'
import NapravlenieComponentMixin from './NapravlenieComponentMixin'
import toastMixin from '~/mixins/toastMixin'

export default {
  components: {
    NapravlenieList,
    NapravlenieForm
  },
  mixins: [toastMixin, NapravlenieComponentMixin],
}
</script>
