import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit{
  // hero: Hero = {
  //   id: 1,
  //   name: 'Windstorm'
  // };

  constructor(
    private heroService: HeroService,
    private messageService: MessageService
  ) {}

  heroes: Hero[] = [];
  private heroesSubscription!: Subscription;
  selectedHero?: Hero;
  
  getHeroes(): void {
    this.heroesSubscription = this.heroService.getHeroes()
        .subscribe(heroes => {
          this.heroes = heroes;
        });
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    const addHeroSubscription = this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
        addHeroSubscription.unsubscribe();
      });
  }

  delete(hero: Hero, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if(confirm(`Are you sure you want to delete ${hero.name}?`)) {
      const deleteHeroSubscription = this.heroService.deleteHero(hero.id)
        .subscribe(() => {
          const index = this.heroes.indexOf(hero);
          if (index > -1) {
            this.heroes.splice(index, 1); // Remove the element directly
          }
          deleteHeroSubscription.unsubscribe();
        });
    }
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