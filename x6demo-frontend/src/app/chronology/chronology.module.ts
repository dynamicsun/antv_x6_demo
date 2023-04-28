import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ChronologyModalComponent } from './chronology-modal/chronology-modal.component';

@NgModule({
  declarations: [ChronologyModalComponent],
  exports: [ChronologyModalComponent],
  imports: [CommonModule, MatDialogModule, MatButtonModule],
})
export class ChronologyModule {}
