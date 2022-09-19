import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ReaderModule } from 'src/app/reader/reader.module';
import { AuthorModule } from 'src/app/author/author.module';
import { GridUiComponent } from './grid-ui.component';

@NgModule({
  declarations: [
    GridUiComponent
  ],
  imports: [CommonModule],
  exports: [GridUiComponent,CommonModule],
  providers: [],
})
export class GridUIModule { }