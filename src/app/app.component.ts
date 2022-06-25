import { Component, ViewChild } from '@angular/core';
import { GameContentComponent } from './game-content/game-content.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Circadian';

  @ViewChild('gamecomponent')
  gameComponent!: GameContentComponent;

  public appOpenStats(): void {
    this.gameComponent.openStatsModal();
  }
}
