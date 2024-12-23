import { Component } from '@angular/core';

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [],
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.css'
})
export class MenuLateralComponent {

  menu = [
    { label: 'Inicio', routerLink: '/login' },
    { label: 'Gestion de casino', routerLink: '/casino' },
    { label: 'Usuarios', routerLink: 'https://my-json-server.typicode.com/artozari/Test-Usuario/users' },
    { label: 'Mesas en casino', routerLink: '/mesas' },
    { label: 'Dashboard', routerLink: '/dashboard' },
  ];

}
