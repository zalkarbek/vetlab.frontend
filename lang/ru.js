export default {
  welcome: 'Добро пожаловать',
  list: 'список {name}',
  button: {
    yes: 'Да',
    cancel: 'Отмена',
  },
  dialog: {
    confirm: {
      delete: {
        title: '',
        message: 'Вы действительно хотите удалить элемент ?',
      },
    },
  },
  vet: {
    department: {
      d_2_reportHeaderKGText: `ТУШТУК РЕГИОН БОЮНЧА
                              ВЕТЕРИНАРДЫК ДИАГНОСТИКА ЖАНА
                              ЭКСПЕРТИЗА БОРБОРУ`,
      d_2_reportHeaderRUText: `ЦЕНТР ВЕТЕРИНАРНОЙ ДИАГНОСТИКИ И ЭКСПЕРТИЗЫ
                              ПО ЮЖНОМУ РЕГИОНУ`
    },
    GosKGText: `КЫРГЫЗ РЕСПУБЛИКАСЫНЫН ӨКМӨТҮНӨ
                        КАРАШТУУ ВЕТЕРИНАРДЫК ЖАНА
                        ФИТОСАНИТАРДЫК КООПСУЗДУК
                        БОЮНЧА МАМЛЕКЕТТИК ИНСПЕКЦИЯСЫ`,
    GosRUText: `ГОСУДАРСТВЕННАЯ ИНСПЕКЦИЯ ПО ВЕТЕРИНАРНОЙ
                        И ФИТОСАНИТАРНОЙ БЕЗОПАСНОСТИ ПРИ ПРАВИТЕЛЬСТВЕ
                        КЫРГЫЗСКОЙ РЕСПУБЛИКИ`,

    svdieReportHeaderKGText: `ТУШТУК РЕГИОН БОЮНЧА
                              ВЕТЕРИНАРДЫК ДИАГНОСТИКА ЖАНА
                              ЭКСПЕРТИЗА БОРБОРУ`,
    svdieReportHeaderRUText: `ЦЕНТР ВЕТЕРИНАРНОЙ ДИАГНОСТИКИ И ЭКСПЕРТИЗЫ
                              ПО ЮЖНОМУ РЕГИОНУ`,

    protocolTest: 'Протокол испытаний',
    protocolTest2: 'Протокол исследований',
    testObject: 'Обьект испытаний',
    testObject2: 'Наименование проб',
    materialCount: 'Количество образцов',
    materialCount2: 'Количество проб',
    customer: 'Заказчик',
    nomerZakaza: '№ Заказа',
    mestoOtbora: 'Место отбора проб',
    dataPostup: 'Дата поступления образов',
    dataTimePostup: 'Дата и время поступления пробы',
    dataTimeOtbora: 'Дата и время отбора проб',
    dataProvedenia: 'Дата проведения испытаний',
    dataProvedenia2: 'Дата проведения исследований',
    proba: 'проба',
    regNomerProby: 'Регистрационный № пробы',
    pokazatelEd: 'Определяемый показатель, ед. изм.',
    pokazatel: 'Определяемый показатель',
    resultatIsledovanie: 'Результаты испытаний',
    result: 'Результат',
    pdk: 'ПДК',
    resultIndex: 'Порядковый номер',
    gosStandard: 'Обозначение на методы испытаний',
    noteIsledovanie: 'Примечание/описание образца'
  },
  report: {
    protocol: {
      senior: 'Старший специалист',
      chemist: 'Химик',
      laborant: 'Лаборант',
      headDescTitle: 'Лицо утвердившее протокол испытаний',
      headOPB: 'Заведующий ОПБ',
      note: 'Примечание',
      footerNoteOpb: `результаты испытаний относятся только к образцам, представленным для испытаний.
        Размножение настоящего протокола, без разрешения ОПБ запрещается.`,
      footerNoteOther: `Результаты исследований распространяются только на те образцы которые представлены 
      и подвергнуты исследованию настоящий протокол исследований не может быть частично или полностью воспроизведен 
      (скопирован или перепечатан) без письменного разрешения отдела вирусологии`,
      theEnd: 'Конец протокола испытаний',
      testPerformers: 'Исполнители испытаний',
      testPerformers2: 'Исследование проводил/и'
    }
  },
  form: {
    add: 'добавление',
    save: 'сохранение',
    clear: 'очистить',
    update: 'обновить',

    field: {
      id: 'id',
    },
    label: {
      napravlenieZakazNomer: '№ заказа',
      otdelDataJSON: 'Дополнительная информация о отделе',
      fax: 'Факс',
      postcode: 'Почтовый индекс',
      fault: 'Погрешность',
      from: 'от',
      to: 'до',
      materialJSON: 'Исследуемые материалы',
      patronymicName: 'Отчество',
      equal: 'равно',
      smaller: 'меньше',
      more: 'больше',
      range: 'диапазон',
      rangeMin: 'мин. значение',
      rangeMax: 'макс. значение',
      notLess: 'не менее',
      notMore: 'не более',
      sMaterialAnimalTypeJSON: 'Типы животных',
      materialTypeJSON: 'Типы материалов',
      pdkMera: 'ПДК мера',
      pdkType: 'ПДК тип',
      pdkJSON: 'ПДК значение',
      pdk: 'ПДК значение',
      sPokazatelId: 'Показатель',
      headPersonalId: 'Заведующий отдела',
      pieces: 'Штук',
      probs: 'Проб',
      sendPosMaterials: 'Обьекты исследования',
      posMaterials: 'Обьекты исследования',
      objectIsledovanie: 'Обьект исследования',
      isledovanieResultCustomView: 'Результат исследованиий',
      deselectItem: 'Исключить из выбора',
      addNewPokazatel: 'Добавить новый показатель',
      selectItem: 'Выбрать',
      selectedItem: 'Выбран',
      rejectionDescription: 'Причина отклонения',
      gosStandard: 'ГОС стандарт (НД)',
      boolean_true: 'Да',
      boolean_false: 'Нет',
      description: 'Примечание',
      pokazatel: 'Показатель',
      yes: 'Да',
      no: 'Нет',
      status: 'Статус',
      male: 'Муж',
      female: 'Жен',
      pol: 'Пол',
      add: 'добавить',
      save: 'сохранение',
      clear: 'очистить',
      update: 'обновить',
      name: 'Название',
      email: 'Электронная почта',
      password: 'Пароль',
      fullName: 'ФИО',
      shortName: 'короткое навание',
      i18n: 'ключ для локализации',
      sort: 'сортировка',
      search: 'поиск',
      search_on: 'поиск по',
      filter: 'фильтр',
      filter_on: 'фильтр по',
      per_page: 'количество',
      address: 'Адрес',
      phone_1: 'телефон 1',
      phone_2: 'телефон 2',
      phone_3: 'телефон 3',
      phone_4: 'телефон 4',
      phone_5: 'телефон 5',
      phone_6: 'телефон 6',
      regionFullText: 'Полный адрес',
      sMaterialTypeId: 'Вид материала',
      sMaterialAnimalTypeId: 'вид животного',
      sMaterialColor: 'цвет материала',
      sRegionTypeId: 'вид региона',
      regionParentAutocomplete: 'входит в состав',
      departmentId: 'департамент',
      planCount: 'количество по плану',
      planKv: 'квартал',
      planYear: 'год плана',
      regionJSON: 'Адрес',
      regionFullPath: 'полный адрес',
      departmentDataJSON: 'Дополнительная информация о департамента',
      sOtdeleniaId: 'Принадлежит к группе отдела',
      otdelId: 'Отдел',
      toOtdel: 'Направляется в отдел',
      opPokazatelId: 'Определяемый показатель',
      opPokazatelShort: 'Опр показатели',
      opPokazatelJSON: 'Определяемые показатели',
      probyNapravilJSON: 'Пробу направил',
      probyDostavilJSON: 'Пробу доставил',
      ownerJSON: 'Владелец пробы',
      mestoOtboraRegionJSON: 'Место отбора пробы',
      kemOtobranJSON: 'Кем отобран',
      lechenieInfo: 'Сведение о лечении',
      sMaterialJSON: 'Проба материал',
      materialCount: 'Количество проб',
      sMeraId: 'Мера измерения',
      vozrast: 'Возраст животного',
      dateZabolivanie: 'Дата заболивания животного',
      dateZaboya: 'Дата забоя',
      dateOtbora: 'Дата отбора проб',
      dateVremyaOtbora: 'Дата и время отбора проб',
      dateDostavki: 'Дата доставки пробы',
      dateVremyaOtpravki: 'Дата и время доставки',
      napravlenOtdelId: 'Направляется в отдел',
      posMaterialId: 'Обьект исследования',
      postMaterialCount: 'Количество проб',
      isledovanieProvoditsaJSON: 'Исследование проводятся',
      posMaterialCheckVid: 'Соответствие внешнего вида',
      postMaterialCheck: 'Соответствует своему образу',
      dateDeworming: 'Дата дегельминтизации',
      anthelminticTypeJSON: 'Вид антигельминтика',
      dateLechenia: 'Дата лечения',
      antibioticTypeJSON: 'Вид антибиотика',
      dateObrabotki: 'Дата обработки',
      disinfectantTypeJSON: 'Вид дезинфектанта',
      dateVaccination: 'Дата вакцинации животного',
      vaccineTypeJSON: 'Вид вакцины',
      checkVid: 'Соответствует внешний вид',
      materialCheck: 'Соответствует своему образу',
      primary: 'Первичный',
      secondary: 'Вторичный',
      notApply: 'Не применимо',
      beforeProcess: 'До обработки',
      afterProcess: 'После обработки',
      napravlenieEpic: 'Поступившие направление',
      vnytNapravlenie: 'Отправленные направление',
      probaCustomView: 'Пробы',
      sendStatusCustomView: 'Отправил&Принял',
      posMaterialCustomView: 'Обьект исследования',
      vnytNapravlenieOptionalCustomView: 'Доп. данные',
      role_name: 'Название роли',
      role_key: 'Ключ на англ языке',
      role_priority: 'Приоритет',
      priority: 'Приоритет ролей в цифрах',
      role_desc: 'Описание',
      roles: 'Роли доступа',
    },
    placeholder: {
      napravlenieZakazNomer: '№ заказа',
      otdelDataJSON: 'Дополнительная информация о отделе',
      postcode: 'Почтовый индекс',
      fax: 'Факс',
      fault: 'Погрешность',
      materialJSON: 'Исследуемые материалы',
      patronymicName: 'Отчество',
      equal: 'равно',
      smaller: 'меньше',
      more: 'больше',
      range: 'диапазон',
      rangeMin: 'мин. значение',
      rangeMax: 'макс. значение',
      notLess: 'не менее',
      notMore: 'не более',
      sMaterialAnimalTypeJSON: 'Типы животных',
      materialTypeJSON: 'Типы материалов',
      pdkMera: 'ПДК мера',
      pdkType: 'ПДК тип',
      pdkJSON: 'ПДК значение',
      pdk: 'ПДК значение',
      sPokazatelId: 'Определяемый показатель',
      headPersonalId: 'ФИО зав. отдела',
      sendPosMaterials: 'Обьекты исследования',
      posMaterials: 'Обьекты исследования',
      roles: 'Роль доступа',
      sDoljnostId: 'Должность',
      subOtdelId: 'Под отдел',
      rejectionDescription: 'Поле написания причины отклонения',
      gosStandard: 'ГОС стандарт или НД документ',
      boolean_true: 'Да',
      boolean_false: 'Нет',
      description: 'Примечание',
      pokazatel: 'Показатель',
      name: 'название обьекта',
      fullName: 'ФИО',
      firstName: 'Имя',
      lastName: 'Фамилия',
      shortName: 'короткое название',
      i18n: 'ключ мультиязычности',
      sRegionTypeId: 'вид региона',
      sort: 'сортировка по выбранному поле',
      search: 'поле для поиска',
      search_on: 'поиск по',
      filter: 'поле для фильтра',
      filter_on: 'фильтр по',
      per_page: 'количество',
      address: 'адрес',
      phone_1: 'телефон 1',
      phone_2: 'телефон 2',
      phone_3: 'телефон 3',
      phone_4: 'телефон 4',
      phone_5: 'телефон 5',
      phone_6: 'телефон 6',
      sMaterialTypeId: 'вид матриала',
      sMaterialAnimalTypeId: '(КРС, МРС, собаки, кошки)',
      sMaterialColor: 'цвет матриала',
      departmentId: 'департамент',
      planCount: 'количество по плану',
      planKv: 'какой квартал',
      planYear: 'выберите год плана',
      regionJSON: 'регион обьекта',
      regionFullPath: 'полный адрес',
      departmentDataJSON: 'информация о департамента',
      sOtdeleniaId: 'название группы отдела',
      otdelId: 'выберите отдел',
      dateZabolivanie: 'Дата заболивания животного',
      dateZaboya: 'Дата забоя',
      dateOtbora: 'Дата отбора проб',
      dateVremyaOtbora: 'Дата и время отбора проб',
      dateDostavki: 'Дата доставки пробы',
      dateVremyaOtpravki: 'Дата и время доставки',
      napravlenOtdelId: 'Направляется в отдел',
      posMaterialId: 'Обьект исследования',
      postMaterialCount: 'Количество проб',
      isledovanieProvoditsaJSON: 'Исследование проводятся',
      posMaterialCheckVid: 'Соответствие внешнего вида',
      postMaterialCheck: 'Соответствует своему образу',
      dateDeworming: 'Дата дегельминтизации',
      anthelminticTypeJSON: 'Вид антигельминтика',
      dateLechenia: 'Дата лечения',
      antibioticTypeJSON: 'Вид антибиотика',
      dateObrabotki: 'Дата обработки',
      disinfectantTypeJSON: 'Вид дезинфектанта',
      dateVaccination: 'Дата вакцинации животного',
      vaccineTypeJSON: 'Вид вакцины',
      checkVid: 'Соответствует внешний вид',
      materialCheck: 'Соответствует своему образу',
      primary: 'Первичный',
      secondary: 'Вторичный',
      notApply: 'Не применимо',
      beforeProcess: 'До обработки',
      afterProcess: 'После обработки',
      role_name: 'Название роли',
      role_key: 'Ключ на англ языке',
      role_priority: 'Приоритет',
      priority: 'Приоритет ролей в цифрах',
      role_desc: 'Описание',
      yes: 'Да',
      no: 'Нет',
      status: 'Статус',
      male: 'Муж',
      female: 'Жен',
      pol: 'Пол',
      add: 'добавление',
      save: 'сохранение',
      clear: 'очистить',
      update: 'обновить',
      email: 'Электронная почта',
      password: 'Пароль',
      regionFullText: 'Полный адрес',
      regionParentAutocomplete: 'входит в состав',
      toOtdel: 'Направляется в отдел',
      opPokazatelId: 'Определяемый показатель',
      opPokazatelJSON: 'Определяемые показатели',
      probyNapravilJSON: 'Пробу направил',
      probyDostavilJSON: 'Пробу доставил',
      ownerJSON: 'Владелец пробы',
      mestoOtboraRegionJSON: 'Место отбора пробы',
      kemOtobranJSON: 'Кем отобран',
      lechenieInfo: 'Сведение о лечении',
      sMaterialJSON: 'Проба материал',
      materialCount: 'Количество проб',
      sMeraId: 'Мера измерения',
      vozrast: 'Возраст животного',
      napravlenieEpic: 'Поступившие направление',
      vnytNapravlenie: 'Отправленные направление',
      sendStatusCustomView: 'Отправил&Принял',
      posMaterialCustomView: 'Обьект исследования',
      vnytNapravlenieOptionalCustomView: 'Доп. данные',
    },
    description: {
      napravlenieZakazNomer: '№ заказа',
      otdelDataJSON: 'Дополнительная информация о отделе',
      postcode: 'Почтовый индекс',
      fax: 'Факс',
      fault: 'Погрешность',
      materialJSON: 'Исследуемые материалы',
      patronymicName: 'Отчество',
      equal: 'равно',
      smaller: 'меньше',
      more: 'больше',
      rangeMin: 'мин. значение',
      rangeMax: 'макс. значение',
      notLess: 'не менее',
      notMore: 'не более',
      sMaterialAnimalTypeJSON: 'Типы животных к ПДК',
      materialTypeJSON: 'Типы материалы относящийся к ПДК',
      pdkMera: 'ПДК мера',
      pdkType: 'Тип: не менее или не более',
      pdk: 'Предел допустимой нормы(ПДК)',
      pdkJSON: 'ПДК значение',
      sPokazatelId: 'Выберите определяемый показатель',
      headPersonalId: 'ФИО Заведующего отдела',
      sendPosMaterials: 'Обьекты исследования',
      roles: 'Роль доступа',
      sDoljnostId: 'Должность персонала',
      subOtdelId: 'Под отдел',
      rejectionDescription: 'Напишите по подробнее причину отклонения',
      fullName: 'полное имя отчество',
      boolean_true: 'Да',
      boolean_false: 'Нет',
      description: 'Примечание',
      pokazatel: 'Показатель',
      gosStandard: 'ГОС Стандарт или Нормативный документ',
      name: 'Название или наименование',
      shortName: 'Короткое название',
      firstName: 'Имя',
      lastName: 'Фамилия',
      sort: 'сортировка по выбранному поле',
      search: 'поле для поиска данных',
      search_on: 'поиск по выбранным полям',
      filter: 'фильтры по текущим данным',
      filter_on: 'фильтры по выбранным полям',
      per_page: 'количество элементов на странице',
      address: 'адрес нахождения обьекта',
      phone_1: 'телефон 1',
      phone_2: 'телефон 2',
      phone_3: 'телефон 3',
      phone_4: 'телефон 4',
      phone_5: 'телефон 5',
      phone_6: 'телефон 6',
      sMaterialTypeId: 'Кал, Кровь, Мясо, Молочный продукт и.т.д',
      sMaterialAnimalTypeId: '(КРС, МРС, собаки, кошки)',
      sMaterialColor: 'красный, белый, черный',
      sRegionTypeId: 'село, район, область',
      regionParentAutocomplete: 'родительский регион',
      departmentId: 'департамент',
      planCount: 'планируемое количество исследовании по плану',
      planKv: 'к какому кварталу принадлежит план',
      planYear: 'год плана',
      regionJSON: 'регион обьекта',
      regionFullPath: 'полный адрес: Область, район, село',
      departmentDataJSON: 'дополнительная информатция о департамента',
      sOtdeleniaId: 'биохимия, паразитология',
      otdelId: 'Родительский отдел',
      vozrast: 'Если материал животного произ хождения то сколько ему лет',
      dateZabolivanie: 'Дата заболивания животного',
      dateZaboya: 'Дата забоя',
      dateOtbora: 'Дата отбора проб',
      dateVremyaOtbora: 'Дата и время отбора проб',
      dateDostavki: 'Дата доставки пробы',
      dateVremyaOtpravki: 'Дата и время доставки',
      napravlenOtdelId: 'Направляется в отдел',
      posMaterialId: 'Обьект исследования',
      posMaterials: 'Обьекты исследования',
      postMaterialCount: 'Количество проб',
      isledovanieProvoditsaJSON: 'Исследование проводятся',
      posMaterialCheckVid: 'Соответствие внешнего вида',
      postMaterialCheck: 'Соответствует своему образу',
      dateDeworming: 'Дата дегельминтизации',
      anthelminticTypeJSON: 'Вид антигельминтика',
      dateLechenia: 'Дата лечения',
      antibioticTypeJSON: 'Вид антибиотика',
      dateObrabotki: 'Дата обработки',
      disinfectantTypeJSON: 'Вид дезинфектанта',
      dateVaccination: 'Дата вакцинации животного',
      vaccineTypeJSON: 'Вид вакцины',
      checkVid: 'Соответствует внешний вид',
      materialCheck: 'Соответствует своему образу',
      primary: 'Первичный',
      secondary: 'Вторичный',
      notApply: 'Не применимо',
      beforeProcess: 'До обработки',
      afterProcess: 'После обработки',
      role_name: 'Название роли',
      role_key: 'Ключ на англ языке',
      role_priority: 'Приоритет',
      priority: 'Приоритет ролей в цифрах',
      role_desc: 'Описание',
      yes: 'Да',
      no: 'Нет',
      status: 'Статус',
      male: 'Муж',
      female: 'Жен',
      pol: 'Пол',
      add: 'добавление',
      save: 'сохранение',
      clear: 'очистить',
      update: 'обновить',
      email: 'Электронная почта',
      password: 'Пароль',
      regionFullText: 'Полный адрес',
      toOtdel: 'Направляется в отдел',
      opPokazatelId: 'Определяемый показатель',
      opPokazatelJSON: 'Определяемые показатели',
      probyNapravilJSON: 'Пробу направил',
      probyDostavilJSON: 'Пробу доставил',
      ownerJSON: 'Владелец пробы',
      mestoOtboraRegionJSON: 'Место отбора пробы',
      kemOtobranJSON: 'Кем отобран',
      lechenieInfo: 'Сведение о лечении',
      sMaterialJSON: 'Проба материал или Под. Материал',
      materialCount: 'Количество проб',
      sMeraId: 'Мера измерения',
      napravlenieEpic: 'Поступившие направление',
      vnytNapravlenie: 'Отправленные направление',
      sendStatusCustomView: 'Отправил&Принял',
      posMaterialCustomView: 'Обьект исследования',
      vnytNapravlenieOptionalCustomView: 'Доп. данные',
    },
  },
  s_mera: {
    title: 'мера',
    add: 'добавление',
    label: {
      name: 'название',
      shortName: 'короткое навание',
      i18n: 'ключ для локализации',
    },
    placeholder: {
      name: '(кг, гр, мл, л)',
      shortName: 'короткое название',
      i18n: 'ключ мультиязычности',
    },
  },
  s_otdelenia: {
    title: 'Наименование отделении',
  },
  s_material: {
    title: 'Исследуемые материалы',
  },
  s_bolezn: {
    title: 'Болезни',
  },
  s_doljnost: {
    title: 'Должности',
  },
  s_material_type: {
    title: 'Вид материалов',
  },
  s_material_animal_type: {
    title: 'Виды животных',
  },
  s_metod: {
    title: 'НД на методы исследовании',
  },
  s_pokazatel: {
    title: 'Определяемые показатели',
  },
  s_pokazatel_pdk: {
    title: 'Пределы допустимых норм показателей'
  },
  s_preparat: {
    title: 'Антибиотики, вакцины, антигельмитики',
  },
  s_region: {
    title: 'Регионы',
    label: {
      napravlenieRegionFullPath: 'Адрес направления'
    }
  },
  s_region_type: {
    title: 'Вид региона',
  },
  department: {
    title: 'Департаменты'
  },
  otdel: {
    title: 'Отдел',
    label: {
      nonSpecOtdel: 'Не профильный отдел'
    },
    description: {
      nonSpecOtdel: 'Не принадлежит к не профильному отделу'
    },
    error: {
      notSelected: 'Вы не выбрали отдел',
      dateVremyaOtpravkiNotSelected:
        'Вы не выбрали дата и время отправки пробы',
    },
  },
  planRaboty: {
    title: 'План работы',
  },
  pos_material: {
    title: 'Пробы',
    label: {
      one: 'Проба',
      dateVremyaOtbora: 'Дата отбора пробы',
      dateDostavki: 'Дата доставки пробы',
      dateZaboya: 'Дата забоя',
      dateZabolivanie: 'Дата заболивания животного'
    },
  },
  subOtdel: {
    title: 'Под отдел',
  },
  personal: {
    title: 'Персоналы',
    label: {
      email: 'Email или Логин',
      password: 'Пароль',
      firstName: 'Имя',
      lastName: 'Фамилия',
      patronymicName: 'Отчество',
      fullName: 'ФИО',
      pol: 'Пол',
      personalDataJSON: 'Дополнительная инфо-я',
      addressLiveRegionJSON: 'Адрес проживания',
      addressBirthRegionJSON: 'Место рождения',
      sDoljnostId: 'Должность',
      otdelId: 'Отдел',
      subOtdel: 'Под отдел',
    },
  },
  probyNapravil: {
    label: {
      fullName: 'Пробу направил ФИО',
      phone_1: 'Телефон направителя'
    }
  },
  probyDostavil: {
    label: {
      fullName: 'Пробу доставил ФИО',
      phone_1: 'Телефон доставщика'
    }
  },
  owner: {
    label: {
      fullName: 'Владелец ФИО',
      phone_1: 'Телефон владельца'
    }
  },
  kemOtobran: {
    label: {
      fullName: 'Кем отобран ФИО',
      phone_1: 'Кем отобрат телефон'
    }
  },
  mestoOtbora: {
    label: {
      regionFullPath: 'Место отбора'
    }
  },
  napravlenie: {
    title: 'Направление',
    label: {
      napravlenieZakazNomer: '№ заказа'
    },
    epic: {
      sendToOtdel: 'направить',
      sendToOtdelTitle: 'Отправить внутреннее направление',
      cancel: 'отменить',
      delete: 'удалить',

      status: {
        new: 'Новый',
        sended: 'Отправлен',
        redirected: 'Перенаправлен',
      }
    },
  },
  napravlenieEpic: {
    title: 'Поступившие внешнее Направление',
    label: {
      nomerNapravlenia: '№ Заказа',
      sendToOtdelSuccess: 'Направление успешно направлен'
    }
  },
  vnytNapravlenie: {
    error: {
      rejectDescriptionNotWritten: 'Пожалуйста напишите причину отклонения',
      metodNotSelected: 'Вы не выбрали НД документ для исследования',
      opPokazatelNotSelected: 'Вы не выбрали ни одного определяемого показателя'
    },
    pub: {
      researchStart: 'К исследованию',
      researchFinish: 'Завершить исследование',
      accept: 'Принять',
      reject: 'Отклонить',
      status: {
        accepted: 'Принято',
        pending: 'Новый',
        research: 'Исследуется',
        completed: 'Завершили',
        rejected: 'Отклонен'
      },
    },
    epic: {
      label: {
        generateProtocol: 'Протокол'
      },
      status: {
        pending: 'Ожидание принятии',
        accepted: 'Принят',
        research: 'На иследовании',
        rejected: 'Отклонен',
        completed: 'Завершен',
      },
    },
    modal: {
      accept: {
        title: 'Подтверждение',
        message: 'Принять направление ?',
      },
      reject: {
        title: 'Подвердите причину отклонения',
        message: 'Напишите причину отклонения'
      },
      researchStart: {
        title: 'Начала исследование, пожалуйста выберите МУ на методы исследованиий'
      }
    },
    title: 'Внутреннее Направление',
    label: {
      researchMetodJSON: 'Методическое указание (или НД)',
      rejectionDescription: 'Причина отклонения',
      count: 'Кол-во',
      probCount: 'Количество проб',
      outerNomerNapravlenia: 'Внешний №',
      nomerNapravlenia: '№ Заказа',
      napravilPersonal: 'Направил',
      napravlenOtdel: 'Направлен в отдел',
      dateVremyaOtpravki: 'Дата отправки',
      vremyaOtpravki: 'Время отправки',
      prinyalPersonal: 'Принял',
      prinyalOtdel: 'Принял',
      prinyalDate: 'Дата приема',
      prinyalTime: 'Время приема',

      rejectPersonal: 'Отклонил',
      rejectOtdel: 'Отклонил',
      rejectDate: 'Дата',
      rejectTime: 'Время',

      opPokazatel: 'Опр-е показатели',
      probaCustomView: 'Пробы',
      posMaterialCount: 'Количество проб',
      posMaterialId: 'Обьект исследования',
      posMaterialCheckVid: 'Соответствие внешнего вида',
      postMaterialCheck: 'Соответствует своему образу',
      dateObrabotki: 'Дата обработки',
      dateDeworming: 'Дата дегельминтизации',
      dateVaccination: 'Дата вакцинации',
      dateLechenia: 'Дата лечения',
      anthelminticTypeJSON: 'Вид антигельминтика',
      antibioticTypeJSON: 'Вид антибиотика',
      disinfectantTypeJSON: 'Вид дезинфектанта',
      vaccineTypeJSON: 'Вид вакцинации',
      isledovanieProvoditsaJSON: 'Исследования проводятся',
      status: {
        pending: 'Ожидание принятии',
        accepted: 'Принят',
        research: 'На иследовании',
        completed: 'Завершен',
        finished: 'Завершен'
      },
    },
    description: {
      researchMetodJSON: 'Какой ГОС стандарт(НД) используется для исследования',
    },
    placeholder: {
      researchMetodJSON: 'Нормативный документ',
    }
  },
  isledovanie: {
    title: 'Страница исследования',
    label: {
      note: 'Примечание',
      laborantFullName: 'Лаборант',
      chemistFullName: 'Химик',
      seniorFullName: 'Старший специалист',
      fault: 'Погрешность',
      otdel: 'Отдел',
      isPersonal: 'Исследует',
      uniqueNomerIsledovanie: 'ID исследования',
      isledovanieResult: 'Результат исследования',
      isledovanieResults: 'Результаты исследовании',
      result: 'Результат',
      pdk: 'ПДК',
      probaCustomView: 'Данные о пробе',
      primary: 'Первичный',
      notApply: 'Не применимо',
      beforeProcess: 'До обработки',
      afterProcess: 'После обработки',
      secondary: 'Вторичный',
      regNomerProby: 'Регистрационный № пробы',
      nomerProby: '№ пробы',
      nomerProbs: '№ проб',
      nomerIsledovania: '№ Исследования',
      isledObject: 'Исследуемый обьект',
      materialCount: 'Количество',
      dateStart: 'Дата начала исследования',
      dateFinish: 'Дата завершения исследования',
      nomerZakaza: '№ Заказа',
      isledovanieND: 'МУ(НД) на методы исследований',
      finishIsledovanieButton: 'Завершить исследование',
      finishIsledovanieTitle: 'Завершение исследования',
      opPokazatel: 'Определяемые показатели',
      isledovanieResultTableHead: 'Для успешнего завершения должны быть заполнены все поля',
      isledovanieResultDesc: 'Все данные выводится в протокол исследований',
      researchMetodJSON: 'НД на методы исследований',
      indexProby: 'Порядковый диапазон № проб',
      posMaterials: 'Перечислите № номера проб',
      resultJSON: 'Результат',
      nomberProbyTiny: '№ пробы',
      pdkJSON: 'ПДК',
      status: {
        pending: 'Ожидание принятии',
        accepted: 'Принят',
        research: 'На иследовании',
        completed: 'Завершен',
        finish: 'Завершен'
      },
    },
    placeholder: {
      note: 'Примечание',
      laborantFullName: 'Лаборант',
      chemistFullName: 'Химик',
      seniorFullName: 'Старший специалист',
      fault: 'Погрешность',
      opPokazatel: 'Определяемые показатели',
      researchMetodJSON: '№ МУ или НД',
      indexProby: 'Порядковый диапазон № пробы',
      posMaterials: 'Порядковые номера каждой пробы',
      resultJSON: 'Результат',
      pdkJSON: 'Выберите ПДК'
    },
     description: {
       note: 'Примечание',
       laborantFullName: 'Лаборант',
       chemistFullName: 'Химик',
       seniorFullName: 'Старший специалист',
       fault: 'Погрешность +-',
       opPokazatel: 'Определяемый показатель',
       researchMetodJSON: 'Методическое указания на методы исследований ( или НД)',
       indexProby: 'Диапазон номеров проб',
       posMaterials: 'Порядковые номера каждой пробы',
       resultJSON: 'Результат',
       pdkJSON: 'Предел допустимой нормы'
     }
  },
  user: {
    title: 'Данные о пользователе',
    label: {
      name: 'Ник',
    },
    password: {
      notPassword: 'Вы не ввели пароль',
      lowPassword: 'Слабый пароль',
      lowPassword4: 'Пароль склишком короткий, длина неменее 4 символов',
    },
  },
  menu: {
    spravka: 'справочник',
    divider: '#######',
    admin: 'админ',
    pdk: {
      index: 'ПДК'
    },
    mera: {
      index: 'меры',
    },
    region_type: {
      index: 'вид регионов',
      add: '',
    },
    regions: {
      index: 'регионы',
      add: '',
    },
    otdelenia: {
      index: 'наименование отделении',
      add: '',
    },
    doljnost: {
      index: 'должности',
      add: '',
    },
    bolezn: {
      index: 'болезни',
      add: '',
    },
    pokazatel: {
      index: 'определяемый показатель',
      add: '',
    },
    preparat: {
      index: 'вакцины и препараты',
    },
    material_type: {
      index: 'вид материалов',
      add: '',
    },
    material_animal_class: {
      index: 'класс животных',
      add: '',
    },
    material_animal_type: {
      index: 'вид животных',
      add: '',
    },
    material: {
      index: 'исследуемые материалы',
      add: '',
    },
    metod: {
      index: 'МУ (НД) на методы исследований',
      add: '',
    },
    personal: {
      add: 'Добавление персонала',
      index: 'персоналы',
    },
    otdel: {
      index: 'отделы',
      add: '',
    },
    sub_otdel: {
      index: 'под отделы',
      add: '',
    },
    departments: {
      index: 'департаменты',
      add: '',
    },
    plan_raboty: {
      index: 'план работы',
      add: '',
    },
    proby: {
      index: 'пробы'
    },
    posNapravlenia: {
      index: 'поступившие направления'
    },
    isledovanie: {
      index: 'исследование',
      add: '',
    },
    analysis: {
      index: 'анализ',
      add: '',
    },
    protocol_isledovanie: {
      index: 'заключение',
      add: '',
    },
    proby_isledovanie: {
      index: 'пробы на исследовании',
    },
    proby_postup: {
      index: 'поступившие пробы',
    },
    epidemiology: {
      index: 'эпидемиология',
    },
    napravlenie: {
      index: 'направление',
      add: 'добавить',
      route: 'внутреннее направление'
    },
    role: {
      index: 'роли пользователей',
    },
    home: 'главная',
    direction: 'направлении',
    reports: 'отчеты',
    reportsResult: 'заключение',
    reportPlanOfRegion: 'планы по регионам',
    news: 'новости',
    profile: 'профиль',
    workers: 'сотрудники',
    contacts: 'контакты',
    chat: 'чат',
    form4Tiny: 'форма4(компакт)',
  },

  count: 'Количество',
  material: {
    count: 'Количество материалов',
  },
  regions: {
    osh: {
      text: 'Ошская область',
      tinyText: 'Ош',
    },
    'jalal-abad': {
      text: 'Джалал-Абадская область',
      tinyText: 'Джалал-Абад',
    },
    batken: {
      text: 'Баткенская область',
      tinyText: 'Баткен',
    },
    'south-region': {
      text: 'Южный регион',
      tinyText: 'Юг',
      allResult: 'Все результаты по Южному региону',
    },
  },

  departments: {
    one: 'Отдел',
    many: 'Отделы',
    part: 'Отдел {department}',

    epidemiology: 'Эпидемиология',
    serology: 'Серология',
    bacteriology: 'Бактериология',
    parasitology: 'Паразитология',
    foodSecurity: 'Продукты питания',
    virology: 'Вирусология',
    biochemistry: 'Биохимия',
    toxicology: 'Химтоксикология',
    radiology: 'Радиология',
    mycology: 'Микология',
    ascoly: 'Асколи',
    leptospiros: 'Лептоспироз',
    leukemia: 'Лейкемия',
  },

  research: {
    text: 'Исследовано',
    pathologist: {
      specialist: 'Патологоанатом',
      department: 'Патологоанотомия',
      method: 'Патологическая анатомический',
    },
    organoleptic: {
      specialist: 'Органолептик',
      department: 'Органолептика',
      method: 'Органолептический',
    },
    microscopy: {
      specialist: 'Микроскопиолог',
      department: 'Микроскопия',
      method: 'Микроскопический',
    },
    bacteriology: {
      specialist: 'Бактериолог',
      department: 'Бактериология',
      method: 'Бактериологический',
    },
    microbiology: {
      specialist: 'Микробиолог',
      department: 'Микробиология',
      method: 'Микробиологический',
    },
    serology: {
      specialist: 'Серолог',
      department: 'Серология',
      method: 'Серологический',
    },
    caprology: {
      specialist: 'Капролог',
      department: 'Капрология',
      method: 'Капрологический',
    },
    mycology: {
      specialist: 'Миколог',
      department: 'Микология',
      method: 'Мокологический',
    },
    biochemistry: {
      specialist: 'Биохимик',
      department: 'Биохимия',
      method: 'Биохимический',
    },
    chemToxicology: {
      specialist: 'Токсихолог',
      department: 'Химтоксикология',
      method: 'Химтоксикологический',
    },
    radioLab: {
      specialist: 'Радиолог',
      department: 'Радиология',
      method: 'Радиологический',
    },
  },

  error: {
    title: 'Ошибка',
    server: 'Ошибка на стороне сервера',
    auth: 'Ошибка авторизации логин или пароль неверны',
    authWrong: 'Логин или пароль неверны',
    connection: 'Ошибка подключение к серверу',
    emptyField: 'Ошибка, поле пустое заполните поле',
    emptyFields: 'Ошибка, пустые поля, заполните поля',
    requireAuth: 'Требуется авторизация',
    pleaseRequireAuth: 'Пожалуйста авторизуйтесь',
    create: 'Ошибка создания',
    update: 'Ошибка обновления',
    get: 'Ошибка получения',
  },

  auth: {
    signIn: 'Войти',
    signOut: 'Выйти',
    endSession: 'Завершить сеанс',
  },

  success: {
    title: 'Успешно',
    auth: 'Авторизация успешно',
    create: 'Успешно создано',
    update: 'Успешно обновлено',
    get: 'Успешно получено',
  },
  help: {
    helpCenter: 'Центр помощи',
  },
  profile: {
    edit: 'Редактировать профиль',
    view: 'Просмотр профиля',
    delete: 'Удалить профиль',
  },
  placeholder: {
    enterEmail: 'Введите email',
    enterPassword: 'Введите пароль',
  },
  require: {
    title: 'Требуется',
    email: 'Пожалуйста введите email',
    password: 'Пожалуйста введите пароль',
  },
  current: {
    year: 'за этот год',
    week: 'за эту неделю',
    day: 'за сегодня',
  },
  researchConducted: 'Проведенные исследование',
  result: 'Результат',
  completed: 'Выполнен',
  plan: 'План',
  percent: 'Процент',
}
