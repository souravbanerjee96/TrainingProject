export class adminreq {
    Id: any
    ServiceName: String = ''
    RequiredDate: String = ''
    ServiceType: String = ''
    ServiceDetails: String = ''
    Status: String = ''
    Comment: String = ''
    AdminID: Number = Number(localStorage.getItem('adminId'))
    IsUserAccepted: any
    UserComment: any
}