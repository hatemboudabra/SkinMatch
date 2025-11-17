import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../data/category';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private baseUrl = 'http://localhost:9090/product/cats';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Category[]> { return this.http.get<Category[]>(`${this.baseUrl}/allcat`); }
  add(category: Partial<Category>): Observable<Category> { return this.http.post<Category>(`${this.baseUrl}/addCategory`, category); }
  update(id: number, category: Partial<Category>): Observable<Category> { return this.http.patch<Category>(`${this.baseUrl}/updatecat/${id}`, category); }
  delete(id: number): Observable<void> { return this.http.delete<void>(`${this.baseUrl}/deleteCat/${id}`); }
}








