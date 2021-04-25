import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Summit} from '../../../core/models/Summit';
import {SummitService} from '../../../core/services/Summit.service';

@Component({
  selector: 'app-show-summit',
  templateUrl: './show-summit.component.html',
  styleUrls: ['./show-summit.component.scss']
})
export class ShowSummitComponent implements OnInit {

  constructor(private service: SummitService) { }
  filterobj: any[]  = ['', '', '', '', ''];

  SummitList: Summit[] = [];

  ModalTitle: string;
  ActivateAddEditComp = false;
  emp: any;
  infoSummit: Summit;

  SummitListWithoutFilter: any = [];
  check = false;
  ngOnInit(): void {
    this.refreshList();
  }

  sort(field): void {

    this.SummitList = this.SummitList?.sort((n1, n2) =>
      (typeof n1[field] === 'string' ? n2[field].localeCompare(n1[field]) : (n2[field] > n1[field] ? -1 : 1)) * (this.check ? 1 : -1));

    this.check = !this.check;
  }



  addClick(): void{
    this.emp = {
      id: 0,
      mainland: '',
      latitude: '',
      longitude: '',
      height: '',
    };
    this.ModalTitle = 'Add summit';
    this.ActivateAddEditComp = true;
    console.log(this.emp);
  }

  editClick(item): void{
    console.log(item);
    this.emp = item;
    this.ModalTitle = 'Edit summit';
    this.ActivateAddEditComp = true;
  }

  showInfo(item): void{
    console.log(item);
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    this.infoSummit = item;
    button.setAttribute('data-target', '#infoSummitModal');
    container.appendChild(button);
    button.click();
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

  refreshList(): void{
    this.service.getSummitsList().subscribe(
      (data: any) => {
        this.SummitList = data as Summit[];
        this.SummitListWithoutFilter = data as Summit[];
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getAlpinistData(id: number): string{
    if (id == null){
      return ' ';
    }

    const curSum: Summit = this.SummitList.find(el => el.id === id);
    let lT = ' ';

    if (curSum == null){
      return null;
    }
    console.log(curSum?.alpinists);
    for (const alp of curSum?.alpinists){
      console.log(alp);
      lT =  lT.concat(alp.lastName, ' ', alp.firstName, ' ', alp.middleName, ' (', alp.ascentDate.toLocaleDateString() , ')\n');
      console.log(lT);
    }
    return lT;
  }

  FilterClear() {
    for (let i = 0; i < this.filterobj.length; i++) {
      this.filterobj[i] = '';
    }
    this.FilterFn();
  }


  FilterFn(){
    let objList : string [] = ['id', 'mainland', 'latitude', 'longitude', 'height'];
    let filterobject = this.filterobj;
    this.SummitList = this.SummitListWithoutFilter.filter(function (el){
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

}
