<template>
  <div class="d-none d-lg-flex pos-relative">
    <div class="mx-lg-wd-500 mx-xl-wd-550">
      <div class="d-sm-flex align-items-center justify-content-between">
        <div class="col-sm-6">
          <h4 class="mg-b-0">Последние новости</h4>
        </div>
        <div class="col-sm-6 search-form mg-t-20 mg-sm-t-0">
          <input type="search" class="form-control" placeholder="Поиск" />
          <button class="btn" type="button">
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
              class="feather feather-search"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
      </div>
      <!--СПИСОК НОВОСТЕЙ-->
      <hr />
      <div class=" news-lists container pd-x-0 pd-lg-x-10 pd-xl-x-0">
        <div class="media d-block d-lg-flex">
          <div class="media-body">
            <div class="timeline-group tx-13">
              <div class="timeline-label">Сегодня</div>
              <div class="timeline-item">
                <div class="timeline-time">10:30pm</div>
                <div class="timeline-body">
                  <h6 class="mg-b-0">Building a Simple User Interface</h6>
                  <p><a href="">Elisse Joson</a> San Francisco, CA</p>

                  <p>
                    In this lesson, you create a layout in XML that includes a
                    text field and a button. In the next lesson, your app
                    responds when the
                  </p>
                  <nav class="nav nav-row mg-t-15">
                    <a href="" class="nav-link">Like</a>
                    <a href="" class="nav-link">Comment</a>
                  </nav>
                </div>
                <!-- timeline-body -->
              </div>

              <div class="timeline-item">
                <div class="timeline-time">08:15pm</div>
                <div class="timeline-body">
                  <h6 class="mg-b-0">Blueberry Cheesecake Dessert Recipe</h6>
                  <p><a href="">Katherine Lumaad</a> Oakland, CA</p>

                  <p>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit.
                    Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                    natoque penatibus et magnis dis parturient montes.
                  </p>

                  <a href="" class="d-block wd-lg-50p"
                    ><img
                      src="https://via.placeholder.com/1000x667"
                      class="img-fluid"
                      alt=""
                  /></a>

                  <nav class="nav nav-row mg-t-15">
                    <a href="" class="nav-link">Like</a>
                    <a href="" class="nav-link">Comment</a>
                  </nav>
                </div>
                <!-- timeline-body -->
              </div>

              <div class="timeline-item">
                <div class="timeline-time">03:30pm</div>
                <div class="timeline-body">
                  <h6 class="mg-b-0">
                    Your Finances Don't Have to Be Perfect to Work
                  </h6>
                  <p><a href="">Elisse Joson</a> San Francisco, CA</p>

                  <p>
                    In this lesson, you create a layout in XML that includes a
                    text field and a button. In the next lesson, your app
                    responds when the lorem ipsum dolor sit amet, consectetuer
                    adipiscing elit. Aenean commodo ligula eget dolor. Aenean
                    massa. Cum sociis natoque penatibus et magnis dis parturient
                    montes.
                  </p>
                  <nav class="nav nav-row mg-t-15">
                    <a href="" class="nav-link">Like</a>
                    <a href="" class="nav-link">Comment</a>
                  </nav>
                </div>
                <!-- timeline-body -->
              </div>

              <div class="timeline-label">Вчера</div>
              <div class="timeline-item">
                <div class="timeline-time">06:30pm</div>
                <div class="timeline-body">
                  <h6 class="mg-b-0">
                    An Engineer Explains Why You Should Always Order the Larger
                    Pizza
                  </h6>
                  <p><a href="">Elisse Joson</a> San Francisco, CA</p>

                  <p>
                    Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                    natoque penatibus et magnis dis parturient montes.
                  </p>

                  <div class="row row-xs">
                    <div class="col">
                      <img
                        src="https://via.placeholder.com/500"
                        class="img-fluid"
                        alt=""
                      />
                    </div>
                    <div class="col">
                      <img
                        src="https://via.placeholder.com/500x281"
                        class="img-fluid"
                        alt=""
                      />
                    </div>
                  </div>

                  <nav class="nav nav-row mg-t-15">
                    <a href="" class="nav-link">Like</a>
                    <a href="" class="nav-link">Comment</a>
                  </nav>
                </div>
                <!-- timeline-body -->
              </div>

              <div class="timeline-item">
                <div class="timeline-time">01:15pm</div>
                <div class="timeline-body">
                  <h6 class="mg-b-0">
                    The Strange Persistence of First Languages
                  </h6>
                  <p><a href="">Elisse Joson</a> San Francisco, CA</p>

                  <p>
                    In this lesson, you create a layout in XML that includes a
                    text field and a button. In the next lesson, your app
                    responds when the world.
                  </p>
                  <nav class="nav nav-row mg-t-15">
                    <a href="" class="nav-link">Like</a>
                    <a href="" class="nav-link">Comment</a>
                  </nav>
                </div>
                <!-- timeline-body -->
              </div>

              <div class="timeline-label">Март 12, 2020</div>
              <div class="timeline-item">
                <div class="timeline-time">11:45am</div>
                <div class="timeline-body">
                  <h6 class="mg-b-0">
                    How to Win Your Next Political Argument
                  </h6>
                  <p><a href="">Elisse Joson</a> San Francisco, CA</p>

                  <p>
                    Aenean commodo ligula eget dolor. Aenean massa. Cum sociis
                    natoque penatibus et magnis dis parturient montes.
                  </p>
                  <p>
                    In this lesson, you create a layout in XML that includes a
                    text field and a button. In the next lesson, your app
                    responds when the world.In this lesson, you create a layout
                    in XML that includes a text field and a button. In the next
                    lesson, your app responds when the world. In this lesson,
                    you create a layout in XML that includes a text field and a
                    button. In the next lesson, your app responds when the
                    world. In this lesson, you create a layout in XML that
                    includes a text field and a button. In the next lesson, your
                    app responds when the world. In this lesson, you create a
                    layout in XML that includes a text field and a button. In
                    the next lesson, your app responds when the world. In this
                    lesson, you create a layout in XML that includes a text
                    field and a button. In the next lesson, your app responds
                    when the world.
                  </p>
                  <nav class="nav nav-row mg-t-15">
                    <a href="" class="nav-link">Like</a>
                    <a href="" class="nav-link">Comment</a>
                  </nav>
                </div>
                <!-- timeline-body -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pos-absolute b-0 r-0 tx-12">
      <hr />
      Последнее обновление: <b>29.12.2019 15:30</b>
    </div>
  </div>
</template>
