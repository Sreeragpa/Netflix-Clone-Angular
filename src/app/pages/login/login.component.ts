declare var google: any
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

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
      client_id: '311602429920-o56v5me18rrkoh4uj9sda916cb0rckga.apps.googleusercontent.com',
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
