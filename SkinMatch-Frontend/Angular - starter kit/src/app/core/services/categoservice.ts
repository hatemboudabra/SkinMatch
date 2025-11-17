import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Category } from "../../data/category";
import { Observable } from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
    private ApiUrl= "http://localhost:9092/product/products/cats"


    constructor(private http: HttpClient) {}
    
     addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.ApiUrl}/addCategory`, category);
  }

  updateCategory(id: number, category: Category): Observable<Category> {
    return this.http.patch<Category>(`${this.ApiUrl}/updatecat/${id}`, category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.ApiUrl}/deleteCat/${id}`);
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.ApiUrl}/allcat`);
  }

}