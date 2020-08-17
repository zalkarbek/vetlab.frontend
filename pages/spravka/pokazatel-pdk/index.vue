<template>
  <div :id="`${crudDataName}_page_id`">
    <pokazatel-pdk-component :crud="crud" :crud-data-name="crudDataName"/>
  </div>
</template>
<script>
  import PokazatelPdkComponent from '~/components/vetlab/pokazatelPdk/PokazatelPdkComponent'
  import CrudData from '~/data/crud'

  export default {
    components: {
      PokazatelPdkComponent,
    },
    data() {
      return {
        crudDataName: 's_pokazatel_pdk',
      }
    },
    computed: {
      crud() {
        return CrudData
      },
    },
  }
</script>
