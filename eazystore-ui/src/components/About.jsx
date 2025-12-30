import React from "react";
import PageTitle from "./PageTitle";

export default function About() {
  const h3Style = "h5 fw-semibold text-primary mb-2";
  const pStyle = "text-secondary";

  return (
    <div className="container min-vh-100 d-flex flex-column justify-content-start py-5">
      <div className="row justify-content-center">
        <div className="col-lg-9">
          {/* Page Title */}
          <PageTitle title="About Us" />

          {/* About Us Content */}
          <p className="mb-4 lh-base text-secondary text-center">
            <span className="fw-semibold text-primary">eazy sticker</span> store
            is an initiative by{" "}
            <span className="fw-semibold text-primary">
              Designs by eazybytes
            </span>
            , dedicated to offering you the most sought-after stickers and
            posters!
          </p>

          {/* Why Choose Us Section */}
          <h2 className="h3 fw-bold text-primary text-center mb-4">
            Why Choose Us?
          </h2>

          {/* Features */}
          <div className="d-flex flex-column gap-4">
            {/* Feature: Premium Quality */}
            <div>
              <h3 className={h3Style}>Premium Quality</h3>
              <p className={pStyle}>
                We strive to provide every customer with the utmost satisfaction
                by delivering high-quality vinyl stickers crafted with care and
                precision.
              </p>
            </div>

            {/* Feature: Product Innovation */}
            <div>
              <h3 className={h3Style}>Product Innovation</h3>
              <p className={pStyle}>
                Our vinyl stickers feature a premium matte or glossy finish
                lamination and are made with advanced adhesive technology.
                Designed to withstand all weather conditions and resist
                scratches, our stickers are gentle enough to preserve the
                surface of your beloved gadgets.
              </p>
            </div>

            {/* Feature: Excellent Service */}
            <div>
              <h3 className={h3Style}>Excellent Service</h3>
              <p className={pStyle}>
                Customer satisfaction is our top priority, and we’re committed
                to delivering an exceptional shopping experience.
              </p>
            </div>

            {/* Feature: Designs You’ll Love */}
            <div>
              <h3 className={h3Style}>Designs You’ll Love</h3>
              <p className={pStyle}>
                With over 1,000 designs, our collection ranges from relatable
                and seriously funny to delightfully quirky. And we’re just
                getting started—stay tuned for more exciting products and
                designs!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
