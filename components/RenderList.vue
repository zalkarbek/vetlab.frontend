<template>
  <div class="card card-body">
    <h4>{{ $t('list', { name: $t(`${restData.modelName}.title`) }) }}</h4>
    <b-table
      :items="recordsLists"
      :fields="fields"
      striped
      responsive
      small
      bordered
      hover
    >
      <template v-slot:cell(actions)="row">
        <b-button-toolbar>
          <b-button-group class="mr-1" size="sm">
            <b-button
              @click="onAction('edit-item', row.item)"
              variant="primary"
              title="Edit"
            >
              <i class="far fa-edit cursor-pointer" aria-hidden="true"></i>
            </b-button>
            <b-button
              @click="onAction('delete-item', row.item)"
              variant="danger"
              title="Delete"
            >
              <i class="far fa-trash-alt cursor-pointer" aria-hidden="true"></i>
            </b-button>
          </b-button-group>
        </b-button-toolbar>
      </template>
    </b-table>
  </div>
</template>
<script>
export default {
  model: {
    prop: 'records',
    event: 'change'
  },
  props: {
    restData: {
      type: Object,
      default() {
        return {}
      }
    },
    records: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    recordsLists() {
      return this.records
    },
    fields() {
      const id = {
        key: 'id',
        label: this.$t('form.field.id')
      }
      const actions = {
        key: 'actions',
        label: '#'
      }
      const list = this.restData.fields.map((item) => {
        return {
          key: item.key,
          label: this.$t(`form.label.${item.key}`)
        }
      })
      return [id, ...list, actions]
    }
  },

  methods: {
    onAction(action, data) {
      if (action === 'edit-item') {
        this.onEditSelect(data)
      } else if (action === 'delete-item') {
        this.onDelete(data)
      }
    },
    onEditSelect(data) {
      this.$emit('on-edit', data)
    },
    onDelete(data) {
      this.$emit('on-delete', data)
    }
  }
}
</script>
