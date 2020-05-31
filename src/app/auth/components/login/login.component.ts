import { Component, OnInit } from '@angular/core';
import { GoogleLoginProvider, FacebookLoginProvider, AuthService } from 'angularx-social-login';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { Router } from '@angular/router';
import { APIService } from 'src/app/providers/api.service';
import { USER_ID, USER_EMAIL, USER_TOKEN } from 'src/app/constants/constants';
import { User } from 'src/app/models/User';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage: string;

  constructor(
    public OAuth: AuthService,
    private router: Router,
    private API: APIService,
    ) { }

  ngOnInit() {
  }


  public socialSignIn(socialProvider: string) {
    let socialPlatformProvider;
    if (socialProvider === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialProvider === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    this.OAuth.signIn(socialPlatformProvider).then(socialusers => {
      console.log(socialProvider, socialusers);
      console.log(socialusers.email);

      
      let user = new User();

      user.name = socialusers.name;
      user.email = socialusers.email;
      user.authToken = socialusers.authToken;
      this.login(user);
      // this.Savesresponse(socialusers);
    });
  }


  public login(user: User){
   
    
    this.API.loginApi(user).subscribe((res) => {

      console.log(res);

      sessionStorage.setItem(USER_ID, res[USER_ID]);
      sessionStorage.setItem(USER_EMAIL, res[USER_EMAIL]);
      sessionStorage.setItem(USER_TOKEN, res[USER_TOKEN]);
      this.router.navigate(['all']);
    });
  }

}
