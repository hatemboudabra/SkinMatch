import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "../../data/product";
import { Category } from "../../data/category";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })

export class ProductService{

    private ApiUrl= "http://localhost:9092/product/products"
 constructor(private http :HttpClient){}  
    getProducts():Observable<Product[]>{
                    return this.http.get<Product[]>(`${this.ApiUrl}/allproduct`)
    }
   getProductByName(name: string): Observable<Product> {
    return this.http.get<Product>(`${this.ApiUrl}/bname/${name}`);
  }
  addProduct(product: Product, file?: File): Observable<Product> {
    const formData: FormData = new FormData();
    formData.append("product", JSON.stringify(product));
    if (file) {
      formData.append("file", file);
    }
    return this.http.post<Product>(`${this.ApiUrl}/add`, formData);
  }
  

   uploadFile(file: File): Observable<string> {
    const formData: FormData = new FormData();
    formData.append("file", file);
    return this.http.post(`${this.ApiUrl}/upload`, formData, { responseType: "text" });
  }
   getImage(fileName: string): Observable<Blob> {
    return this.http.get(`${this.ApiUrl}/image/${fileName}`, { responseType: "blob" });
  }
}