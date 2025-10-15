import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const adminGuard: CanActivateFn = (route, state) => {
  const isAdmin = localStorage.getItem('role') === 'admin';
  if (isAdmin) return true;
  const router = inject(Router);
  router.navigateByUrl('/admin/login');
  return false;
};
