<template>
  <div class="card card-body">
    <b-container fluid>
      <!-- User Interface controls -->
      <b-row>
        <b-col lg="12" class="my-1">
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
          </b-row>
        </b-col>
        <b-col lg="12" class="mg-t-20">
          <b-row>
            <b-col lg="3">
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
            <b-col lg="9">
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
          :tbody-tr-class="rowStatusBasedColor"
          head-variant="dark"
          show-empty
          small
          responsive
          bordered
          class="mg-t-20"
        >
          <template v-slot:cell(index)="data">
            {{ data.index + 1 }}
          </template>

          <template v-slot:cell(id)="cellData">
            <span class="tx-24 tx-bold">{{ cellData.value }}</span>
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

            <template v-else>
              {{ data.value }}
            </template>
          </template>

          <template v-slot:cell(actions)="row">
            <b-button-toolbar>
              <b-button-group class="mr-1" size="sm">
                <template v-for="(button, index) in actionButtons">
                  <b-button
                    v-if="row.item.status !== 'finish'"
                    :key="index"
                    :variant="button.variant || 'secondary'"
                    :disabled="(row.item.status === 'finish')"
                      @click="onActionButton(button, row.item)"
                  >
                    <i
                      :class="button.icon"
                      class="cursor-pointer"
                      aria-hidden="true"
                    />
                    {{ $t(button.label) }}
                  </b-button>
                </template>
              </b-button-group>
            </b-button-toolbar>
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
              <i class="fa-2x fas fa-radiation fa-spin text-warning"></i>
            </span>

            <span
              v-if="toLowerCase(cellData.value) === toLowerCase('finish')"
              class="tx-16 badge badge-success"
            >
              {{ $t(`isledovanie.label.status.${cellData.value}`) }}
              <i class="fa-2x fas fa-check-circle"></i>
            </span>

            <span
              v-if="toLowerCase(cellData.value) === toLowerCase('rejected')"
              class="tx-16 badge badge-danger"
            >
              {{ $t(`vnytNapravlenie.pub.status.${cellData.value}`) }}
            </span>
          </template>

          <template v-slot:cell(vnytNapravlenieId)="cellData">
            <span class="tx-24 tx-bold">{{ cellData.item.vnytNapravlenieId }}</span>
          </template>

          <template v-slot:cell(probaCustomView)="cellData">
            <table class="table">
              <tbody>
                <tr class="bg-cyan-light">
                  <td style="width: 30%">
                    <b>{{ $t('isledovanie.label.nomerIsledovania') }}:</b>
                  </td>
                  <td>
                    <b>{{ getProp(cellData.item, 'id') }}</b>
                  </td>
                </tr>
                <tr>
                  <td style="width: 30%">
                    <b>{{ $t('isledovanie.label.otdel') }}:</b>
                  </td>
                  <td>
                    <b>{{ getProp(cellData.item, 'otdel.name') }}</b>
                  </td>
                </tr>
                <tr>
                  <td style="width: 30%">
                    <b>{{ $t('isledovanie.label.isPersonal') }}:</b>
                  </td>
                  <td>
                    <b>{{ getProp(cellData.item, 'personal.fullName') }}</b>
                  </td>
                </tr>
                <tr>
                  <td style="width: 30%">
                    <b>{{ $t('isledovanie.label.isledObject') }}:</b>
                  </td>
                  <td>
                    <ul style="padding-left: 15px;">
                      <li v-for="posMaterial in getProp(cellData.item, 'vnytNapravlenie.posMaterials')">
                        (<span class="tx-bold bg-lightblue-light">
                          {{ posMaterial.nomer || posMaterial.id }}
                        </span>) -
                        <span v-for="material in getProp(posMaterial, 'sMaterialJSON', [])">
                          {{ material.name }}
                          {{ getProp(posMaterial, 'materialCount', '') }}
                          {{ getProp(posMaterial, 'sMera.name', '') }}
                        </span>
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr>
                  <td style="width: 30%">
                    <b>{{ $t('isledovanie.label.materialCount') }}:</b>
                  </td>
                  <td>
                    {{ getProp(cellData.item, 'vnytNapravlenie.posMaterials', []).length }}
                  </td>
                </tr>
                <tr>
                  <td style="width: 30%">
                    <b>{{ $t('isledovanie.label.opPokazatel') }}:</b>
                  </td>
                  <td>
                    <ul style="padding-left: 15px;">
                      <li v-for="pokazatel
                        in getProp(
                          cellData.item,
                          'opPokazatelJSON', []
                        )"
                      >
                        {{ pokazatel.name }}
                      </li>
                    </ul>
                  </td>
                </tr>
                <tr v-if="getProp(cellData.item, 'dateStart') || getProp(cellData.item, 'createdAt')">
                  <td>
                    <b>{{ $t('isledovanie.label.dateStart') }}:</b>
                  </td>
                  <td>
                    <span>
                {{
                  formatDateTime(
                    getProp(cellData.item, 'dateStart', null)
                    ||
                    getProp(cellData.item, 'createdAt')
                  )
                }}
              </span>
                  </td>
                </tr>
                <tr v-if="getProp(cellData.item, 'dateFinish')">
                  <td>
                    <b>{{ $t('isledovanie.label.dateFinish') }}:</b>
                  </td>
                  <td>
                    <span>
                      {{
                        formatDateTime(
                          getProp(cellData.item, 'dateFinish', null)
                        )
                      }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </template>

          <template v-slot:cell(isledovanieResultCustomView)="cellData">
            <table class="table table-bordered table-sm">
              <template v-if="isFinishedFoodSafetyOtdel(cellData.item)">
              <thead>
                <tr>
                  <th class="tx-center">{{ $t('isledovanie.label.result') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <table class="table table-bordered">
                      <template v-for="result in getProp(cellData.item, 'isResultJSON', [])">
                        <tr>
                          <td rowspan="4" class="tx-center align-middle">
                            <b>{{ getProp(result, 'nomerProby', '') }}</b>
                          </td>
                          <td style="width: 30%">
                            <b>{{ $t('isledovanie.label.opPokazatel') }}:</b>
                          </td>
                          <td>
                            <ul style="padding-left: 15px;">
                              <li v-for="pokazatel in getProp(result,'opPokazatelJSON', [])">
                                {{ pokazatel.name }}
                              </li>
                            </ul>
                          </td>
                        </tr>
                        <tr class="bg-cyan-light">
                          <td style="width: 30%">
                            <b>{{ $t('isledovanie.label.result') }}:</b>
                          </td>
                          <td>
                            <ul style="padding-left: 15px;">
                              <li v-for="res in getProp(result,'resultJSON', [])">
                                <span class=" tx-bold tx-primary">{{ res.name }}</span>
                              </li>
                            </ul>
                          </td>
                        </tr>
                        <tr class="bg-warning-light">
                          <td style="width: 30%">
                            <b>{{ $t('isledovanie.label.pdk') }}:</b>
                          </td>
                          <td>
                            <ul style="padding-left: 15px;">
                              <li v-for="pdk in getProp(result,'pdkJSON', [])">
                                <span class="tx-bold">{{ pdk.name }}</span>
                              </li>
                            </ul>
                          </td>
                        </tr>
                        <tr>
                          <td style="width: 30%">
                            <b>{{ $t('isledovanie.label.isledovanieND') }}:</b>
                          </td>
                          <td>
                            <ul style="padding-left: 15px;">
                              <li v-for="pokazatel in getProp(result,'metodJSON', [])">
                                {{ pokazatel.name }}
                              </li>
                            </ul>
                          </td>
                        </tr>
                        <tr>
                          <td colspan="3">
                            <hr>
                          </td>
                        </tr>
                      </template>
                    </table>
                  </td>
                </tr>
              </tbody>
              </template>

              <template v-else>
              <tbody>
                <template v-for="result in getProp(cellData.item, 'isResultJSON', [])">
                  <tr>
                    <td style="width: 30%">
                      <b>{{ $t('isledovanie.label.opPokazatel') }}:</b>
                    </td>
                    <td>
                      <ul style="padding-left: 15px;">
                        <li v-for="pokazatel in getProp(result,'opPokazatelJSON', [])">
                          {{ pokazatel.name }}
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td style="width: 30%">
                      <b>{{ $t('isledovanie.label.isledovanieND') }}:</b>
                    </td>
                    <td>
                      <ul style="padding-left: 15px;">
                        <li v-for="pokazatel in getProp(result,'metodJSON', [])">
                          {{ pokazatel.name }}
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <h6 class="tx-center">
                        {{ $t('isledovanie.label.isledovanieResults') }}:
                      </h6>
                      <table class="table table-bordered table-sm">
                        <thead>
                          <tr>
                            <th>
                              <b>{{ $t('isledovanie.label.nomerProby') }}:</b>
                            </th>
                            <th>
                              <b>{{ $t('isledovanie.label.result') }}:</b>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                        <template v-for="proba in getProp(result, 'proby', [])">
                          <tr class="bg-cyan-light">
                            <td style="width: 30%">
                              <b>{{ getProp(proba, 'indexProby') }}</b>
                            </td>
                            <td>
                              <ul style="padding-left: 15px;">
                                <li v-for="probaResult in getProp(proba,'resultJSON', [])">
                                  {{ probaResult.name }}
                                </li>
                              </ul>
                            </td>
                          </tr>
                        </template>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </template>
              </tbody>
              </template>
            </table>

          </template>
        </b-table>
      </template>
    </b-container>
  </div>
</template>
<script>
  import CrudListMixin from '~/components/crud/CrudListMixin'
  import { mapState } from 'vuex'
  export default {
    mixins: [CrudListMixin],
    data() {
      return {
        perPage: 3,
        total: null,
        pageOptions: [1, 2, 3, 5, 7, 10],
      }
    },
    computed: {
      ...mapState({
        user: (state) => state.user,
      }),
      ...mapState('vet', {
        otdelList: (state) => state.otdelList,
      })
    },
    methods: {
      isFinishedFoodSafetyOtdel(data) {
        const id = this.getProp(data, 'finishedOtdel.sOtdeleniaId', false)
        return id === this.otdelList.FOOD_SAFETY.ID
      },

      isFoodSafetyOtdel(data) {
        const id = this.getProp(data, 'otdel.sOtdeleniaId', false)
        return id === this.otdelList.FOOD_SAFETY.ID
      },

      rowStatusBasedColor(item, type) {
        if (!item || type !== 'row') return false
      }
    }
  }
</script>
