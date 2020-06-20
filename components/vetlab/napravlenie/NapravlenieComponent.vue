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
          :not-equal="selectedOtdel"
          @on-create="onCreate"
          @on-update="onUpdate"
          @on-clear="onClear"
        >
          <template v-slot:opPokazatelJSON="prop">
            <multiselect
              v-model="prop.item[prop.field.key]"
              :options="datasetList[prop.field.foreign_dataset]"
              :label="prop.field.foreign_label"
              :placeholder="$t(prop.field.placeholder || `form.label.${prop.field.key}`)"
              :selectLabel="$t('form.label.selectItem')"
              :selectedLabel="$t('form.label.selectedItem')"
              :deselectLabel="$t('form.label.deselectItem')"
              :tagPlaceholder="$t('form.label.addNewPokazatel')"
              multiple
              taggable
              track-by="name"
              @open="storageLoadDataSet(prop.field)"
              @select="(selectedItem) => onSelectPokazatel(selectedItem, prop.item, prop.field.key)"
              @tag="(pokazatel) => addPokazatel(pokazatel, prop.item, prop.field)"
            />
          </template>

          <template v-slot:otdelId="prop">
            <v-select
              v-model.trim="prop.item[prop.field.key]"
              :reduce="
                (item) => prop.field.foreign_value ? item[prop.field.foreign_value] : item"
              :placeholder="$t(prop.field.placeholder)"
              :label="prop.field.foreign_label"
              :options="datasetList[prop.field.foreign_dataset]"
              @search:focus="storageLoadDataSet(prop.field)"
              @input="onSelectOtdel"
            >
            </v-select>
          </template>
        </napravlenie-form>
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
  data() {
    return {
      selectedOtdel: null
    }
  },
  methods: {
    async addPokazatel(pokazatel, item, field) {
      const res = await this.$api.getApi('pokazatel')
        .create({
          name: pokazatel,
          pokazatel
        })
      if(res && !res.error) {
        this.pushItemInStoreDatasetFirst(res.data, field.foreign_dataset)
        if(!item[field.key]) {
          item[field.key] = []
        }
        item[field.key].push({
          name: res.data.name,
          id: res.data.id
        })
      } else {
        this.toastDanger('Ошибка не могу добавить новый показатель')
      }
    },
    onSelectPokazatel(selected, item, key) {},

    onSelectOtdel(selectOtdel) {
      this.selectedOtdel = selectOtdel
    }
  }
}
</script>
