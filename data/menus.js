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
    type: 'children',
    class: '',
    icon: '',
    active: false,
    children: [
      {
        _t: 'menu.personal.index',
        text: 'Список Персоналов',
        class: '',
        icon: '',
        active: false,
        to: '/admin/personal/personal-index'
      },
      {
        _t: 'menu.personal.add',
        text: 'Добавить персонал',
        class: '',
        icon: '',
        active: false,
        to: '/admin/personal/personal-create'
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
