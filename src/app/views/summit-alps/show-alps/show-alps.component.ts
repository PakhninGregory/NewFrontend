import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {SummitAlp} from '../../../core/models/SummitAlp';
import {SummitService} from '../../../core/services/Summit.service';
import {Summit} from '../../../core/models/Summit';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-show-alps',
  templateUrl: './show-alps.component.html',
  styleUrls: ['./show-alps.component.scss']
})
export class ShowAlpsComponent implements OnInit {

  SummitIds: number[];
  AlpsList: SummitAlp[];

  constructor(private service: SummitService, private dataPipe: DatePipe) { }
  filterobj: any[]  = ['', '', '', '', '', ''];

  ModalTitle: string;
  ActivateAddEditComp = false;
  emp: any;
  editDate: Date;

  AlpsListWithoutFilter: any = [];
  check = false;


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
    this.AlpsListWithoutFilter = [];
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
                this.AlpsListWithoutFilter.push(alp);
              }

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

  FilterClear() {
    for (let i = 0; i < this.filterobj.length; i++) {
      this.filterobj[i] = '';
    }
    this.FilterFn();
  }

  sort(buba): void {

    this.AlpsList = this.AlpsList?.sort((n1, n2) =>
      (typeof n1[buba] === 'string' ?
        n2[buba].localeCompare(n1[buba]) : (n2[buba] > n1[buba] ? -1 : 1)) * (this.check ? 1 : -1));

    this.check = !this.check;
  }
  FilterFn(){
    let dataPipe = this.dataPipe;
    let objList : string [] = ['id', 'summitId', 'lastName', 'firstName', 'middleName', 'ascentDate'];
    let filterobject = this.filterobj;
    this.AlpsList = this.AlpsListWithoutFilter.filter(function (el){
      let result = true;
      for (let i = 0; i < filterobject.length; i++){
        if (!(typeof filterobject[i] !== 'undefined' && filterobject)){
          console.log('empty');
          continue;
        }
        const element = el[objList[i]];
        const incStr = (typeof element === 'object' ?
          dataPipe.transform(element, 'dd.MM.yyyy').toLowerCase().trim() :
          element.toString().toLowerCase().trim());
        result = result && incStr.startsWith(filterobject[i]?.toString().trim().toLowerCase());

        if (!result)
          break;
      }
      return result;
    });
  }
}

