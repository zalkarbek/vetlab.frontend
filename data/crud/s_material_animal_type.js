import baseApiRoutes from './baseApiRoutes'
import baseFields from '~/data/crud/baseFields'
// Имя модели к которому привязан этот API
const restName = 's_material_animal_type'
// Превикс API маршрута
const routePrefix = 'material/animal/type'
// Имя набор данных которые хранится в vuex
const datasetName = 'materialAnimalTypes'

// базовые машрутры для всех api
const baseApi = baseApiRoutes({ routePrefix })

export default {
  restName,
  routePrefix,
  datasetName,
  rest: {
    ...baseApi,
  },

  fields: [...baseFields],
}
