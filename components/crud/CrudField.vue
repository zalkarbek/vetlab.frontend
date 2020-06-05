<template>
  <div>
    <!-- ----------------------- FORM TEXT ----------------------- -->
    <template v-if="!form.disabled && form.type === fieldTypes.text">
      <input
        v-model.trim="formValue"
        :placeholder="placeholder || defaultPlaceholder(form)"
        type="text"
        class="form-control"
      >
    </template>
    <!-- -----------------------/ FORM TEXT /----------------------- -->

    <!-- ----------------------- FORM CHECKBOX ----------------------- -->
    <template v-if="!form.disabled && form.type === fieldTypes.checkbox">
      <b-form-checkbox
        v-model="formValue"
        :value="form.checkbox_value"
        :unchecked-value="form.checkbox_unchecked_value"
        :size="form.size"
      >
        {{ $t(form.checkbox_label) }}
      </b-form-checkbox>
    </template>
    <!-- -----------------------/ FORM CHECKBOX /----------------------- -->

    <!-- ----------------------- FORM CHECKBOX_ARRAY ----------------------- -->
    <template v-if="!form.disabled && form.type === fieldTypes.checkbox_array">
      <b-form-checkbox-group
        v-model="formValue"
        :options="form.checkbox_options"
        :value-field="form.checkbox_value_field"
        :text-field="form.checkbox_text_field"
        :disabled-field="form.checkbox_disabled_field"
        :size="form.size"
      />
    </template>
    <!-- -----------------------/ FORM CHECKBOX_ARRAY /----------------------- -->

    <!-- ----------------------- FORM SWITCH ----------------------- -->
    <template v-if="!form.disabled && form.type === fieldTypes.switch">
      <b-form-checkbox
        v-model="formValue"
        :value="form.checkbox_value"
        :unchecked-value="form.checkbox_unchecked_value"
        :size="form.size"
        switch
      >
        {{ $t(form.checkbox_label) }}
      </b-form-checkbox>
    </template>
    <!-- -----------------------/ FORM SWITCH /----------------------- -->

    <!-- ----------------------- FORM SWITCH_ARRAY ----------------------- -->
    <template v-if="!form.disabled && form.type === fieldTypes.switch_array">
      <b-form-checkbox-group
        v-model="formValue"
        :options="form.checkbox_options"
        :value-field="form.checkbox_value_field"
        :text-field="form.checkbox_text_field"
        :disabled-field="form.checkbox_disabled_field"
        :size="form.size"
        switch
      />
    </template>
    <!-- -----------------------/ FORM SWITCH_ARRAY /----------------------- -->

    <!-- ----------------------- FORM PASSWORD ----------------------- -->
    <template v-if="!form.disabled && form.type === fieldTypes.password">
      <input
        v-model.trim="formValue"
        :placeholder="placeholder || defaultPlaceholder(form)"
        type="password"
        class="form-control"
      >
    </template>
    <!-- -----------------------/ FORM PASSWORD /----------------------- -->

    <!-- ----------------------- FORM TEXTAREA ----------------------- -->
    <template v-if="!form.disabled && form.type === fieldTypes.textarea">
      <b-form-textarea
        v-model.trim="formValue"
        :placeholder="placeholder || defaultPlaceholder(form)"
        class="form-control"
      />
    </template>
    <!-- -----------------------/ FORM TEXTAREA /----------------------- -->

    <!-- ----------------------- FORM NUMBER ----------------------- -->
    <template v-else-if="!form.disabled && form.type === fieldTypes.number">
      <input
        v-model.trim="formValue"
        :placeholder="placeholder || defaultPlaceholder(form)"
        type="number"
        class="form-control"
      >
    </template>
    <!-- -----------------------/ FORM NUMBER /----------------------- -->

    <!-- ----------------------- FORM SELECT ----------------------- -->
    <template v-else-if="!form.disabled && form.type === fieldTypes.select">
      <v-select
        v-model.trim="formValue"
        :reduce="
          (item) => form.foreign_value ? item[form.foreign_value] : item"
        :placeholder="placeholder || defaultPlaceholder(form)"
        :label="form.foreign_label"
        :options="datasetList[form.foreign_dataset]"
        @search:focus="storageLoadDataSet(form)"
      >
      </v-select>
    </template>
    <!-- -----------------------/ FORM SELECT /----------------------- -->

    <!-- ----------------------- FORM SELECT_MULTI ----------------------- -->
    <template
      v-else-if="!form.disabled && form.type === fieldTypes.select_multi"
    >
      <v-select
        v-model.trim="formValue"
        :reduce="
          (item) => form.foreign_value ? item[form.foreign_value] : item"
        :placeholder="placeholder || defaultPlaceholder(form)"
        :label="form.foreign_label"
        :options="datasetList[form.foreign_dataset]"
        multiple
        @search:focus="storageLoadDataSet(form)"
      />
    </template>
    <!-- -----------------------/ FORM SELECT_MULTI /----------------------- -->

    <!-- ----------------------- FORM SELECT:OWN ----------------------- -->
    <template v-else-if="!form.disabled && form.type === fieldTypes.select_own">
      <v-select
        v-model.trim="formValue"
        :reduce="
          (item) => form.foreign_value ? item[form.foreign_value] : item"
        :placeholder="placeholder || defaultPlaceholder(form)"
        :label="form.foreign_label"
        :options="translateForeignValues(form.foreign_values)"
      />
    </template>
    <!-- -----------------------/ FORM SELECT:OWN /----------------------- -->

    <!-- ----------------------- FORM SELECT_MANY:OWN ----------------------- -->
    <template
      v-else-if="!form.disabled && form.type === fieldTypes.select_multi_own"
    >
      <v-select
        v-model.trim="formValue"
        :reduce="
          (item) => form.foreign_value ? item[form.foreign_value] : item"
        :placeholder="placeholder || defaultPlaceholder(form)"
        :label="form.foreign_label"
        :options="translateForeignValues(form.foreign_values)"
        multiple
      />
    </template>
    <!-- -----------------------/ FORM SELECT_MANY:OWN /----------------------- -->

    <!-- ----------------------- FORM SELECT:PRELOAD ----------------------- -->
    <template
      v-else-if="!form.disabled && form.type === fieldTypes.select_preload"
    >
      <v-select
        v-model.trim="formValue"
        :reduce="
          (item) => form.foreign_value ? item[form.foreign_value] : item"
        :placeholder="placeholder || defaultPlaceholder(form)"
        :label="form.foreign_label"
        :options="localDatasetList[form.foreign_dataset]"
        @search:focus="localLoadDataset(form)"
      />
    </template>
    <!-- -----------------------/ FORM SELECT:PRELOAD /----------------------- -->

    <!-- ----------------------- FORM SELECT:SEARCH ----------------------- -->
    <template
      v-else-if="!form.disabled && form.type === fieldTypes.select_search"
    >
      <v-select
        v-model.trim="formValue"
        :reduce="
          (item) => form.foreign_value ? item[form.foreign_value] : item"
        :placeholder="placeholder || defaultPlaceholder(form)"
        :label="form.foreign_label"
        :options="searchDataset[form.foreign_dataset]"
        @search:focus="setCurrentField(form)"
        @search="fetchSearch"
      />
    </template>
    <!-- -----------------------/ FORM SELECT:SEARCH /----------------------- -->

    <!-- ----------------------- FORM AUTOCOMPLETE ----------------------- -->
    <template
      v-else-if="!form.disabled && form.type === fieldTypes.autocomplete"
    >
      <v-suggest
        v-model="formValue"
        :placeholder="placeholder || defaultPlaceholder(form)"
        :data="datasetList[form.foreign_dataset]"
        :show-field="form.foreign_label"
        @values="(data) => onSelect(data, form)"
        @focus="storageLoadDataSet(form)"
        @clear="clear()"
      />
    </template>
    <!-- -----------------------/ FORM AUTOCOMPLETE /----------------------- -->

    <!-- ----------------------- FORM AUTOCOMPLETE:PRELOAD ----------------------- -->
    <template
      v-else-if="
        !form.disabled && form.type === fieldTypes.autocomplete_preload
      "
    >
      <v-suggest
        v-model="formValue"
        :placeholder="placeholder || defaultPlaceholder(form)"
        :data="localDatasetList[form.foreign_dataset]"
        :show-field="form.foreign_label"
        @values="(data) => onSelect(data, form)"
        @focus="localLoadDataset(form)"
        @clear="clear()"
      />
    </template>
    <!-- -----------------------/ FORM AUTOCOMPLETE:PRELOAD /----------------------- -->

    <!-- ----------------------- FORM AUTOCOMPLETE:SEARCH ----------------------- -->
    <template
      v-else-if="!form.disabled && form.type === fieldTypes.autocomplete_search"
    >
      <v-suggest
        v-model="formValue"
        :placeholder="placeholder || defaultPlaceholder(form)"
        :data="searchDataset[form.foreign_dataset]"
        :show-field="form.foreign_label"
        @values="(data) => onSelect(data, form)"
        @search="(text) => search(text, form)"
        @clear="clear()"
      />
    </template>
    <!-- -----------------------/ FORM AUTOCOMPLETE:SEARCH /----------------------- -->

    <!-- ----------------------- FORM MULTI-SELECT ----------------------- -->
    <template
      v-else-if="!form.disabled && form.type === fieldTypes.multi_select"
    >
      <multiselect
        v-model.trim="formValue"
        :placeholder="placeholder || defaultPlaceholder(form)"
        :options="datasetList[form.foreign_dataset]"
        :label="form.foreign_label"
        :value="form.foreign_value"
        :selectLabel="$t('form.label.selectItem')"
        :selectedLabel="$t('form.label.selectedItem')"
        :deselectLabel="$t('form.label.deselectItem')"
        :tagPlaceholder="$t('form.label.addNewPokazatel')"
        multiple
        track-by="name"
        @open="storageLoadDataSet(form)"
      />
    </template>
    <!-- -----------------------/ FORM MULTI-SELECT /----------------------- -->

    <!-- ----------------------- FORM MULTI-SELECT-TAG ----------------------- -->
    <template
      v-else-if="!form.disabled && form.type === fieldTypes.multi_select_tag"
    >
      <multiselect
        v-model="formValue"
        :options="datasetList[form.foreign_dataset]"
        :label="form.foreign_label"
        :placeholder="placeholder || defaultPlaceholder(form)"
        :selectLabel="$t('form.label.selectItem')"
        :selectedLabel="$t('form.label.selectedItem')"
        :deselectLabel="$t('form.label.deselectItem')"
        :tagPlaceholder="$t('form.label.addNewPokazatel')"
        multiple
        taggable
        track-by="name"
        @open="storageLoadDataSet(form)"
        @tag="(tag) => addNewTag(tag, form)"
      />
    </template>
    <!-- -----------------------/ FORM MULTI-SELECT-TAG /----------------------- -->

    <!-- ----------------------- FORM MULTI-SELECT:PRELOAD ----------------------- -->
    <template
      v-else-if="
        !form.disabled && form.type === fieldTypes.multi_select_preload
      "
    >
      <multiselect
        v-model.trim="formValue"
        :placeholder="placeholder || defaultPlaceholder(form)"
        :options="localDatasetList[form.foreign_dataset]"
        :label="form.foreign_label"
        :value="form.foreign_value"
        :selectLabel="$t('form.label.selectItem')"
        :selectedLabel="$t('form.label.selectedItem')"
        :deselectLabel="$t('form.label.deselectItem')"
        :tagPlaceholder="$t('form.label.addNewPokazatel')"
        multiple
        track-by="name"
        @open="localLoadDataset(form)"
      />
    </template>
    <!-- -----------------------/ FORM MULTI-SELECT:PRELOAD /----------------------- -->
    <!-- ----------------------- FORM DATE ----------------------- -->
    <template v-else-if="!form.disabled && form.type === fieldTypes.date">
      <v-date-picker
        v-model="formValue"
        :placeholder="placeholder || defaultPlaceholder(form)"
        :attributes="dateAttrs"
        :locale="{
          id: 'ru-RU',
          firstDayOfWeek: 2,
          masks: { weekdays: 'WW' },
        }"
      />
    </template>
    <!-- -----------------------/ FORM DATE /----------------------- -->
    <!-- ----------------------- FORM DATETIME ----------------------- -->
    <template v-else-if="!form.disabled && form.type === fieldTypes.datetime">
      <v-datetime-picker
        v-model="formValue"
        :placeholder="placeholder || defaultPlaceholder(form)"
        :show-second="false"
        format="DD.MM.YYYY HH:mm"
        lang="ru"
        type="datetime"
      />
    </template>
    <!-- -----------------------/ FORM DATETIME /----------------------- -->

    <!-- ----------------------- FORM MASK ----------------------- -->
    <template v-else-if="!form.disabled && form.type === fieldTypes.input_mask">
      <imask-input
        v-model="formValue"
        :mask="inputMask[form.mask.name] || form.mask.custom"
        :unmask="true"
        :placeholder="placeholder || defaultPlaceholder(form)"
        class="form-control"
        @accept="maskOnAccept"
      />
    </template>
    <!-- -----------------------/ FORM MASK /----------------------- -->
  </div>
</template>
<script>
import CrudFieldMixin from '~/components/crud/CrudFieldMixin'
export default {
  mixins: [CrudFieldMixin]
}
</script>
