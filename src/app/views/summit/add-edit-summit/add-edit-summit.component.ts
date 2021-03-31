import {Component, Input, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {SummitService} from '../../../core/services/Summit.service';
import {SummitName} from '../../../core/models/SummitName';
import {SummitAlp} from '../../../core/models/SummitAlp';

@Component({
  selector: 'app-add-edit-summit',
  templateUrl: './add-edit-summit.component.html',
  styleUrls: ['./add-edit-summit.component.css']
})

export class AddEditSummitComponent implements OnInit {

  constructor(private service: SummitService) { }

  @Input() emp: any;
  SummitId: string;
  SummitMainland: string;
  SummitLatitude: string;
  SummitLongitude: string;
  SummitHeight: string;
  SummitNames: SummitName[];
  SummitAlps: SummitAlp[];

  init(): void{
    this.SummitId = this.emp.id;
    this.SummitMainland = this.emp.mainland;
    this.SummitLatitude = this.emp.latitude;
    this.SummitLongitude = this.emp.longitude;
    this.SummitHeight = this.emp.height;
    console.log(this.emp);
  }

  addSummit(): void{
    const val = {
      id: this.SummitId,
      mainland: this.SummitMainland,
      latitude: this.SummitLatitude,
      longitude: this.SummitLongitude,
      height: this.SummitHeight,
      names: this.SummitNames,
      alpinists: this.SummitAlps,
    };

    this.service.addSummit(val).subscribe(
      (res: any) => {
        alert('Объект создан! Для обновления закройте форму создания.');
      },
      (error => {
        alert(error.message);
      }));
  }

  updateSummit(): void{
    const val = {
      id: this.SummitId,
      mainland: this.SummitMainland,
      latitude: this.SummitLatitude,
      longitude: this.SummitLongitude,
      height: this.SummitHeight,
      names: this.SummitNames,
      alpinists: this.SummitAlps,
    };

    this.service.updateSummit(val).subscribe(
      (res: HttpErrorResponse) => {
        alert(`Объект ${val.id} успешно обновлен!`);
      },
      (error => {
        alert(error.message);
      }));
  }

  ngOnInit(): void {
    this.init();
  }
}
