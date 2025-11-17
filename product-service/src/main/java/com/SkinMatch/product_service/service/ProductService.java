package com.SkinMatch.product_service.service;

import com.SkinMatch.product_service.Dto.ProductDTO;
import com.SkinMatch.product_service.entity.Product;

import java.util.List;

public interface ProductService {
    public List<Product> getProducts();
    public Product addProduct(ProductDTO productDTO);
    public Product updateProduct(Long id ,ProductDTO productDTO);
    public Product getProduct(String name);
}
