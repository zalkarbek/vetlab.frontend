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
          v-model="selectedRecord"
          @on-create="onCreate"
          @on-update="onUpdate"
          :crud-data="crudData"
        ></crud-form>
      </b-col>
    </b-row>
    <b-row class="mg-t-10 row-xs">
      <b-col cols="12">
        <crud-list
          v-model="records"
          @on-edit="onEditSelect"
          @on-delete="onDestroy"
          :crud-data="crudData"
        ></crud-list>
      </b-col>
    </b-row>
    <div class="footer-full-content"></div>
  </div>
</template>
<script>
import CrudMixins from '~/mixins/CrudMixins'
import CrudForm from '~/components/CrudForm'
import CrudList from '~/components/CrudList'

export default {
  components: {
    CrudForm,
    CrudList
  },
  mixins: [CrudMixins]
}
</script>
