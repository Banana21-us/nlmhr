// import { HttpInterceptorFn } from '@angular/common/http';

// export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
//   return next(req);
// };


// import { HttpInterceptorFn } from '@angular/common/http';

// export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
//   // debugger
//   const token = window.localStorage.getItem('token');
//   const cloneReq = req.clone({
//     setHeaders: {
//     Authorization: `Bearer ${token}`
//     }
//   });
//     return next(req);
    
// };

import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);
  let token = '';

  if (isPlatformBrowser(platformId)) {
    token = localStorage.getItem('token') || '';
  }

  const cloneReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(cloneReq);
};
