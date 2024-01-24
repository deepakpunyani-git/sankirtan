// PrivacyPolicy.js
import React from 'react';
import Breadcrumbs from '../components/Breadcrumbs';

const PrivacyPolicy = () => {
  return (
    <div className="container my-4">
      <div className="row">
        <div className="col">
          <Breadcrumbs />
          <h2>Privacy Policy</h2>
          <p>
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
          </p>

          <h3>Information We Collect</h3>
          <p>
            We may collect personal information that you provide directly to us, such as your name, email address, and other contact information.
          </p>

          <h3>How We Use Your Information</h3>
          <p>
            We use the information we collect to provide, maintain, and improve our services, as well as to communicate with you.
          </p>

          <h3>Disclosure of Your Information</h3>
          <p>
            We may share your information with third parties only in the ways that are described in this Privacy Policy.
          </p>

          <h3>Security</h3>
          <p>
            We take reasonable measures to help protect your personal information from unauthorized access or disclosure.
          </p>

          <h3>Changes to This Privacy Policy</h3>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
          </p>

          <div className="additional-content">
            <p>For any questions about our Privacy Policy, please contact us at privacy@example.com.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
