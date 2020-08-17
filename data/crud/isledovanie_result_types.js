import baseApiRoutes from './baseApiRoutes'
// Имя модели к которому привязан этот API
const restName = 'isledovanieResultType'
// Превикс API маршрута
const routePrefix = 'isledovanie/result/types'
// Имя набор данных которые хранится в vuex или локально в переменной localDataset
const datasetName = 'isledovanieResultTypes'

// базовые машрутры для всех api
const baseApi = baseApiRoutes({ routePrefix })

export default {
  restName,
  routePrefix,
  datasetName,
  rest: {
    ...baseApi
  },
  foreign: [],
  fields: [],
}
