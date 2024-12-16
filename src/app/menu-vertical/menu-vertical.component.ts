import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-menu-vertical',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatIconModule, FormsModule],
  templateUrl: './menu-vertical.component.html',
  styleUrl: './menu-vertical.component.css',
})
export class MenuVerticalComponent {
  mostrarPlano = input(true);
  planoSelected= input<number>(0);
  cantPlanos = input<string[]>(["1", "2", "3"]);
}