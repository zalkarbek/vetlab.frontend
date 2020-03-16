export default ({ routePrefix }) => {
  return {
    fields: {
      method: 'GET',
      url: 'api/v1/option/model/fields'
    },

    all: {
      method: 'GET',
      url: `/api/v1/${routePrefix}`
    },

    create: {
      method: 'POST',
      url: `/api/v1/${routePrefix}/create`
    },

    update: {
      method: 'PUT',
      url: `/api/v1/${routePrefix}/update`
    },

    destroy: {
      method: 'DELETE',
      url: `/api/v1/${routePrefix}/destroy`
    },

    id: {
      method: 'GET',
      url: `/api/v1/${routePrefix}/:id`
    },

    idUpdate: {
      method: 'PUT',
      url: `/api/v1/${routePrefix}/:id`
    },
    idDestroy: {
      method: 'DELETE',
      url: `/api/v1/${routePrefix}/:id`
    }
  }
}
