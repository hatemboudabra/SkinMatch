package com.SkinMatch.product_service.service;

import com.SkinMatch.product_service.Dto.ProductDTO;
import com.SkinMatch.product_service.entity.Category;
import com.SkinMatch.product_service.entity.Product;
import com.SkinMatch.product_service.repo.CategoryRepo;
import com.SkinMatch.product_service.repo.ProductRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    private final ProductRepo productRepo;
    private final CategoryRepo categoryRepo;

    public ProductServiceImpl(ProductRepo productRepo, CategoryRepo categoryRepo) {
        this.productRepo = productRepo;
        this.categoryRepo = categoryRepo;
    }

    @Override
    public List<Product> getProducts() {
        return productRepo.findAll();
    }

    @Override
    public Product addProduct(ProductDTO productDTO) {
        Product product = new Product();
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());
        product.setImage(productDTO.getImage());
        product.setBrand(productDTO.getBrand());
        product.setStock(productDTO.getStock());
        Category category = categoryRepo.findById(productDTO.getCategoryId()).get();
        product.setCategory(category);
        productRepo.save(product);
        return product;
    }

    @Override
    public Product updateProduct(Long id, ProductDTO productDTO) {
        Product product = productRepo.findById(id)
        .orElseThrow(() -> new RuntimeException("Produit avec l'id " + id + " non trouvé"));        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());
        product.setImage(productDTO.getImage());
        product.setBrand(productDTO.getBrand());
        product.setStock(productDTO.getStock());
        if (productDTO.getCategoryId() != null) {
            Category category = categoryRepo.findById(productDTO.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Catégorie avec l'id " + productDTO.getCategoryId() + " non trouvée"));
            product.setCategory(category);
        }

        productRepo.save(product);
        return product;
    }
    @Override
    public Product getProduct(String name) {
        return productRepo.getProduct(name);
    }
}
