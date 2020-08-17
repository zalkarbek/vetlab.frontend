import { BaseRepository } from '~/api/BaseRepository'

class PersonalRepository extends BaseRepository {
  getLaborantsByOtdelId({ otdelId }) {
    return this.ctx.$axios.$get('api/v1/personal/laborants', {
      params: { otdelId }
    })
  }
  getChemistsByOtdelId({ otdelId }) {
    return this.ctx.$axios.$get('api/v1/personal/chemists', {
      params: { otdelId }
    })
  }
  getSeniorsByOtdelId({ otdelId }) {
    return this.ctx.$axios.$get('api/v1/personal/seniors', {
      params: { otdelId }
    })
  }

  getHeadByOtdelId({ otdelId }) {
    return this.ctx.$axios.$get('api/v1/personal/head', {
      params: { otdelId }
    })
  }
  getHeadsByOtdelId({ otdelId }) {
    return this.ctx.$axios.$get('api/v1/personal/heads', {
      params: { otdelId }
    })
  }

  getPersonalById(params) {
    return this.ctx.$axios.$get('api/v1/personal/id', params)
  }
}
export { PersonalRepository }
