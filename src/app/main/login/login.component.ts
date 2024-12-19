import { Component, OnInit } from '@angular/core';
import { RuletaServiceService } from '../../services/ruleta-service.service';
import { FormsModule } from '@angular/forms';
import { GenUserPendingComponent } from './gen-user-pending/gen-user-pending.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, GenUserPendingComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  enumRolUser: object;
  rolUser: number;

  constructor(private readonly ruletaService: RuletaServiceService) {
    this.enumRolUser = {
      ADMIN: 0o1,
      USER: 0o2, // 0001 + 0010 = 0011
      SUPERUSER: 0o4, // 0011 + 0100 = 0111
      SUPERADMIN: 0o10, // 0111 + 1000 = 1111
      PENDIENTE: 0o100, // 1111 + 10000 = 11111
    };
    this.rolUser = 0o5;
  }
  ngOnInit(): void {
    // this.ruletaService.login(this.email, this.password).subscribe((data) => {
    //   console.log(data);
    // });
  }
  onSubmit() {
    throw new Error('Method not implemented.');
  }
}
