import { getOrderDetails, updateOrderStatus } from './api';

export const getOrder = async (id) => getOrderDetails(id);

export const updateStatus = async (id, setDelivered, string) => {
  await updateOrderStatus(id, string);

  setDelivered(string);
};
