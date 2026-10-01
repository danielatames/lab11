import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const token = sessionStorage.getItem('jwt_token');

  if (token) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401 || (err.status === 403 && !token)) {
        sessionStorage.removeItem('jwt_token');
        sessionStorage.removeItem('jwt_username');
        sessionStorage.removeItem('jwt_roles');
        router.navigate(['/login']);
      }
      return throwError(() => err);
    })
  );
};