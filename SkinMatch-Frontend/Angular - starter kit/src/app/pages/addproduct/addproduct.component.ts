import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { icons, LUCIDE_ICONS, LucideAngularModule, LucideIconProvider } from 'lucide-angular';
import { PageTitleComponent } from '../../shared/page-title/page-title.component';
import { FormsModule } from '@angular/forms';
import { FlatpickrModule } from '../../Component/flatpickr/flatpickr.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { A } from '@fullcalendar/core/internal-common';
import { AuthenticationService } from '../../core/services/auth.service';
import { ProductService } from '../../core/services/productservice';
import { CategoryService } from '../../core/services/categoservice';

@Component({
  selector: 'app-addproduct',
  standalone: true,
   imports: [CommonModule, PageTitleComponent,FormsModule, LucideAngularModule, FlatpickrModule, NgSelectModule],

  providers: [
    { provide: LUCIDE_ICONS, multi: true, useValue: new LucideIconProvider(icons) }
  ],
  templateUrl: './addproduct.component.html',
  styleUrl: './addproduct.component.scss'
})
export class AddproductComponent implements OnInit {

  name: string = '';
  description: string = '';
  price: number | null = null;
  brand: string = '';
  stock: number | null = null;
  categoryId: number | null = null;
  categories: any[] = [];
  selectedFile?: File;

  constructor(private authservice:AuthenticationService , private productService:ProductService, private categoryService: CategoryService) { }

  ngOnInit(): void { this.loadCategories(); }

  loadCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (cats: any[]) => this.categories = cats,
      error: () => this.categories = []
    });
  }

  onFileChange(event: any): void {
    const file: File | undefined = event?.target?.files?.[0];
    if (file) this.selectedFile = file;
  }

  submit(): void {
    if (!this.name || !this.description || !this.price || !this.brand || !this.stock || !this.categoryId) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }
    const payload: any = {
      name: this.name,
      description: this.description,
      price: this.price,
      brand: this.brand,
      stock: this.stock,
      image: '',
      category: undefined,
      categoryId: this.categoryId
    };
    this.productService.addProduct(payload, this.selectedFile).subscribe({
      next: () => alert('Produit créé avec succès'),
      error: (e) => alert('Erreur lors de la création du produit')
    });
  }

}
