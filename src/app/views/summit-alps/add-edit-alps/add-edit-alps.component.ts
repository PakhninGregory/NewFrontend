import {Component, Input, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {SummitService} from '../../../core/services/Summit.service';

@Component({
  selector: 'app-add-edit-alps',
  templateUrl: './add-edit-alps.component.html',
  styleUrls: ['./add-edit-alps.component.css']
})
export class AddEditAlpsComponent implements OnInit {

  constructor(private service: SummitService) { }

  @Input() emp: any;

  SummitIdList: number[];

  AlpId: string;
  SummitId: string;
  AlpLastName: string;
  AlpFirstName: string;
  AlpMiddleName: string;
  AlpAscentDate: Date;

  init(): void{
    this.service.getSummitsList().subscribe(
      (data) => {
        this.SummitIdList = data.map(el => el.Id);

        this.AlpId = this.emp.id;
        this.SummitId = this.emp.summitId;
        this.AlpLastName =  this.emp.lastName;
        this.AlpFirstName = this.emp.firstName;
        this.AlpMiddleName = this.emp.middleName;
        this.AlpAscentDate = this.emp.ascentDate;
        console.log(this.emp);
      }
    );
  }

  addAlp(): void{
    const val = {
      id: this.AlpId,
      summitId: this.SummitId,
      lastName:  this.emp.lastName,
      firstName: this.emp.firstName,
      middleName: this.emp.middleName,
      ascentDate: new Date (this.emp.ascentDate),
    };

    this.service.addSummitAlp(val).subscribe(
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
      summitId: this.SummitId,
      lastName:  this.emp.lastName,
      firstName: this.emp.firstName,
      middleName: this.emp.middleName,
      ascentDate: new Date (this.emp.ascentDate),
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
