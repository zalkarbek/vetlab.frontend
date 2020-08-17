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
          v-if="selectedRecord"
          :crud-data="crudData"
          :record="selectedRecord"
          @on-create="onCreate"
          @on-update="onUpdate"
          @on-clear="onClear"
        >
          <template v-slot:pdkType="prop">
            <v-select
              v-model="prop.item[prop.field.key]"
              :reduce="
              (item) => prop.field.foreign_value ? item[prop.field.foreign_value] : item"
              :placeholder="$t(prop.field.placeholder)"
              :label="prop.field.foreign_label"
              :options="translateForeignValues(prop.field.foreign_values)"
              @input="onSelectPdkType"
            >
            </v-select>
          </template>
        </crud-form>
      </b-col>
    </b-row>
    <b-row class="mg-t-10 row-xs">
      <b-col cols="12">
        <crud-list
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
        >
        </crud-list>
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
  import CrudList from '~/components/vetlab/pokazatelPdk/PokazatelPdkList'
  import CrudFormModal from '~/components/crud/CrudFormModal'
  import toastMixin from '~/mixins/toastMixin'
  import loadDatasetMixin from '~/mixins/loadDatasetMixin'

  export default {
    components: {
      CrudForm,
      CrudList,
      CrudFormModal,
    },
    mixins: [toastMixin, loadDatasetMixin, CrudMixins],

    data() {
      return {
        pdkJSONField: {
          type: 'json',
          key: 'pdkJSON',
          label: 'form.label.pdkJSON',
          json: [],
        },
        pdkJSONFieldTypes: {
          equal: [
            {
              type: 'number',
              key: 'equal'
            },
          ],
          range: [
            {
              type: 'number',
              key: 'rangeMin'
            },
            {
              type: 'number',
              key: 'rangeMax'
            }
          ],
          more: [
            {
              type: 'number',
              key: 'more'
            },
          ],
          smaller: [
            {
              type: 'number',
              key: 'smaller'
            }
          ],
          notLess: [
            {
              type: 'number',
              key: 'notLess'
            }
          ],
          notMore: [
            {
              type: 'number',
              key: 'notMore'
            }
          ]
        }
      }
    },

    methods: {
      onSelectPdkType(pdkType) {
        this.selectedRecord.pdkJSON = {}
        const has = Object.prototype.hasOwnProperty
        const pdkField = this.crudData.fields.find((field) => {
          return field.key === 'pdkJSON'
        })

        if(has.call(this.pdkJSONFieldTypes, pdkType)) {
          this.$store.commit('api/CRUD_FIELDS_JSON_REPLACE', {
            crud: this.crudData,
            field: pdkField,
            json: this.pdkJSONFieldTypes[pdkType]
          })
        }
      },

      translateForeignValues(values = []) {
        if (values && Array.isArray(values) && values.length >= 1) {
          return values.map((val) => {
            return {
              label: this.$t(val.label),
              value: val.value,
            }
          })
        }
        return []
      },
    }
  }
</script>
