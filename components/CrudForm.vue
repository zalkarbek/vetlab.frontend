<template>
  <div class="card card-body">
    <h4>{{ $t('form.add') }}</h4>
    <div class="form-row">
      <template v-for="form in modelData.fields">
        <div
          :key="form.key"
          class="form-group col-sm-12 col-md-4 col-xs-12 col-lg-3 mg-lg-r-50 mg-xl-r-60"
        >
          <template v-if="form.type === 'text'">
            <label :for="`${modelData.restName}_${form.key}_id`">
              {{ $t(`form.label.${form.key}`) }}
            </label>
            <input
              :id="`${modelData.restName}_${form.key}_id`"
              v-model.trim="recordItem[form.key]"
              :placeholder="$t(`form.placeholder.${form.key}`)"
              type="text"
              class="form-control"
            />
          </template>

          <template v-if="form.type === 'textarea'">
            <label :for="`${modelData.restName}_${form.key}_id`">
              {{ $t(`form.label.${form.key}`) }}
            </label>
            <b-form-textarea
              :id="`${modelData.restName}_${form.key}_id`"
              v-model.trim="recordItem[form.key]"
              :placeholder="$t(`form.placeholder.${form.key}`)"
              class="form-control"
            ></b-form-textarea>
          </template>

          <template v-else-if="form.type === 'number'">
            <label :for="`${modelData.restName}_${form.key}_id`">
              {{ $t(`form.label.${form.key}`) }}
            </label>
            <input
              :id="`${modelData.restName}_${form.key}_id`"
              v-model.trim="recordItem[form.key]"
              :placeholder="$t(`form.placeholder.${form.key}`)"
              type="number"
              class="form-control"
            />
          </template>

          <template v-else-if="form.type === 'select'">
            <label :for="`${modelData.restName}_${form.key}_id`">
              {{ $t(`form.label.${form.key}`) }}
            </label>
            <v-select
              v-model.trim="recordItem[form.key]"
              :id="`${modelData.restName}_${form.key}_select`"
              :reduce="(item) => item[form.foreign_value]"
              :placeholder="
                $t(`form.${modelData.restName}.placeholder.${form.key}`)
              "
              :label="form.foreign_label"
              :options="datasetList[form.foreign_dataset]"
              @search:focus="
                getLoadDataSet(form.foreign_dataset, form.foreign_crud)
              "
            />
          </template>

          <template v-else-if="form.type === 'select:preload'">
            <label :for="`${modelData.restName}_${form.key}_id`">
              {{ $t(`form.label.${form.key}`) }}
            </label>
            <v-select
              v-model.trim="recordItem[form.key]"
              :id="`${modelData.restName}_${form.key}_select`"
              :reduce="(item) => item[form.foreign_value]"
              :placeholder="$t(`form.placeholder.${form.key}`)"
              :label="form.foreign_label"
              :options="localDatasetList[form.foreign_dataset]"
              @search:focus="preload(form.foreign_dataset, form.foreign_crud)"
            />
          </template>

          <template v-else-if="form.type === 'autocomplete'">
            <label :for="`${modelData.restName}_${form.key}_autocomplete`">
              {{ $t(`form.label.${form.key}`) }}
            </label>
            <v-select
              v-model.trim="recordItem[form.key]"
              :options="datasetList[form.foreign_dataset]"
              :id="`${modelData.restName}_${form.key}_autocomplete`"
              :reduce="(item) => item[form.foreign_value]"
              :placeholder="$t(`form.placeholder.${form.key}`)"
              :label="form.foreign_label"
              @search:focus="
                getLoadDataSet(form.foreign_dataset, form.foreign_crud)
              "
            />
          </template>
        </div>
      </template>
    </div>

    <b-button-group class="col-sm-12 col-md-46 col-xs-8 col-lg-4">
      <b-button v-if="!record.id" @click="createEvent()" variant="success">
        <i class=" fal fa-save" />
        {{ $t('form.save') }}
      </b-button>
      <b-button v-if="record.id" @click="updateEvent()" variant="warning">
        <i class=" fal fa-undo" />
        {{ $t('form.update') }}
      </b-button>
      <b-button @click="clearEvent()" variant="danger">
        <i class=" fal fa-trash-alt" />
        {{ $t('form.clear') }}
      </b-button>
    </b-button-group>
  </div>
</template>
<script>
export default {
  model: {
    prop: 'record',
    event: 'on-clear'
  },
  props: {
    crudData: {
      type: Object,
      default() {
        return {}
      }
    },
    record: {
      type: Object,
      default() {
        return null
      }
    }
  },
  data() {
    return {
      localDataset: {},
      created: false,
      update: false
    }
  },
  computed: {
    localDatasetList() {
      return this.localDataset
    },
    datasetList() {
      return this.$store.getters['api/dataset']
    },
    modelData() {
      return this.crudData
    },
    recordItem() {
      return this.record
    },
    crud() {
      return this.$store.state.api.crud
    }
  },
  mounted() {},
  methods: {
    createEvent() {
      this.$emit('on-create', this.recordItem)
    },
    updateEvent() {
      this.$emit('on-update', this.recordItem)
    },
    clearEvent() {
      this.$emit('on-clear', {})
    },
    // onSelected(value, form) {
    //   console.log(value, form)
    // },
    async getLoadDataSet(datasetName, datasetCrud) {
      await this.$store.dispatch('api/getDataset', {
        datasetName,
        datasetCrud
      })
    },
    async preload(datasetName, datasetCrudName) {
      if (!this.localDataset[datasetName]) {
        const { data } = await this.$store.dispatch('api/req', {
          req: this.crud[datasetCrudName].rest.all
        })
        this.$set(this.localDataset, datasetName, [...data])
      }
    }
  }
}
</script>
