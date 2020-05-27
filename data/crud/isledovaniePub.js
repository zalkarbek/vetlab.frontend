import baseApiRoutes from './baseApiRoutes'
// Имя модели к которому привязан этот API
const restName = 'isledovanie'
// Превикс API маршрута
const routePrefix = 'isledovanie'
// Имя набор данных которые хранится в vuex или локально в переменной localDataset
const datasetName = 'isledovanie'

// базовые машрутры для всех api
const baseApi = baseApiRoutes({ routePrefix })

export default {
  restName,
  routePrefix,
  datasetName,
  rest: {
    ...baseApi,
  },
  foreign: [],
  fields: [],
}
