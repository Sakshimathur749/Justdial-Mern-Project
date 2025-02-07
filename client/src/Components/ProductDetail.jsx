import React, { useState,useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import '../css/common.css'
import '../css/components.css'

const ProductDetail = ({ slug }) => {
  const [activeTab, setActiveTab] = useState('rating');
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0); 
  const [name, setName] = useState('');   
  const [email, setEmail] = useState('');  
  const [mobileNo, setMobileNo] = useState('');
  const [error, setError ] = useState(''); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const handleTabClick = (tab) => {
    setActiveTab(tab); 
  };
  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${slug}`);
        if (!response.ok) {
          throw new Error('Product not found');
        }
        const data = await response.json();
        setProduct(data);
        const reviewResponse = await fetch(`http://localhost:5000/api/review/slug/${slug}`);
    if (!reviewResponse.ok) {
      if (reviewResponse.status === 404) {
        setReviews([]); 
        return;
      }
      throw new Error('No reviews found');
    }
    const reviewData = await reviewResponse.json();
    setReviews(reviewData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [slug]); 
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!rating || !review || !name || !email || !mobileNo) {
      setError("All fields are required.");
      return;
    }
  
    const newReview = {
      slug,
      rating,
      comment: review, 
      name,
      email,
      phoneNumber: mobileNo,
    };
    console.log("New Review: ", newReview);  
    try {
      const response = await fetch("http://localhost:5000/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReview),
      });
  
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Review submission failed: Product not found.");
        } else {
          throw new Error("Failed to submit the review.");
        }
      }
      const data = await response.json();
      setReviews((prevReviews) => [...prevReviews, data]);  
      setRating(0);
      setReview('');
      setName('');
      setEmail('');
      setMobileNo('');
      setError('');
      setSuccess("Your review was successfully submitted!");
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    } catch (error) {
      setError(error.message);
      setSuccess(''); 
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>No product data available.</div>;
  } 
  const totalImages = product.productImages.length;
  const getVisibleImages = () => {
    if (window.innerWidth <= 576) {
      return 1; 
    } else if (window.innerWidth <= 768) {
      return 4; 
    } else {
      return 6; 
    }
  };
  
  const visibleImages = getVisibleImages();
  const displayedImages = product.productImages.slice(0, visibleImages); 
  return (
    <div>
      <Container>
        <Row>
          <div className="col-sm-12">
            <div className="gallery_images">
            <div className="main-image">
                <img
                  src={`http://localhost:5173/src/images/uploads/productImages/${displayedImages[0]}`}
                  alt="Product" style={{objectFit:'contain'}}
                  className="img-fluid"
                />
              </div>

              <div className="other-images">
                {displayedImages.slice(1, visibleImages).map((image, index) => (
                  <div key={index} className="small-image">
                    <img src={`http://localhost:5173/src/images/uploads/productImages/${image}`} style={{objectFit:'contain'}} alt={`Image ${index + 1}`} />
                  </div>
                ))}

                {/* Display "X More" if there are more than the visible images */}
                {totalImages > visibleImages && (
                  <div className="small-image more-images">
                    {`+${totalImages - visibleImages} More`}
                  </div>
                )}
              </div>
            </div>
            <div className="p_detail_view">
              <div>
                <div className="product_detail_banner">
                  <div className="product_title etd d-flex justify-content-between">
                    <a >{product.title}</a>
                    <a ><svg xmlns="http://www.w3.org/2000/svg" height={20} width={20} viewBox="0 0 384 512"><path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"/></svg></a>
                  </div>

                  <div className="resta-rating-block12 d-flex gap-2 pb-3">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        xmlns="http://www.w3.org/2000/svg"
                        height={17}
                        width={17}
                        viewBox="0 0 576 512"
                      >
                        <path
                          fill={index < product.rating ? "#FFD700" : "#7f7f7f"}
                          d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
                        />
                      </svg>
                    ))}
                  </div>
                  <div className="p_details d-flex gap-5 py-2">
                    <div className="d-flex gap-3 py-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height={18}
                      width={18}
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"
                      />
                    </svg>
                    <span>{product.phoneNumber}</span>
                    </div>
                    <div className="d-flex gap-3 py-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height={18}
                      width={18}
                      viewBox="0 0 384 512"
                    >
                      <path
                        d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
                      />
                    </svg>{" "}
                    <span>
                      {product.location} (<a  href={`https://www.google.com/maps?q=${encodeURIComponent( product.location)}`}
                              target="_blank"
                              rel="nofollow noopener"> map</a>
                      )
                    </span>
                    </div>
                    <div className="d-flex gap-3 py-2">
                    <svg xmlns="http://www.w3.org/2000/svg" height={18} width={18} viewBox="0 0 448 512"><path d="M352 224c53 0 96-43 96-96s-43-96-96-96s-96 43-96 96c0 4 .2 8 .7 11.9l-94.1 47C145.4 170.2 121.9 160 96 160c-53 0-96 43-96 96s43 96 96 96c25.9 0 49.4-10.2 66.6-26.9l94.1 47c-.5 3.9-.7 7.8-.7 11.9c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-25.9 0-49.4 10.2-66.6 26.9l-94.1-47c.5-3.9 .7-7.8 .7-11.9s-.2-8-.7-11.9l94.1-47C302.6 213.8 326.1 224 352 224z"/></svg>
                    </div>
                  </div>
                  <div className="p_details py-2 d-flex flex-wrap gap-3 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height={18}
                      width={18}
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"
                      />
                    </svg>
                    <span>Tue - 1:15 PM - 1:15 PM</span>
                    <div className="add_det d-flex gap-3 ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height={18}
                        width={18}
                        viewBox="0 0 512 512"
                      >
                        <path
                          d="M51.7 295.1l31.7 6.3c7.9 1.6 16-.9 21.7-6.6l15.4-15.4c11.6-11.6 31.1-8.4 38.4 6.2l9.3 18.5c4.8 9.6 14.6 15.7 25.4 15.7c15.2 0 26.1-14.6 21.7-29.2l-6-19.9c-4.6-15.4 6.9-30.9 23-30.9l2.3 0c13.4 0 25.9-6.7 33.3-17.8l10.7-16.1c5.6-8.5 5.3-19.6-.8-27.7l-16.1-21.5c-10.3-13.7-3.3-33.5 13.4-37.7l17-4.3c7.5-1.9 13.6-7.2 16.5-14.4l16.4-40.9C303.4 52.1 280.2 48 256 48C141.1 48 48 141.1 48 256c0 13.4 1.3 26.5 3.7 39.1zm407.7 4.6c-3-.3-6-.1-9 .8l-15.8 4.4c-6.7 1.9-13.8-.9-17.5-6.7l-2-3.1c-6-9.4-16.4-15.1-27.6-15.1s-21.6 5.7-27.6 15.1l-6.1 9.5c-1.4 2.2-3.4 4.1-5.7 5.3L312 330.1c-18.1 10.1-25.5 32.4-17 51.3l5.5 12.4c8.6 19.2 30.7 28.5 50.5 21.1l2.6-1c10-3.7 21.3-2.2 29.9 4.1l1.5 1.1c37.2-29.5 64.1-71.4 74.4-119.5zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm144.5 92.1c-2.1 8.6 3.1 17.3 11.6 19.4l32 8c8.6 2.1 17.3-3.1 19.4-11.6s-3.1-17.3-11.6-19.4l-32-8c-8.6-2.1-17.3 3.1-19.4 11.6zm92-20c-2.1 8.6 3.1 17.3 11.6 19.4s17.3-3.1 19.4-11.6l8-32c2.1-8.6-3.1-17.3-11.6-19.4s-17.3 3.1-19.4 11.6l-8 32zM343.2 113.7c-7.9-4-17.5-.7-21.5 7.2l-16 32c-4 7.9-.7 17.5 7.2 21.5s17.5 .7 21.5-7.2l16-32c4-7.9 .7-17.5-7.2-21.5z"
                        />
                      </svg>
                      <a href="" target="_blank">
                        {" "}
                        {product.websiteUrl}
                      </a>
                    </div>

                    <div className="enquiry">
                      <a
                        className="d-flex gap-3"
                        data-toggle="modal"
                        data-target="#enquiry"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height={18}
                          width={18}
                          viewBox="0 0 512 512"
                        >
                          <path
                            d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"
                          />
                        </svg>{" "}
                        Send Enquiry By Email
                      </a>
                    </div>
                  </div>
                  {/* <div className="p_details lst">
                    <span>
                      <a
                        className="d-flex gap-3 "
                        href=""
                        style={{ borderRight: "0", display: "inline-block" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height={18}
                          width={18}
                          viewBox="0 0 512 512"
                        >
                          <path
                            d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
                          />
                        </svg>
                        <span> Add to favorites</span>
                      </a>
                    </span>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="tours-detail-tab">
              <div
                id="dash_tab"
                style={{
                  background: "rgb(255, 255, 255)",
                  padding: "10px 13px",
                  border: "1px solid rgb(234, 234, 234)",
                  display: "block",
                  width: "100%",
                  margin: "0px",
                }}
              >
                <ul className="resp-tabs-list d-flex">
                  <li
                    id="rating"
                    className={`resp-tab-item ${
                      activeTab === "rating" ? "resp-tab-active" : ""
                    }`}
                    onClick={() => handleTabClick("rating")}
                    role="tab"
                  >
                    Reviews &amp; Ratings
                  </li>
                  <img
                    className="dash_line"
                    alt="line"
                    src="https://buyphpcode.com/justdialclone/assets/front/images/dash_menu_line.jpg"
                  />
                  <li
                    id="review"
                    className={`resp-tab-item ${
                      activeTab === "review" ? "resp-tab-active" : ""
                    }`}
                    onClick={() => handleTabClick("review")}
                    role="tab"
                  >
                    Add a Review{" "}
                  </li>
                  <img
                    className="dash_line"
                    alt="line"
                    src="https://buyphpcode.com/justdialclone/assets/front/images/dash_menu_line.jpg"
                  />
                  <li
                    className={`resp-tab-item ${
                      activeTab === "gallery" ? "resp-tab-active" : ""
                    }`}
                    onClick={() => handleTabClick("gallery")}
                    role="tab"
                  >
                    Gallery
                  </li>
                  <img
                    className="dash_line"
                    alt="line"
                    src="https://buyphpcode.com/justdialclone/assets/front/images/dash_menu_line.jpg"
                  />
                  <li
                    className={`resp-tab-item ${
                      activeTab === "about" ? "resp-tab-active" : ""
                    }`}
                    onClick={() => handleTabClick("about")}
                    role="tab"
                  >
                    About{" "}
                  </li>

                  <div className="clearfix"></div>
                </ul>
                <div className="resp-tabs-container">
                  {activeTab === "rating" && (
                    <div
                      id="review_rank"
                      className="resp-tab-content resp-tab-content-active"
                      style={{ display: "block" }}
                      aria-labelledby="tab_item-0"
                    >
                      <div className="rating_views">
                        <div className="rank_name">
                          <span>Excellent</span>
                          <div style={{ width: "50%" }}>&nbsp;</div>
                          50%
                        </div>
                        <div className="rank_name">
                          <span>Very Good</span>
                          <div style={{ width: "60%" }}>&nbsp;</div>
                          60%
                        </div>
                        <div className="rank_name">
                          <span>Good</span>
                          <div style={{ width: "30%" }}>&nbsp;</div>
                          30%
                        </div>
                        <div className="rank_name">
                          <span>Average</span>
                          <div style={{ width: "0%" }}>&nbsp;</div>
                          0%
                        </div>
                        <div className="rank_name">
                          <span>Poor</span>
                          <div style={{ width: "0%" }}>&nbsp;</div>
                          0%
                        </div>
                      </div>
                      <div className="rating_views_main-dv">
                      {reviews.length > 0 ? (
                        reviews.map((review) => (
                            <div className="testimo-one">
                              <div className="img-div-testi">
                                <img
                                  src="https://buyphpcode.com/justdialclone/assets/front/images/testi-user.png"
                                  alt=""
                                />
                              </div>
                              <div className="testimo-content">
                                <div className="user-name-testio">
                                  {review.name}
                                </div>
                                <div className="testimo-user-mess">
                                  {review.comment}
                                </div>
                                <div className="acad-rating-block">
                                  <span className="stars-block resta-rating-block d-flex gap-1 pb-3 justify-content-center">
                                    {[...Array(5)].map((_, index) => (
                                      <svg
                                        key={index}
                                        xmlns="http://www.w3.org/2000/svg"
                                        height={20}
                                        width={20}
                                        viewBox="0 0 576 512"
                                        fill={
                                          index < review.rating
                                            ? "#f39c12"
                                            : "#7f7f7f"
                                        }
                                      >
                                        <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                                      </svg>
                                    ))}
                                  </span>
                                  <span className="label-block">
                                    {new Date(
                                      review.createdAt
                                    ).toLocaleDateString()}
                                  </span>
                                  <div className="clearfix"></div>
                                </div>
                              </div>
                              <div className="clearfix"></div>
                            </div>
                        ))
                      ) : (
                        <p>No reviews yet.</p>
                      )}
                      </div>
                    </div>
                  )}
                  {activeTab === "review" && (
                    <div
                      id="review_rating"
                      className="resp-tab-content resp-tab-content-active"
                      aria-labelledby="tab_item-1"
                    >
                      <div className="write-review-main" id="review_id">
                        <div className="write-review-head">Write a Review</div>
                        {success && (
                          <div className="popup success">
                            <p>{success}</p>
                          </div>
                        )}
                        {error && (
                          <div className="popup error">
                            <p>{error}</p>
                          </div>
                        )}
                        <form
                          className="form-horizontal"
                          id="review-form"
                          onSubmit={handleSubmit}
                          method="POST"
                        >
                          <input type="hidden" name="_token" />
                          <div className="review-title" id="review_set">
                            <div className="your-rating">
                              {" "}
                              <label>Your rating:</label>
                              <div>
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <span
                                    key={star}
                                    onClick={() => handleRatingChange(star)}
                                    style={{
                                      cursor: "pointer",
                                      color: rating >= star ? "gold" : "gray",
                                    }}
                                  >
                                    ★
                                  </span>
                                ))}{" "}
                              </div>
                            </div>
                            <div className="clearfix"></div>
                          </div>

                          <div className="review-title">
                            <div className="title-review">Add review</div>
                            <div className="title-rev-field">
                              <textarea
                                className="message-review"
                                rows=""
                                cols=""
                                name="comment"
                                id="review"
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                placeholder="Add your review"
                              ></textarea>
                            </div>
                            <div className="clearfix"></div>
                          </div>
                          <div className="review-title">
                            <div className="title-review">Name</div>
                            <div className="title-rev-field">
                              <input
                                type="text"
                                name="name"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Your name"
                              />
                            </div>
                            <div className="clearfix"></div>
                          </div>
                          <div className="review-title">
                            <div className="title-review">Mobile Number</div>
                            <div className="title-rev-field">
                              <div className="input-group">
                                <div className="input-group-addon">+91</div>
                                <input
                                  type="text"
                                  name="mobile_no"
                                  id="mobile_no"
                                  className="form-control"
                                  value={mobileNo}
                                  onChange={(e) => setMobileNo(e.target.value)}
                                  placeholder="Your mobile number"
                                />
                              </div>
                            </div>
                            <div className="clearfix"></div>
                          </div>
                          <div className="review-title">
                            <div className="title-review">Email Id</div>
                            <div className="title-rev-field">
                              <input
                                type="text"
                                name="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Your email"
                              />
                            </div>
                            <div className="clearfix"></div>
                          </div>
                          <div className="submit-btn">
                            <button
                              type="submit"
                              name="submit_review"
                              id="submit_review"
                            >
                              SUBMIT REVIEW
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                  {activeTab === "gallery" && product.gallery && (
                    <div
                      id="gallery"
                      className="resp-tab-content resp-tab-content-active"
                      aria-labelledby="tab_item-2"
                    >
                      <div className="gallery_view">
                        <div className="gallery">
                            {product.gallery.map((image, index) => (
                          <div className="prod_img" key={index}>
                              <a
                                href={`http://localhost:5173/src/images/uploads/gallery/${image}`}
                                key={index}
                                className="gal img_inner" 
                              >
                                <img
                                  src={`http://localhost:5173/src/images/uploads/gallery/${image}`}
                                  alt={`Gallery image ${index + 1}`} style={{objectFit:'contain'}}
                                />
                              </a>
                          </div>
                            ))}
                        </div>
                        <div className="clr"></div>
                      </div>
                    </div>
                  )}
                  {activeTab === "about" && product.about && (
                    <div
                      className="resp-tab-content resp-tab-content-active"
                      aria-labelledby="tab_item-3"
                    >
                      <div
                        className="company_info "
                        style={{ textAlign: "justify" }}
                      ></div>
                      {product.about ? (
                        <div
                          dangerouslySetInnerHTML={{ __html: product.about }}
                        />
                      ) : (
                        <p color="#434343">No description available</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <br />
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default ProductDetail;