package com.SkinMatch.product_service.service;

import com.SkinMatch.product_service.Dto.CategoryDTO;
import com.SkinMatch.product_service.entity.Category;
import com.SkinMatch.product_service.repo.CategoryRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepo categoryRepo;

    public CategoryServiceImpl(CategoryRepo categoryRepo) {
        this.categoryRepo = categoryRepo;
    }

    @Override
    public Category addCategory(CategoryDTO categoryDTO) {
        Category category = new Category();
        category.setName(categoryDTO.getName());
        category.setDescription(categoryDTO.getDescription());
        categoryRepo.save(category);
        return category;
    }

    @Override
    public Category updateCategory(Long id, CategoryDTO categoryDTO) {
        Category category = categoryRepo.findById(id).get();
        category.setName(categoryDTO.getName());
        category.setDescription(categoryDTO.getDescription());
        categoryRepo.save(category);
        return category;
    }

    @Override
    public void deleteCategory(Long id) {
        categoryRepo.deleteById(id);

    }


    @Override
    public List<Category> getAllCategories() {
        return categoryRepo.findAll();
    }
}
