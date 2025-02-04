import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import "../css/common.css";
import "../css/components.css";
const Map = ({ location }) => {
  return (
    <Container fluid className='mx-0 px-0'>
            {location ? (
              <div className="map-container" dangerouslySetInnerHTML={{ __html: location }} />
            ) : (
              <p>Map is not available.</p>
            )}
    </Container>
  );
};

export default Map;