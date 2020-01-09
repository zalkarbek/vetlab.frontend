<template>
  <b-card
    class="card-dashboard-table"
    header-class="d-flex align-items-start justify-content-between"
    header-tag="header"
    footer-tag="footer"
  >
    <template v-slot:header>
      <h6 class="mb-0">Header Slot</h6>
      <div class="tx-13 d-flex align-items-center" style="font-size: 1.0rem">
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
      <em>Footer Slot</em>
    </template>

    <b-card-title>
      CARD TITLE
    </b-card-title>
    <b-card-text>
      CARD BODY TEXT
    </b-card-text>

    <b-button href="#" variant="primary">Go somewhere</b-button>
  </b-card>
</template>
