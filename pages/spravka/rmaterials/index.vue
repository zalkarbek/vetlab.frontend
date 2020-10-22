<template>
  <div :id="`${crudDataName}_page_id`">
    <crud-component :crud="crud" :crud-data-name="crudDataName"/>
  </div>
</template>
<script>
import CrudComponent from '~/components/crud/CrudComponent'
import CrudData from '~/data/crud'

export default {
  name: 'PageRMaterials',
  components: {
    'crud-component': CrudComponent,
  },
  data() {
    return {
      crudDataName: 's_rmaterial',
    }
  },
  computed: {
    crud() {
      return CrudData
    },
  },
}
</script>
