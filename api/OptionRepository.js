import { BaseRepository } from '~/api/BaseRepository'

class OptionRepository extends BaseRepository {
  getSocks() {
    return this.ctx.$axios.$get(this.restApi.getSocks.url)
  }
}
export { OptionRepository }
