package com.SkinMatch.product_service.controller;

import com.SkinMatch.product_service.Dto.ProductDTO;
import com.SkinMatch.product_service.entity.Product;
import com.SkinMatch.product_service.fileManager.FileFilter;
import com.SkinMatch.product_service.service.ProductService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductService productService;
    private final FileFilter fileFilter;


    public ProductController(ProductService productService, FileFilter fileFilter) {
        this.productService = productService;
        this.fileFilter = fileFilter;
    }
    @GetMapping("/allproduct")
    public List<Product> getAllProduct() {
        return productService.getProducts();
    }
    @GetMapping("/bname/{name}")
    public ResponseEntity<Product> getProductByUsername(@PathVariable String name) {
        Product product = productService.getProduct(name);
        return ResponseEntity.ok(product);
    }
    @PostMapping(value = "/add", consumes = {"multipart/form-data"})
    public ResponseEntity<Product> addProduct(
            @RequestPart(value = "product") String productJson,
            @RequestPart(value = "file", required = false) MultipartFile file) {
        try {
            // Parse JSON string to ProductDTO
            ObjectMapper objectMapper = new ObjectMapper();
            ProductDTO productDTO = objectMapper.readValue(productJson, ProductDTO.class);

            if (file != null && !file.isEmpty()) {
                String fileName = fileFilter.storeFile(file);
                productDTO.setImage(fileName);
            }

            Product savedProduct = productService.addProduct(productDTO);
            return ResponseEntity.ok(savedProduct);
        } catch (IOException e) {
            return ResponseEntity.status(500).body(null);
        }
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody ProductDTO productDTO) {
        Product updatedProduct = productService.updateProduct(id, productDTO);
        return ResponseEntity.ok(updatedProduct);
    }
    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            String fileName = fileFilter.storeFile(file);
            return ResponseEntity.ok(fileName);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Erreur lors du téléchargement du fichier : " + e.getMessage());
        }
    }
    @GetMapping("/image/{fileName}")
    public ResponseEntity<byte[]> getImage(@PathVariable String fileName) {
        try {
            byte[] imageBytes = fileFilter.loadFile(fileName);
            return ResponseEntity.ok().body(imageBytes);
        } catch (IOException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
