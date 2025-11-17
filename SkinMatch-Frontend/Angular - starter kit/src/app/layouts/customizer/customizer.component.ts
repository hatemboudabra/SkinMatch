import { Component, inject } from '@angular/core';
import { DrawerModule } from '../../Component/drawer';
import { Store } from '@ngrx/store';
import { changeDirection, changeMode, changeSkin, changelayout, changenavigation, changesidebarcolor, changesidebarsize, changetopbarcolor, changewidthLayout } from '../../store/layout/layout-action';
import { getLayout, getLayoutSkin, getLayoutWidth, getLayoutdirection, getLayoutmode, getNavigation, getSidebarcolor, getSidebarsize, getTopbarcolor } from '../../store/layout/layout-selector';
import { CommonModule } from '@angular/common';
import { LUCIDE_ICONS, LucideAngularModule, LucideIconProvider, icons } from 'lucide-angular';

@Component({
  selector: 'app-customizer',
  standalone: true,
  imports: [DrawerModule, CommonModule,LucideAngularModule],
  templateUrl: './customizer.component.html',
  styles: ``,
  providers:[{provide: LUCIDE_ICONS, multi: true, useValue: new LucideIconProvider(icons)}]
})
export class CustomizerComponent {

  
}
