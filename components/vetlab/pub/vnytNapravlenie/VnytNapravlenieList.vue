<template>
  <div class="card card-body">
    <b-container fluid>
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
                  <option value="">-- none --</option>
                </template>
              </b-form-select>
              <b-form-select
                v-model="sortDesc"
                :disabled="!sortBy"
                size="sm"
                class="w-25"
              >
                <option :value="false">Asc</option>
                <option :value="true">Desc</option>
              </b-form-select>
            </b-input-group>
          </b-form-group>
        </b-col>

        <b-col lg="9" class="my-1">
          <b-row>
            <b-col lg="6">
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
                    @input="changeSearchInput"
                    :placeholder="$t('form.placeholder.search')"
                  ></b-form-input>
                  <b-input-group-append>
                    <b-button
                      :disabled="searchItem && searchItem.trim().length < 1"
                      @click="onAction('clear')"
                    >
                      {{ $t('form.label.clear') }}
                    </b-button>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-col>
            <b-col lg="6">
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
                  ></b-form-input>
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>
        </b-col>

        <b-col lg="9" class=" mg-t-20">
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
                  @change="changePageSize"
                  v-model="perPageCount"
                  :options="pageOptions"
                  size="sm"
                ></b-form-select>
              </b-form-group>
            </b-col>
            <b-col lg="8">
              <b-pagination
                v-model="currentPage"
                @change="changePaginate"
                :total-rows="totalRowsCount"
                :per-page="perPageCount"
                limit="10"
                align="fill"
                size="sm"
                class="my-0"
              ></b-pagination>
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
          :filterIncludedFields="filterOn"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          show-empty
          small
          stacked="md"
          responsive
          bordered
          class="mg-t-20"
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
              ></crud-list-view-json>
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

            <template v-else>
              {{ data.value }}
            </template>
          </template>

          <template v-slot:cell(status)="cellData">
            <span
              v-if="toLowerCase(cellData.value) === toLowerCase('pending')"
              class="tx-16 badge badge-primary"
            >
              {{ $t(`vnytNapravlenie.pub.status.${cellData.value}`) }}
            </span>

            <span
              v-if="toLowerCase(cellData.value) === toLowerCase('accepted')"
              class="tx-16 badge badge-secondary"
            >
              {{ $t(`vnytNapravlenie.pub.status.${cellData.value}`) }}
            </span>

            <span
              v-if="toLowerCase(cellData.value) === toLowerCase('research')"
              class="tx-16 badge badge-info"
            >
              {{ $t(`vnytNapravlenie.pub.status.${cellData.value}`) }}
            </span>

            <span
              v-if="toLowerCase(cellData.value) === toLowerCase('completed')"
              class="tx-16 badge badge-success"
            >
              {{ $t(`vnytNapravlenie.pub.status.${cellData.value}`) }}
            </span>

            <span
              v-if="toLowerCase(cellData.value) === toLowerCase('rejected')"
              class="tx-16 badge badge-success"
            >
              {{ $t(`vnytNapravlenie.pub.status.${cellData.value}`) }}
            </span>
          </template>

          <template v-slot:cell(actions)="row">
            <b-button-toolbar>
              <b-button-group class="mr-1" size="sm">
                <template v-for="(button, index) in actionButtons">
                  <b-button
                    @click="onActionButton(button, row.item)"
                    :key="index"
                    :variant="button.variant || 'secondary'"
                  >
                    <i
                      :class="button.icon"
                      class="cursor-pointer"
                      aria-hidden="true"
                    ></i>
                    {{ $t(button.label) }}
                  </b-button>
                </template>
              </b-button-group>
            </b-button-toolbar>
          </template>

          <template v-slot:cell(napravlenieId)="cellData">
            <span class="tx-24 tx-bold">{{ cellData.value }}</span>
          </template>

          <template v-slot:cell(sendStatusCustomView)="cellData">
            <div v-if="cellData.item.napravilPersonal">
              <h6>
                {{ $t('vnytNapravlenie.label.napravilPersonal') }}
              </h6>
              <ul class="list-group list-group-flush tx-13">
                <li class="list-group-item d-flex pd-sm-x-20">
                  <div class="avatar">
                    <span class="avatar-initial rounded-circle bg-primary">
                      {{
                        getProp(
                          cellData.item,
                          'napravilPersonal.fullName',
                          ''
                        )[0]
                      }}
                    </span>
                  </div>
                  <div class="pd-l-10">
                    <p class="tx-medium mg-b-0">
                      {{
                        getProp(cellData.item, 'napravilPersonal.fullName', '')
                      }}
                    </p>
                    <small class="tx-12 tx-color-03 mg-b-0">
                      {{
                        getProp(
                          cellData.item,
                          'napravilPersonal.sDoljnost.name',
                          ''
                        )
                      }}
                    </small>
                  </div>
                </li>
              </ul>
              <b-list-group class="list-group-flush">
                <b-list-group-item
                  v-if="getProp(cellData.item, 'napravlenOtdel.name', '')"
                >
                  <span class="tx-bold">
                    {{ $t('vnytNapravlenie.label.napravlenOtdel') }}:
                  </span>
                  <span>
                    {{ getProp(cellData.item, 'napravlenOtdel.name', '') }}
                  </span>
                </b-list-group-item>
                <b-list-group-item v-if="cellData.item.dateVremyaOtpravki">
                  <span class="tx-bold">
                    {{ $t('vnytNapravlenie.label.dateVremyaOtpravki') }}:
                  </span>
                  <span>
                    {{
                      formatDateTime(
                        getProp(cellData.item, 'dateVremyaOtpravki', '')
                      )
                    }}
                  </span>
                </b-list-group-item>
              </b-list-group>
            </div>
            <div v-if="cellData.item.prinyalPersonal">
              <h6>
                {{ $t('vnytNapravlenie.label.prinyalPersonal') }}
              </h6>
              <ul class="list-group list-group-flush tx-13">
                <li class="list-group-item d-flex pd-sm-x-20">
                  <div class="avatar">
                    <span class="avatar-initial rounded-circle bg-primary">
                      {{
                        getProp(
                          cellData.item,
                          'prinyalPersonal.fullName',
                          ''
                        )[0]
                      }}
                    </span>
                  </div>
                  <div class="pd-l-10">
                    <p class="tx-medium mg-b-0">
                      {{
                        getProp(cellData.item, 'prinyalPersonal.fullName', '')
                      }}
                    </p>
                    <small class="tx-12 tx-color-03 mg-b-0">
                      {{
                        getProp(
                          cellData.item,
                          'prinyalPersonal.sDoljnost.name',
                          ''
                        )
                      }}
                    </small>
                  </div>
                </li>
              </ul>
              <table class="table table-responsive">
                <tbody>
                  <tr>
                    <td>
                      <span class="tx-bold">
                        {{ $t('vnytNapravlenie.label.prinyalOtdel') }}:
                      </span>
                    </td>
                    <td>
                      {{ getProp(cellData.item, 'prinyalOtdel.name', '') }}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span class="tx-bold">
                        {{ $t('vnytNapravlenie.label.prinyalDate') }}:
                      </span>
                    </td>
                    <td>
                      {{
                        formatDateTime(
                          getProp(cellData.item, 'prinyalDate', '')
                        )
                      }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </template>

          <template v-slot:cell(posMaterialCustomView)="cellData">
            <b-list-group class="list-group-flush">
              <b-list-group-item v-if="cellData.item.opPokazatelIdJSON">
                <span class="tx-bold">
                  {{ $t('vnytNapravlenie.label.opPokazatel') }}:
                </span>
                <span>
                  <template
                    v-for="pokazatelId in getProp(
                      cellData.item,
                      'opPokazatelIdJSON',
                      []
                    )"
                  >
                    <span :key="pokazatelId">
                      {{
                        viewForeignData(
                          cellData.field.fields.opPokazatelIdJSON,
                          pokazatelId
                        )
                      }},
                    </span>
                  </template>
                </span>
              </b-list-group-item>
              <b-list-group-item v-if="cellData.item.posMaterial">
                <span class="tx-bold">
                  {{ $t('vnytNapravlenie.label.posMaterialId') }}:
                </span>
                <span>
                  {{
                    getProp(cellData.item, 'posMaterial.sMaterial.name', '')
                  }},
                  {{ getProp(cellData.item, 'postMaterialCount', '') }}
                  {{ getProp(cellData.item, 'posMaterial.sMera.name', '') }}
                </span>
              </b-list-group-item>
              <b-list-group-item
                v-if="
                  getProp(cellData.item, 'posMaterial.dateVremyaOtbora', null)
                "
              >
                <span class="tx-bold">
                  {{ $t('pos_material.label.dateVremyaOtbora') }}:
                </span>
                <span>
                  {{
                    formatDate(
                      getProp(
                        cellData.item,
                        'posMaterial.dateVremyaOtbora',
                        null
                      )
                    )
                  }}
                </span>
              </b-list-group-item>
              <b-list-group-item
                v-if="getProp(cellData.item, 'posMaterial.dateDostavki', null)"
              >
                <span class="tx-bold">
                  {{ $t('pos_material.label.dateDostavki') }}:
                </span>
                <span>
                  {{
                    formatDate(
                      getProp(cellData.item, 'posMaterial.dateDostavki', null)
                    )
                  }}
                </span>
              </b-list-group-item>
              <b-list-group-item>
                <span
                  v-if="
                    getProp(cellData.item, 'posMaterialCheckVid', null) === true
                  "
                  class="tx-bold"
                >
                  {{ $t('vnytNapravlenie.label.posMaterialCheckVid') }}:
                  <i class="fas fa-check-circle tx-success"></i>
                  {{ $t('form.label.yes') }}
                </span>

                <span
                  v-if="
                    getProp(cellData.item, 'posMaterialCheckVid', null) ===
                      false
                  "
                  class="tx-bold"
                >
                  {{ $t('vnytNapravlenie.label.posMaterialCheckVid') }}:
                  <i class="fas fa-check-circle tx-success"></i>
                  {{ $t('form.label.yes') }}
                </span>
              </b-list-group-item>
              <b-list-group-item>
                <span
                  v-if="
                    getProp(cellData.item, 'postMaterialCheck', null) === true
                  "
                  class="tx-bold"
                >
                  {{ $t('vnytNapravlenie.label.postMaterialCheck') }}:
                  <i class="fas fa-check-circle tx-success"></i>
                  {{ $t('form.label.yes') }}
                </span>

                <span
                  v-if="
                    getProp(cellData.item, 'postMaterialCheck', null) === false
                  "
                  class="tx-bold"
                >
                  {{ $t('vnytNapravlenie.label.postMaterialCheck') }}:
                  <i class="fas fa-check-circle tx-success"></i>
                  {{ $t('form.label.no') }}
                </span>
              </b-list-group-item>
            </b-list-group>
          </template>

          <template v-slot:cell(vnytNapravlenieOptionalCustomView)="cellData">
            <b-list-group class="list-group-flush">
              <b-list-group-item v-if="cellData.item.dateDeworming">
                <span class="tx-bold">
                  {{ $t('vnytNapravlenie.label.dateDeworming') }}:
                </span>
                <span>
                  {{ formatDate(getProp(cellData.item, 'dateDeworming', '')) }}
                </span>
              </b-list-group-item>

              <b-list-group-item v-if="cellData.item.anthelminticTypeJSON">
                <span class="tx-bold">
                  {{ $t('vnytNapravlenie.label.anthelminticTypeJSON') }}:
                </span>
                <span>
                  {{
                    renderJSONArrayToList(
                      getProp(cellData.item, 'anthelminticTypeJSON', [])
                    )
                  }}
                </span>
              </b-list-group-item>

              <b-list-group-item v-if="cellData.item.dateVaccination">
                <span class="tx-bold">
                  {{ $t('vnytNapravlenie.label.dateVaccination') }}:
                </span>
                <span>
                  {{
                    formatDate(getProp(cellData.item, 'dateVaccination', ''))
                  }}
                </span>
              </b-list-group-item>

              <b-list-group-item v-if="cellData.item.vaccineTypeJSON">
                <span class="tx-bold">
                  {{ $t('vnytNapravlenie.label.vaccineTypeJSON') }}:
                </span>
                <span>
                  {{
                    renderJSONArrayToList(
                      getProp(cellData.item, 'vaccineTypeJSON', [])
                    )
                  }}
                </span>
              </b-list-group-item>

              <b-list-group-item v-if="cellData.item.dateLechenia">
                <span class="tx-bold">
                  {{ $t('vnytNapravlenie.label.dateLechenia') }}:
                </span>
                <span>
                  {{ formatDate(getProp(cellData.item, 'dateLechenia', '')) }}
                </span>
              </b-list-group-item>

              <b-list-group-item v-if="cellData.item.antibioticTypeJSON">
                <span class="tx-bold">
                  {{ $t('vnytNapravlenie.label.antibioticTypeJSON') }}:
                </span>
                <span>
                  {{
                    renderJSONArrayToList(
                      getProp(cellData.item, 'antibioticTypeJSON', [])
                    )
                  }}
                </span>
              </b-list-group-item>

              <b-list-group-item v-if="cellData.item.dateObrabotki">
                <span class="tx-bold">
                  {{ $t('vnytNapravlenie.label.dateObrabotki') }}:
                </span>
                <span>
                  {{ formatDate(getProp(cellData.item, 'dateObrabotki', '')) }}
                </span>
              </b-list-group-item>

              <b-list-group-item v-if="cellData.item.disinfectantTypeJSON">
                <span class="tx-bold">
                  {{ $t('vnytNapravlenie.label.disinfectantTypeJSON') }}:
                </span>
                <span>
                  {{
                    renderJSONArrayToList(
                      getProp(cellData.item, 'disinfectantTypeJSON', [])
                    )
                  }}
                </span>
              </b-list-group-item>

              <b-list-group-item v-if="cellData.item.isledovanieProvoditsaJSON">
                <span class="tx-bold">
                  {{ $t('vnytNapravlenie.label.isledovanieProvoditsaJSON') }}:
                </span>
                <span>
                  {{
                    renderJSONArrayToListWithTranslate(
                      getProp(cellData.item, 'isledovanieProvoditsaJSON', [])
                    )
                  }}
                </span>
              </b-list-group-item>
            </b-list-group>
          </template>
        </b-table>
      </template>
    </b-container>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import _ from 'lodash'
import CrudListMixin from '~/components/crud/CrudListMixin'
export default {
  mixins: [CrudListMixin],
  data() {
    return {
      perPage: 3,
      total: null,
      pageOptions: [1, 2, 3, 5, 7, 10]
    }
  },
  computed: {
    ...mapState({
      currentLocale: (state) => state.currentLocale,
      dateFormats: (state) => state.dateFormats,
      dateSwitchLocales: (state) => state.dateSwitchLocales
    })
  },
  methods: {
    firstLetter(text) {
      return this.$firstLetter(text)
    },
    getObjectIfNull(object) {
      return object || {}
    },
    getProp(object, path, defaultValue = '') {
      return _.get(object, path, defaultValue)
    },
    checkIcon(condition) {},
    formatDate(date) {
      const dateLocale = this.dateSwitchLocales[this.currentLocale]
      return this.$moment(date)
        .locale(dateLocale)
        .format(this.dateFormats.mediumDateFormat)
    },
    formatDateTime(date) {
      const dateLocale = this.dateSwitchLocales[this.currentLocale]
      return this.$moment(date)
        .locale(dateLocale)
        .format(this.dateFormats.mediumDateTimeFormat)
    },
    renderJSONArrayToList(array = []) {
      let listText = ''
      if (array && Array.isArray(array) && array.length >= 1) {
        array.forEach((item) => {
          listText = `${listText} ${item}`
        })
      }
      return listText
    },
    renderJSONArrayToListWithTranslate(array = [], prefix = 'form.label') {
      let listText = ''
      if (array && Array.isArray(array) && array.length >= 1) {
        array.forEach((item) => {
          const translate = this.$t(`${prefix}.${item}`)
          listText = `${listText} ${translate}`
        })
      }
      return listText
    },
    toLowerCase(value) {
      return _.toLower(value)
    },
    toUpperCase(value) {
      return _.toUpper(value)
    }
  }
}
</script>
