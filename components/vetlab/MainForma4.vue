<template>
  <b-row class="mg-t-20 row-xs">
    <b-col cols="12">
      <h4>{{ $t('researchConducted') }} Форма №4</h4>
    </b-col>
    <b-col
      v-for="region in regions"
      cols="12"
      sm="12"
      md="6"
      lg="5"
      xl="3"
      class="mg-t-5"
    >
      <div class="card card-dashboard-table">
        <div
          class="card-header d-flex align-items-start justify-content-between"
        >
          <h5 class="mg-b-0 ">
            <b-img left src="~/assets/img/marker.svg" width="28px" />
            {{ $t(`regions.${region.key}.text`) }}
          </h5>
          <div class="tx-13 d-flex align-items-center">
            <a href="" class="mg-r-8">
              <span class="fal fa-file-excel fa-lg" />
            </a>
            <a href="" class="mg-r-8">
              <span class="fal fa-file-pdf fa-lg" />
            </a>
            <a href="" class="mg-r-8">
              <span class="fal fa-file-chart-line fa-lg" />
            </a>
          </div>
        </div>
        <div v-for="department in departments" class="card-body">
          <h6 class="card-title tx-16 text-center">
            {{ department.label }}
          </h6>
          <b-table
            :fields="fields"
            :items="items"
            head-variant="light"
            small
            responsive
            caption-top
          >
            <template v-slot:head()="data">
              <span class="text-primary">{{ data.label }}</span>
            </template>
            <template v-slot:cell(researchDirection)="data">
              <span class="tx-bold">{{ data.value.label }}</span>
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
      regions: [
        { key: 'osh' },
        { key: 'jalal-abad' },
        { key: 'batken' },
        { key: 'south-region' }
      ],
      departments: [
        { label: 'Түштүк РБВДжЭБ' },
        { label: 'Бактериология' },
        { label: 'Вирусология' },
        { label: 'Серология' },
        { label: 'Паразитология' },
        { label: 'Лептоспироз' },
        { label: 'Микология' },
        { label: 'Химтоксикология' },
        { label: 'Тамак аш коопсуздук болуму' },
        { label: 'Асколи' },
        { label: 'Радиология' },
        { label: 'Биохимия' },
        { label: 'Лейкоз' }
      ],
      fields: [
        { key: 'researchDirection', label: 'Исследование' },
        { key: 'researchCount', label: 'Исследовано' }
      ],
      items: [
        {
          researchDirection: {
            key: 'pathologist',
            label: 'Патологоанатомиялык'
          },
          researchCount: 100
        },
        {
          researchDirection: {
            key: 'organoleptic',
            label: 'Органолептикалык'
          },
          researchCount: 100
        },
        {
          researchDirection: {
            key: 'microscopy',
            label: 'Микроскопиялык'
          },
          researchCount: 100
        },
        {
          researchDirection: {
            key: 'bacteriology',
            label: 'Бактериологиялык'
          },
          researchCount: 100
        },
        {
          researchDirection: {
            key: 'microbiology',
            label: 'Микробиологиялык'
          },
          researchCount: 100
        },
        {
          researchDirection: {
            key: 'serology',
            label: 'Серологиялык'
          },
          researchCount: 100
        },
        {
          researchDirection: {
            key: 'caprology',
            label: 'Капрологиялык'
          },
          researchCount: 100
        },
        {
          researchDirection: {
            key: 'mycology',
            label: 'Микологиялык'
          },
          researchCount: 100
        },
        {
          researchDirection: {
            key: 'biochemistry',
            label: 'Биохимиялык'
          },
          researchCount: 100
        },
        {
          researchDirection: {
            key: 'chemToxicology',
            label: 'Химтоксикологиялык'
          },
          researchCount: 100
        },
        {
          researchDirection: {
            key: 'radioLab',
            label: 'Радиологиялык'
          },
          researchCount: 100
        }
      ]
      // fields: [
      //   { key: 'otdel', label: 'Отдел' },
      //   { key: 'materialCount', label: 'Түшкөн матери-алдын саны' },
      //   { key: 'pathologist', label: 'Патологоанатомиялык' },
      //   { key: 'organoleptic', label: 'Органолептикалык' },
      //   { key: 'microscopy', label: 'Микроскопиялык' },
      //   { key: 'bacteriology', label: 'Бактериологиялык' },
      //   { key: 'microbiology', label: 'Микробиологиялык' },
      //   { key: 'serology', label: 'Серологиялык' },
      //   { key: 'caprology', label: 'Капрологиялык' },
      //   { key: 'mycology', label: 'Микологиялык' },
      //   { key: 'biochemistry', label: 'Биохимиялык' },
      //   { key: 'chemToxicology', label: 'Химтоксикологиялык' },
      //   { key: 'radioLab', label: 'Радиологиялык' },
      //   { key: 'theNumberOfTrueResult', label: 'Он жыйынтыктын саны' },
      //   { key: 'researchCompleted', label: 'АНЫК-ТОО ЖҮРГҮЗҮЛДҮ' }
      // ],
      // items: [
      //   { otdel: 'Бактериология', materialCount: 100 },
      //   { otdel: 'Вирусология' },
      //   { otdel: 'Серология' },
      //   { otdel: 'Паразитология' },
      //   { otdel: 'Лептоспироз' },
      //   { otdel: 'Микология' },
      //   { otdel: 'Химтоксикология' },
      //   { otdel: 'Тамак аш коопсуздук болуму' },
      //   { otdel: 'Асколи' },
      //   { otdel: 'Радиология' },
      //   { otdel: 'Биохимия' },
      //   { otdel: 'Лейкоз' }
      // ]
    }
  }
}
</script>
<style>
.word-break {
  word-break: break-all;
}
.font-small {
  font-size: 11px;
}
</style>
