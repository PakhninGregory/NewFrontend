import { Component, OnInit } from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Summit} from '../../../core/models/Summit';
import {SummitService} from '../../../core/services/Summit.service';

@Component({
  selector: 'app-show-summit',
  templateUrl: './show-summit.component.html',
  styleUrls: ['./show-summit.component.css']
})
export class ShowSummitComponent implements OnInit {

  SummitList: Summit[] = [];

  constructor(private service: SummitService) { }

  ModalTitle: string;
  ActivateAddEditComp = false;
  emp: any;
  infoSummit: Summit;

  ngOnInit(): void {
    this.refreshList();
  }

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
        for (const elem of this.SummitList){
          this.service.getSummitNamesList(elem.id.toString()).subscribe(names => {
            elem.names = names;
            elem.names.forEach(el => el.summitId = elem.id);
          });
          this.service.getSummitAlpsList(elem.id.toString()).subscribe(alps => {
            elem.alpinists = alps;
            elem.alpinists.forEach(el => el.summitId = elem.id);
            elem.alpinists.forEach(el => el.ascentDate = new Date(el.ascentDate));
          });
        }
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
}
