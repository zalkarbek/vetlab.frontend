<template>
  <b-dropdown
    size="lg"
    variant="flat"
    toggle-class="text-decoration-none"
    no-caret
  >
    <template v-slot:button-content>
      <b-img :src="getLocaleFlagImage(currentLocale)" width="32" />
      <b>{{ currentLocale | upper }}</b>
    </template>
    <b-dropdown-item
      v-for="locale in availableLocales"
      :key="locale.code"
      :to="switchLocalePath(locale.code)"
      @click="setLocale(locale.code)"
    >
      <b-img :src="getLocaleFlagImage(locale.code)" width="32" />
      <b>{{ locale.name }}</b>
    </b-dropdown-item>
  </b-dropdown>
</template>
<script>
export default {
  filters: {
    capitalize(value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    },
    upper(value) {
      if (!value) return ''
      return value.toUpperCase()
    }
  },
  computed: {
    currentLocale() {
      return this.$i18n.locale
    },
    availableLocales() {
      return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale)
    }
  },
  methods: {
    async setLocale(locale) {
      await this.$store.dispatch('setCurrentLocale', { locale })
    },
    getLocaleFlagImage(locale) {
      return `/img/${locale}.svg`
    }
  }
}
</script>
