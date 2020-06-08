import { BaseRepository } from '~/api/BaseRepository'

class OtdelRepository extends BaseRepository {
  getWithOtdelenia(params) {
    return this.ctx.$axios.$get('api/v1/otdel/with/otdelenia', params)
  }
}
export { OtdelRepository }
