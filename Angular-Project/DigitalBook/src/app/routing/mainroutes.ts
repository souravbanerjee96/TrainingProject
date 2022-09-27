import { AllmybooksComponent } from "../allmybooks/allmybooks.component"
import { HomeComponent } from "../home/home.component"
import { LoginComponent } from "../login/login.component"
import { ReaderComponent } from "../reader/reader.component"
import { RegisterComponent } from "../register/register.component"
import { AuthguardService } from "../services/authguard.service"

export const Mainroutes = [
  { path: '', component: ReaderComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', loadChildren: () => import('../login/login.module').then(m => m.LoginModule) },
  { path: 'reader', loadChildren: () => import('../reader/reader.module').then(m => m.ReaderModule) },
  { path: 'author', canActivate: [AuthguardService], loadChildren: () => import('../author/author.module').then(m => m.AuthorModule) },
  { path: 'allmybooks', canActivate: [AuthguardService], loadChildren:() => import('../allmybooks/allmybooks.module').then(m=>m.AllmyBooksModule) },
  { path: 'home', component: ReaderComponent }
]