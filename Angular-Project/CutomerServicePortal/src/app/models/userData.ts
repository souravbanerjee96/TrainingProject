export class userAuth {
    FirstName: string = '';
    LastName: string = '';
    Email: string = '';
    PhoneNo: string = '';
    Password: string = '';
    DOB: string = '';
    ContactPref: string = 'Phone';
    Country: string = '';
    State: string = '';
    Address: string = '';
    PanNo: string = '';
}

export class readerAuth {
    userName: string = '';
    password: string = '';
    userType: string = 'R';
    paymentID: string = '';
}

export class allmyBooks {
    Id: Number = 0;
    Title: String = ''
    AuthorName: String = ''
    Publisher: String = ''
    ReleasedDate: String = ''
    Category: String = ''
    Image: String = ''
    Price: String = ''
    BookContent: String = ''
    AuthorId: String | null = localStorage.getItem('AuthorId')
    IsActive: String = ''
}


export class buyBook {
    BookiD: string | any = '';
    Userid: string | any = '';
    InvoiceNo: string = '';
    PaymentID: string = '';
    PurchaseTime: Date = new Date();
    isRefunded: number = 0;
}

export class orderDetails {
    Id: number = 0;
    Title: string = '';
    Category: string = '';
    Image: string = '';
    Price: string = '';
    InvoiceNo: string = '';
    PaymentId: string = '';
    PurchaseTime: Date = new Date();
    IsRefunded: number = 0;
}

export class readBooks {
    Id: number = 0;
    Title: string = '';
    PurchaseTime: Date = new Date();
    IsActive: number = 0;
    IsRefunded: number = 0;
    Category: String = ''
    Image: String = ''
    BookContent: String = ''
}