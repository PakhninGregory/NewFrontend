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

  SummitList: Summit[] = [];

  constructor(private service: SummitService) { }

  ModalTitle: string;
  ActivateAddEditComp = false;
  emp: any;
  infoSummit: Summit;

  SummitIdFilter: string="";
  SummitNameFilter: string="";
  SummitListWithoutFilter: any=[];


  ngOnInit(): void {
    this.refreshList();
  }



  sort(ev): void {
    console.log(ev);
    this.service.getSummitsList().subscribe(
      (data: any) => {
        this.SummitList = data as Summit[];


        let condition = (n1, n2) => (n1).localeCompare(n2);

        this.SummitList.sort((n1, n2) => n1.id - n2.id);

        this.SummitList.sort(condition);

        const cond: number = 1;
        switch (cond) {
          case 0: {
            condition = (n1, n2) => (n1).localeCompare(n2);

            break;
          }
          case 1: {
            condition = (n1, n2) => n1.id - n2.id;


            break;
          }
          default: {

            break;
          }


        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  // sort(buba): void{
  //   this.service.getSummitsList().subscribe(
  //     (data: any) => {
  //       this.SummitList = data as Summit[];
  //       if (this.SummitList[0].buba >= this.SummitList[1].buba){
  //         this.SummitList.sort((n1, n2) => n2.buba - n1.buba);
  //       }
  //       else {
  //         this.SummitList.sort((n1, n2) => n1.buba - n2.buba);
  //       }
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }



  addClick(): void{
    this.emp = {
      id: 0,
      mainland: '',
      latitude: '',
      longitude: '',
      height: '',
    };
    this.ModalTitle = 'Add Summit';
    this.ActivateAddEditComp = true;
    console.log(this.emp);
  }

  editClick(item): void{
    console.log(item);
    this.emp = item;
    this.ModalTitle = 'Edit Summit';
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
        this.SummitList.sort((n1, n2) => n1.id - n2.id);
        this.SummitListWithoutFilter = data as Summit[];
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getAlpinistData(summitId: number): string{
    if (summitId == null){
      return ' ';
    }

    const curSum: Summit = this.SummitList.find(el => el.id === summitId);
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


  FilterFn(){
    let SummitIdFilter = this.SummitIdFilter;
    let SummitNameFilter = this.SummitNameFilter;

    this.SummitList = this.SummitListWithoutFilter.filter(function (el){
      return el.SummitId.toString().toLowerCase().includes(
        SummitIdFilter.toString().trim().toLowerCase()
        )&&
        el.SummitName.toString().toLowerCase().includes(
          SummitNameFilter.toString().trim().toLowerCase()
        )
    });
  }
  //
  // sortResult(prop,asc){
  //   this.DepartmentList = this.DepartmentListWithoutFilter.sort(function(a,b){
  //     if(asc){
  //       return (a[prop]>b[prop])?1 : ((a[prop]<b[prop]) ?-1 :0);
  //     }else{
  //       return (b[prop]>a[prop])?1 : ((b[prop]<a[prop]) ?-1 :0);
  //     }
  //   })
  // }
  //

}
