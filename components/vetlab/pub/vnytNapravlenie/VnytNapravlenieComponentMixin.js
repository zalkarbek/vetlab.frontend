import CrudComponentMixin from '~/components/crud/CrudComponentMixin'
import _ from 'lodash'

export default {
  mixins: [CrudComponentMixin],

  methods: {
    updateVnytNapravlenieStatus(id, status) {
      const elementIndex = _.findIndex(this.crudListRecords, { id })
      if (elementIndex >= 0) {
        this.crudListRecords[elementIndex]['status'] = status
      }
    }
  }
}
