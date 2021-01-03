import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pop-up-window',
  templateUrl: './pop-up-window.component.html',
  styleUrls: ['./pop-up-window.component.css']
})
export class PopUpWindowComponent implements OnInit, OnDestroy {
  @Output() acceptOrCancel: EventEmitter<boolean> = new EventEmitter();
  @Input() message: string = '';
  @Input() staticModal: boolean = false;
  @Input() iconClass: string = 'far fa-exclamation-triangle fa-6x text-danger';

  constructor() { }
  ngOnInit(): void {
    if (this.staticModal) { this.setModalType(); }
  }
  ngOnDestroy(): void {
    const modalsActive = document.getElementsByClassName('modal-backdrop');
    if (modalsActive.length > 0) {
    document.body.removeChild(modalsActive[0]);
    }
  }

  private setModalType(): void {
    const modalTemp: HTMLElement = document.getElementById('popUpWindow') as HTMLElement;
    modalTemp.setAttribute('data-bs-backdrop', 'static');
    modalTemp.setAttribute('data-bs-keyboard', 'false');
  }
  cancel(): void { this.acceptOrCancel.emit(false); }
  accept(): void { this.acceptOrCancel.emit(true); }
}
