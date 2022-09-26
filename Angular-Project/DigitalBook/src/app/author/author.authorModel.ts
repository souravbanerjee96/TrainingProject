import { NgForm,Validators,FormGroup,FormBuilder,FormControl  } from "@angular/forms"
export class author {
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
    formAuthorGroup:FormGroup;

    constructor(){
        var _builder=new FormBuilder();
        this.formAuthorGroup=_builder.group({});
        this.formAuthorGroup.addControl("Title",new FormControl('',Validators.required));
        this.formAuthorGroup.addControl("AuthorName",new FormControl('',Validators.required));
        this.formAuthorGroup.addControl("Publisher",new FormControl('',Validators.required));
        this.formAuthorGroup.addControl("Category",new FormControl('',Validators.required));
        this.formAuthorGroup.addControl("BookContent",new FormControl('',Validators.required));
        this.formAuthorGroup.addControl("ReleasedDate",new FormControl('',Validators.required));
        this.formAuthorGroup.addControl("Price",new FormControl('',Validators.required));
        this.formAuthorGroup.addControl("isActive",new FormControl('',Validators.required));
        // var validationcollection=[];
        // validationcollection.push(Validators.required);
        // validationcollection.push(Validators.pattern("/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/"));
        // this.formAuthorGroup.addControl("ReleasedDateControl",new FormControl('',Validators.compose(validationcollection)));

        // var validationcollection=[];
        // validationcollection.push(Validators.required);
        // validationcollection.push(Validators.pattern("^[\d\.,]+$"));
        // this.formAuthorGroup.addControl("PriceControl",new FormControl('',Validators.compose(validationcollection)));
}}