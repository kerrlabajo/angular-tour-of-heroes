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
  topHeroes: Hero[] = [];
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
    this.heroService.getShareableHeroes().subscribe(sharedHeroes => {
      if (sharedHeroes.length == 0) {
        this.heroesSubscription = this.heroService.getHeroes()
          .subscribe(fetchedHeroes => {
            this.heroes = fetchedHeroes;
            this.topHeroes = this.shuffleHeroes(fetchedHeroes).slice(0, 4);
          });
      } else {
        this.heroes = sharedHeroes;
        this.topHeroes = this.shuffleHeroes(sharedHeroes).slice(0, 4);
      }
    });
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
