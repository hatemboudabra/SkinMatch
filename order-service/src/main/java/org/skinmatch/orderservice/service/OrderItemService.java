package org.skinmatch.orderservice.service;

import org.skinmatch.orderservice.dto.OrderItemDTO;
import org.skinmatch.orderservice.entity.OrderItem;

import java.util.List;
import java.util.Optional;

public interface OrderItemService {
    public OrderItem createOrderItem(OrderItemDTO orderItemDTO);
    public Optional<OrderItem> getOrderItemById(long orderItemId);
    public List<OrderItem> getAllOrderItems();
}
