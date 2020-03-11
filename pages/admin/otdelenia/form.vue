<template>
  <div class="card card-body">
    <h4>{{ $t('form.add') }}</h4>
    <div class="form-row">
      <template v-for="form in modelData.fields">
        <div
          :key="form.key"
          class="form-group col-sm-12 col-md-4 col-xs-12 col-lg-2 mg-lg-r-50 mg-xl-r-60"
        >
          <label :for="`${modelData.modelName}_${form.key}_id`">
            {{ $t(`${modelData.modelName}.label.${form.key}`) }}
          </label>
          <input
            :id="`${modelData.modelName}_${form.key}_id`"
            v-model.trim="recordItem[form.key]"
            :type="form.type"
            :placeholder="$t(`${modelData.modelName}.placeholder.${form.key}`)"
            class="form-control"
          />
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
    restData: {
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
      model: {},
      created: false,
      update: false
    }
  },
  computed: {
    modelData() {
      return this.restData
    },
    recordItem() {
      return this.record
    }
  },
  methods: {
    createEvent() {
      this.$emit('on-create', this.recordItem)
    },
    updateEvent() {
      this.$emit('on-update', this.recordItem)
    },
    clearEvent() {
      this.$emit('on-clear', {})
    }
  }
}
</script>
