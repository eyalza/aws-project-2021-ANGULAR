import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetectorComponent } from './detector/detector.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MakerFormComponent } from './maker-form/maker-form.component';
import { ManufacturerComponent } from './manufacturer/manufacturer.component';
import { OwnerFormComponent } from './owner-form/owner-form.component';
import { OwnersComponent } from './owners/owners.component';
import { PriceFormComponent } from './price-form/price-form.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignUpComponent},
  { path: 'owners', component: OwnersComponent},
  { path: 'ownerform', component: OwnerFormComponent},
  { path: 'manufacturer/:make', component: ManufacturerComponent }, 
  { path: 'maker', component: MakerFormComponent},
  { path: 'home', component: HomeComponent},
  { path: 'priceform', component: PriceFormComponent},
  { path: 'detector', component: DetectorComponent},
  { path: '', component: LoginComponent},

    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
