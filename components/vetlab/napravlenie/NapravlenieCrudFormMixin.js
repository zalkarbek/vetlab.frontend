import CrudFormMixin from '~/components/crud/CrudFormMixin'
import loadDatasetMixin from '~/mixins/loadDatasetMixin'

export default {
  mixins: [loadDatasetMixin, CrudFormMixin],
}
