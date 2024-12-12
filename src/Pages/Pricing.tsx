import React from 'react';

const Pricing: React.FC = () => {
  const plans = [
    { name: 'Basic', price: '$10/month', features: ['1 project', 'Basic support'] },
    { name: 'Pro', price: '$30/month', features: ['10 projects', 'Priority support'] },
    { name: 'Enterprise', price: '$100/month', features: ['Unlimited projects', 'Dedicated support'] },
  ];

  return (
    <div className="flex flex-col items-center bg-color-light p-5">
      <h1 className="text-3xl font-semibold mb-8">Pricing Plans</h1>
      <div className="flex gap-6 flex-wrap justify-center">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="border border-text-color-dark rounded-lg p-6 w-[250px] tru text-center shadow-lg"
          >
            <h2 className="text-xl font-bold mb-4">{plan.name}</h2>
            <h3 className="text-lg mb-6">{plan.price}</h3>
            <ul className="list-none p-0 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="mb-2">{feature}</li>
              ))}
            </ul>
            <button className="px-6 py-2 bg-bg-button text-white rounded-lg cursor-pointer mt-4 settings">
              Buy Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;