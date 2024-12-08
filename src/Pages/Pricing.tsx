import React from 'react';

const Pricing: React.FC = () => {
  const plans = [
    { name: 'Basic', price: '$10/month', features: ['1 project', 'Basic support'] },
    { name: 'Pro', price: '$30/month', features: ['10 projects', 'Priority support'] },
    { name: 'Enterprise', price: '$100/month', features: ['Unlimited projects', 'Dedicated support'] },
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f8f9fa',
      padding: '20px',
    }}>
      <h1 style={{ marginBottom: '20px' }}>Pricing Plans</h1>
      <div style={{
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
        {plans.map((plan) => (
          <div 
            key={plan.name}
            style={{
              border: '1px solid #ccc',
              borderRadius: '10px',
              padding: '20px',
              width: '250px',
              backgroundColor: '#fff',
              textAlign: 'center',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            }}
          >
            <h2 style={{ marginBottom: '10px' }}>{plan.name}</h2>
            <h3 style={{ marginBottom: '20px' }}>{plan.price}</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {plan.features.map((feature, index) => (
                <li key={index} style={{ marginBottom: '10px' }}>{feature}</li>
              ))}
            </ul>
            <button 
              style={{
                padding: '10px 20px',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginTop: '10px',
              }}
            >
              Choose a Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;