import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ChronologyModalComponent } from './chronology-modal/chronology-modal.component';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [ChronologyModalComponent],
  exports: [ChronologyModalComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    NgxEchartsModule,
    MatProgressSpinnerModule,
  ],
})
export class ChronologyModule {}
