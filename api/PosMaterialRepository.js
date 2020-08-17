import { BaseRepository } from '~/api/BaseRepository'

class PosMaterialRepository extends BaseRepository {
  getLastByNomerToOtdel(params = {}) {
    return this.ctx.$axios.$get('api/v1/posMaterial/lastByNomerToOtdel', {
      params
    })
  }
}
export { PosMaterialRepository }
