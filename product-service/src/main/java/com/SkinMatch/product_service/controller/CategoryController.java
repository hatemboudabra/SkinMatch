package com.SkinMatch.product_service.controller;

import com.SkinMatch.product_service.Dto.CategoryDTO;
import com.SkinMatch.product_service.entity.Category;
import com.SkinMatch.product_service.service.CategoryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cats")
public class CategoryController {
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }
    @PostMapping("/addCategory")
    public Category addCategory(@RequestBody CategoryDTO categoryDTO) {
        return categoryService.addCategory(categoryDTO);
    }
    @PatchMapping("/updatecat/{id}")
    public Category updateCategory(@PathVariable Long id, @RequestBody CategoryDTO categoryDTO) {
        return categoryService.updateCategory(id ,categoryDTO);
    }
    @DeleteMapping("deleteCat/{id}")
    public void deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
    }
    @GetMapping("/allcat")
    public List<Category> getAllCategory() {
        return categoryService.getAllCategories();

    }
}
