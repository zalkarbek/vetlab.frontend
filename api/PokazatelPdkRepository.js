import { BaseRepository } from '~/api/BaseRepository'

class PokazatelPdkRepository extends BaseRepository {
  async getPdkByPokazatelAndMaterial(pokazatelId, materialId) {
    return this
      .ctx
      .$axios
      .$get('api/v1/pokazatelPdk/getPdkByPokazatelAndMaterial', {
        params: { pokazatelId, materialId }
      })
  }
}
export { PokazatelPdkRepository }
