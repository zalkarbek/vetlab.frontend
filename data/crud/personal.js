import baseApiRoutes from './baseApiRoutes'
// Имя модели к которому привязан этот API
const restName = 'personal'
// Превикс API маршрута
const routePrefix = 'personal'
// Имя набор данных которые хранится в vuex
const datasetName = 'personal'
// базовые машрутры для всех api
const baseApi = baseApiRoutes({ routePrefix })

export default {
  restName,
  routePrefix,
  datasetName,
  rest: {
    ...baseApi
  },
  foreign: [
    {
      type: 'object',
      crudName: 'user',
      // какие поля нужны для заполнения Массив название полей
      fields: []
    }
  ],
  fields: [
    {
      type: 'text',
      key: 'firstName',
      label: 'personal.label.firstName',
      hidden: true
    },

    {
      type: 'text',
      key: 'lastName',
      label: 'personal.label.lastName',
      hidden: true
    },

    {
      type: 'text',
      key: 'fullName',
      label: 'personal.label.fullName',
      disabled: true,
      hidden: false
    },

    {
      type: 'text',
      key: 'pol'
    },

    {
      type: 'json',
      key: 'personalDataJSON',
      label: 'personal.label.personalDataJSON',
      json: [
        {
          type: 'text',
          key: 'address'
        },
        {
          type: 'text',
          key: 'phone_1'
        }
      ]
    },

    {
      type: 'json',
      key: 'addressLiveRegionJSON',
      label: 'personal.label.addressLiveRegionJSON',
      json: [
        {
          type: 'text',
          key: 'id',
          // не показывает на поле ввода
          disabled: true,
          // скрывает на поле показа списка
          hidden: true
        },
        {
          type: 'text',
          key: 'regionIds',
          // не показывает на поле ввода
          disabled: true,
          // скрывает на поле показа списка
          hidden: true
        },
        {
          type: 'autocomplete',
          key: 'regionFullPath',
          // col настраивает макет сетки ввода (ширина поля ввода) md, sm, xs, lg
          col: {
            md: 6,
            lg: 4
          },
          // api модель от которой нужны данные автозаполнения
          foreign_crud: 's_region',
          // название датасета в котором сохранены данные модели
          foreign_dataset: 'regionsFullPath',
          // название метода к которому мы обращаемся к api
          foreign_crud_method: 'getRegionsFullPathKg',
          // название поля которое показывается при поиске
          foreign_label: 'regionFullPath',
          // название поле значения при выборе
          foreign_value: 'id',
          // атрибуты колонок которые нужны от api моделя
          foreign_attributes: ['id', 'regionFullPath', 'regionIds'],
          // событие при выборе из списка значений модели Event: on_select
          foreign_attributes_share: [
            {
              // изначальное название свойства
              sourceKey: 'id',
              // новое название свойства
              destKey: 'id'
            },
            {
              sourceKey: 'regionIds',
              destKey: 'regionIds'
            },
            {
              sourceKey: 'regionFullPath',
              destKey: 'regionFullPath'
            }
          ]
        }
      ]
    },

    {
      type: 'json',
      key: 'addressBirthRegionJSON',
      label: 'personal.label.addressBirthRegionJSON',
      json: [
        {
          type: 'text',
          key: 'id',
          // не показывает на поле ввода
          disabled: true,
          // скрывает на поле показа списка
          hidden: true
        },
        {
          type: 'text',
          key: 'regionIds',
          // не показывает на поле ввода
          disabled: true,
          // скрывает на поле показа списка
          hidden: true
        },
        {
          type: 'autocomplete',
          key: 'regionFullPath',
          // col настраивает макет сетки ввода (ширина поля ввода) md, sm, xs, lg
          col: {
            md: 6,
            lg: 4
          },
          // api модель от которой нужны данные автозаполнения
          foreign_crud: 's_region',
          // название датасета в котором сохранены данные модели
          foreign_dataset: 'regionsFullPath',
          // название метода к которому мы обращаемся к api
          foreign_crud_method: 'getRegionsFullPathKg',
          // название поля которое показывается при поиске
          foreign_label: 'regionFullPath',
          // название поле значения при выборе
          foreign_value: 'id',
          // атрибуты колонок которые нужны от api моделя
          foreign_attributes: ['id', 'regionFullPath', 'regionIds'],
          // событие при выборе из списка значений модели Event: on_select
          foreign_attributes_share: [
            {
              // изначальное название свойства
              sourceKey: 'id',
              // новое название свойства
              destKey: 'id'
            },
            {
              sourceKey: 'regionIds',
              destKey: 'regionIds'
            },
            {
              sourceKey: 'regionFullPath',
              destKey: 'regionFullPath'
            }
          ]
        }
      ]
    },

    {
      type: 'select',
      key: 'sDoljnostId',
      label: 'personal.label.sDoljnostId',
      foreign_crud: 's_doljnost',
      foreign_dataset: 'doljnost',
      foreign_label: 'name',
      foreign_value: 'id',
      foreign_attributes: ['name', 'id'],
      disabled: false,
      hidden: false
    },

    {
      type: 'select',
      key: 'otdelId',
      label: 'personal.label.otdelId',
      foreign_crud: 'otdel',
      foreign_dataset: 'otdel',
      foreign_label: 'name',
      foreign_value: 'id',
      foreign_attributes: ['name', 'id'],
      disabled: false,
      hidden: false
    },

    {
      type: 'select',
      key: 'subOtdelId',
      label: 'personal.label.subOtdel',
      foreign_crud: 'subOtdel',
      foreign_dataset: 'subOtdel',
      foreign_label: 'name',
      foreign_value: 'id',
      foreign_attributes: ['name', 'id'],
      disabled: false,
      hidden: false
    }
  ]
}
