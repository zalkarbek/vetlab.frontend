import baseApiRoutes from './baseApiRoutes'
import baseFields from '~/data/crud/baseFields'
// Имя модели к которому привязан этот API
const restName = 's_material'
// Превикс API маршрута
const routePrefix = 'material'
// Имя набор данных которые хранится в vuex
const datasetName = 'materials'

// базовые машрутры для всех api
const baseApi = baseApiRoutes({ routePrefix })

export default {
  restName,
  routePrefix,
  datasetName,
  rest: {
    ...baseApi
  },

  fields: [
    ...baseFields,
    {
      type: 'select',
      key: 'sMaterialTypeId',
      foreign_crud: 's_material_type',
      foreign_dataset: 'materialTypes',
      foreign_label: 'name',
      foreign_value: 'id'
    },
    {
      type: 'select',
      key: 'sMaterialAnimalTypeId',
      foreign_crud: 's_material_animal_type',
      foreign_dataset: 'materialAnimalTypes',
      foreign_label: 'name',
      foreign_value: 'id'
    },
    {
      type: 'text',
      key: 'sMaterialColor'
    }
  ]
}
