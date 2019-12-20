export default [
  {
    _t: 'menu.home',
    type: 'single',
    class: '',
    icon: '',
    active: false,
    to: { name: 'index' }
  },
  {
    _t: 'menu.direction',
    type: 'single',
    class: '',
    icon: '',
    active: false,
    to: { name: 'direction' }
  },
  {
    _t: 'menu.departments',
    type: 'flex',
    class: '',
    icon: '',
    active: false,
    to: { name: 'home' },
    children: [
      {
        class: '',
        flex: [
          {
            _t: 'departments.epidemiology',
            class: '',
            text: 'title',
            items: [
              {
                _t: 'menu.direction',
                class: '',
                icon: ''
              },
              {
                _t: 'menu.reportsResult',
                class: '',
                icon: ''
              }
            ]
          },
          {
            _t: 'departments.bacteriology',
            class: 'mg-t-20',
            items: [
              {
                _t: 'menu.direction',
                class: '',
                icon: ''
              },
              {
                _t: 'menu.reportsResult',
                class: '',
                icon: ''
              }
            ]
          }
        ]
      }
    ]
  },
  {
    _t: 'menu.reports',
    type: 'single',
    class: '',
    icon: '',
    active: false,
    to: { name: 'reports' }
  },
  {
    _t: 'menu.news',
    type: 'single',
    class: '',
    icon: '',
    active: false,
    to: { name: 'news' }
  },
  {
    _t: 'menu.workers',
    type: 'single',
    class: '',
    icon: '',
    active: false,
    to: { name: 'workers' }
  },
  {
    _t: 'menu.contacts',
    type: 'single',
    class: '',
    icon: '',
    active: false,
    to: { name: 'contacts' }
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
