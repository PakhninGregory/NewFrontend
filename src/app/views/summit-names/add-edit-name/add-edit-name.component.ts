import {Component, Input, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {SummitService} from '../../../core/services/Summit.service';

@Component({
  selector: 'app-add-edit-name',
  templateUrl: './add-edit-name.component.html',
  styleUrls: ['./add-edit-name.component.scss']
})
export class AddEditNameComponent implements OnInit {

  constructor(private service: SummitService) { }

  @Input() emp: any;

  SummitIdList: number[];

  NameId: string;
  SummitId: string;
  SummitName: string;

  init(): void{
    this.service.getSummitsList().subscribe(
      (data) => {
        this.SummitIdList = data.map(el => el.id);

        this.NameId = this.emp.id;
        this.SummitId = this.emp.summitId;
        this.SummitName =  this.emp.summitName;
      }
    );
  }

  addName(): void{
    const val = {
      summitName:  this.SummitName,
    };

    this.service.addSummitName(this.SummitId, val).subscribe(
      (res: any) => {
        alert('Объект создан! Для обновления закройте форму создания.');
      },
      (error => {
        alert(error.message);
      }));
  }

  updateName(): void{
    const val = {
      summitName:  this.SummitName,
    };

    this.service.updateSummitName(this.SummitId, this.NameId, val).subscribe(
      (res: HttpErrorResponse) => {
        alert(`Объект ${this.NameId} успешно обновлен!`);
      },
      (error => {
        alert(error.message);
      }));
  }

  ngOnInit(): void {
    this.init();
  }

}
