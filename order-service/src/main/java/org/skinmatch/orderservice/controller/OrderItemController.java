package org.skinmatch.orderservice.controller;

import org.skinmatch.orderservice.dto.OrderItemDTO;
import org.skinmatch.orderservice.entity.OrderItem;
import org.skinmatch.orderservice.service.OrderItemService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("Items")
public class OrderItemController {
    private final OrderItemService orderItemService;

    public OrderItemController(OrderItemService orderItemService) {
        this.orderItemService = orderItemService;
    }
    @PostMapping("/addItem")
    public OrderItem addItem(@RequestBody OrderItemDTO orderItemDTO) {
        return orderItemService.createOrderItem(orderItemDTO);
    }
    @GetMapping("/allItem")
    public List<OrderItem> getAllItem() {
        return orderItemService.getAllOrderItems();
    }
}
