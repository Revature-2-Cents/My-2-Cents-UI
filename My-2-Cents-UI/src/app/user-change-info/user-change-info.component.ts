import { Component, Input, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/_models/userprofile';
import { My2CentsService } from '../_services/my2-cents.service';

@Component({
  selector: 'app-user-change-info',
  templateUrl: './user-change-info.component.html',
  styleUrls: ['./user-change-info.component.css']
})
export class UserChangeInfoComponent implements OnInit {
  inputData: UserProfile = {} as UserProfile;
  input: any;
   inputVar: string | undefined;
   UProfile: any;
   public data: any = [];
   display: string | undefined;
  constructor(private my2centsService: My2CentsService
    ) {
    //  console.log(this.data.firstName);
     // this.UProfile.FirstName = this.data.FirstName
    }
    @Input() userId: number = -1;
  ngOnInit(): void {
    this.GetUserProfile();
  }
  public changeInputVar(datas:any): void {
    //console.log(datas);
    //inputData.UserID

if(!datas[0].secondaryEmail.includes('@'))
{
  //console.log("before loop "+datas[0].secondaryEmail)
  this.display = "Invaid email address";
  console.log("before loop "+datas[0].secondaryEmail)
}
else if(isNaN(datas[0].phone))
{
  this.display = "Invaid phone  number";
  console.log("before loop "+datas[0].phone)
}
else if(isNaN(datas[0].workPhone))
{
  this.display = "Invaid work phone  number";
  console.log("before loop "+datas[0].workPhone)
}
else{  
this.display ="";
    this.my2centsService
         .PutUserAccounts(datas)
   
  }
}

  GetUserProfile() {
    console.log(this.userId);
    this.my2centsService
      .getUserInfo(this.userId)
      .subscribe((data) => {
        this.data = data;
        // this.inputData = this.data;
      });
    }

}
