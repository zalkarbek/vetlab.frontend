export default [
  {
    _t: 'menu.home',
    text: 'Главная',
    type: 'single',
    class: '',
    icon: '',
    active: false,
    to: '/'
  },
  {
    _t: 'menu.admin',
    text: 'Администратор',
    type: 'flex',
    class: '',
    icon: '',
    active: false,
    children: [
      {
        class: '',
        flex: [
          {
            _t: 'menu.spravka',
            text: 'Справочник',
            class: '',
            items: [
              {
                _t: 'menu.pokazatel.index',
                text: 'определяемый показатель',
                class: '',
                icon: '',
                active: false,
                to: '/admin/pokazatel'
              },
              {
                _t: 'menu.metod.index',
                text: 'метод исследование',
                class: '',
                icon: '',
                active: false,
                to: '/admin/metod'
              },
              {
                _t: 'menu.material_type.index',
                text: 'тип материалов',
                class: '',
                icon: '',
                active: false,
                to: '/admin/material-type'
              },
              {
                _t: 'menu.material_animal_type.index',
                text: 'вид животных',
                class: '',
                icon: '',
                active: false,
                to: '/admin/material-animal-type'
              },
              {
                _t: 'menu.bolezn.index',
                text: 'болезни',
                class: '',
                icon: '',
                active: false,
                to: '/admin/bolezn'
              },
              {
                _t: 'menu.doljnost.index',
                text: 'должности',
                class: '',
                icon: '',
                active: false,
                to: '/admin/doljnost'
              },
              {
                _t: 'menu.material.index',
                text: 'материалы',
                class: '',
                icon: '',
                active: false,
                to: '/admin/material'
              },
              {
                _t: 'menu.personal.index',
                text: 'персонал',
                class: '',
                icon: '',
                active: false,
                to: '/admin/personal'
              },
              {
                _t: 'menu.mera.index',
                text: 'меры',
                class: '',
                icon: '',
                active: false,
                to: '/admin/mera'
              },
              {
                _t: 'menu.otdelenia.index',
                text: 'название отделении',
                class: '',
                icon: '',
                active: false,
                to: '/admin/otdelenia'
              },
              {
                _t: 'menu.region_type.index',
                text: 'типы регионов',
                class: '',
                icon: '',
                active: false,
                to: '/admin/region-type'
              },
              {
                _t: 'menu.regions.index',
                text: 'регионы',
                class: '',
                icon: '',
                active: false,
                to: '/admin/regions'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    _t: 'menu.direction',
    text: 'Направлении',
    type: 'single',
    class: '',
    icon: '',
    active: false,
    to: '/'
  },
  {
    _t: 'menu.departments',
    text: 'Отделения',
    type: 'flex',
    class: '',
    icon: '',
    active: false,
    children: [
      {
        class: '',
        flex: [
          {
            _t: 'departments.epidemiology',
            text: 'Эпидемиология',
            class: '',
            items: [
              {
                _t: 'menu.direction',
                text: 'Направление',
                class: '',
                icon: '',
                to: '/'
              },
              {
                _t: 'menu.reportsResult',
                text: 'Заключение',
                class: '',
                icon: '',
                to: '/'
              }
            ]
          },
          {
            _t: 'departments.bacteriology',
            text: 'Бактериология',
            class: 'mg-t-20',
            items: [
              {
                _t: 'menu.direction',
                text: 'Направление',
                class: '',
                icon: '',
                to: '/'
              },
              {
                _t: 'menu.reportsResult',
                text: 'Заключение',
                class: '',
                icon: '',
                to: '/'
              }
            ]
          }
        ]
      }
    ]
  },
  {
    _t: 'menu.reports',
    text: 'Отчеты',
    type: 'children',
    class: '',
    icon: '',
    active: false,
    children: [
      {
        _t: 'menu.reportPlanOfRegion',
        text: 'Планы по регионам',
        class: '',
        icon: '',
        active: false,
        to: '/reports/plan'
      },
      {
        _t: 'menu.form4Tiny',
        text: 'Форма №4(Компакт)',
        class: '',
        icon: '',
        active: false,
        to: '/reports/form4Tiny'
      }
    ]
  },
  {
    _t: 'menu.news',
    text: 'Новости',
    type: 'single',
    class: '',
    icon: '',
    active: false,
    to: '/'
  },
  {
    _t: 'menu.workers',
    text: 'Сотрудники',
    type: 'single',
    class: '',
    icon: '',
    active: false,
    to: '/'
  },
  {
    _t: 'menu.contacts',
    text: 'Контакты',
    type: 'single',
    class: '',
    icon: '',
    active: false,
    to: '/'
  }
  // {
  //   _t: 'menu.home',
  //   type: 'children',
  //   class: '',
  //   icon: 'fal fa-home',
  //   active: false,
  //   children: [
  //     {
  //       _t: 'menu.home',
  //       class: '',
  //       icon: 'fal fa-home',
  //       active: false,
  //       to: { name: 'home' }
  //     }
  //   ]
  // }
]
