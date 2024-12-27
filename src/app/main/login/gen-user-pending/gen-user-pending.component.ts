import { Component } from '@angular/core';
import { TableServiceApi } from '../../../services/ruleta-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gen-user-pending',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './gen-user-pending.component.html',
  styleUrl: './gen-user-pending.component.css',
})
export class GenUserPendingComponent{
  showPassword: any;
  showVerificacion: any;
  email: string = '';
  password: string = '';
  verificacion: string = '';

  constructor(private readonly ruletaService: TableServiceApi) {}
  
  checkPassword() {
    if (this.password !== this.verificacion) {
      alert('Las contraseñas no coinciden');
      return false;
    }
    return true;
  }

  
  onSubmit() {
    this.checkPassword();
  }
}
