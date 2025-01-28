import React from 'react'
import { Container, Row } from 'react-bootstrap'
import '../css/common.css'
import '../css/components.css'
import { Link } from 'react-router'
const Breadcrumb = ({breadcrumbs}) => {
  return (
    <div className="gry_container">
      <Container>
        <Row>
          <ol className="breadcrumb">
            <span>You are here:</span>
            {breadcrumbs.map((breadcrumb, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <li
                  key={index}
                  className={`breadcrumb-item ${isLast ? "active" : ""}`}
                  aria-current={isLast ? "page" : undefined}
                >
                  {!isLast ? (
                    <Link to={breadcrumb.link} > {breadcrumb.label}</Link>
                  ) : (
                    breadcrumb.label
                  )}
                </li>
              );
            })}
          </ol>
        </Row>
      </Container>
      <hr />
    </div>
  );
}

export default Breadcrumb