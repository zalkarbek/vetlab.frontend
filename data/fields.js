const otdelFields = [
  {
    name: 'паразитология',
    key: 'parasitology',
    fields: [
      // Дата дегельминтизации животного (дата)
      // отдел: паразитология
      {
        type: 'date',
        key: 'dateDeworming',
        disabled: false,
        hidden: false,
      },
      // Вид антигельминтика (несколько значений)
      // отдел: паразитология
      {
        type: 'select-multi',
        key: 'anthelminticTypeJSON',
        foreign_crud: 's_preparat',
        foreign_dataset: 'preparat',
        foreign_label: 'name',
        foreign_value: 'name',
        foreign_attributes: ['name', 'id'],
        disabled: false,
        hidden: false,
      },
    ],
  },

  {
    name: 'бактериология',
    key: 'bacteriology',
    fields: [
      // ================ БАКТЕРИОЛОГИЯ ==================//
      // Дата лечения животного (дата)
      // отдел: бактериология
      {
        type: 'date',
        key: 'dateLechenia',
        disabled: false,
        hidden: false,
      },
      // Вид антибиотика (Какой антибиотик использован при лечении) (несколько значений)
      // отдел: бактериология
      {
        type: 'select-multi',
        key: 'antibioticTypeJSON',
        foreign_crud: 's_preparat',
        foreign_dataset: 'preparat',
        foreign_label: 'name',
        foreign_value: 'name',
        foreign_attributes: ['name', 'id'],
        disabled: false,
        hidden: false,
      },

      // Дата обработки ( дата проведения дезинфекции и.т.д )
      // отдел: бактериология
      {
        type: 'date',
        key: 'dateObrabotki',
      },

      // Вид дезинфектанта (несколько значений)
      // отдел: бактериология
      {
        type: 'select-multi',
        key: 'disinfectantTypeJSON',
        foreign_crud: 's_preparat',
        foreign_dataset: 'preparat',
        foreign_label: 'name',
        foreign_value: 'name',
        foreign_attributes: ['name', 'id'],
        disabled: false,
        hidden: false,
      },
      // ================ БАКТЕРИОЛОГИЯ ==================//
    ],
  },

  {
    name: 'серология',
    key: 'serology',
    fields: [
      // ================ СЕРОЛОГИЯ, ВИРУСОЛОГИЯ ==================//
      // Дата вакцинации животного (дата)
      // отдел: серология, вирусология
      {
        type: 'date',
        key: 'dateVaccination',
      },

      // Вид вакцины (несколько значений)
      // отдел: серология, вирусология
      {
        type: 'select-multi',
        key: 'vaccineTypeJSON',
        foreign_crud: 's_preparat',
        foreign_dataset: 'preparat',
        foreign_label: 'name',
        foreign_value: 'name',
        foreign_attributes: ['name', 'id'],
        disabled: false,
        hidden: false,
      },
      // ================ СЕРОЛОГИЯ, ВИРУСОЛОГИЯ ==================//
    ],
  },
]

const vnytNapravlenieFields = {
  fields: [
    // =========================== Поля Внутреннее направления ============== //
    // // Место отбора проб (адрес регион)
    // // отдел: общий
    // {
    //   key: 'Место отбора проб'
    // },

    // Дата и время отправки проб (дата)
    // отдел: общий
    {
      type: 'datetime',
      key: 'dateVremyaOtpravki',
      disabled: false,
      hidden: false,
    },

    // Направляется в отдел (одно значение)
    // отдел: общий
    {
      type: 'select',
      key: 'napravlenOtdelId',
      foreign_crud: 'otdel',
      foreign_dataset: 'otdel',
      foreign_label: 'name',
      foreign_value: 'id',
      foreign_attributes: ['name', 'id'],
      disabled: false,
      hidden: false,
    },

    // Обьект исследования (одно зачение)
    // отдел: общий
    {
      type: 'select:preload',
      key: 'posMaterialId',
      disabled: false,
      hidden: false,
    },

    // Количество пробы цифра (одно зачение)
    // отдел: общий
    {
      type: 'number',
      key: 'postMaterialCount',
      disabled: false,
      hidden: false,
    },

    // Определяемые показатели (несколько значений)
    // отдел: общий
    {
      type: 'select-multi',
      key: 'opPokazatelIdJSON',
      foreign_crud: 's_pokazatel',
      foreign_dataset: 'pokazatel',
      foreign_label: 'name',
      foreign_value: 'id',
      foreign_attributes: ['name', 'id'],
      disabled: false,
      hidden: false,
      col: {
        md: 8,
        lg: 6
      }
    },

    // Исследования проводятся (одно значение)
    // отдел: общий
    {
      type: 'select-multi:own',
      key: 'isledovanieProvoditsaJSON',
      foreign_label: 'label',
      foreign_value: 'value',
      foreign_values: [
        {
          label: 'form.label.primary',
          value: 'primary',
        },
        {
          label: 'form.label.secondary',
          value: 'secondary',
        },
        {
          label: 'form.label.notApply',
          value: 'notApply',
        },
        {
          label: 'form.label.beforeProcess',
          value: 'beforeProcess',
        },
        {
          label: 'form.label.afterProcess',
          value: 'afterProcess',
        },
      ],
    },

    // Соответствие внешнего вида пробы
    // отдел: общий
    {
      type: 'checkbox',
      key: 'posMaterialCheckVid',
      checkbox_value: true,
      checkbox_unchecked_value: false,
      checkbox_label: 'form.label.checkVid',
    },

    // Соответствие своему образу
    // отдел: общий
    {
      type: 'checkbox',
      key: 'postMaterialCheck',
      checkbox_value: true,
      checkbox_unchecked_value: false,
      checkbox_label: 'form.label.materialCheck',
    },

    // // Пробу принял (ФИО сотрудника) (JSON значение)
    // // отдел: общий
    // {
    //   key: 'Пробу принял'
    // },
    //
    // // Пробу направил (ФИО сотрудника) (JSON значение)
    // // отдел: общий
    // {
    //   key: 'Пробу направил'
    // },

    // ========== <<< Информация о пробе >>> =========== //

    // // Дата и время приема пробы (одно значение)
    // // отдел: общий
    // {
    //   key: 'Дата и время приема пробы'
    // }
  ],
}

export { vnytNapravlenieFields, otdelFields }
