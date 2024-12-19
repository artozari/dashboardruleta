import { Component, OnInit } from '@angular/core';
import { RuletaServiceService } from '../../../services/ruleta-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gen-user-pending',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './gen-user-pending.component.html',
  styleUrl: './gen-user-pending.component.css',
})
export class GenUserPendingComponent implements OnInit {
  showPassword: any;
  showVerificacion: any;
  email: string = '';
  password: string = '';
  verificacion: string = '';

  constructor(private readonly ruletaService: RuletaServiceService) {}

  
  checkPassword() {
    if (this.password !== this.verificacion) {
      alert('Las contrase as no coinciden');
      return false;
    }
    return true;
  }

  ngOnInit(): void {
  }
  onSubmit() {
    this.checkPassword();
  }
}
