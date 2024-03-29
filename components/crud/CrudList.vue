<template>
  <div class="card card-body">
    <b-container fluid>
      <h4>{{ $t("list", { name: $t(`${restName}.title`) }) }}</h4>
      <!-- User Interface controls -->
      <b-row>
        <b-col lg="3" class="my-1">
          <b-form-group
            :label="$t('form.label.sort')"
            :description="$t('form.description.sort')"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            label-for="sortBySelect"
            label-class="tx-bold"
            class="mb-0"
          >
            <b-input-group size="sm">
              <b-form-select
                id="sortBySelect"
                v-model="sortBy"
                :options="sortOptions"
                class="w-75"
              >
                <template v-slot:first>
                  <option value="">
                    -- none --
                  </option>
                </template>
              </b-form-select>
              <b-form-select
                v-model="sortDesc"
                :disabled="!sortBy"
                size="sm"
                class="w-25"
              >
                <option :value="false">
                  Asc
                </option>
                <option :value="true">
                  Desc
                </option>
              </b-form-select>
            </b-input-group>
          </b-form-group>
        </b-col>

        <b-col lg="9" class="my-1">
          <b-row>
            <b-col lg="5">
              <b-form-group
                :label="$t('form.label.search')"
                :description="$t('form.description.search')"
                label-cols-sm="2"
                label-align-sm="right"
                label-size="sm"
                label-for="filterInput"
                label-class="tx-bold"
                class="mb-0"
              >
                <b-input-group size="sm">
                  <b-form-input
                    v-model="searchItem"
                    :placeholder="$t('form.placeholder.search')"
                    @input="changeSearchInput"
                  />
                  <b-input-group-append>
                    <b-button
                      :disabled="searchItem && searchItem.trim().length < 1"
                      @click="onAction('clear')"
                    >
                      {{ $t("form.label.clear") }}
                    </b-button>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>

            <b-col lg="4">
              <b-form-group
                :label="$t('form.label.filter')"
                :description="$t('form.description.filter')"
                label-cols-sm="2"
                label-align-sm="right"
                label-size="sm"
                label-for="filterInput"
                label-class="tx-bold"
                class="mb-0"
              >
                <b-input-group size="sm">
                  <b-form-input
                    v-model="filter"
                    :placeholder="$t('form.placeholder.filter')"
                    type="search"
                  />
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col lg="3">
              <b-form-group
                :label="$t('form.label.filter_on')"
                :description="$t('form.description.filter_on')"
                label-cols-sm="3"
                label-align-sm="right"
                label-class="tx-bold"
                class="mb-0"
              >
                <b-form-checkbox-group v-model="filterOn" class="mt-1">
                  <template v-for="(column, index) in sortOptions">
                    <b-form-checkbox :key="index" :value="column.value">
                      {{ column.text }}
                    </b-form-checkbox>
                  </template>
                </b-form-checkbox-group>
              </b-form-group>
            </b-col>
          </b-row>
        </b-col>

        <b-col lg="9" class="my-1">
          <b-row>
            <b-col lg="4">
              <b-form-group
                :label="$t('form.label.per_page')"
                :description="$t('form.description.per_page')"
                label-cols-sm="3"
                label-align-sm="right"
                label-size="sm"
                label-for="perPageSelect"
                label-class="tx-bold"
                class="mb-0"
              >
                <b-form-select
                  id="perPageSelect"
                  v-model="perPageCount"
                  :options="pageOptions"
                  size="sm"
                  @change="changePageSize"
                />
              </b-form-group>
            </b-col>
            <b-col lg="8">
              <b-pagination
                v-model="currentPage"
                :total-rows="totalRowsCount"
                :per-page="perPageCount"
                limit="10"
                align="fill"
                size="sm"
                class="my-0"
                @change="changePaginate"
              />
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <!--MAIN INTERFACE-->
      <template v-if="recordItems.length >= 1">
        <b-table
          :items="currentPageRecords"
          :fields="fields"
          :current-page="currentPage"
          :filter="filter"
          :filter-included-fields="filterOn"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          show-empty
          small
          responsive
          bordered
          hover
        >
          <template v-slot:cell(index)="data">
            {{ data.index + 1 }}
          </template>

          <template v-slot:cell()="data">
            <template v-if="data.field.type === fieldTypes.json">
              <crud-list-view-json
                :field-data="data.field"
                :data="data.item[data.field.key]"
                view-type="inline"
              />
            </template>
            <template v-else-if="data.field.type === fieldTypes.select_multi">
              <template v-if="data.value && Array.isArray(data.value)">
                <template v-for="(item, index) in data.value">
                  <span :key="index" class="tx-bold">
                    {{ viewForeignData(data.field, item) }},&nbsp;
                  </span>
                </template>
              </template>
            </template>
            <template v-else-if="data.field.foreign_crud">
              <span>{{ viewForeignData(data.field, data.value) }}</span>
            </template>
            <template v-else-if="data.field.type === fieldTypes.checkbox">
              <span>{{ $t(`form.label.boolean_${data.value}`) }}</span>
            </template>
            <template v-else>
              {{ data.value }}
            </template>
          </template>

          <template v-slot:cell(actions)="row">
            <b-button-toolbar>
              <b-button-group class="mr-1" size="sm">
                <template v-for="(button, index) in actionButtons">
                  <b-button
                    :key="index"
                    :variant="button.variant || 'secondary'"
                    @click="onActionButton(button, row.item)"
                  >
                    <i :class="button.icon" class="far cursor-pointer"/>
                  </b-button>
                </template>
                <b-button
                  variant="primary"
                  title="Edit"
                  @click="onAction('edit-item', row.item)"
                >
                  <i class="far fa-edit cursor-pointer"/>
                </b-button>
                <b-button
                  variant="danger"
                  title="Delete"
                  @click="onAction('delete-item', row.item)"
                >
                  <i class="far fa-trash-alt cursor-pointer"/>
                </b-button>
              </b-button-group>
            </b-button-toolbar>
          </template>
        </b-table>
      </template>
    </b-container>
  </div>
</template>
<script>
import CrudListMixin from './CrudListMixin'
export default {
  mixins: [CrudListMixin],
}
</script>
