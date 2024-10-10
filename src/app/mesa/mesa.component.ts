import { Component, Input} from '@angular/core';
import { TitletableComponent } from './titletable/titletable.component';
import { ShowdataComponent } from './showdata/showdata.component';

@Component({
  selector: 'app-mesa',
  standalone: true,
  imports: [TitletableComponent, ShowdataComponent],
  templateUrl: `./mesa.component.html`,
  styles: ``
})

export class MesaComponent {

}