<template>
  <div class="navbar-search">
    <div class="navbar-search-header">
      <input
        type="search"
        class="form-control"
        placeholder="Type and hit enter to search..."
      >
      <button class="btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-search"
        >
          <circle cx="11"
                  cy="11" r="8"
          />
          <line x1="21"
                y1="21" x2="16.65" y2="16.65"
          />
        </svg>
      </button>
      <a id="navbarSearchClose" href="" class="link-03 mg-l-5 mg-lg-l-10"><svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-x"
      >
        <line
          x1="18"
          y1="6"
          x2="6"
          y2="18"
        />
        <line
          x1="6"
          y1="6" x2="18" y2="18"
        /></svg></a>
    </div>
    <!-- navbar-search-header -->
    <div class="navbar-search-body">
      <label
        class="tx-10 tx-medium tx-uppercase tx-spacing-1 tx-color-03 mg-b-10 d-flex align-items-center"
      >Recent Searches</label>
      <ul class="list-unstyled">
        <li><a href="dashboard-one.html">modern dashboard</a></li>
        <li><a href="app-calendar.html">calendar app</a></li>
        <li><a href="../../collections/modal.html">modal examples</a></li>
        <li><a href="../../components/el-avatar.html">avatar</a></li>
      </ul>

      <hr class="mg-y-30 bd-0">

      <label
        class="tx-10 tx-medium tx-uppercase tx-spacing-1 tx-color-03 mg-b-10 d-flex align-items-center"
      >
        Search Suggestions
      </label>

      <ul class="list-unstyled">
        <li><a href="dashboard-one.html">cryptocurrency</a></li>
        <li><a href="app-calendar.html">button groups</a></li>
        <li><a href="../../collections/modal.html">form elements</a></li>
        <li><a href="../../components/el-avatar.html">contact app</a></li>
      </ul>
    </div>
    <!-- navbar-search-body -->
  </div>
</template>
