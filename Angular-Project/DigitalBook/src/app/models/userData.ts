export class userAuth{
    userName:string='';
    password:string='';
    userType:string='A';
    paymentID:string='';
}

export class allmyBooks{
    Title: String = ''
    AuthorName: String = ''
    Publisher: String = ''
    ReleasedDate: String = ''
    Category: String = ''
    Image: String = ''
    Price: String = ''
    BookContent: String = ''
    AuthorId: String|null = localStorage.getItem('AuthorId')
    isActive: String = ''
}