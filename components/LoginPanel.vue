<template>
  <div :class="containerClass"
       class="sign-wrapper"
  >
    <b-img-lazy center src="~/assets/img/test_tube.svg" width="140%"
    />
    <div class="wd-100p">
      <h4 class="tx-color-01 mg-b-5 text-center">
        <slot name="title" />
      </h4>
      <p class="tx-color-03 tx-16 mg-b-40 text-center">
        <slot name="description" />
      </p>

      <div class="form-group">
        <label for="email_input">Email</label>
        <input
          id="email_input"
          v-model="email"
          :placeholder="$t('placeholder.enterEmail')"
          type="email"
          class="form-control"
          @keyup="onEnter"
        >
      </div>
      <div class="form-group">
        <div class="d-flex justify-content-between mg-b-5">
          <label for="password_input"
                 class="mg-b-0-f"
          >Пароль</label>
        </div>
        <input
          id="password_input"
          v-model="password"
          :placeholder="$t('placeholder.enterPassword')"
          type="password"
          class="form-control"
          @keyup="onEnter"
        >
      </div>
      <div class="form-group tx-12">
        Строго <strong class="text-danger">не рекомендуется</strong>
        сохранять пароль у браузера
      </div>

      <button class="btn btn-brand-01 btn-block" @click="auth">
        Вход
      </button>
      <div class="divider-text">
        язык
      </div>
      <locales-dropdown />
      <div class="tx-13 mg-t-20 tx-center">
        Забыли пароль ? <a href="/login">Восстановить</a>
      </div>
    </div>
  </div>
</template>
<script>
import LocalesDropdown from './LocalesDropdown'
export default {
  components: {
    'locales-dropdown': LocalesDropdown,
  },
  props: {
    containerClass: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    auth() {
      this.$emit('onLogin', { email: this.email, password: this.password })
    },
    onEnter($event) {
      if ($event.keyCode === 13) {
        if (!this.email) {
          this.$bvToast.toast(this.$i18n.t('require.email') || '', {
            title: this.$i18n.t('require.title'),
            variant: 'warning',
          })
          return
        }
        if (!this.password) {
          this.$bvToast.toast(this.$i18n.t('require.password') || '', {
            title: this.$i18n.t('require.title'),
            variant: 'warning',
          })
          return
        }
        this.$emit('onLogin', { email: this.email, password: this.password })
      }
    },
  },
}
</script>
