package org.skinmatch.orderservice.controller;

import org.skinmatch.orderservice.dto.OrderDTO;
import org.skinmatch.orderservice.entity.Order;
import org.skinmatch.orderservice.service.OrderService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("orders")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }
    @GetMapping("/allOrdes")
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }
    @GetMapping("/orde/{id}")
    public Optional<Order> getOrderById(@PathVariable Long id) {
        return orderService.getOrderById(id);
    }
    @PostMapping("/addOrder")
    public Order addOrder(@RequestBody OrderDTO orderDTO) {
        return orderService.saveOrder(orderDTO);
    }
}
