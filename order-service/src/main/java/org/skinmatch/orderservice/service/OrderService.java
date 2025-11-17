package org.skinmatch.orderservice.service;

import org.skinmatch.orderservice.dto.OrderDTO;
import org.skinmatch.orderservice.entity.Order;

import java.util.List;
import java.util.Optional;

public interface OrderService {

    public List<Order> getAllOrders();
    public Optional<Order> getOrderById(Long orderId);
    public Order saveOrder(OrderDTO orderDTO);

}
