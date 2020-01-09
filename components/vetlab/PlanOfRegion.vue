<template>
  <b-row class="mg-t-20 row-xs">
    <b-col cols="12">
      <h4>План выполнения по регионам</h4>
    </b-col>
    <b-col
      v-for="department in departments"
      :key="department.key"
      cols="12"
      sm="12"
      md="6"
      lg="5"
      xl="3"
      class="mg-t-5"
    >
      <div class="card">
        <div class="card-header">
          <h6 class="mg-b-0">{{ $t(department) }}</h6>
        </div>
        <div class="card-body pd-10">
          <b-table
            :fields="fields"
            :items="items"
            head-variant="light"
            foot-clone
            responsive
            small
            hover
          >
            <template v-slot:head()="data">
              <span class="tx-bold">{{ data.label }}</span>
            </template>
            <template v-slot:foot(region)>
              <i class="tx-bold">{{ $t('result') }}</i>
            </template>
            <template v-slot:foot(plan)>
              <i class="tx-bold">{{ planCount }}</i>
            </template>
            <template v-slot:foot(completed)>
              <i class="tx-bold">{{ completedCount }}</i>
            </template>
            <template v-slot:foot(percent)>
              <i class="tx-success tx-bold tx-rubik">
                {{ completedPercent }}%
              </i>
            </template>

            <template v-slot:cell(region)="region">
              <span class="tx-bold">{{ region.value }}</span>
            </template>
            <template v-slot:cell(percent)="data">
              <div class="justify-content-between mg-b-5">
                <h5 class="tx-normal tx-rubik tx-color-03 mg-b-0">
                  <small class="tx-bold">
                    {{ toPercent(data.item.plan, data.item.completed) }}%
                  </small>
                </h5>
              </div>
              <div>
                <b-progress
                  v-if="toPercent(data.item.plan, data.item.completed) <= 25"
                  :max="Number(data.item.plan)"
                  :value="Number(data.item.completed)"
                  variant="danger"
                />

                <b-progress
                  v-if="
                    toPercent(data.item.plan, data.item.completed) > 25 &&
                      toPercent(data.item.plan, data.item.completed) <= 71
                  "
                  :max="Number(data.item.plan)"
                  :value="Number(data.item.completed)"
                  variant="warning"
                />

                <b-progress
                  v-if="
                    toPercent(data.item.plan, data.item.completed) > 71 &&
                      toPercent(data.item.plan, data.item.completed) <= 86
                  "
                  :max="Number(data.item.plan)"
                  :value="Number(data.item.completed)"
                  variant="primary"
                />

                <b-progress
                  v-if="toPercent(data.item.plan, data.item.completed) > 86"
                  :max="Number(data.item.plan)"
                  :value="Number(data.item.completed)"
                  variant="success"
                />
              </div>
            </template>
          </b-table>
        </div>
      </div>
    </b-col>
  </b-row>
</template>
<script>
export default {
  data() {
    return {
      departments: [
        'departments.serology',
        'departments.bacteriology',
        'departments.parasitology',
        'departments.foodSecurity',
        'departments.virology',
        'regions.south-region.allResult'
      ],
      fields: [
        { key: 'region', label: 'Регион', i18n: 'region' },
        { key: 'plan', label: 'План', i18n: 'plan' },
        { key: 'completed', label: 'Выполнен', i18n: 'completed' },
        // Virtual column
        { key: 'percent', label: '%%', i18n: 'percent' }
      ],
      items: [
        {
          region: 'ТРБВДжЭБ',
          plan: '70673',
          completed: '37185'
        },
        { region: 'Ноокат', plan: '34935', completed: '37789' },
        {
          region: 'Алай РВЛ',
          plan: '20180',
          completed: '22499'
        },
        {
          region: 'Чон-Алай',
          plan: '15525',
          completed: '3698'
        },
        {
          region: 'Кара-Кулжа РВЛ',
          plan: '20570',
          completed: '16932'
        },
        {
          region: 'Кызыл-Жар',
          plan: '4860',
          completed: '1230'
        },
        {
          region: 'Озгон РВЛ',
          plan: '43070',
          completed: '9865'
        },
        {
          region: 'Жалал-Абад РВЛ',
          plan: '24845',
          completed: '24210'
        },
        {
          region: 'Базар-Коргон',
          plan: '43470',
          completed: '35698'
        },
        {
          region: 'Ала-Бука РВЛ',
          plan: '20815',
          completed: '12654'
        },
        { region: 'Аксы', plan: '28790', completed: '29275' },
        { region: 'Чаткал', plan: '9580', completed: '10079' },
        {
          region: 'Сузак РВЛ',
          plan: '50855',
          completed: '35987'
        },
        {
          region: 'Баткен ЗВЛ',
          plan: '27745',
          completed: '18745'
        },
        { region: 'Лейлек', plan: '33900', completed: '35032' },
        {
          region: 'Кадамжай РВЛ',
          plan: '28360',
          completed: '32984'
        }
      ]
    }
  },
  computed: {
    planCount() {
      return this.$lodash.sumBy(this.items, (item) => {
        return Number(item.plan)
      })
    },
    completedCount() {
      return this.$lodash.sumBy(this.items, (item) => {
        return Number(item.completed)
      })
    },
    completedPercent() {
      return Number((this.completedCount / this.planCount) * 100).toFixed(2)
    }
  },
  mounted() {
    setTimeout(() => {
      this.randomRegionUp()
    }, 6000)
  },
  methods: {
    toPercent(max, value) {
      return Number((value / max) * 100).toFixed(2)
    },
    randomRegionUp() {
      const rnd = this.$lodash.random(0, this.items.length - 1)
      this.items[rnd].completed =
        Number(this.items[rnd].completed) + this.$lodash.random(1, 10)
      setTimeout(() => {
        this.randomRegionUp()
      }, this.$lodash.random(6000, 8000))
    }
  }
}
</script>
