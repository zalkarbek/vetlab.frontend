<template>
  <div>
    <div v-bind:id="`${vnytNapravlenieCrudDataName}_page_id`" class="mg-t-30">
      <vnyt-napravlenie-component
        :crud="crud"
        :crud-data-name="vnytNapravlenieCrudDataName"
      >
      </vnyt-napravlenie-component>
    </div>
  </div>
</template>
<script>
import VnytNapravlenieComponent from '~/components/vetlab/pub/vnytNapravlenie/VnytNapravlenieComponent'
import CrudData from '~/data/crud'

export default {
  components: {
    VnytNapravlenieComponent
  },
  data() {
    return {
      vnytNapravlenieCrudDataName: 'vnytNapravleniePub'
    }
  },
  computed: {
    crud() {
      return CrudData
    }
  }
}
</script>
