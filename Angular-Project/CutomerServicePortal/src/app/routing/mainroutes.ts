import { HomeComponent } from "../home/home.component"
import { RegisterComponent } from "../register/register.component"
import { AdminguardService } from "../services/adminguard.service"
import { ServicerequestguardService } from "../services/servicerequestguard.service"

export const Mainroutes = [
  { path: '', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', loadChildren: () => import('../login/login.module').then(m => m.LoginModule) },
  { path: 'edituser', canActivate: [ServicerequestguardService], loadChildren: () => import('../edituser/edituser.module').then(m => m.EditUserModule) },
  { path: 'service', canActivate: [ServicerequestguardService], loadChildren: () => import('../servicerequest/servicerequest.module').then(m => m.ServiceRequestModule) },
  { path: 'allmyrequests', canActivate: [ServicerequestguardService], loadChildren: () => import('../allmyrequests/allmyrequests.module').then(m => m.AllmyRequestsModule) },
  { path: 'adminportal', canActivate: [AdminguardService], loadChildren: () => import('../adminportal/adminportal.module').then(m => m.AdminPortalModule) },
  { path: 'home', component: HomeComponent }
]