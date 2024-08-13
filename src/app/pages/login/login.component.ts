declare var google: any
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  private router = inject(Router)
  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: environment.client_id,
      callback: (resp: any)=>{
        this.handlelogin(resp)
      }
    });

    google.accounts.id.renderButton(document.getElementById('google-btn'),{
      theme: 'filled_blue',
      size: 'large',
      shape: 'rectangle',
      width: "auto"
    })
  }

  private decodeToken(token: string){
    return JSON.parse(atob(token.split('.')[1]))
  }
  handlelogin(response: any){
    if(response){
      // decode token
      const payLoad = this.decodeToken(response.credential);
      // store in session
      sessionStorage.setItem("LoggedInUser",JSON.stringify(payLoad))
      // navigate to browse
      this.router.navigate(["browse"])
    }
  }
}
