<template>
  <b-dropdown
    size="lg"
    variant="flat"
    toggle-class="text-decoration-none"
    no-caret
  >
    <template v-slot:button-content>
      <b-img :src="`/img/${currentLocale}.svg`" width="32" />
      <b>{{ currentLocale | upper }}</b>
    </template>
    <b-dropdown-item
      v-for="(locale, index) in supportedLocales"
      :key="index"
      @click="setLocale(locale)"
    >
      <b-img :src="`/img/${locale}.svg`" width="32" />
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
        (locale) => locale !== this.currentLocale
      )
    }
  },
  mounted() {},
  methods: {
    setLocale(locale) {
      this.$store.dispatch('setCurrentLocale', { locale })
    }
  }
}
</script>
