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
                  />
                </b-input-group>
              </b-form-group>
            </b-col>
          </b-row>
        </b-col>
        <b-col lg="9" class="mg-t-20">
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

          <!--outerNomerNapravlenie-->
          <template v-slot:cell(napravlenieId)="cellData">
            <span class="tx-24 tx-bold">{{ cellData.value }}</span>
          </template>

          <!--nomerNapravlenie-->
          <template v-slot:cell(id)="cellData">
            <span class="tx-24 tx-bold">{{ cellData.item.nomer || cellData.value }}</span>
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
                  <span :key="index"
                        class="tx-bold"
                  >
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
              class="tx-16 badge badge-warning"
            >
              {{ $t(`vnytNapravlenie.epic.status.${cellData.value}`) }}
               <i class="fa-2x fal fa-question fa-beat"></i>
            </span>
            <span
              v-if="toLowerCase(cellData.value) === toLowerCase('accepted')"
              class="tx-16 badge badge-primary"
            >
              {{ $t(`vnytNapravlenie.epic.status.${cellData.value}`) }}
              <i class="fa-2x fal fa-check"></i>
            </span>

            <span
              v-if="toLowerCase(cellData.value) === toLowerCase('research')"
              class="tx-16 badge badge-info"
            >
              {{ $t(`vnytNapravlenie.epic.status.${cellData.value}`) }}
              <i class="fa-2x fas fa-radiation fa-spin text-warning"></i>
            </span>

            <span
              v-if="toLowerCase(cellData.value) === toLowerCase('completed')"
              class="tx-16 badge badge-success"
            >
              {{ $t(`vnytNapravlenie.epic.status.${cellData.value}`) }}
               <i class="fa-2x fal fa-check-circle"></i>
            </span>

            <span
              v-if="toLowerCase(cellData.value) === toLowerCase('rejected')"
              class="tx-16 badge badge-danger"
            >
              {{ $t(`vnytNapravlenie.epic.status.${cellData.value}`) }}
              <i class="fa-2x fal fa-ban"></i>
            </span>
          </template>

          <template v-slot:cell(actions)="row">
            <b-button-toolbar>
              <b-button-group class="mr-1" size="sm">
                <template v-for="(button, index) in actionButtons">
                  <b-button
                    v-if="Array.isArray(button.status) && button.status.includes(row.item.status)"
                    :key="index"
                    :variant="button.variant || 'secondary'"
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

          <template v-slot:cell(sendStatusCustomView)="cellData">
            <div v-if="cellData.item.napravilPersonal">
              <h6 class="tx-primary tx-bold">
                {{ $t("vnytNapravlenie.label.napravilPersonal") }}
              </h6>
              <ul class="list-group list-group-flush tx-13">
                <li class="list-group-item d-flex pd-sm-x-20">
                  <div class="avatar">
                    <span class="avatar-initial rounded-circle bg-primary">
                      {{
                        getProp(
                          cellData.item,
                          "napravilPersonal.fullName",
                          ""
                        )[0]
                      }}
                    </span>
                  </div>
                  <div class="pd-l-10">
                    <p class="tx-medium mg-b-0">
                      {{
                      getProp(cellData.item, "napravilPersonal.fullName", "")
                      }}
                    </p>
                    <small class="tx-12 tx-color-03 mg-b-0">
                      {{
                      getProp(
                      cellData.item,
                      "napravilPersonal.sDoljnost.name",
                      ""
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
                    {{ $t("vnytNapravlenie.label.napravlenOtdel") }}:
                  </span>
                  <span>
                    {{ getProp(cellData.item, "napravlenOtdel.name", "") }}
                  </span>
                </b-list-group-item>
                <b-list-group-item v-if="cellData.item.dateVremyaOtpravki">
                  <span class="tx-bold">
                    {{ $t("vnytNapravlenie.label.dateVremyaOtpravki") }}:
                  </span>
                  <span>
                    {{
                      formatDate(
                        getProp(cellData.item, "dateVremyaOtpravki", "")
                      )
                    }}
                  </span>
                </b-list-group-item>
                <b-list-group-item v-if="cellData.item.dateVremyaOtpravki">
                  <span class="tx-bold">
                    {{ $t("vnytNapravlenie.label.vremyaOtpravki") }}:
                  </span>
                  <span>
                    {{
                      formatTime(
                        getProp(cellData.item, "dateVremyaOtpravki", "")
                      )
                    }}
                  </span>
                </b-list-group-item>
              </b-list-group>
            </div>

            <div v-if="cellData.item.prinyalPersonal">
              <h6 class="tx-success tx-bold">
                {{ $t("vnytNapravlenie.label.prinyalPersonal") }}
              </h6>
              <ul class="list-group list-group-flush tx-13">
                <li class="list-group-item d-flex pd-sm-x-20">
                  <div class="avatar">
                    <span class="avatar-initial rounded-circle bg-primary">
                      {{
                        getProp(
                          cellData.item,
                          "prinyalPersonal.fullName",
                          ""
                        )[0]
                      }}
                    </span>
                  </div>
                  <div class="pd-l-10">
                    <p class="tx-medium mg-b-0">
                      {{
                        getProp(cellData.item, "prinyalPersonal.fullName", "")
                      }}
                    </p>
                    <small class="tx-12 tx-color-03 mg-b-0">
                      {{
                        getProp(
                          cellData.item,
                          "prinyalPersonal.sDoljnost.name",
                          ""
                        )
                      }}
                    </small>
                  </div>
                </li>
              </ul>
              <table class="table table-responsive table-sm">
                <tbody>
                <tr>
                  <td>
                      <span class="tx-bold">
                        {{ $t("vnytNapravlenie.label.prinyalOtdel") }}:
                      </span>
                  </td>
                  <td>
                    {{ getProp(cellData.item, "prinyalOtdel.name", "") }}
                  </td>
                </tr>
                <tr>
                  <td>
                      <span class="tx-bold">
                        {{ $t("vnytNapravlenie.label.prinyalDate") }}:
                      </span>
                  </td>
                  <td>
                    {{
                    formatDate(
                    getProp(cellData.item, "prinyalDate", "")
                    )
                    }}
                  </td>
                </tr>
                <tr>
                  <td>
                      <span class="tx-bold">
                        {{ $t("vnytNapravlenie.label.prinyalTime") }}:
                      </span>
                  </td>
                  <td>
                    {{
                    formatTime(
                    getProp(cellData.item, "prinyalDate", "")
                    )
                    }}
                  </td>
                </tr>
                </tbody>
              </table>
            </div>

            <div v-if="cellData.item.rejectPersonal">
              <h6 class="tx-danger tx-bold">
                {{ $t("vnytNapravlenie.label.rejectPersonal") }}
              </h6>
              <ul class="list-group list-group-flush tx-13">
                <li class="list-group-item d-flex pd-sm-x-20">
                  <div class="avatar">
                    <span class="avatar-initial rounded-circle bg-primary">
                      {{
                        getProp(
                          cellData.item,
                          "rejectPersonal.fullName",
                          ""
                        )[0]
                      }}
                    </span>
                  </div>
                  <div class="pd-l-10">
                    <p class="tx-medium mg-b-0">
                      {{
                      getProp(cellData.item, "rejectPersonal.fullName", "")
                      }}
                    </p>
                    <small class="tx-12 tx-color-03 mg-b-0">
                      {{ getProp(cellData.item, "rejectPersonal.sDoljnost.name", "") }}
                    </small>
                  </div>
                </li>
              </ul>
              <table class="table table-responsive table-sm">
                <tbody>
                <tr>
                  <td>
                    <span class="tx-bold">
                      {{ $t("vnytNapravlenie.label.rejectOtdel") }}:
                    </span>
                  </td>
                  <td>
                    {{ getProp(cellData.item, "rejectOtdel.name", "") }}
                  </td>
                </tr>
                <tr>
                  <td>
                    <span class="tx-bold">
                      {{ $t("vnytNapravlenie.label.rejectDate") }}:
                    </span>
                  </td>
                  <td>
                    {{ formatDate(getProp(cellData.item, "rejectDate", "")) }}
                  </td>
                </tr>
                <tr>
                  <td>
                    <span class="tx-bold">
                      {{ $t("vnytNapravlenie.label.rejectTime") }}:
                    </span>
                  </td>
                  <td>
                    {{ formatTime(getProp(cellData.item, "rejectDate", "")) }}
                  </td>
                </tr>
                </tbody>
              </table>

            </div>
          </template>

          <template v-slot:cell(posMaterialCustomView)="cellData">
            <b-list-group class="list-group-flush">
              <b-list-group-item v-if="cellData.item.opPokazatelJSON">
                <span class="tx-bold">
                  {{ $t("vnytNapravlenie.label.opPokazatel") }}:
                </span>
                <ul style="padding-left: 15px;">
                  <template
                    v-for="pokazatel in getProp(cellData.item,'opPokazatelJSON',[])"
                  >
                    <li>{{ pokazatel.name }}</li>
                  </template>
                </ul>
              </b-list-group-item>
              <b-list-group-item v-if="cellData.item.posMaterials">
                <span class="tx-bold">
                  {{ $t("vnytNapravlenie.label.posMaterialCount") }}:
                </span>
                <span v-if="isFoodSafetyOtdel(cellData.item.napravlenOtdelId)">
                  {{ forFoodSafetyPosMaterialsCount(getProp(cellData.item, 'posMaterials', [])) }}
                </span>
                <span v-else>
                  {{ posMaterialsTotalCount(getProp(cellData.item, 'posMaterials', [])) }}
                </span>
              </b-list-group-item>
              <b-list-group-item v-if="cellData.item.posMaterials">
                <span class="tx-bold">
                  {{ $t("vnytNapravlenie.label.posMaterialId") }}:
                </span>
                <br>
                <template v-for="posMaterial in cellData.item.posMaterials">
                  <b class="bg-cyan-light">
                    ({{ posMaterial.nomer || posMaterial.id }})
                  </b>
                  <span v-if="getProp(posMaterial, 'sMaterialJSON', null)">
                    -
                    <span v-for="(material, index) in getProp(posMaterial, 'sMaterialJSON', [])">
                      {{ material.name }}
                      {{ getProp(posMaterial, 'materialCount', '') }}
                      {{ getProp(posMaterial, 'sMera.name', '') }}
                      <span v-if="index < posMaterial.sMaterialJSON.length - 1">,</span>
                    </span>
                  </span>
                  <br>
                </template>
                <span v-for="(material, index) in getProp(cellData.item.posMaterial, 'sMaterialJSON', [])">
                  {{ material.name }}
                  <span
                    v-if="index <
                      getProp(
                        cellData.item.posMaterial,
                        'sMaterialJSON',
                        []
                      ).length - 1">
                    ,
                  </span>
                </span>
              </b-list-group-item>

              <b-list-group-item
                  v-if="getProp(cellData.item, 'posMaterial.dateZabolivanie', null)">
                <span class="tx-bold">
                  {{ $t("pos_material.label.dateZabolivanie") }}:
                </span>
                <span>
                  {{
                    formatDate(
                      getProp(
                        cellData.item,
                        "posMaterial.dateZabolivanie",
                        null
                      )
                    )
                  }}
                </span>
              </b-list-group-item>
              <b-list-group-item
                  v-if="getProp(cellData.item, 'posMaterial.dateZaboya', null)">
                <span class="tx-bold">
                  {{ $t("pos_material.label.dateZaboya") }}:
                </span>
                <span>
                  {{
                    formatDate(
                      getProp(
                        cellData.item,
                        "posMaterial.dateZaboya",
                        null
                      )
                    )
                  }}
                </span>
              </b-list-group-item>
              <b-list-group-item
                  v-if="getProp(cellData.item, 'posMaterial.dateVremyaOtbora', null)">
                <span class="tx-bold">
                  {{ $t("pos_material.label.dateVremyaOtbora") }}:
                </span>
                <span>
                  {{
                    formatDate(
                      getProp(
                        cellData.item,
                        "posMaterial.dateVremyaOtbora",
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
                  {{ $t("pos_material.label.dateDostavki") }}:
                </span>
                <span>
                  {{
                    formatDate(
                      getProp(cellData.item, "posMaterial.dateDostavki", null)
                    )
                  }}
                </span>
              </b-list-group-item>

              <b-list-group-item>
                <span
                  v-if="getProp(cellData.item, 'posMaterialCheckVid', null) === true"
                  class="tx-bold"
                >
                  {{ $t("vnytNapravlenie.label.posMaterialCheckVid") }}:
                  <i class="fas fa-check-circle tx-success" />
                  {{ $t("form.label.yes") }}
                </span>

                <span
                    v-if="
                    getProp(cellData.item, 'posMaterialCheckVid', null) ===
                      false
                  "
                    class="tx-bold"
                >
                  {{ $t("vnytNapravlenie.label.posMaterialCheckVid") }}:
                  <i class="fas fa-check-circle tx-success" />
                  {{ $t("form.label.yes") }}
                </span>
              </b-list-group-item>
              <b-list-group-item>
                <span
                  v-if="getProp(cellData.item, 'postMaterialCheck', null) === true"
                  class="tx-bold"
                >
                  {{ $t("vnytNapravlenie.label.postMaterialCheck") }}:
                  <i class="fas fa-check-circle tx-success" />
                  {{ $t("form.label.yes") }}
                </span>

                <span
                  v-if="getProp(cellData.item, 'postMaterialCheck', null) === false"
                  class="tx-bold"
                >
                  {{ $t("vnytNapravlenie.label.postMaterialCheck") }}:
                  <i class="fas fa-check-circle tx-success" />
                  {{ $t("form.label.no") }}
                </span>
              </b-list-group-item>
            </b-list-group>
          </template>

          <template v-slot:cell(vnytNapravlenieOptionalCustomView)="cellData">
            <b-list-group class="list-group-flush">
              <b-list-group-item v-if="cellData.item.dateDeworming">
                <span class="tx-bold">
                  {{ $t("vnytNapravlenie.label.dateDeworming") }}:
                </span>
                <span>
                  {{ formatDate(getProp(cellData.item, "dateDeworming", "")) }}
                </span>
              </b-list-group-item>

              <b-list-group-item v-if="cellData.item.anthelminticTypeJSON">
                <span class="tx-bold">
                  {{ $t("vnytNapravlenie.label.anthelminticTypeJSON") }}:
                </span>
                <span>
                  {{
                    renderJSONArrayToList(
                      getProp(cellData.item, "anthelminticTypeJSON", [])
                      ,'name'
                    )
                  }}
                </span>
              </b-list-group-item>

              <b-list-group-item v-if="cellData.item.dateVaccination">
                <span class="tx-bold">
                  {{ $t("vnytNapravlenie.label.dateVaccination") }}:
                </span>
                <span>
                  {{
                    formatDate(getProp(cellData.item, "dateVaccination", ""))
                  }}
                </span>
              </b-list-group-item>

              <b-list-group-item v-if="cellData.item.vaccineTypeJSON">
                <span class="tx-bold">
                  {{ $t("vnytNapravlenie.label.vaccineTypeJSON") }}:
                </span>
                <span>
                  {{
                    renderJSONArrayToList(
                      getProp(cellData.item, "vaccineTypeJSON", [])
                      ,'name'
                    )
                  }}
                </span>
              </b-list-group-item>

              <b-list-group-item v-if="cellData.item.dateLechenia">
                <span class="tx-bold">
                  {{ $t("vnytNapravlenie.label.dateLechenia") }}:
                </span>
                <span>
                  {{ formatDate(getProp(cellData.item, "dateLechenia", "")) }}
                </span>
              </b-list-group-item>

              <b-list-group-item v-if="cellData.item.antibioticTypeJSON">
                <span class="tx-bold">
                  {{ $t("vnytNapravlenie.label.antibioticTypeJSON") }}:
                </span>
                <span>
                  {{
                    renderJSONArrayToList(
                      getProp(cellData.item, "antibioticTypeJSON", [])
                      ,'name'
                    )
                  }}
                </span>
              </b-list-group-item>

              <b-list-group-item v-if="cellData.item.dateObrabotki">
                <span class="tx-bold">
                  {{ $t("vnytNapravlenie.label.dateObrabotki") }}:
                </span>
                <span>
                  {{ formatDate(getProp(cellData.item, "dateObrabotki", "")) }}
                </span>
              </b-list-group-item>

              <b-list-group-item v-if="cellData.item.disinfectantTypeJSON">
                <span class="tx-bold">
                  {{ $t("vnytNapravlenie.label.disinfectantTypeJSON") }}:
                </span>
                <span>
                  {{
                    renderJSONArrayToList(
                      getProp(cellData.item, "disinfectantTypeJSON", [])
                      ,'name'
                    )
                  }}
                </span>
              </b-list-group-item>

              <b-list-group-item v-if="cellData.item.isledovanieProvoditsaJSON">
                <span class="tx-bold">
                  {{ $t("vnytNapravlenie.label.isledovanieProvoditsaJSON") }}:
                </span>
                <span>
                  {{
                    renderJSONArrayToListWithTranslate(
                      getProp(cellData.item, "isledovanieProvoditsaJSON", [])
                    )
                  }}
                </span>
              </b-list-group-item>

              <b-list-group-item v-if="cellData.item.rejectionDescription">
                <span class="tx-bold">
                  {{ $t("vnytNapravlenie.label.rejectionDescription") }}:
                </span>
                <span>
                  {{ getProp(cellData.item, "rejectionDescription", '') }}
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
    fields() {
      const actions = {
        key: 'actions',
        label: '#',
      }
      const modelFields =
        this.modelData.fieldsForTable || this.modelData.fields
      const enabledFields = modelFields.filter((field) => {
        return !field.hidden
      })
      const list = enabledFields.map(({ type, key, label, ...other }) => {
        label = this.$t(label || `form.label.${key}`)
        return {
          key,
          type,
          label,
          sortable: true,
          sortByFormatted: true,
          filterByFormatted: true,
          ...other,
        }
      })
      return [...list, actions]
    },
    ...mapState('vet', {
      otdelList: (state) => state.otdelList,
    }),
  },
  methods: {
    isFoodSafetyOtdel(otdelId) {
      return otdelId === this.otdelList.FOOD_SAFETY.ID
    },
    posMaterialsTotalCount(posMaterials = []) {
      let totalCount = 0
      posMaterials.forEach((material) => {
        totalCount = totalCount + (material && material.materialCount || 0)
      })
      return totalCount
    },
    forFoodSafetyPosMaterialsCount(materials) {
      return materials.length
    }
  }
}
</script>
