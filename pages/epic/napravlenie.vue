<template>
  <div v-bind:id="`${crudDataName}_page_id`">
    <crud-component
      :crud="crud"
      :crud-data-name="crudDataName"
    ></crud-component>
  </div>
</template>
<script>
import CrudComponent from '~/components/vetlab/epic/napravlenie/NapravlenieComponent'
import CrudData from '~/data/crud'

export default {
  components: {
    CrudComponent
  },
  data() {
    return {
      crudDataName: 'napravlenieEpic'
    }
  },
  computed: {
    crud() {
      return CrudData
    }
  }
}
</script>
