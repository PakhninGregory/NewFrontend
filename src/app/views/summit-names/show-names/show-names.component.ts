import { Component, OnInit } from '@angular/core';
import {SummitService} from '../../../core/services/Summit.service';
import {HttpErrorResponse} from '@angular/common/http';
import {Summit} from '../../../core/models/Summit';
import {SummitName} from '../../../core/models/SummitName';

@Component({
  selector: 'app-show-names',
  templateUrl: './show-names.component.html',
  styleUrls: ['./show-names.component.scss']
})
export class ShowNamesComponent implements OnInit {
  filterobj: any[]  = ['', '', ''];

  SummitIds: number[];
  NameList: SummitName[];

  constructor(private service: SummitService) { }

  ModalTitle: string;
  ActivateAddEditComp = false;
  emp: any;
  NameListWithoutFilter: any = [];
  check = false;
  ngOnInit(): void {
    this.refreshList();
  }

  sort(field): void {

    this.NameList = this.NameList?.sort((n1, n2) =>
      (typeof n1[field] === 'string' ? n2[field].localeCompare(n1[field]) : (n2[field] > n1[field] ? -1 : 1)) * (this.check ? 1 : -1));

    this.check = !this.check;
  }

  FilterClear() {
    for (let i = 0; i < this.filterobj.length; i++) {
      this.filterobj[i] = '';
    }
    this.FilterFn();
  }


  FilterFn(){
    let objList : string [] = ['id', 'summitId', 'summitName'];
    let filterobject = this.filterobj;
    this.NameList = this.NameListWithoutFilter.filter(function (el){
      let result = true;
      for (let i = 0; i < filterobject.length; i++){
        if (!(typeof filterobject[i] !== 'undefined' && filterobject)){
          console.log('empty');
          continue;
        }

        result = result && el[objList[i]]?.toString().toLowerCase().startsWith(filterobject[i]?.toString().trim().toLowerCase());
        if (!result)
          break;
      }
      return result;
    });
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
                this.NameListWithoutFilter.push(alp);
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

}
