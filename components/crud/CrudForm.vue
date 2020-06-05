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
              && toLowerCase(field.type) !== fieldTypes.json
              && isObject(recordItem)"
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
              :description="
                $t(field.description || `form.description.${field.key}`)
              "
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
                  :placeholder="
                    $t(field.placeholder || `form.placeholder.${field.key}`)
                  "
                  @multi-input="onMultiInput"
                />
              </slot>
            </b-form-group>
          </b-col>
          <!--==================================================================-->
          <!--================================FIELD TYPE JSON==================================-->
          <template
            v-if="!field.disabled
            && isObject(recordItem[field.key])
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
      <template
        v-if="Array.isArray(modelData.foreign) && modelData.foreign.length >= 1"
      >
        <template v-for="(foreignCrud, index) in modelData.foreign">
          <!-- ============================FOREIGN ARRAY======================================-->
          <div :key="index" v-if="foreignCrud.type === fieldTypes.array" class="mg-b-20">
            <h5>
              {{ $t(`${foreignCrud.crudName}.title`) }} &nbsp;
              <button
                type="button"
                class="btn btn-xs btn-outline-primary"
                @click="addNewToForeignArray(recordItem, foreignCrud, 1)"
              >
                {{ $t("form.label.add") }} 1
              </button>
              <button
                type="button"
                class="btn btn-xs btn-outline-primary"
                @click="addNewToForeignArray(recordItem, foreignCrud, 5)"
              >
                {{ $t("form.label.add") }} 5
              </button>
              <button
                type="button"
                class="btn btn-xs btn-outline-primary"
                @click="addNewToForeignArray(recordItem, foreignCrud, 7)"
              >
                {{ $t("form.label.add") }} 7
              </button>
              <button
                type="button"
                class="btn btn-xs btn-outline-primary"
                @click="addNewToForeignArray(recordItem, foreignCrud, 10)"
              >
                {{ $t("form.label.add") }} 10
              </button>
              <button
                type="button"
                class="btn btn-xs btn-outline-primary"
                @click="addNewToForeignArray(recordItem, foreignCrud, 13)"
              >
                {{ $t("form.label.add") }} 13
              </button>
              <button
                type="button"
                class="btn btn-xs btn-outline-primary"
                @click="addNewToForeignArray(recordItem, foreignCrud, 15)"
              >
                {{ $t("form.label.add") }} 15
              </button>
              <button
                type="button"
                class="btn btn-xs btn-outline-primary"
                @click="addNewToForeignArray(recordItem, foreignCrud, 20)"
              >
                {{ $t("form.label.add") }} 20
              </button>
              <button
                type="button"
                class="btn btn-xs btn-outline-danger"
                @click="clearDataArray(recordItem, foreignCrud)"
              >
                {{ $t("form.label.clear") }}
              </button>
            </h5>
            <div class="divider-text">
              {{ $t(`${foreignCrud.crudName}.title`) }}
            </div>
            <crud-form-array
              v-model="recordItem[foreignCrud.datasetName || foreignCrud.crudName]"
              :crud-data="crud[foreignCrud.crudName]"
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

import CrudFormMixin from '~/components/crud/CrudFormMixin'

export default {
  mixins: [CrudFormMixin]
}
</script>
