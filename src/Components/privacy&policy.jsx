import React from 'react';
import { Container } from 'react-bootstrap';

const PrivacyPolicy = () => {
  return (
    <Container className="py-5">
      <div class="cont_head">Privacy Policy</div>
      <div className="cont_text">
      <p><strong>Effective Date: [Insert Date]</strong></p>

      <p><strong>1. Introduction</strong></p>
      <p>Welcome to [Your Company Name] ("we," "our," or "us"). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website [yourwebsite.com] and use our services.</p>

      <p><strong>2. Information We Collect</strong></p>
      <ul>
        <li><strong>Personal Data:</strong> Information such as your name, email address, phone number, etc.</li>
        <li><strong>Derivative Data:</strong> Data collected automatically, including IP address, browser type, and pages viewed.</li>
        <li><strong>Financial Data:</strong> Payment-related details if you make transactions with us.</li>
      </ul>

      <p><strong>3. Use of Your Information</strong></p>
      <p>We use the collected information to:</p>
      <ul>
        <li>Provide, operate, and maintain our website and services.</li>
        <li>Process transactions and manage your orders.</li>
        <li>Communicate with you regarding updates, promotions, and service-related information.</li>
        <li>Prevent fraudulent activities.</li>
      </ul>

      <p><strong>4. Disclosure of Your Information</strong></p>
      <p>We may share your information under the following circumstances:</p>
      <ul>
        <li>When required by law or to protect rights.</li>
        <li>With third-party service providers for processing payments, hosting, and analytics.</li>
        <li>In case of business transfers such as mergers or acquisitions.</li>
      </ul>

      <p><strong>5. Security of Your Information</strong></p>
      <p>We implement security measures to protect your personal data. However, no transmission method is 100% secure.</p>

      <p><strong>6. Policy for Children</strong></p>
      <p>We do not knowingly collect data from children under the age of 13. If we find such data, we will delete it immediately.</p>

      <p><strong>7. Changes to This Privacy Policy</strong></p>
      <p>We may update this policy periodically. Please review it for any changes.</p>

      <p><strong>8. Contact Us</strong></p>
      <p>If you have any questions, contact us at:</p>
      <p>[Your Company Name] <br />
      [Your Company Address] <br />
      Email: [Your Email Address] <br />
      Phone: [Your Phone Number]</p>
      </div>
    </Container>
  );
};

export default PrivacyPolicy;