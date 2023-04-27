import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StationsService } from '../api/services';
import { Observable } from 'rxjs';
import { StationListItem } from '../api/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  stations$: Observable<StationListItem[]>;
  constructor(apiService: StationsService) {
    this.stations$ = apiService.list();
  }
}
