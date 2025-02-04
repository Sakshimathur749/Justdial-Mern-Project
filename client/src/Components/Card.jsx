import React, { useEffect, useState } from "react";
import {Row,Col,Container,} from "react-bootstrap";
import "../css/common.css";
import "../css/card.css";
const Cards = () => {
  const [categories, setCategories] = useState([]); 
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/categories");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json(); 
        setCategories(data); 
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []); 

  return (
    <div className="sp">
      <Container>
        <Row className="justify-content-between">
        {categories.map((category) => (
          <Col lg="5" md='12' className="card-container"  key={category._id}>
            <h3>{category.name}</h3><hr/>
            <Row className="card-grid">
            {category.subcategories.slice(0, 4).map((subcategory, index) => (
                  <Col lg="5" className="card-box" key={index}>
                    {category.image && (
                      <img style={{objectFit:'contain', width:'200px', height:'50px'}}
                        src={`http://localhost:5173/src/images/uploads/${category.image}`} 
                        alt={subcategory.name}
                      />
                    )}
                    <h5>{subcategory.name}</h5>
                  </Col>
                ))}
            </Row>
          </Col>
        ))}
        </Row>
      </Container>
    </div>
  );
};
export default Cards;