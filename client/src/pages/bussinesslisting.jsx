// import React from "react";
// import SearchBanner from "../Components/SearchBanner";
// import { Container, Form, Row } from "react-bootstrap";
// import "../css/components.css";
// import '../css/common.css';

// const Bussinesslisting = () => {
//   return (
//     <div className="gry_container ">
//       <Container className="form-container py-4">
//         <Row id="claim-impression">
//           <div className="category-head">
//             <h3>Claim Your Listing</h3>
//             <span></span>
//           </div>
//         </Row>
//         <Row className="content">
//           <div>
//             <h3>Bussiness Details :</h3>
//           </div>
//           <Form>
//             <Form.Group className="mb-3" controlId="bussinessname">
//               <Form.Label>Bussiness Name</Form.Label>
//               <Form.Control type="text"
//                 name="name"
//                 placeholder="Enter your Bussiness Name"
//                 style={{ padding: "20px", fontWeight: "500" }}></Form.Control>
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="pincode">
//               <Form.Label>Pin Code</Form.Label>
//               <Form.Control type="number"
//                 name="pincode"
//                 placeholder="Pincode"
//                 style={{ padding: "20px", fontWeight: "500" }}></Form.Control>
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="address">
//               <Form.Label>Address</Form.Label>
//               <Form.Control type="address"
//                 name="address"
//                 placeholder="Address"
//                 style={{ padding: "20px", fontWeight: "500" }}></Form.Control>
//             </Form.Group>
//             <div className="d-flex gap-5 flex-wrap">
//               <Form.Group className="mb-3" controlId="city">
//                 <Form.Label>City</Form.Label>
//                 <Form.Control type="text"
//                   name="city"
//                   placeholder="City"
//                   style={{ padding: "20px", fontWeight: "500" }}></Form.Control>
//               </Form.Group>
//               <Form.Group className="mb-3" controlId="state">
//                 <Form.Label>State</Form.Label>
//                 <Form.Control type="text"
//                   name="state"
//                   placeholder="State"
//                   style={{ padding: "20px", fontWeight: "500" }}></Form.Control>
//               </Form.Group>
//               <Form.Group className="mb-3" controlId="category">
//                 <Form.Label>Categories</Form.Label>
//                 <Form.Control
//                   as="select"
//                   name="category"
//                   style={{ padding: '0px 10px', fontWeight: "500" }}
//                 >
//                   <option value="">Select Category</option> {/* Default option */}
//                   <option value="hotel">Hotel</option>
//                   <option value="restaurant">Restaurant</option>
//                   <option value="cafe">Cafe</option>
//                   <option value="shopping">Shopping</option>
//                   <option value="service">Service</option>
//                 </Form.Control>
//               </Form.Group>
//               <Form.Group className="mb-3" controlId="subcategory">
//                 <Form.Label>Subcategories</Form.Label>
//                 <Form.Control
//                   as="select"
//                   name="subcategory"
//                   style={{ padding: '0px 10px', fontWeight: "500" }}
//                 >
//                   <option value="">Select Subcategory</option> {/* Default option */}
//                   <option value="laptop">Laptop</option>
//                   <option value="mobile">Mobile</option>
//                   <option value="pizza">Pizza</option>
//                   <option value="burger">Burger</option>
//                   <option value="coke">Coke</option>
//                 </Form.Control>
//               </Form.Group>
//             </div>
//           </Form>
//         </Row>
//         <Row className="content">
//           <div>
//             <h3>Contact Details :</h3>
//           </div>
//           <Form>
//             <Form.Group className="mb-3" controlId="personname">
//               <Form.Label>Person Name</Form.Label>
//               <Form.Control type="text"
//                 name="personname"
//                 placeholder="Enter your  Name"
//                 style={{ padding: "20px", fontWeight: "500" }}></Form.Control>
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="mobilenumber">
//               <Form.Label>Mobile Number</Form.Label>
//               <Form.Control type="number"
//                 name="mobilenumber"
//                 placeholder="Enter Mobile Number"
//                 style={{ padding: "20px", fontWeight: "500" }}></Form.Control>
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="email">
//               <Form.Label>Email Address</Form.Label>
//               <Form.Control type="email"
//                 name="email"
//                 placeholder="Enter EMail"
//                 style={{ padding: "20px", fontWeight: "500" }}></Form.Control>
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="city">
//               <Form.Label>Opening Hour</Form.Label>
//               <div className="d-flex gap-5 flex-wrap">
//                 <Form.Group className="mb-3 d-flex gap-5" controlId="monday">
//                   <Form.Label><h6>Monday</h6></Form.Label>
//                   <div className="d-flex gap-2">
//                     <Form.Control type="time"
//                       name="open"
//                       placeholder="Opening Time"
//                       style={{ padding: "20px", fontWeight: "500" }}></Form.Control>
//                     <Form.Control type="time"
//                       name="close"
//                       placeholder="Closing"
//                       style={{ padding: "20px", fontWeight: "500" }}></Form.Control>
//                   </div>
//                 </Form.Group>
//                 <Form.Group className="mb-3 d-flex gap-5" controlId="tuesday">
//                   <Form.Label><h6>Tuesday</h6></Form.Label>
//                   <div className="d-flex gap-2">
//                     <Form.Control type="time"
//                       name="open"
//                       placeholder="Opening Time"
//                       style={{ padding: "20px", fontWeight: "500" }}></Form.Control>
//                     <Form.Control type="time"
//                       name="close"
//                       placeholder="Closing"
//                       style={{ padding: "20px", fontWeight: "500" }}></Form.Control>
//                   </div>
//                 </Form.Group>
//                 <Form.Group className="mb-3 d-flex gap-5" controlId="wednesday">
//                   <Form.Label><h6>WednesDay</h6></Form.Label>
//                   <div className="d-flex gap-2">
//                     <Form.Control type="time"
//                       name="open"
//                       placeholder="Opening Time"
//                       style={{ padding: "20px", fontWeight: "500" }}></Form.Control>
//                     <Form.Control type="time"
//                       name="close"
//                       placeholder="Closing"
//                       style={{ padding: "20px", fontWeight: "500" }}></Form.Control>
//                   </div>
//                 </Form.Group>
//                 <Form.Group className="mb-3 d-flex gap-5" controlId="thrusday">
//                   <Form.Label><h6>Thrusday</h6></Form.Label>
//                   <div className="d-flex gap-2">
//                     <Form.Control type="time"
//                       name="open"
//                       placeholder="Opening Time"
//                       style={{ padding: "20px", fontWeight: "500" }}></Form.Control>
//                     <Form.Control type="time"
//                       name="close"
//                       placeholder="Closing"
//                       style={{ padding: "20px", fontWeight: "500" }}></Form.Control>
//                   </div>
//                 </Form.Group>
//                 <Form.Group className="mb-3 d-flex gap-5" controlId="friday">
//                   <Form.Label><h6>Friday</h6></Form.Label>
//                   <div className="d-flex gap-2">
//                     <Form.Control type="time"
//                       name="open"
//                       placeholder="Opening Time"
//                       style={{ padding: "20px", fontWeight: "500" }}></Form.Control>
//                     <Form.Control type="time"
//                       name="close"
//                       placeholder="Closing"
//                       style={{ padding: "20px", fontWeight: "500" }}></Form.Control>
//                   </div>
//                 </Form.Group>
//                 <Form.Group className="mb-3 d-flex gap-5" controlId="saturday">
//                   <Form.Label><h6>Saturday</h6></Form.Label>
//                   <div className="d-flex gap-2">
//                     <Form.Control type="time"
//                       name="open"
//                       placeholder="Opening Time"
//                       style={{ padding: "20px", fontWeight: "500" }}></Form.Control>
//                     <Form.Control type="time"
//                       name="close"
//                       placeholder="Closing"
//                       style={{ padding: "20px", fontWeight: "500" }}></Form.Control>
//                   </div>
//                 </Form.Group>
//                 <Form.Group className="mb-3 d-flex gap-5" controlId="sunday">
//                   <Form.Label><h6>Sunday</h6></Form.Label>
//                   <div className="d-flex gap-2">
//                     <Form.Control type="time"
//                       name="open"
//                       placeholder="Opening Time"
//                       style={{ padding: "20px", fontWeight: "500" }}></Form.Control>
//                     <Form.Control type="time"
//                       name="close"
//                       placeholder="Closing"
//                       style={{ padding: "20px", fontWeight: "500" }}></Form.Control>
//                   </div>
//                 </Form.Group>
//               </div>
//             </Form.Group>
//           </Form>
//         </Row>
//         <Row className="content">
//           <div>
//             <h3>Upload Images :</h3>
//           </div>
//           <Form>
//             <Form.Group className="mb-3" controlId="mainImage">
//               <Form.Label>Main Image</Form.Label>
//               <Form.Control type="file"
//                 name="mainImage"
//                 style={{ padding: "7px", fontWeight: "500" }}></Form.Control>
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="image">
//               <Form.Label>Image (Max- 5)</Form.Label>
//               <Form.Control type="file"
//                 name="image"
//                 style={{ padding: "7px", fontWeight: "500" }}></Form.Control>
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="gallery">
//               <Form.Label>Gallery Images(Max-10)</Form.Label>
//               <Form.Control type="file"
//                 name="gallery"
//                 style={{ padding: "7px", fontWeight: "500" }}></Form.Control>
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="about">
//               <Form.Label>About</Form.Label>
//               <Form.Control type="text"
//                 name="about"
//                 placeholder="Write About "
//                 style={{ padding: "20px", fontWeight: "500" }}></Form.Control>
//             </Form.Group>
//           </Form>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default Bussinesslisting;