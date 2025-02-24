import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import '../css/common.css';
import '../css/components.css';

const ContactDetail = ({ slug }) => {
  const [business, setBusiness] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBusinessData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/business/listing/slug/${slug}`);
        if (!response.ok) {
          throw new Error('Failed to fetch business data');
        }
        const data = await response.json();
        setBusiness(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBusinessData();
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Container>
        <Row>
          <Col lg='12' md='12' sm='12'>
            <h1>{business?.businessName}</h1>
            <div className="categories_sect sidebar-nav" id="business_times_div">
              <div className="sidebar-brand">
                <img
                  src="https://buyphpcode.com/justdialclone/assets/front/images/hours-of-operation.png"
                  alt="Hours of Operation"
                />
                Hours of Operation
                <span className="spe_mobile2">
                  <a href="#"></a>
                </span>
              </div>
              <div className="bor_head">&nbsp;</div>
              <ul className="spe_submobile2">
                {business?.openingHours ? (
                  Object.entries(business?.openingHours).map(([day, hours]) => (
                    <li key={day} className="brdr">
                      <span className="days-cat">{day}</span> : <span className="time-cat">{hours.open}-{hours.close}</span>
                    </li>
                  ))
                ) : (
                  <li>No hours available</li>
                )}
              </ul>
              <div className="clearfix"></div>
            </div>

            {/* Services */}
            <div className="categories_sect sidebar-nav">
              <div className="sidebar-brand">
                <img
                  src="https://buyphpcode.com/justdialclone/assets/front/images/services.png"
                  alt="services"
                />
                Services
                <span className="spe_mobile3">
                  <a href="#"></a>
                </span>
              </div>
              <div className="bor_head">&nbsp;</div>
              <ul className="spe_submobile3">
                {business?.services?.length > 0 ? (
                  business?.services?.map((service, index) => (
                    <li key={index} className="brdr">{service}</li>
                  ))
                ) : (
                  <li>No services available</li>
                )}
              </ul>
              <div className="clearfix"></div>
            </div>

            {/* Payment Modes */}
            <div className="categories_sect sidebar-nav">
              <div className="sidebar-brand">
                <img
                  src="https://buyphpcode.com/justdialclone/assets/front/images/money.png"
                  alt="payment methods"
                />
                Modes of Payment
                <span className="spe_mobile3">
                  <a href="#"></a>
                </span>
              </div>
              <div className="bor_head">&nbsp;</div>
              <ul className="spe_submobile3">
                {business?.paymentModes?.length > 0 ? (
                  business?.paymentModes?.map((method, index) => (
                    <li key={index} className="brdr">{method}</li>
                  ))
                ) : (
                  <li>No payment modes available</li>
                )}
              </ul>
              <div className="clearfix"></div>
            </div>

            {/* About Business */}
            {business?.about && (
              <div className="categories_sect sidebar-nav">
                <div className="sidebar-brand">
                  <img
                    src="https://buyphpcode.com/justdialclone/assets/front/images/info-icns.png"
                    alt="about"
                  />
                  About Us
                </div>
                <div className="bor_head">&nbsp;</div>
                <div  className="brdr" dangerouslySetInnerHTML={{ __html: business?.about }} />
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ContactDetail;
