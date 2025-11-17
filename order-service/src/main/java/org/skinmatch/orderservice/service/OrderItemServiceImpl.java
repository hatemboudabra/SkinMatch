package org.skinmatch.orderservice.service;

import org.skinmatch.orderservice.dto.OrderItemDTO;
import org.skinmatch.orderservice.entity.Order;
import org.skinmatch.orderservice.entity.OrderItem;
import org.skinmatch.orderservice.repo.OrderItemRepo;
import org.skinmatch.orderservice.repo.OrderRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class OrderItemServiceImpl implements OrderItemService {
    private final OrderItemRepo orderItemRepo;
    private final OrderRepo orderRepo;

    public OrderItemServiceImpl(OrderItemRepo orderItemRepo, OrderRepo orderRepo) {
        this.orderItemRepo = orderItemRepo;
        this.orderRepo = orderRepo;
    }

    @Override
    public OrderItem createOrderItem(OrderItemDTO orderItemDTO) {
        OrderItem orderItem = new OrderItem();
        orderItem.setPrice(orderItemDTO.getPrice());
        orderItem.setQuantity(orderItemDTO.getQuantity());
        Order order = orderRepo.findById(orderItemDTO.getOrderId()).get();
        orderItem.setOrder(order);
        orderItemRepo.save(orderItem);
        return orderItem;
    }

    @Override
    public Optional<OrderItem> getOrderItemById(long orderItemId) {
        return orderItemRepo.findById(orderItemId);
    }

    @Override
    public List<OrderItem> getAllOrderItems() {
        return orderItemRepo.findAll();
    }
}
