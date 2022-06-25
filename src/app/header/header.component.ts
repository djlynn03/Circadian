import { Attribute, Component, EventEmitter, OnInit, Output, ViewRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Output() statsOpen: EventEmitter<boolean> = new EventEmitter<boolean>();

  ngOnInit(): void {
  }
  public openStats(): void {
    this.statsOpen.emit(true);
    // document.getElementsByClassName("modal-container")[0].classList.add("shown");
    // document.getElementsByClassName("modal-container")[0].classList.remove("hidden");

  }
}
