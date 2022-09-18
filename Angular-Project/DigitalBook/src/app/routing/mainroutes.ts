import { HomeComponent } from "../home/home.component"
import { LoginComponent } from "../login/login.component"
import { ReaderComponent } from "../reader/reader.component"
import { RegisterComponent } from "../register/register.component"

export const Mainroutes = [
  {path: '', component: ReaderComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'reader', loadChildren: () => import('../reader/reader.module').then(m => m.ReaderModule)},
  {path: 'supplier', loadChildren :() => import('../supplier/supplier.module').then(m => m.SupplierModule)},
  {path: 'home', component: ReaderComponent}
]