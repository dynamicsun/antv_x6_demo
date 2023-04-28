import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  templateUrl: './chronology-modal.component.html',
  styleUrls: ['./chronology-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChronologyModalComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public readonly handler?: {
      readonly stationId: number;
      readonly nodeId: string;
    }
  ) {}
  ngOnInit(): void {
  }
}
