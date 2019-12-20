<template>
  <b-dropdown
    size="sm"
    variant="flat"
    toggle-class="text-decoration-none"
    no-caret
  >
    <template v-slot:button-content>
      <b-img :src="getLocaleFlagImage(currentLocale)" width="32" />
      <b>{{ currentLocale | upper }}</b>
    </template>
    <b-dropdown-item
      v-for="(locale, index) in supportedLocales"
      :key="index"
      @click="setLocale(locale)"
    >
      <b-img :src="getLocaleFlagImage(locale)" width="32" />
      <b>{{ locale | upper }}</b>
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
    supportedLocales() {
      return this.$i18n.availableLocales.filter(
        (locale) => locale !== this.$i18n.locale
      )
    }
  },
  methods: {
    setLocale(locale) {
      this.$store.dispatch('setCurrentLocale', { locale })
    },
    getLocaleFlagImage(locale) {
      return `/img/${locale}.svg`
    }
  }
}
</script>
