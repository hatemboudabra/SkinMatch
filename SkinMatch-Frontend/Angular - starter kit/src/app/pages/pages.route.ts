import { Route } from "@angular/router";
import { IndexComponent } from "./dashboard/index/index.component";
import { AddproductComponent } from "./addproduct/addproduct.component";
import { EditProfileComponent } from "../account/edit-profile/edit-profile.component";

export const PAGE_ROUTES: Route[] = [
    { path: '', component: IndexComponent },
    {path:'addproduct', component:AddproductComponent},
    { path: 'pages-account', component: EditProfileComponent },

    
];
