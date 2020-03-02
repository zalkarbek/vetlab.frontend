<template>
  <b-dropdown
    class="dropdown-notification"
    menu-class="dropdown-menu-right"
    size="lg"
    variant="link"
    toggle-class="text-decoration-none"
    no-caret
  >
    <template v-slot:button-content>
      <a href="" class="dropdown-link new-indicator">
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
          class="feather feather-bell"
        >
          <path
            d="M22 17H2a3 3 0 0 0 3-3V9a7 7 0 0 1 14 0v5a3 3 0 0 0 3 3zm-8.27 4a2 2 0 0 1-3.46 0"
          />
        </svg>
        <span>2</span>
      </a>
    </template>
    <div class="dropdown-header">Notifications</div>
    <b-dropdown-item>
      <div class="media">
        <div class="avatar avatar-sm avatar-online">
          <img src="~/assets/img/user.svg" class="rounded-circle" alt="" />
        </div>
        <div class="media-body mg-l-15">
          <p>
            Congratulate <strong>Socrates Itumay</strong> for work anniversaries
          </p>
          <span>Mar 15 12:32pm</span>
        </div>
        <!-- media-body -->
      </div>
      <!-- media -->
    </b-dropdown-item>
    <div class="dropdown-footer"><a href="">View all Notifications</a></div>
  </b-dropdown>
</template>
