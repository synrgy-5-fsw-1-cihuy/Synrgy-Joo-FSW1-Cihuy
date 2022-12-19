const Footer = () => {
  return (
    <footer class="pb-5">
      <div class="container">
        <div class="row pt-2">
          <div class="col-12 col-lg-3 px-4">
            <p class="">Jalan Suroyo No. 161 Mayangan Kota Probolonggo 672000</p>
            <p class="">binarcarrental@gmail.com</p>
            <p class="">081-233-334-808</p>
          </div>
          <div class="col-12 col-lg-3 px-4">
            <ul class="nav flex-column">
              <li class="nav-item">
                <a class="nav-link p-0 mb-3 fs-5 text-dark fw-bold" href="#our-services">
                  Our Service
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link p-0 mb-3 fs-5 text-dark fw-bold" href="#why-us">
                  Why Us
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link p-0 mb-3 fs-5 text-dark fw-bold" href="#testimonials">
                  Testimonial
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link p-0 mb-3 fs-5 text-dark fw-bold" href="#faq">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div class="col-12 col-lg-3 px-4">
            <p class="">Connect With Us</p>
            <div class="d-flex mb-3">
              <div class="">
                <a class="me-2">
                  {" "}
                  <img src="/icons/icon_facebook.png" alt="" />
                </a>
                <a class="mx-2">
                  {" "}
                  <img src="/icons/icon_instagram.png" alt="" />
                </a>
                <a class="mx-2">
                  {" "}
                  <img src="/icons/icon_twitter.png" alt="" />
                </a>
                <a class="mx-2">
                  {" "}
                  <img src="/icons/icon_mail.png" alt="" />
                </a>
                <a class="mx-2">
                  {" "}
                  <img src="/icons/icon_twitch.png" alt="" />
                </a>
              </div>
            </div>
          </div>
          <div class="col-12 col-lg-3 px-4">
            <p>Copyright Binar 2022</p>
            <h3>Challenge-01</h3>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
