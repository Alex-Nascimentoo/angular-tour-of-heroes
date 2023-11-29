import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IHero } from '../hero';
import { HeroService } from '../hero.service';
import { RouterLink } from '@angular/router';
import { HeroSearchComponent } from '../hero-search/hero-search.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    HeroSearchComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  heroes: IHero[] = []

  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.getHeroes()
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5))
  }
}
