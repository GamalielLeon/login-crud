import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pop-up-window',
  templateUrl: './pop-up-window.component.html',
  styleUrls: ['./pop-up-window.component.css']
})
export class PopUpWindowComponent implements OnInit {
  @Input() message: string = '';

  constructor() { }
  ngOnInit(): void { }
}
