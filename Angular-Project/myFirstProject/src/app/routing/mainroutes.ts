import { CustomerModule } from "../customer/customer.module"
import { HomeComponent } from "../home/home.component"
import { customerroutes } from "./customerroutes"

export const Mainroutes = [
  {path: '', component: HomeComponent},
  {path: 'customer', loadChildren: () => import('../customer/customer.module').then(m => m.CustomerModule)},
  {path: 'supplier', loadChildren :() => import('../supplier/supplier.module').then(m => m.SupplierModule)},
  {path: 'home', component: HomeComponent}
]