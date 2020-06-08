import baseApiRoutes from './baseApiRoutes'
// Имя модели к которому привязан этот API
const restName = 'isledovaniePdkNames'
// Превикс API маршрута
const routePrefix = 'isledovanie/pdk/names'
// Имя набор данных которые хранится в vuex или локально в переменной localDataset
const datasetName = 'isledovaniePdkNames'

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
