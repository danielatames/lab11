import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private auth = inject(AuthService);
  private router = inject(Router);
  username = '';
  password = '';
  error = '';

  ingresar() {
    this.auth.login(this.username, this.password).subscribe({
      next: () => this.router.navigate(['/envios']),
      error: () => this.error = 'Usuario o contraseña incorrectos'
    });
  }
}