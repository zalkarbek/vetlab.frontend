<template>
  <div v-bind:id="`${crudDataName}_page_id`">
    <crud-component
      :crud="crud"
      :crud-data-name="crudDataName"
    ></crud-component>
  </div>
</template>
<script>
import CrudComponent from '~/components/CrudComponent'
import CrudData from '~/data/crud'

export default {
  components: {
    CrudComponent
  },
  data() {
    return {
      crudDataName: 's_region_type'
    }
  },
  computed: {
    crud() {
      return CrudData
    }
  }
}
</script>
