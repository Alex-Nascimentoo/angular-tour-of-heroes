import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IHero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of, catchError, map, tap } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes'

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) { }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`)
  }

  getHeroes(): Observable<IHero[]> {
    return this.http.get<IHero[]>(this.heroesUrl)
      .pipe(
        tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<IHero[]>('getHeroes', []))
      )
  }

  getHero(id: number): Observable<IHero> {
    const url = `${this.heroesUrl}/${id}`
    
    return this.http.get<IHero>(url).pipe(
      tap(_ => this.log(`fetched hero id: ${id}`)),
      catchError(this.handleError<IHero>(`getHero id: ${id}`))
    )
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  updateHero(hero: IHero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id: ${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    )
  }

  addHero(hero: IHero): Observable<IHero> {
    return this.http.post<IHero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: IHero) => this.log(`added hero with id: ${newHero.id}`)),
      catchError(this.handleError<IHero>('addHero'))
    )
  }

  deleteHero(id: number): Observable<IHero> {
    const url = `${this.heroesUrl}/${id}`

    return this.http.delete<IHero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero with id: ${id}`)),
      catchError(this.handleError<IHero>('deleteHero'))
    )
  }

  searchHeroes(term: string): Observable<IHero[]> {
    if(!term.trim()) {
      return of([])
    }

    return this.http.get<IHero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ? this.log(`found heroes matching "${term}"`) : this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<IHero[]>('searchHeroes', []))
    )
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
