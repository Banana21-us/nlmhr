import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { RouterModule,Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private conn: ApiService, private router: Router) {}

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  login() {
    this.conn.login(this.loginForm.value).subscribe(
      (result: any) => {
        if (result.token != null) {
          localStorage.setItem('token', result.token);
          localStorage.setItem('user', result.id);

          const user = result.admin;
          localStorage.setItem('users', JSON.stringify(user));
          
          console.log('Token stored:', result.token);
          this.navigateToMainPage();
        }
        // console.log(result);
      }
    );
}


  navigateToMainPage() {
    this.router.navigate(['main-page/Dashboard']);
    // window.location.reload()
    }
}
