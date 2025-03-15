import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from '../about/about.component';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AboutComponent],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '0',
        overflow: 'hidden',
        opacity: '0',
        padding: '0',
        margin: '0'
      })),
      state('expanded', style({
        height: '*',
        opacity: '1'
      })),
      transition('collapsed <=> expanded', [
        animate('300ms ease-in-out')
      ])
    ])
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isUsersSectionExpanded = false;
  isAnimating = false;

  toggleUsersSection() {
    this.isAnimating = true;
    this.isUsersSectionExpanded = !this.isUsersSectionExpanded;

    if (!this.isUsersSectionExpanded) {
      setTimeout(() => {
        this.isAnimating = false;
      }, 300);
    }
  }
}
