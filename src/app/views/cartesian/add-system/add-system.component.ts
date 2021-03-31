import {Component, Input, OnInit} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {CartesianService} from '../../../core/services/Cartesian.service';

@Component({
  selector: 'app-add-system',
  templateUrl: './add-system.component.html',
  styleUrls: ['./add-system.component.scss']
})
export class AddSystemComponent implements OnInit {

  constructor(private service: CartesianService) { }

  @Input() pointer: any;
  pointerId: number;
  pointerX: number;
  pointerY: number;

  init(): void{
    this.pointerId = this.pointer.id;
    this.pointerX = this.pointer.x;
    this.pointerY = this.pointer.y;
    console.log(this.pointer);
  }

  addPoint(): void{
    const val = {
      id: this.pointerId,
      x: this.pointerX,
      y: this.pointerY
    };

    this.service.addPoint(val).subscribe(
      (res: any) => {
        alert('Объект создан! Для обновления закройте форму создания.');
      },
      (error => {
        alert(error.message);
      }));
  }

  updatePoint(): void{
    const val = {
      id: this.pointerId,
      x: this.pointerX,
      y: this.pointerY
    };

    this.service.updatePoint(val).subscribe(
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
