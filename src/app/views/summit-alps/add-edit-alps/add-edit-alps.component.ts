import {Component, Input, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {SummitService} from '../../../core/services/Summit.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-add-edit-alps',
  templateUrl: './add-edit-alps.component.html',
  styleUrls: ['./add-edit-alps.component.css']
})
export class AddEditAlpsComponent implements OnInit {

  constructor(private service: SummitService, private datePipe: DatePipe) { }

  @Input() emp: any;

  SummitIdList: number[];

  AlpId: number;
  SummitId: number;
  AlpLastName: string;
  AlpFirstName: string;
  AlpMiddleName: string;
  AlpAscentDate: string;

  init(): void{
    this.service.getSummitsList().subscribe(
      (data) => {
        this.SummitIdList = data.map(el => el.id);

        this.AlpId = this.emp.id;
        this.SummitId = this.emp.summitId;
        this.AlpLastName =  this.emp.lastName;
        this.AlpFirstName = this.emp.firstName;
        this.AlpMiddleName = this.emp.middleName;
        this.AlpAscentDate = this.datePipe.transform(this.emp.ascentDate, 'yyyy-MM-dd');
      }
    );
  }

  addAlp(): void{
    const val = {
      lastName:  this.AlpLastName,
      firstName: this.AlpFirstName,
      middleName: this.AlpMiddleName,
      ascentDate: new Date (this.AlpAscentDate).toISOString(),
    };

    this.service.addSummitAlp(this.SummitId, val).subscribe(
      (res: any) => {
        alert('Объект создан! Для обновления закройте форму создания.');
      },
      (error => {
        alert(error.message);
      }));
  }

  updateAlp(): void{
    const val = {
      id: this.AlpId,
      lastName:  this.AlpLastName,
      firstName: this.AlpFirstName,
      middleName: this.AlpMiddleName,
      ascentDate: new Date (this.AlpAscentDate).toISOString(),
    };

    this.service.updateSummitAlp(this.SummitId, val).subscribe(
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
