import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {SummitAlp} from '../../../core/models/SummitAlp';
import {SummitService} from '../../../core/services/Summit.service';
import {Summit} from '../../../core/models/Summit';

@Component({
  selector: 'app-show-alps',
  templateUrl: './show-alps.component.html',
  styleUrls: ['./show-alps.component.css']
})
export class ShowAlpsComponent implements OnInit {

  SummitIds: number[];
  AlpsList: SummitAlp[];

  constructor(private service: SummitService) { }

  ModalTitle: string;
  ActivateAddEditComp = false;
  emp: any;
  editDate: Date;

  ngOnInit(): void {
    this.refreshList();
  }

  addClick(): void{
    this.emp = {
      id: 0,
      summitId: 0,
      lastName: '',
      firstName: '',
      middleName: '',
      ascentDate: new Date(),
    };
    this.ModalTitle = 'Add Summit\'s Alpinist';
    this.ActivateAddEditComp = true;
    console.log(this.emp);
  }

  editClick(item): void{
    this.editDate = new Date(item.ascentDate);
    this.emp = item;
    this.ModalTitle = 'Edit Summit\'s Alpinist';
    this.ActivateAddEditComp = true;
  }

  deleteClick(item): void{
    if (confirm('Вы уверены, что хотите удалить эту запись?')){
      this.service.deleteSummit(item.id).subscribe(
        (error: HttpErrorResponse) => {
          this.refreshList();
        },
      );
    }
  }

  closeClick(): void{
    this.ActivateAddEditComp = false;
    this.refreshList();
  }

  public refreshList(): void {
    this.AlpsList = [];
    this.service.getSummitsList().subscribe(
      (data: Summit[]) => {
        this.SummitIds = data.map(el => el.id);
        for (const el of this.SummitIds){
          this.service.getSummitAlpsList(el.toString()).subscribe(
            (alps: SummitAlp[]) => {
              for (const alp of alps){
                alp.summitId = el;
                alp.ascentDate = new Date(alp.ascentDate);
                this.AlpsList.push(alp);
              }

              this.AlpsList.sort((n1, n2) => (n1.id - n2.id));
            },
            (error) => {
              alert(error.message);
            }
          );
        }
      },
      (error) => {
        alert(error.message);
      });
  }
}

