<template>
  <b-dropdown
    class="dropdown-message"
    menu-class="dropdown-menu-right"
    toggle-tag="a"
    size="sm"
    variant="link"
    toggle-class="text-decoration-none"
    no-caret
  >
    <template v-slot:button-content>
      <a href=""
         class="dropdown-link new-indicator"
      >
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
          class="feather feather-message-square"
        >
          <path
            d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
          />
        </svg>
        <span>5</span>
      </a>
    </template>
    <div class="dropdown-header">
      New Messages
    </div>
    <b-dropdown-item href="#">
      <div class="media">
        <div class="avatar avatar-sm avatar-online">
          <img
            src="~/assets/img/user.svg" class="rounded-circle" alt=""
          >
        </div>
        <div class="media-body mg-l-15">
          <strong>Socrates Itumay</strong>
          <p>nam libero tempore cum so...</p>
          <span>Mar 15 12:32pm</span>
        </div>
        <!-- media-body -->
      </div>
    </b-dropdown-item>
    <div class="dropdown-footer">
      <a href="">View all Messages</a>
    </div>
  </b-dropdown>
</template>
