import { Component, Input, OnInit } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit{
  heroes$!: Observable<Hero[]>;
  @Input() sharedHeroes!: Hero[];

  private searchTerms = new Subject<string>();

  constructor(private heroService: HeroService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroService.getShareableHeroes().subscribe(sharedHeroes => {
      this.heroes = sharedHeroes
    });
    this.heroes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(100),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // map the search term to a filtered list of sharedHeroes
      map((term: string) => this.filterHeroes(term)),

      // switch to new search observable each time the term changes
      // switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }

  private filterHeroes(term: string): Hero[] {
    if (!term.trim()) {
      // if no search term, return all sharedHeroes
      return [];
    }
    if (!isNaN(Number(term))) {
      term = term.trim();
      return this.heroes.filter(hero => hero.id.toString().includes(term));
    }
    return this.heroes.filter(hero =>
      hero.name.toLowerCase().includes(term.toLowerCase())
    );
  }
}
