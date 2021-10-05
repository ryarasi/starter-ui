import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Styling } from 'src/app/styling.imports';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasterGridModule } from '../abstract/master-grid/master-grid.module';
import { SimpleLoadingSpinnerComponent } from '../components/loading/simple-spinner/simple-loading-spinner.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

const imports = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  Styling,
  MasterGridModule,
  InfiniteScrollModule,
];

const declarations = [SimpleLoadingSpinnerComponent];

@NgModule({
  declarations,
  imports,
  exports: [...imports, ...declarations],
})
export class SharedModule {}