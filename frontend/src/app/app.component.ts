import { Component, Renderer2, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HeroSearchComponent } from './hero-search/hero-search.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tour of Heroes';
  @ViewChild(HeroSearchComponent) heroSearch!: HeroSearchComponent;

  constructor(private router: Router, private renderer: Renderer2) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const searchInput = document.querySelector('app-hero-search input');
        this.renderer.setProperty(searchInput, 'value', '');
        this.heroSearch.showResults = false;
      }else{
        this.heroSearch.showResults = true;
      }
    });
  }
}
