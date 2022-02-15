import { Component, Input, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/userprofile';
import { My2CentsService } from '../my2-cents.service';

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
    //inputData.UserID = this.UserLoginInfo.userID;
    //datas.email = this.inputData.email
    this.my2centsService
         .PutUserAccounts(datas)
    //this.inputVar = 'changed';

  }

  GetUserProfile() {
    console.log(this.userId)
      this.my2centsService
       // .getUserInfo(this.UserLoginInfo.userID)
       .getUserInfo(this.userId)
        .subscribe((data) => {
          this.data = data;
         // this.inputData = this.data;
        });
    }


}
