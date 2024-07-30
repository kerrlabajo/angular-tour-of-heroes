import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

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
  selectedHero?: Hero;
  
  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

  ngOnInit(): void {
    this.getHeroes();
  }
}