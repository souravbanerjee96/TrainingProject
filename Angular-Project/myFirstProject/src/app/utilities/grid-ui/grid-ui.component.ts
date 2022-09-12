import { Component, Input, OnInit } from '@angular/core';

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

  @Input("grid-columns")
  set SetGridColums(_gridcolumn:Array<any>){
    this.gridColumn=_gridcolumn;
  }
  @Input("grid-data")
  set SetGridData(_griddata:Array<any>){
    this.gridData=_griddata;
  }

}
