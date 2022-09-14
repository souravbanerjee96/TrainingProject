import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { __createBinding } from 'tslib';

@Component({
  selector: 'app-grid-ui',
  templateUrl: './grid-ui.component.html'
})
export class GridUiComponent implements OnInit {

  gridColumn:Array<any> = new Array<any>();
  gridData:Array<any> = new Array<any>();

  constructor() { }

  ngOnInit(): void {
  }
  ConfirmDelete = false;
  ConfirmEdit = false;

  @Input("grid-columns")
  set SetGridColums(_gridcolumn:Array<any>){
    this.gridColumn=_gridcolumn;
  }
  @Input("grid-data")
  set SetGridData(_griddata:Array<any>){
    this.gridData=_griddata;
  }

  @Output("grid-selected")
  emiemitter:EventEmitter<any>=new EventEmitter<any>();

  @Output("grid-deleted")
  delemitter:EventEmitter<number>=new EventEmitter<number>();

  SelectGridData(_selected:any){
    this.emiemitter.emit(_selected);
  }
  DeleteGridData(_selected:any){
    console.log(_selected);
    this.delemitter.emit(_selected.id);
  }

}
