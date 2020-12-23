import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  // Attributes
  private showImagesBgSubscription: Subscription;
  private refSetIntervalShowImagesObs: any;

  constructor() { this.showImagesBgSubscription = this.showImagesBgObs().subscribe(); }
  ngOnInit(): void { }

  ngOnDestroy(): void {
    // Unsubscribe from the observable and clear the setInterval function inside the observable.
    this.showImagesBgSubscription.unsubscribe();
    clearInterval(this.refSetIntervalShowImagesObs);
    document.body.style.backgroundImage = 'url("assets/images/bgImg0.jpg")';
  }

  // Method that changes the background image, using an observable.
  private showImagesBgObs(): Observable<string> {
    let indexImage = 0;
    return new Observable<string>( observer => {
      this.refSetIntervalShowImagesObs = setInterval( () => {
        const bgImage = document.body.style.backgroundImage = `url(assets/images/bgImg${++indexImage}.jpg)`;
        observer.next(bgImage);
        indexImage &= 3;
      }, 4000);
    });
  }
}
