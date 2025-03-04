import React, { useEffect, useState } from "react";
import "../css/common.css";
import "../css/components.css";
import { Container, Row, Col} from "react-bootstrap";
import { Link, useParams } from "react-router";

const Product = () => {
  const {subcategory,category }= useParams()
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [subcategories, setSubcategories] = useState([]);
  const [showMap, setShowMap] = useState(false); 
  useEffect(() => {
    fetch(`http://localhost:5000/api/subcategories/${category}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Subcategories not found');
            }
            console.log(response.json())
            return response.json();
        })
        .then(data => {
          setSubcategories(Array.isArray(data) ? data : []); 
            setLoading(false);
        })
        .catch(error => {
            setError(error.message);
            setLoading(false);
        });
}, [subcategory]); 
useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/business/listing');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data); 
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);  
    }
  };
  fetchProducts();
}, []);

  useEffect(() => {
    if (subcategory) {
      const filtered = products.filter(product => 
          subcategory === product.subcategoryId
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [subcategory, products]);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div className="gry_container mb-5">
      <Container>
        <Row>
          <div className="search-term">
            <h1>Best Deals - Top Hotels in Dwarka Sector 11, Delhi</h1>
          </div>
        </Row>
        <Row>
          <Col lg="12">
            <div
              id="main-content"
              data-analytics='{"listing_page":1}'
              data-impressed="1"
            >
              <div id="search-filter-and-sort">
                <div className="sort">
                  Sort:
                  <a className="sort-selection" id="js-sort-toggle" href="#">
                    Default
                  </a>
                  <div className="sort-dropdown" id="js-sort-options">
                    <ul>
                      <li>
                        <a
                          className="ajax-sort"
                          data-sort="default"
                          data-analytics='{"click_id":1764}'
                          data-impressed="1"
                        >
                          Default
                        </a>
                      </li>
                      <li>
                        <a
                          className="ajax-sort"
                          data-sort="distance"
                          data-analytics='{"click_id":1764}'
                          data-impressed="1"
                        >
                          Distance
                        </a>
                      </li>
                      <li>
                        <a
                          className="ajax-sort"
                          data-sort="average_rating"
                          data-analytics='{"click_id":1764}'
                          data-impressed="1"
                        >
                          Rating
                        </a>
                      </li>
                      <li>
                        <a
                          className="ajax-sort"
                          data-sort="name"
                          data-analytics='{"click_id":1764}'
                          data-impressed="1"
                        >
                          Name (A - Z)
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div id="search-filters">
                  <header className="filters-component">
                    <section className="slim-filters">
                      <svg
                        className="hide"
                        xmlns="http://www.w3.org/2000/svg"
                        width="0"
                        height="0"
                        viewBox="0 0 0 0"
                      >
                        <symbol>
                          <g id="slider-icon">
                            <line
                              className="fliter-slider"
                              x1="0"
                              y1="2.5"
                              x2="3"
                              y2="2.5"
                            ></line>
                            <circle
                              className="fliter-slider"
                              cx="4"
                              cy="2.5"
                              r="1.5"
                            ></circle>
                            <line
                              className="fliter-slider"
                              x1="6"
                              y1="2.5"
                              x2="14"
                              y2="2.5"
                            ></line>
                            <line
                              className="fliter-slider"
                              x1="0"
                              y1="7.5"
                              x2="8"
                              y2="7.5"
                            ></line>
                            <circle
                              className="fliter-slider"
                              cx="9"
                              cy="7.5"
                              r="1.5"
                            ></circle>
                            <line
                              className="fliter-slider"
                              x1="11"
                              y1="7.5"
                              x2="14"
                              y2="7.5"
                            ></line>
                          </g>
                        </symbol>
                      </svg>
                      <div className="bar">
                        <div className="buttons">
                          <svg
                            className="hide"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 0 0"
                          >
                            <symbol>
                              <g
                                id="icon-map-view-button"
                                fill="#222"
                                fillRule="nonzero"
                              >
                                <path d="M16.469 7.437a.531.531 0 0 0-.532.531v6.016l-4.25 1.7v-5.59a.531.531 0 0 0-1.062 0v5.589l-4.25-1.7V5.566l2.462.985a.53.53 0 1 0 .394-.987l-3.18-1.273H6.05l-.009-.003a.527.527 0 0 0-.394 0l-.01.003L.334 6.413A.531.531 0 0 0 0 6.906v9.562a.532.532 0 0 0 .729.493l5.115-2.045 5.105 2.042h.001l.01.004a.527.527 0 0 0 .394 0l.01-.004 5.303-2.121a.535.535 0 0 0 .333-.494V7.968a.531.531 0 0 0-.531-.531zM5.312 13.983l-4.25 1.7V7.265l4.25-1.7v8.418zM13.281 2.125c-.878 0-1.594.715-1.594 1.594 0 .878.716 1.593 1.594 1.593.879 0 1.594-.715 1.594-1.593 0-.88-.715-1.594-1.594-1.594zm0 2.125a.531.531 0 1 1 0-1.063.531.531 0 0 1 0 1.063z"></path>
                                <path d="M13.281 0a3.723 3.723 0 0 0-3.719 3.719c0 1.908 2.984 5.287 3.324 5.667a.534.534 0 0 0 .79 0c.34-.38 3.324-3.76 3.324-5.667A3.723 3.723 0 0 0 13.281 0zm0 8.22c-1.16-1.376-2.656-3.488-2.656-4.501a2.66 2.66 0 0 1 2.656-2.657 2.66 2.66 0 0 1 2.656 2.657c0 1.012-1.495 3.125-2.656 4.501z"></path>
                              </g>
                            </symbol>
                          </svg>
                          <a
                            className="map-view-button"
                            href=""
                            data-analytics='{"click_id":1233}'
                            data-impressed="1"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height={17}
                              width={17}
                              viewBox="0 0 576 512"
                            >
                              <path d="M384 476.1L192 421.2l0-385.3L384 90.8l0 385.3zm32-1.2l0-386.5L543.1 37.5c15.8-6.3 32.9 5.3 32.9 22.3l0 334.8c0 9.8-6 18.6-15.1 22.3L416 474.8zM15.1 95.1L160 37.2l0 386.5L32.9 474.5C17.1 480.8 0 469.2 0 452.2L0 117.4c0-9.8 6-18.6 15.1-22.3z" />
                            </svg>
                            Map View
                          </a>
                          <a
                            className="map-view-button"
                            href="#"
                            data-analytics='{"click_id":1070}'
                            data-impressed="1"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              height={17}
                              width={17}
                              viewBox="0 0 512 512"
                            >
                              <path d="M0 416c0 17.7 14.3 32 32 32l54.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 448c17.7 0 32-14.3 32-32s-14.3-32-32-32l-246.7 0c-12.3-28.3-40.5-48-73.3-48s-61 19.7-73.3 48L32 384c-17.7 0-32 14.3-32 32zm128 0a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM320 256a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm32-80c-32.8 0-61 19.7-73.3 48L32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l246.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48l54.7 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-54.7 0c-12.3-28.3-40.5-48-73.3-48zM192 128a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm73.3-64C253 35.7 224.8 16 192 16s-61 19.7-73.3 48L32 64C14.3 64 0 78.3 0 96s14.3 32 32 32l86.7 0c12.3 28.3 40.5 48 73.3 48s61-19.7 73.3-48L480 128c17.7 0 32-14.3 32-32s-14.3-32-32-32L265.3 64z" />
                            </svg>
                            All
                          </a>
                          <label>
                            <input
                              className="filter"
                              type="checkbox"
                              name="actions"
                              value="order_online"
                              data-label="Order Online"
                              data-analytics='{"click_id":2470}'
                              data-impressed="1"
                            />
                            <span>Order Online</span>
                          </label>
                          <label>
                            <input
                              className="filter"
                              type="checkbox"
                              name="features"
                              value="GOOD_FOR_KIDS"
                              data-label="Kid Friendly"
                              data-analytics='{"click_id":2470}'
                              data-impressed="1"
                            />
                            <span>Kid Friendly</span>
                          </label>
                          <label>
                            <input
                              className="filter"
                              type="checkbox"
                              name="features"
                              value="COUPON"
                              data-label="Coupons"
                              data-analytics='{"click_id":2470}'
                              data-impressed="1"
                            />
                            <span>Coupons</span>
                          </label>
                        </div>
                      </div>
                      <div className="selected-filters"></div>
                    </section>
                  </header>
                </div>
              </div>
              <div className="custom-filters active">
                View all businesses that are{" "}
                <a
                  id="open24"
                  href=""
                  data-analytics='{"click_id":2470}'
                  data-impressed="1"
                >
                  OPEN 24 Hours
                </a>
                <span className="close"></span>
              </div>
              <section
                className="finder food-search-finder"
                data-analytics='{"module":"menu_search"}'
                data-impressed="1"
              >
                <form
                  className="search-dd"
                  id="food-search-form"
                >
                  <label>
                    Menu Search:
                    <input
                      className="menu-term"
                      id="menu-search-terms"
                      type="text"
                      value=""
                      autoComplete="off"
                      placeholder='"Fish Taco" "Caesar Salad" etc.'
                      name="menu_search_terms"
                    />
                  </label>
                  <ul
                    className="search-dropdown autosuggest-term"
                    id="menu-suggestions"
                  ></ul>
                  <input
                    className="menu-location"
                    type="hidden"
                    name="geo_location_terms"
                    value="Los Angeles, CA"
                  />
                  <button className="yellow-btn" type="submit" disabled="">
                    Find
                  </button>
                </form>
              </section>
              {filteredProducts.length>0?filteredProducts.map((product) => (
                <Link to={`/products/${product.slug}`}>
                  <div key={product._id} className="result" id="lid-3697726">
                    <div className="srp-listing clickable-area mdm">
                      <div className="v-card">
                        <div className="media-thumbnail">
                          <a className="media-thumbnail-wrapper photo" href="">
                            <img
                              alt={product.title}
                              src={`http://localhost:5173/src/images/uploads/image/${product.image}`}
                              width={130}
                              height={130} className="object-fit-contain w-100" 
                              style={{
                                height: "100%",
                              }}
                            />
                          </a>
                        </div>
                        <div className="info">
                          <div className="info-section info-primary">
                            <h2 className="n">
                              <a
                                className="business-name"
                                href={`/products/${product.slug}`}
                              >
                                <span>{product.title}</span>
                              </a>
                            </h2>
                            <div className="categories">
                              <a>{product.categoryId.slug}</a>
                            </div>
                            <div className="ratings">
                              <a className="rating hasExtraRating">
                                <div className="result-rating">
                                  {[...Array(5)].map((_, index) => (
                                    <svg
                                      key={index}
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 20 20"
                                      fill={
                                        index < product.rating
                                          ? "gold"
                                          : "lightgray"
                                      }
                                      width="16"
                                      height="16"
                                    >
                                      <path d="M10 15l-5.5 3.2 1.3-6.9-5-4.9 6.9-1 3-6 3 6 6.9 1-5 4.9 1.3 6.9z" />
                                    </svg>
                                  ))}
                                </div>
                                <span className="count">{product.rating}</span>
                              </a>
                            </div>
                            <div className="links">
                              <a
                                className="menu"
                                data-analytics='{"click_id":1614,"target":"menus","listing_features":"menu-link","adclick":true}'
                                data-impressed="1"
                              >
                                View Menu
                              </a>
                            </div>
                            <div className="badges"></div>
                            <div className="amenities">
                              <span>Amenities:</span>
                              <span className="amenities-icons">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 512 512"
                                  height={17}
                                  width={20}
                                  fill="#111"
                                >
                                  <path d="M192 96a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM120.5 247.2c12.4-4.7 18.7-18.5 14-30.9s-18.5-18.7-30.9-14C43.1 225.1 0 283.5 0 352c0 88.4 71.6 160 160 160c61.2 0 114.3-34.3 141.2-84.7c6.2-11.7 1.8-26.2-9.9-32.5s-26.2-1.8-32.5 9.9C240 440 202.8 464 160 464C98.1 464 48 413.9 48 352c0-47.9 30.1-88.8 72.5-104.8zM259.8 176l-1.9-9.7c-4.5-22.3-24-38.3-46.8-38.3c-30.1 0-52.7 27.5-46.8 57l23.1 115.5c6 29.9 32.2 51.4 62.8 51.4l5.1 0c.4 0 .8 0 1.3 0l94.1 0c6.7 0 12.6 4.1 15 10.4L402 459.2c6 16.1 23.8 24.6 40.1 19.1l48-16c16.8-5.6 25.8-23.7 20.2-40.5s-23.7-25.8-40.5-20.2l-18.7 6.2-25.5-68c-11.7-31.2-41.6-51.9-74.9-51.9l-68.5 0-9.6-48 63.4 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-76.2 0z" />
                                </svg>
                              </span>
                            </div>{" "}
                            <div className="snippet">
                              <span className="quote-icon"></span>
                              <p className="mb-0">{product.relevantTags}</p>
                            </div>
                          </div>
                          <div className="info-section info-secondary">
                            <div className="phones phone primary">
                              {product.phoneNumber}
                            </div>
                            <div className="adr">
                              <div className="street-address">
                                {product.address}
                              </div>
                            </div>
                            <div className="price-range">$</div>
                            <div className="open-status  open">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                                height={17}
                                style={{
                                  paddingBottom: "2px",
                                  marginRight: "5px",
                                }}
                                width={17}
                              >
                                <path d="M464 256A208 208 0 1 1 48 256a208 208 0 1 1 416 0zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z" />
                              </svg>
                              {product.status}
                            </div>
                          </div>
                          <div className="listing-ctas">
                            <a
                              className="action order-online"
                              data-analytics='{"adclick":true,"events":"event7,event6","category":"8004199","impression_id":"94f4da81-b7c8-416e-92aa-3c38295c5430","listing_id":"3697726","item_id":-1,"listing_type":"free","ypid":"3697726","content_provider":"MDM","srid":"L-webyp-fab686cd-54dc-436d-9f17-7e9e26114bd9-3697726","item_type":"SPM","lhc":"8004199","ldir":"LA","rate":4,"hasTripAdvisor":true,"mip_claimed_status":"mip_unclaimed","mip_ypid":"3697726","click_id":523,"listing_features":"orderonline"}'
                              rel="nofollow noopener"
                              target="_blank"
                              data-impressed="1"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 576 512"
                              >
                                <path d="M253.3 35.1c6.1-11.8 1.5-26.3-10.2-32.4s-26.3-1.5-32.4 10.2L117.6 192 32 192c-17.7 0-32 14.3-32 32s14.3 32 32 32L83.9 463.5C91 492 116.6 512 146 512L430 512c29.4 0 55-20 62.1-48.5L544 256c17.7 0 32-14.3 32-32s-14.3-32-32-32l-85.6 0L365.3 12.9C359.2 1.2 344.7-3.4 332.9 2.7s-16.3 20.6-10.2 32.4L404.3 192l-232.6 0L253.3 35.1zM192 304l0 96c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-96c0-8.8 7.2-16 16-16s16 7.2 16 16zm96-16c8.8 0 16 7.2 16 16l0 96c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-96c0-8.8 7.2-16 16-16zm128 16l0 96c0 8.8-7.2 16-16 16s-16-7.2-16-16l0-96c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                              </svg>
                              Order Online
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )):(
                <p>No products found for this subcategory</p>
              )}
            </div>
            <aside id="main-aside">
              <div className="categories_sect sidebar-nav">
                <div className="sidebar-brand">
                  Related Categories
                  <span className="spe_mobile">
                    <a ></a>
                  </span>
                </div>
                <div className="bor_head">&nbsp;</div>
                <ul className="spe_submobile">
                  {Array.isArray(subcategories) &&
                    subcategories.map((subcategory) => (
                      <li key={subcategory._id}>
                        <a >{subcategory.name}</a>
                      </li>
                    ))}
                </ul>
                <div className="clearfix"></div>
              </div>
            </aside>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Product;