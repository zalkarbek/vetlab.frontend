import baseApiRoutes from './baseApiRoutes'
// Имя модели к которому привязан этот API
const restName = 's_material'
// Превикс API маршрута
const routePrefix = 'material'

// базовые машрутры для всех api
const baseApi = baseApiRoutes({ routePrefix })

export default {
  restName,
  routePrefix,
  rest: {
    ...baseApi
  },

  fields: [
    {
      type: 'text',
      key: 'i18n'
    },
    {
      type: 'text',
      key: 'name'
    },
    {
      type: 'text',
      key: 'shortName'
    },
    {
      type: 'autocomplete',
      key: 'sMaterialTypeId',
      foreign: 's_material_type',
      foreign_label: 'name',
      foreign_value: 'id'
    },
    {
      type: 'select',
      key: 'sMaterialAnimalTypeId',
      foreign: 's_material_animal_type',
      foreign_label: 'name',
      foreign_value: 'id'
    },
    {
      type: 'text',
      key: 'sMaterialColor'
    }
  ]
}
