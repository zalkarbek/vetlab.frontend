<template>
  <div class="card card-body">
    <h4 v-if="crudButtonsEnabled">
      {{ $t("form.add") }}
    </h4>
    <b-container fluid="true">
      <!--==================================================================-->
      <b-form-row>
        <template v-for="(field, index) in modelData.fields">
          <!--==============================FIELD TYPE OTHER====================================-->
          <b-col
            v-if="!field.disabled
              && notIn(notEqual, field.notIn)
              && toLowerCase(field.type) !== fieldTypes.json"
            :key="field.key"
            :sm="(field.col && field.col.sm) || 12"
            :md="(field.col && field.col.md) || 6"
            :xs="(field.col && field.col.xs) || 12"
            :lg="(field.col && field.col.lg) || 3"
            :xl="(field.col && field.col.xl) || 3"
            class="mg-lg-r-10 mg-xl-r-10"
          >
            <b-form-group
              :label="$t(field.label || `form.label.${field.key}`)"
              :label-for="`${modelData.restName}_${field.key}_crud_${index}`"
              :description="$t(field.description || `form.description.${field.key}`)"
            >
              <slot
                :name="field.key"
                :field="field"
                :item="recordItem"
              >
                <crud-field
                  :id="`${modelData.restName}_${field.key}_crud_${index}`"
                  v-model="recordItem[field.key]"
                  :record="recordItem"
                  :field="field"
                  :crud-data="modelData"
                  :placeholder="$t(field.placeholder || `form.placeholder.${field.key}`)"
                  @multi-input="onMultiInput"
                />
              </slot>
            </b-form-group>
          </b-col>
          <!--==================================================================-->
          <!--================================FIELD TYPE JSON==================================-->
          <template
            v-if="!field.disabled
              && recordItem[field.key]
              && notIn(notEqual, field.notIn)
              && toLowerCase(field.type) === fieldTypes.json"
          >
            <slot :name="field.key" :field="field" :item="recordItem">
              <template v-for="(form, index) in field.json">
                <b-col
                  v-if="!form.disabled && isObject(recordItem[field.key])"
                  :sm="(form.col && form.col.sm) || 12"
                  :md="(form.col && form.col.md) || 4"
                  :xs="(form.col && form.col.xs) || 12"
                  :lg="(form.col && form.col.lg) || 3"
                  :xl="(form.col && form.col.xl) || 3"
                  class="mg-lg-r-10 mg-xl-r-10"
                >
                  <b-form-group
                    :label="$t(form.label || `form.label.${form.key}`)"
                    :label-for="`${modelData.restName}_${field.key}_${form.key}_crud_json_${index}`"
                    :description="$t(form.description || `form.description.${form.key}`)"
                  >
                    <crud-field
                      v-model="recordItem[field.key][form.key]"
                      :field="form"
                      :crud-data="modelData"
                      :placeholder="$t(form.placeholder || `form.placeholder.${form.key}`)"
                      @multi-input="(multiValues) => onMultiInputItem(recordItem[field.key], multiValues)"
                    />
                  </b-form-group>
                </b-col>
              </template>
            </slot>
          </template>
          <!--==================================================================-->
        </template>
      </b-form-row>

      <!--================================FOREIGN MODELS==================================-->
      <template v-if="Array.isArray(modelData.foreign) && modelData.foreign.length >= 1">
        <template v-for="(foreignCrud, index) in modelData.foreign">

          <!-- ============================FOREIGN ARRAY======================================-->
          <div :key="index" v-if="foreignCrud.type === fieldTypes.array" class="mg-b-20">
            <h5>
              {{ $t(`${foreignCrud.crudName}.title`) }} &nbsp;
              <b-button-group>
                <b-button
                  @click="addNewToForeignArray(recordItem, foreignCrud, 1)"
                  variant="outline-primary"
                  size="xs"
                >
                  {{ $t("form.label.add") }} 1
                </b-button>

                <b-button
                  @click="addNewToForeignArray(recordItem, foreignCrud, 3)"
                  variant="outline-primary"
                  size="xs"
                >
                  {{ $t("form.label.add") }} 3
                </b-button>

                <b-button
                  @click="addNewToForeignArray(recordItem, foreignCrud, 5)"
                  variant="outline-primary"
                  size="xs"
                >
                  {{ $t("form.label.add") }} 5
                </b-button>

                <b-button
                  @click="addNewToForeignArray(recordItem, foreignCrud, 10)"
                  variant="outline-primary"
                  size="xs"
                >
                  {{ $t("form.label.add") }} 10
                </b-button>

                <b-button
                  @click="addNewToForeignArray(recordItem, foreignCrud, 20)"
                  variant="outline-primary"
                  size="xs"
                >
                  {{ $t("form.label.add") }} 20
                </b-button>

                <b-button
                  @click="clearDataArray(recordItem, foreignCrud)"
                  variant="outline-danger"
                  size="xs"
                >
                  {{ $t("form.label.clear") }}
                </b-button>

              </b-button-group>
            </h5>
            <div class="divider-text">
              {{ $t(`${foreignCrud.crudName}.title`) }}
            </div>
            <napravlenie-crud-form-array
              v-model="recordItem[foreignCrud.datasetName || foreignCrud.crudName]"
              :crud-data="crud[foreignCrud.crudName]"
              :not-equal="notEqual"
              @remove-element="
              (index) =>recordItem[foreignCrud.datasetName || foreignCrud.crudName].splice(index, 1)"
            />
          </div>
          <!--==================================================================-->

          <!--============================FOREIGN OBJECT======================================-->
          <div :key="index" v-if="foreignCrud.type === fieldTypes.object" class="mg-b-20">
            <h5 class="mg-b-10">
              {{ $t(`${foreignCrud.crudName}.title`) }}
            </h5>
            <div class="divider-text">
              {{ $t(`${foreignCrud.crudName}.title`) }}
            </div>
            <crud-form-object
              v-model="recordItem[foreignCrud.crudName]"
              :crud-data="crud[foreignCrud.crudName]"
              :not-equal="notEqual"
            />
          </div>
          <!--==================================================================-->
        </template>
      </template>
    </b-container>
    <template v-if="crudButtonsEnabled">
      <b-button-group class="col-sm-12 col-md-4 col-xs-8 col-lg-4">
        <b-button v-if="!record.id" variant="success" @click="createEvent()">
          <i class="fal fa-save" />
          {{ $t("form.save") }}
        </b-button>
        <b-button v-if="record.id" variant="warning" @click="updateEvent()">
          <i class="fal fa-undo" />
          {{ $t("form.update") }}
        </b-button>
        <b-button variant="danger" @click="clearEvent()">
          <i class="fal fa-trash-alt" />
          {{ $t("form.clear") }}
        </b-button>
      </b-button-group>
    </template>
  </div>
</template>
<script>
import NapravlenieCrudFormMixin from '~/components/vetlab/napravlenie/NapravlenieCrudFormMixin'
import NapravlenieCrudFormArray from '~/components/vetlab/napravlenie/NapravlenieCrudFormArray'

export default {
  components: { NapravlenieCrudFormArray },
  props: {
    notEqual: [Number, Object, String, Array]
  },
  mixins: [NapravlenieCrudFormMixin],
  methods: {
    async addNewToForeignArray(record, foreignCrud, count = 1) {
      const lastPosMateial = await this.$api
        .getApi('posMaterial')
        .getLastByNomerToOtdel({
          otdelId: record.otdelId
        })

      const crudName = foreignCrud.datasetName || foreignCrud.crudName
      const newArray = record[crudName] || []
      const lastArray = newArray[newArray.length - 1]
      for (let i = 0; i < count; i++) {
        const newForeignItem = this.initFields({}, this.crud[foreignCrud.crudName])
        newForeignItem.nomer = (lastArray && lastArray.nomer || lastPosMateial.nomer) + i + 1;
        newForeignItem.indexNumber = newArray.length + 1;
        newForeignItem.opPokazatelJSON = this.cloneDeep(this.getProp(record, 'opPokazatelJSON', {}))
        newForeignItem.ownerJSON = this.cloneDeep(this.getProp(record, 'ownerJSON', {}))
        newForeignItem.mestoOtboraRegionJSON = this.cloneDeep(this.getProp(record, 'regionJSON', {}))
        newForeignItem.kemOtobranJSON = this.cloneDeep(this.getProp(record, 'probyNapravilJSON', {}))
        newArray.push(newForeignItem)
      }
      this.$set(record, crudName, newArray)
    },
  }
}
</script>
