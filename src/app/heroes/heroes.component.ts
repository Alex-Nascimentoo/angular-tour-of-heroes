import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IHero } from '../hero';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroService } from '../hero.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-heroes',
    standalone: true,
    templateUrl: './heroes.component.html',
    styleUrl: './heroes.component.scss',
    imports: [
      CommonModule,
      FormsModule,
      NgFor,
      HeroDetailComponent,
      RouterLink
    ]
})
export class HeroesComponent {
  heroes: IHero[] = [];

  constructor(
    private heroService: HeroService,
    // private messageService: MessageService
  ) {}

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  add(name: string): void {
    name = name.trim();
    if(!name) { return }

    this.heroService.addHero({ name } as IHero)
      .subscribe(hero => {
        this.heroes.push(hero)
      })
  }

  delete(hero: IHero): void {
    this.heroes = this.heroes.filter(h => h !== hero)
    this.heroService.deleteHero(hero.id).subscribe()
  }
}
