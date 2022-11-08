export class adminreq {
    Id: any
    ServiceName: String = ''
    RequiredDate: String = ''
    ServiceType: String = ''
    ServiceDetails: String = ''
    Status: String = ''
    StatusState: Number = 0
    Comment: String = ''
    AdminID: Number = Number(localStorage.getItem('adminId'))
    IsUserAccepted: any
    UserComment: any
}