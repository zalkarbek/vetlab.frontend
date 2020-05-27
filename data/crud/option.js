// Имя модели к которому привязан этот API
const restName = 'option'
// Превикс API маршрута
const routePrefix = 'option'
// Имя набор данных которые хранится в vuex или локально в переменной localDataset
const datasetName = 'options'

export default {
  restName,
  routePrefix,
  datasetName,
  rest: {
    getSocks: {
      method: 'GET',
      url: `/api/v1/${routePrefix}/socks`,
    },
  },
}
