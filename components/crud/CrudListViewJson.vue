<template>
  <div>
    <template v-if="viewType === viewTypes.inline">
      <template v-for="(field, index) in showedFields">
        <template v-if="dataItem && dataItem[field.key]">
          <span :key="field.key"> {{ dataItem[field.key] }}
            <span v-if="index < showedFields.length - 1">,&nbsp;</span>
          </span>
        </template>
      </template>
    </template>

    <template v-if="viewType === viewTypes.inlineWithKey">
      <template v-for="(field, index) in showedFields">
        <span :key="field.key">
          {{ field.key }}: {{ dataItem[field.key] }}
          <span v-if="index < showedFields.length - 1">,&nbsp;</span>
        </span>
      </template>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {}
      },
    },
    fieldData: {
      type: Object,
      default() {
        return {}
      },
    },
    viewType: {
      type: String,
      default() {
        return 'inline'
      },
    },
  },
  data() {
    return {
      viewTypes: {
        list: 'list',
        listWithKey: 'listWithKey',
        table: 'table',
        tableWithKey: 'tableWithKey',
        inline: 'inline',
        inlineWithKey: 'inlineWithKey',
      },
    }
  },
  computed: {
    fields() {
      return this.fieldData.json
    },
    showedFields() {
      if (this.fields && this.fields.length >= 1) {
        return this.fields.filter((field) => {
          return !field.hidden
        })
      }
      return []
    },
    dataItem() {
      return this.data
    },
  },
}
</script>
