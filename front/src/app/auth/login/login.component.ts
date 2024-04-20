import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup

  constructor(
    private authService: AuthService, 
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder,
  ) {

    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });
   }

  login(): void {

    const userData = this.loginForm.value;

    this.authService.login(userData).subscribe(
      (data) => {
        localStorage.setItem('token', data.token);
        this.toastr.success('Bienvenido');
        if (this.authService.isAdmin()) {
          this.router.navigate(['/admin/inicio']);
        } else {
          this.router.navigate(['/empleados']);
        }
      },
      (error) => {
        console.error(error);
        this.toastr.error('Usuario o contraseña incorrectos', 'Error');        
      }
    );
  }
}
