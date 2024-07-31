import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  private heroesSubscription!: Subscription;

  constructor(private heroService: HeroService) {}

  private shuffleHeroes(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  getHeroes(): void {
    this.heroesSubscription = this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = this.shuffleHeroes(heroes).slice(0, 4));
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  ngOnDestroy() {
    if (this.heroesSubscription) {
      this.heroesSubscription.unsubscribe();
    }
  }

}
