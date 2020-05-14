<template>
  <div>
    <div v-bind:id="`${napravlenieCrudDataName}_page_id`">
      <napravlenie-component
        :crud="crud"
        :crud-data-name="napravlenieCrudDataName"
      ></napravlenie-component>
    </div>
    <div v-bind:id="`${napravlenieCrudDataName}_page_id`" class="mg-t-30">
      <vnyt-napravlenie-component
        :crud="crud"
        :crud-data-name="vnytNapravlenieCrudDataName"
      >
      </vnyt-napravlenie-component>
    </div>
  </div>
</template>
<script>
import NapravlenieComponent from '~/components/vetlab/epic/napravlenie/NapravlenieComponent'
import VnytNapravlenieComponent from '~/components/vetlab/epic/vnytNapravlenie/VnytNapravlenieComponent'
import CrudData from '~/data/crud'

export default {
  components: {
    NapravlenieComponent,
    VnytNapravlenieComponent
  },
  data() {
    return {
      napravlenieCrudDataName: 'napravlenieEpic',
      vnytNapravlenieCrudDataName: 'vnytNapravlenie'
    }
  },
  computed: {
    crud() {
      return CrudData
    }
  }
}
</script>
