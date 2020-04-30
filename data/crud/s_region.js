import baseApiRoutes from './baseApiRoutes'
import baseFields from '~/data/crud/baseFields'
// Имя модели к которому привязан этот API
const restName = 's_region'
// Превикс API маршрута
const routePrefix = 'regions'
// Имя набор данных которые хранится в vuex или локально в переменной localDataset
const datasetName = 'regions'

// базовые машрутры для всех api
const baseApi = baseApiRoutes({ routePrefix })

export default {
  restName,
  routePrefix,
  datasetName,
  rest: {
    ...baseApi,
    getRegionsFullPathKg: {
      url: `/api/v1/${routePrefix}/get/regionsFullPathKg`,
      method: 'GET'
    },
    getRegionsFullPathKgWithPaginate: {
      url: `/api/v1/${routePrefix}/get/regionsFullPathKg/paginate`,
      method: 'GET'
    },
    getRegionFullPathKgById: {
      method: 'GET',
      url: `/api/v1/${routePrefix}/get/regionFullPathKgById`
    }
  },

  initConfig: {
    getEditRecord: {
      crud: 's_region',
      method: 'id',
      requireAttrs: ['id']
    },
    // свойство определяет изначальные настройки для получения списки регионов
    getRecordList: {
      datasetName: 'regionsWithFullPath',
      // требуемые аттрибуты записей (с какими аттрибутами нужен запись)
      // attributes: [''],
      // paginate server or local
      paginate: 'local', // local | server | storage
      // изначальное настройка для количество записей на странице
      pageSize: 10,
      // какой rest метод нужно вызывать для получния список регионов (пагинация локально)
      methodIfPaginateLocal: 'getRegionsFullPathKg',
      // rest метод для получения регионов с пагинацией
      methodIfPaginateServer: 'getRegionsFullPathKgWithPaginate',
      // rest метод для поиска региона
      methodOnSearch: 'getRegionsFullPathKgWithPaginate',
      // поля по которым разрешен поиск (текст или массив полей)
      searchColumn: 'regionFullPath'
    }
  },

  fields: [
    ...baseFields,
    {
      type: 'select',
      key: 'sRegionTypeId',
      hidden: true,
      foreign_crud: 's_region_type',
      foreign_dataset: 'regionTypes',
      foreign_label: 'name',
      foreign_value: 'id',
      foreign_attributes: ['name', 'id']
    },
    {
      type: 'autocomplete:preload',
      key: 'regionParentAutocomplete',
      hidden: true,
      foreign_crud: 's_region',
      foreign_dataset: 'regions',
      foreign_label: 'name',
      foreign_value: 'id',
      foreign_attributes: ['name', 'id'],
      foreign_attributes_share: [
        {
          sourceKey: 'id',
          destKey: 'parentId'
        }
      ]
    }
  ],
  fieldsForTable: [
    {
      key: 'regionFullPath',
      sortable: true
    },
    {
      key: 'regionIds',
      sortable: false,
      hidden: true
    },
    {
      key: 'regionTypeName',
      sortable: true,
      hidden: false
    }
  ]
}
