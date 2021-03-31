import { Component, OnInit } from '@angular/core';
import {SummitService} from '../../../core/services/Summit.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Summit} from '../../../core/models/Summit';
import {SummitName} from '../../../core/models/SummitName';

@Component({
  selector: 'app-show-names',
  templateUrl: './show-names.component.html',
  styleUrls: ['./show-names.component.css']
})
export class ShowNamesComponent implements OnInit {

  SummitIds: number[];
  NameList: SummitName[];

  constructor(private service: SummitService) { }

  ModalTitle: string;
  ActivateAddEditComp = false;
  emp: any;

  ngOnInit(): void {
    this.refreshList();
  }

  addClick(): void{
    this.emp = {
      id: 0,
      summitId: 0,
      summitName: '',
    };
    this.ModalTitle = 'Add Summit\'s Name';
    this.ActivateAddEditComp = true;
  }

  editClick(item): void{
    this.emp = item;
    this.ModalTitle = 'Edit Summit\'s Name';
    this.ActivateAddEditComp = true;
  }

  deleteClick(item): void{
    if (confirm('Вы уверены, что хотите удалить эту запись?')){
      this.service.deleteSummitName(item.summitId, item.id).subscribe(
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
    this.NameList = [];
    this.service.getSummitsList().subscribe(
      (data: Summit[]) => {
        this.SummitIds = data.map(el => el.id);
        for (const el of this.SummitIds){
          this.service.getSummitNamesList(el.toString()).subscribe(
            (alps: SummitName[]) => {
              for (const alp of alps){
                alp.summitId = el;
                this.NameList.push(alp);
              }

              this.NameList.sort((n1, n2) => n1.id - n2.id);
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
