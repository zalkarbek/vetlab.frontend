<template>
  <div class="page-personal-add">
    <div
      class="d-sm-flex align-items-center justify-content-between mg-b-20 mg-lg-b-25 mg-xl-b-30"
    >
      <div>
        <h4 class="mg-b-0 tx-spacing--1 mg-b-7">Персонал</h4>
        <b-button-group>
          <b-button variant="primary">
            <i class=" fal fa-users" />
            Список персоналов
          </b-button>
          <b-button variant="success">
            <i class=" fal fa-user-plus" />
            Добавление персонала
          </b-button>
        </b-button-group>
      </div>
      <div class=" d-sm-block d-lg-block d-md-block"></div>
    </div>
    <b-row class="mg-t-20 row-xs">
      <b-col cols="12">
        <div class="col-sm-12 col-lg-6 mg-t-10">
          <div class="card card-body">
            <h4>Добавление персонала</h4>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputEmail4">Email</label>
                <input
                  id="inputEmail4"
                  type="email"
                  class="form-control"
                  placeholder="Email"
                />
              </div>
              <div class="form-group col-md-6">
                <label for="inputPassword4">Password</label>
                <input
                  id="inputPassword4"
                  type="password"
                  class="form-control"
                  placeholder="Password"
                />
              </div>
            </div>
            <div class="form-group">
              <label for="inputAddress">Address</label>
              <input
                id="inputAddress"
                type="text"
                class="form-control"
                placeholder="1234 Main St"
              />
            </div>
            <div class="form-group">
              <label for="inputAddress2">Address 2</label>
              <input
                id="inputAddress2"
                type="text"
                class="form-control"
                placeholder="Apartment, studio, or floor"
              />
            </div>
            <div class="form-row">
              <div class="form-group col-md-5">
                <label>Birthday</label>
                <select class="custom-select">
                  ...
                </select>
              </div>
              <div class="form-group col-md-3 d-flex align-items-end">
                <select class="custom-select">
                  ...
                </select>
              </div>
              <div class="form-group col-md-4 d-flex align-items-end">
                <select class="custom-select">
                  ...
                </select>
              </div>
            </div>
            <div class="form-group">
              <div class="custom-control custom-checkbox">
                <input
                  id="customCheck1"
                  type="checkbox"
                  class="custom-control-input"
                />
                <label class="custom-control-label" for="customCheck1"
                  >Agree with Terms of Use and Privacy Policy</label
                >
              </div>
            </div>
            <b-button-group>
              <b-button variant="success">
                <i class=" fal fa-save" />
                Сохранить
              </b-button>
              <b-button variant="danger">
                <i class=" fal fa-trash-alt" />
                Очистить
              </b-button>
            </b-button-group>
          </div>
        </div>
      </b-col>
    </b-row>
    <div class="footer-full-content"></div>
  </div>
</template>
<script>
export default {}
</script>
