const BASE_URL = 'https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/';

export const getCustomers = async () => {
  const response = await fetch(`${BASE_URL}customers`);
  return response.json();
};

export const getTrainings = async () => {
  const response = await fetch(`${BASE_URL}trainings`);
  return response.json();
};

export const addCustomer = async (customer) => {
  const response = await fetch(`${BASE_URL}customers`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(customer),
  });
  return response.json();
};

export const updateCustomer = async (customer) => {
  const response = await fetch(customer._links.self.href, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(customer),
  });
  return response.json();
};

export const deleteCustomer = async (customer) => {
  const response = await fetch(customer._links.self.href, { method: 'DELETE' });
  return response.status;
};

export const addTraining = async (training) => {
  const response = await fetch(`${BASE_URL}trainings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      date: training.date,
      duration: training.duration,
      activity: training.activity,
      customer: training.customer,
    }),
  });
  return response.json();
};

export const deleteTraining = async (training) => {
  const response = await fetch(training._links.self.href, { method: 'DELETE' });
  return response.status;
};
