package com.SkinMatch.product_service.service;

import com.SkinMatch.product_service.Dto.CategoryDTO;
import com.SkinMatch.product_service.entity.Category;

import java.util.List;

public interface CategoryService {
    public Category addCategory(CategoryDTO categoryDTO);
    public Category updateCategory( Long id ,CategoryDTO categoryDTO);
    public void deleteCategory(Long id);
    public List<Category> getAllCategories();
}
