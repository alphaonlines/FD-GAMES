import React from 'react';

interface Policy {
  id: string;
  title: string;
  content: string;
}

const mockPolicies: Policy[] = [
  {
    id: 'policy1',
    title: 'Return Policy',
    content: 'Customers can return items within 30 days of purchase with a valid receipt for a full refund. Items must be in their original condition and packaging. Custom orders are non-refundable.',
  },
  {
    id: 'policy2',
    title: 'Delivery Policy',
    content: 'Standard delivery takes 5-7 business days. Expedited delivery options are available at an additional cost. Assembly services can be requested for an extra fee.',
  },
  {
    id: 'policy3',
    title: 'Warranty Policy',
    content: 'All furniture comes with a 1-year manufacturer\'s warranty covering defects in materials and workmanship. Extended warranty options are available for purchase.',
  },
  {
    id: 'policy4',
    title: 'Pricing Policy',
    content: 'Our pricing is competitive and subject to change. We offer price matching under certain conditions. Please consult a sales associate for current promotions.',
  },
];

const Policies: React.FC = () => {
  return (
    <div className="container mt-5">
      <h1 className="mb-4">Company Policies</h1>
      <div className="accordion" id="policiesAccordion">
        {mockPolicies.map((policy) => (
          <div className="accordion-item" key={policy.id}>
            <h2 className="accordion-header" id={`heading${policy.id}`}>
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#collapse${policy.id}`}
                aria-expanded="false"
                aria-controls={`collapse${policy.id}`}
              >
                {policy.title}
              </button>
            </h2>
            <div
              id={`collapse${policy.id}`}
              className="accordion-collapse collapse"
              aria-labelledby={`heading${policy.id}`}
              data-bs-parent="#policiesAccordion"
            >
              <div className="accordion-body">
                {policy.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Policies;
