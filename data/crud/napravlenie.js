import baseApiRoutes from './baseApiRoutes'
// Имя модели к которому привязан этот API
const restName = 'napravlenie'
// Превикс API маршрута
const routePrefix = 'napravlenie'
// Имя набор данных которые хранится в vuex или локально в переменной localDataset
const datasetName = 'napravlenie'

// базовые машрутры для всех api
const baseApi = baseApiRoutes({ routePrefix })

export default {
  restName,
  routePrefix,
  datasetName,
  rest: {
    ...baseApi,
    getNapravlenieWithPaginateAndVnyt: {
      url: `/api/v1/${routePrefix}/pos/withPaginateAndVnyt`,
      method: 'GET',
    },
    getNapravlenieWithPaginate: {
      url: `/api/v1/${routePrefix}/pos/withPaginate`,
      method: 'GET',
    },
    getNapravlenie: {
      url: `/api/v1/${routePrefix}/pos`,
      method: 'GET',
    },
    sendToOtdel: {
      method: 'POST',
      url: `/api/v1/${routePrefix}/vnyt/sendToOtdel`,
    },
  },
  initConfig: {
    getRecordList: {
      datasetName: 'napravlenie',
      // требуемые аттрибуты записей (с какими аттрибутами нужен запись)
      // attributes: [''],
      // paginate server or local
      paginate: 'server', // local | server | storage | local
      // изначальное настройка для количество записей на странице
      pageSize: 10,
      // какой rest метод нужно вызывать для получния список регионов (пагинация локально)
      methodIfPaginateLocal: 'getNapravlenie',
      // rest метод для получения регионов с пагинацией
      methodIfPaginateServer: 'getNapravlenieWithPaginateAndVnyt',
      // rest метод для поиска региона
      methodOnSearch: 'getNapravlenieWithPaginateAndVnyt',
      // поля по которым разрешен поиск (текст или массив полей)
      searchColumn: ['id'],
    },
    getEditRecord: {
      crud: 'napravlenie',
      method: 'id',
      requireAttrs: ['id'],
    },
  },
  foreign: [
    {
      // тип вставки: array, object
      // array: вставка будет динамически добавляемой
      // object: вставка будет только одноразовый
      type: 'array',
      // название модели
      crudName: 'pos_material',
      datasetName: 'posMaterials',
      // какие поля нужны для заполнения Массив название полей
      fields: [],
    },
  ],
  fields: [
    {
      type: 'number',
      key: 'id',
      label: 'napravlenieEpic.label.nomerNapravlenia',
      hidden: false,
      disabled: true
    },
    {
      type: 'select',
      key: 'otdelId',
      placeholder: 'form.label.otdelId',
      col: {
        md: 5,
        lg: 5,
        xl: 3
      },
      label: 'form.label.toOtdel',
      foreign_crud: 'otdel',
      foreign_dataset: 'otdel',
      foreign_label: 'name',
      foreign_value: 'id',
      foreign_attributes: ['name', 'id'],
      disabled: false,
      hidden: false,
    },
    {
      type: 'json',
      key: 'regionJSON',
      json: [
        {
          type: 'number',
          key: 'id',
          // не показывает на поле ввода
          disabled: true,
          // скрывает на поле показа списка
          hidden: true,
        },
        {
          type: 'autocomplete',
          key: 'regionFullPath',
          label: 's_region.label.napravlenieRegionFullPath',
          // col настраивает макет сетки ввода (ширина поля ввода) md, sm, xs, lg
          col: {
            md: 6,
            lg: 6,
            xl: 3
          },
          // api модель от которой нужны данные автозаполнения
          foreign_crud: 's_region',
          // название метода к которому мы обращаемся к api
          foreign_crud_method: 'getRegionsFullPathKg',
          // название датасета в котором сохранены данные модели
          foreign_dataset: 'regionsFullPath',
          // название поля которое показывается при поиске
          foreign_label: 'regionFullPath',
          // название поле значения при выборе
          foreign_value: 'id',
          // атрибуты колонок которые нужны от api моделя
          foreign_attributes: ['regionFullPath', 'id'],
          // событие при выборе из списка значений модели Event: on_select
          foreign_on_select: {
            // api модель от которой нужны данные автозаполнения при событии on_select
            foreign_crud: 's_region',
            // вызывает этот модели
            foreign_crud_method: 'getRegionFullPathKgById',
            // показываемое поле
            foreign_label: 'regionFullPath',
            // поле значения
            foreign_value: 'regionFullPath',
            // какое значние из поля свойств нужно отправить к серверу для получения данных из api
            foreign_request_props: ['id'],
            // атрибуты значении которые нужны
            foreign_attributes: ['id', 'regionFullPath', 'regionIds'],
            // переназначение массив свойств родительского свойства или создание новых свойств данных (массив)
            foreign_attributes_share: [
              {
                // изначальное название свойства
                sourceKey: 'id',
                // новое название свойства
                destKey: 'id',
              },
              {
                sourceKey: 'regionIds',
                destKey: 'regionIds',
              },
            ],
          },
        },
      ],
    },
    {
      type: 'text',
      key: 'probaCustomView',
      disabled: true
    },
    {
      type: 'select',
      key: 'perenapravilPersonalId',
      foreign_crud: 'personal',
      foreign_dataset: 'personal',
      foreign_label: 'fullName',
      foreign_value: 'id',
      foreign_attributes: ['fullName', 'id'],
      disabled: true,
      hidden: true,
    },
    {
      type: 'datetime',
      key: 'dataZapolnenia',
      disabled: true,
      hidden: true,
    },
    {
      type: 'multi-select-tag',
      key: 'opPokazatelJSON',
      foreign_crud: 's_pokazatel',
      foreign_dataset: 'pokazatel',
      foreign_label: 'name',
      foreign_value: 'name',
      foreign_attributes: ['name', 'id'],
      // col настраивает макет сетки ввода (ширина поля ввода) md, sm, xs, lg
      col: {
        md: 11,
        lg: 9,
        xl: 5
      },
    },
    {
      type: 'json',
      key: 'probyNapravilJSON',
      json: [
        {
          type: 'text',
          key: 'fullName',
          label: 'probyNapravil.label.fullName',
          col: {
            md: 5,
            lg: 4,
            xl: 3
          }
        },
        {
          type: 'input_mask',
          key: 'phone_1',
          label: 'probyNapravil.label.phone_1',
          col: {
            md: 4,
            lg: 4,
            xl: 2
          },
          // свойство маска ввода для облегчения некоторых шаблонных вводов
          mask: {
            // если name пустой то используется custom
            name: 'mask_phone',
            custom: null,
          },
        },
      ],
    },
    {
      type: 'json',
      key: 'probyDostavilJSON',
      json: [
        {
          type: 'text',
          key: 'fullName',
          label: 'probyDostavil.label.fullName',
          col: {
            md: 5,
            lg: 4,
            xl: 3
          },
        },
        {
          type: 'input_mask',
          key: 'phone_1',
          label: 'probyDostavil.label.phone_1',
          col: {
            md: 4,
            lg: 4,
            xl: 2
          },
          mask: {
            // если name пустой то используется custom
            name: 'mask_phone',
            custom: null,
          },
        },
      ],
    },
  ],
}
