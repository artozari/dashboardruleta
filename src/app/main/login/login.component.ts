import { Component } from '@angular/core';
import { RuletaService } from '../../services/ruleta-service.service';
import { FormsModule } from '@angular/forms';
import { GenUserPendingComponent } from './gen-user-pending/gen-user-pending.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, GenUserPendingComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

export class LoginComponent {
  email: string = '';
  password: string = '';
  enumRolUser: object;
  rolUser: number;
  showPassword: any;

  constructor(private readonly ruletaService: RuletaService) {
    this.enumRolUser = {
      ADMIN: 0x1, // 0001
      USER: 0x2, // 0010
      SUPERUSER: 0x3, // 0011
      SUPERADMIN: 0x4, // 0100
      PENDIENTE: 0x5, // 0101
    };
    this.rolUser = 0x5;  
    
  }

  onSubmit() {
    throw new Error('Method not implemented.');
  }
}
