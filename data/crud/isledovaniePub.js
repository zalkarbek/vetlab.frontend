import baseApiRoutes from './baseApiRoutes'
import { isledovanieFields } from '../fields'
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
    ...baseApi
  },
  foreign: [],
  initConfig: {
    getRecordList: {
      datasetName: 'isledovanie',
      paginate: 'server',
      pageSize: 3,
      methodIfPaginateServer: 'allPaginate',
      searchColumn: ['vnytNapravlenieId'],
    },
  },

  actionButtons: {
    crudList: [
      {
        action: 'finish-isledovanie',
        actionMethod: 'openDialog',
        modalId: 'finish-isledovanie-dialog',
        label: 'isledovanie.label.finishIsledovanieButton',
        icon: 'fas fa-clipboard-check',
        variant: 'success',
      },
    ],
    crudForm: [],
  },

  modals: [
    {
      type: 'modal-form',
      id: 'finish-isledovanie-dialog',
      class: 'finish-isledovanie-dialog',
      headerClass: 'bg-success-light',
      title: 'isledovanie.label.finishIsledovanieTitle',
      // размер модального окна
      size: 'xl',
      okAction: 'isledovanieFinishOk',
      hiddenAction: 'isledovanieCancel',
      modalCrud: {
        ...isledovanieFields,
      },
    },
  ],

  fields: [],
  fieldsForTable: [
    {
      type: 'select',
      key: 'vnytNapravlenieId',
      label: 'isledovanie.label.nomerZakaza'
    },
    {
      type: 'select',
      key: 'probaCustomView',
      label: 'isledovanie.label.probaCustomView'
    },
    {
      type: 'text',
      key: 'isledovanieResultCustomView'
    },
    {
      type: 'text',
      key: 'status'
    },
  ]
}
