import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { __createBinding } from 'tslib';

@Component({
  selector: 'app-grid-ui',
  templateUrl: './grid-ui.component.html'
})
export class GridUiComponent implements OnInit {

  Readmsg:string='';
  gridColumn:Array<any> = new Array<any>();
  gridBook:Array<any> = new Array<any>();
  gridData:Array<any> = new Array<any>();

  constructor(private _router:Router) { }

  ngOnInit(): void {
  }
  ConfirmDelete = false;
  ConfirmEdit = false;

  @Input("grid-columns")
  set SetGridColums(_gridcolumn:Array<any>){
    this.gridColumn=_gridcolumn;
  }

  @Input("read-book-columns")
  set SetBookColums(_gridcolumn:Array<any>){
    this.gridBook=_gridcolumn;
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
    this.delemitter.emit(_selected.Id);
  }
  readBook(_data:any){

    const keys = Object.keys(_data);
    const values = Object.values(_data);
    const entries = Object.entries(_data);
    //console.log( values );
    this.Readmsg='';
    for(var _i = 0; _i < this.gridBook.length; _i++){
      this.Readmsg = this.Readmsg + this.gridBook[_i] + values[_i]+'<br/>';
    }
    document.getElementById('btnReadBook')?.click();
  }
}
