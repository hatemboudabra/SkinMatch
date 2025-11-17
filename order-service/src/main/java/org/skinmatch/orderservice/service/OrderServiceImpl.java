package org.skinmatch.orderservice.service;

import org.skinmatch.orderservice.dto.OrderDTO;
import org.skinmatch.orderservice.entity.Order;
import org.skinmatch.orderservice.repo.OrderRepo;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepo orderRepo;

    public OrderServiceImpl(OrderRepo orderRepo) {
        this.orderRepo = orderRepo;
    }

    @Override
    public List<Order> getAllOrders() {
        return orderRepo.findAll();
    }

    @Override
    public Optional<Order> getOrderById(Long orderId) {
        return orderRepo.findById(orderId);
    }

    @Override
    public Order saveOrder(OrderDTO orderDTO) {
        Order order = new Order();
        order.setOrderDate(orderDTO.getOrderDate());
        order.setTotalPrice(orderDTO.getTotalPrice());
        order.setStatus(orderDTO.getStatus());
        orderRepo.save(order);
        return order;
    }
}
