export class allmyRequests {
    Id: any 
    ServiceName: String = ''
    AddedDate: any 
    RequiredDate: String = ''
    ServiceType: String = ''
    ServiceDetails: String = ''
    userID: Number  = Number(localStorage.getItem('CustomerId'))
    isDeleted: any
}

export class updateReq {
    Id: any 
    ServiceName: String = ''
    AddedDate: any 
    RequiredDate: String = ''
    ServiceType: String = ''
    ServiceDetails: String = ''
    userID: Number  = Number(localStorage.getItem('CustomerId'))
    isDeleted: any
}