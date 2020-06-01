<template>
  <div :id="`${crudDataName}_page_id`">
    <crud-component :crud="crud" :crud-data-name="crudDataName"/>
  </div>
</template>
<script>
import NapravlenieComponent from '~/components/vetlab/napravlenie/NapravlenieComponent'
import CrudData from '~/data/crud'

export default {
  name: 'NapravlenieIndex',
  components: {
    'crud-component': NapravlenieComponent,
  },
  data() {
    return {
      crudDataName: 'napravlenie',
    }
  },
  computed: {
    crud() {
      return CrudData
    },
  },
}
</script>
