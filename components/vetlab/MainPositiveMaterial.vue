<template>
  <b-row class="mg-t-20 row-xs">
    <b-col cols="12">
      <h4>Положительные результаты</h4>
    </b-col>
    <b-col cols="12" sm="12" md="6" lg="5" xl="3" class="mg-t-5">
      <b-card
        class="card-dashboard-table"
        header-class="d-flex align-items-start justify-content-between"
        header-tag="header"
        footer-tag="footer"
      >
        <template v-slot:header>
          <h6 class="mb-0"></h6>
          <div
            class="tx-13 d-flex align-items-center"
            style="font-size: 1.0rem"
          >
            <span class="mg-r-8 tx-success cursor-pointer">
              <span class="fal fa-file-excel fa-lg" />
            </span>
            <span class="mg-r-8 tx-danger cursor-pointer">
              <span class="fal fa-file-pdf fa-lg" />
            </span>
            <span class="mg-r-8 tx-teal cursor-pointer">
              <span class="fal fa-file-chart-line fa-lg" />
            </span>
          </div>
        </template>
        <template v-slot:footer>
          <em></em>
        </template>

        <b-card-title>
          Пока нет данных
        </b-card-title>
        <b-card-text>
          --------
        </b-card-text>

        <!--        <b-button href="#" variant="primary">Go somewhere</b-button>-->
      </b-card>
    </b-col>
  </b-row>
</template>
