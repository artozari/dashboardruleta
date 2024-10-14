import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-titletable',
  standalone: true,
  imports: [],
  templateUrl: './titletable.component.html',
  styles: ``
})
export class TitletableComponent {

  @Input() nameTable="";
}
