<template>
  <div>
    <div :id="`${vnytNapravlenieCrudDataName}_page_id`" class="mg-t-30">
      <isledovanie-component
        :crud="crud"
        :crud-data-name="vnytNapravlenieCrudDataName"
      />
    </div>
  </div>
</template>
<script>
import IsledovanieComponent from '~/components/vetlab/pub/isledovanie/IsedovanieComponent'
import CrudData from '~/data/crud'

export default {
  components: {
    IsledovanieComponent,
  },
  data() {
    return {
      vnytNapravlenieCrudDataName: 'isledovaniePub',
    }
  },
  computed: {
    crud() {
      return CrudData
    },
  },
}
</script>
