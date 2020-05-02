<template>
  <div v-bind:id="`${crudDataName}_page_id`">
    <crud-component
      :crud="crud"
      :crud-data-name="crudDataName"
    ></crud-component>
  </div>
</template>
<script>
import CrudComponent from '~/components/crud/CrudComponent'
import CrudData from '~/data/crud'

export default {
  name: 'NapravlenieIndex',
  components: {
    'crud-component': CrudComponent
  },
  data() {
    return {
      crudDataName: 'napravlenie'
    }
  },
  computed: {
    crud() {
      return CrudData
    }
  }
}
</script>
