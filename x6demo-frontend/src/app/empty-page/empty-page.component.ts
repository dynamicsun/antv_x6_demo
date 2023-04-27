import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-empty-page',
  templateUrl: './empty-page.component.html',
  styleUrls: ['./empty-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyPageComponent {

}
