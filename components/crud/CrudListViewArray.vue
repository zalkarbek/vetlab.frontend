<template>
  <div>
    <template v-if="viewType === viewTypes.inline">
      <template v-for="(item, index) in dataItem">
        <template v-if="item">
          <span :key="index"> {{ item }},&nbsp; </span>
        </template>
      </template>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
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
      return this.fieldData
    },
    dataItem() {
      return this.data
    },
  },
}
</script>
