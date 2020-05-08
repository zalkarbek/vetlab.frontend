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
    ...baseApi
  },
  foreign: [
    {
      // тип вставки: array, object
      // array: вставка будет динамически добавляемой
      // object: вставка будет только одноразовый
      type: 'array',
      // название модели
      crudName: 'pos_material',
      // какие поля нужны для заполнения Массив название полей
      fields: []
    }
  ],
  fields: [
    {
      type: 'select',
      key: 'zapolnilPersonalId',
      foreign_crud: 'personal',
      foreign_dataset: 'personal',
      foreign_label: 'fullName',
      foreign_value: 'id',
      foreign_attributes: ['fullName', 'id'],
      disabled: true,
      hidden: true
    },
    {
      type: 'select',
      key: 'zapolnilDepartmentId',
      foreign_crud: 'department',
      foreign_dataset: 'departments',
      foreign_label: 'name',
      foreign_value: 'id',
      foreign_attributes: ['name', 'id'],
      disabled: true,
      hidden: true
    },
    {
      type: 'datetime',
      key: 'zapolnilDate',
      disabled: true,
      hidden: true
    },
    {
      type: 'select',
      key: 'prinyalPersonalId',
      foreign_crud: 'personal',
      foreign_dataset: 'personal',
      foreign_label: 'fullName',
      foreign_value: 'id',
      foreign_attributes: ['fullName', 'id'],
      disabled: true,
      hidden: true
    },
    {
      type: 'select',
      key: 'prinyalOtdelId',
      foreign_crud: 'otdel',
      foreign_dataset: 'otdel',
      foreign_label: 'name',
      foreign_value: 'id',
      foreign_attributes: ['name', 'id'],
      disabled: true,
      hidden: true
    },
    {
      type: 'datetime',
      key: 'prinyalDate',
      disabled: true,
      hidden: true
    },
    {
      type: 'select',
      key: 'otdelId',
      foreign_crud: 'otdel',
      foreign_dataset: 'otdel',
      foreign_label: 'name',
      foreign_value: 'id',
      foreign_attributes: ['name', 'id'],
      disabled: false,
      hidden: false
    },
    {
      type: 'json',
      key: 'regionJSON',
      json: [
        {
          type: 'text',
          key: 'regionId',
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
                destKey: 'id'
              },
              {
                sourceKey: 'regionIds',
                destKey: 'regionIds'
              }
            ]
          }
        }
      ]
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
      hidden: true
    },
    {
      type: 'datetime',
      key: 'dataZapolnenia',
      disabled: true,
      hidden: true
    },
    {
      type: 'select',
      key: 'opPokazatelId',
      foreign_crud: 's_pokazatel',
      foreign_dataset: 'pokazatel',
      foreign_label: 'name',
      foreign_value: 'id',
      foreign_attributes: ['name', 'id'],
      disabled: false,
      hidden: false
    },
    {
      type: 'json',
      key: 'probyNapravilJSON',
      json: [
        {
          type: 'text',
          key: 'fullName'
        },
        {
          type: 'input:mask',
          key: 'phone_1',
          // свойство маска ввода для облегчения некоторых шаблонных вводов
          mask: {
            // если name пустой то используется custom
            name: 'mask_phone',
            custom: null
          }
        }
      ]
    },
    {
      type: 'json',
      key: 'probyDostavilJSON',
      json: [
        {
          type: 'text',
          key: 'fullName'
        },
        {
          type: 'text',
          key: 'phone_1',
          mask: {
            // если name пустой то используется custom
            name: 'mask_phone',
            custom: null
          }
        }
      ]
    },
    {
      type: 'select',
      key: 'oldPrinyalPersonalId',
      foreign_crud: 'personal',
      foreign_dataset: 'personal',
      foreign_label: 'fullName',
      foreign_value: 'id',
      foreign_attributes: ['fullName', 'id'],
      disabled: true,
      hidden: true
    },
    {
      type: 'select',
      key: 'oldPrinyalOtdelId',
      foreign_crud: 'otdel',
      foreign_dataset: 'otdel',
      foreign_label: 'name',
      foreign_value: 'id',
      foreign_attributes: ['name', 'id'],
      disabled: true,
      hidden: true
    },
    // =========================== Поля Внутреннее направления ============== //

    // Дата и время отправки проб (дата)
    // отдел: общий
    {
      key: 'Дата и время отправки проб' // базовый
    },

    // Направляется в отдел (несколько значений)
    // отдел: общий
    {
      key: 'Направляется в отдел'
    },

    // Обьект исследования (одно зачение)
    // отдел: общий
    {
      key: 'Обьект исследования'
    },

    // Количество пробы цифра (одно зачение)
    // отдел: общий
    {
      key: 'Количество пробы'
    },

    // Место отбора проб (адрес регион)
    // отдел: общий
    {
      key: 'Место отбора проб'
    },

    // Дата дегельминтизации животного (дата)
    // отдел: паразитология
    {
      type: 'date',
      key: 'Дата дегельминтизации животного'
    },

    // Вид антигельминтика (несколько значений)
    // отдел: паразитология
    {
      type: 'select',
      key: 'Вид антигельминтика'
    },

    // Дата лечения животного
    // отдел: бактериология
    {
      type: 'select',
      key: 'Дата лечения животного'
    },

    // ================ БАКТЕРИОЛОГИЯ ==================//
    // Вид антибиотика (Какой антибиотик использован при лечении) (несколько значений)
    // отдел: бактериология
    {
      type: 'select',
      key: 'Вид антибиотика'
    },

    // Дата обработки ( дата проведения дезинфекции и.т.д )
    // отдел: бактериология
    {
      type: 'date',
      key: 'Дата обработки'
    },

    // Вид дезинфектанта (несколько значений)
    // отдел: бактериология
    {
      type: 'select',
      key: 'Вид дезинфектанта'
    },
    // ================ БАКТЕРИОЛОГИЯ ==================//

    // ================ СЕРОЛОГИЯ, ВИРУСОЛОГИЯ ==================//
    // Дата вакцинации животного (дата)
    // отдел: серология, вирусология
    {
      key: 'Дата вакцинации животного'
    },
    // Вид вакцины (несколько значений)
    // отдел: серология, вирусология
    {
      key: 'Вид вакцины'
    },
    // ================ СЕРОЛОГИЯ, ВИРУСОЛОГИЯ ==================//

    // Определяемые показатели (несколько значений)
    // отдел: общий
    {
      type: 'multiselect',
      key: 'Определяемые показатели'
    },

    // Исследования проводятся (одно значение)
    // отдел: общий
    {
      type: 'select',
      key: 'Исследования проводятся' // Первично, Вторично, Не применимо
    },

    // Пробу принял (ФИО сотрудника) (JSON значение)
    // отдел: общий
    {
      key: 'Пробу принял'
    },

    // Пробу направил (ФИО сотрудника) (JSON значение)
    // отдел: общий
    {
      key: 'Пробу направил'
    },

    // ========== <<< Информация о пробе >>> =========== //

    // Дата и время приема пробы (одно значение)
    // отдел: общий
    {
      key: 'Дата и время приема пробы'
    },

    // Соответствие внешнего вида пробы
    // отдел: общий
    {
      key: 'Соответствие внешнего вида пробы'
    }
  ]
}
