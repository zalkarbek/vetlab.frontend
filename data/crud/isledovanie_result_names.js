import baseApiRoutes from './baseApiRoutes'
// Имя модели к которому привязан этот API
const restName = 'isledovanieResultName'
// Превикс API маршрута
const routePrefix = 'isledovanie/result/names'
// Имя набор данных которые хранится в vuex или локально в переменной localDataset
const datasetName = 'isledovanieResultNames'

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
