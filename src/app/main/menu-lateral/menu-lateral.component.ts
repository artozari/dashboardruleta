import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu-lateral',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './menu-lateral.component.html',
  styleUrl: './menu-lateral.component.css',
})
export class MenuLateralComponent {
  menuStatus: boolean = true;
}
