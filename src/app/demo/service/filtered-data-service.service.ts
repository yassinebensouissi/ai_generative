import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Startup } from '../api/startup';
import { StartupCanada } from '../api/startupcanada';
import { StartupFrance } from '../api/startupfrance';
import { EditeurCanada } from '../api/editeurcanada';
import { EditeurFrance } from '../api/editeurfrance';
import { AppelOffre } from '../api/appeloffre';
import { IncubateurAccelerateurs } from '../api/incubateuraccelerateur';

@Injectable({
  providedIn: 'root'
})
export class FilteredDataServiceService {
  private filteredDataSubject: BehaviorSubject<Startup[]> = new BehaviorSubject<Startup[]>([]);
  filteredData$: Observable<Startup[]> = this.filteredDataSubject.asObservable();

  private filteredDataCanadaSubject: BehaviorSubject<StartupCanada[]> = new BehaviorSubject<StartupCanada[]>([]);
  filteredDataCanada$: Observable<StartupCanada[]> = this.filteredDataCanadaSubject.asObservable();

  private filteredDataFranceSubject: BehaviorSubject<StartupFrance[]> = new BehaviorSubject<StartupFrance[]>([]);
  filteredDataFrance$: Observable<StartupFrance[]> = this.filteredDataFranceSubject.asObservable();

  private filteredDataEditeurCanadaSubject: BehaviorSubject<EditeurCanada[]> = new BehaviorSubject<EditeurCanada[]>([]);
  filteredEditeurCanada$: Observable<EditeurCanada[]> = this.filteredDataEditeurCanadaSubject.asObservable();

  private filteredDataEditeurFranceSubject: BehaviorSubject<EditeurFrance[]> = new BehaviorSubject<EditeurFrance[]>([]);
  filteredEditeurFrance$: Observable<EditeurFrance[]> = this.filteredDataEditeurFranceSubject.asObservable();


  private filteredAppelOffreSubject: BehaviorSubject<AppelOffre[]> = new BehaviorSubject<AppelOffre[]>([]);
  filteredAppelOffre$: Observable<AppelOffre[]> = this.filteredAppelOffreSubject.asObservable();


  private filteredIncubaAccSubject: BehaviorSubject<IncubateurAccelerateurs[]> = new BehaviorSubject<IncubateurAccelerateurs[]>([]);
  filteredIncubaAcc$: Observable<IncubateurAccelerateurs[]> = this.filteredIncubaAccSubject.asObservable();


  constructor() {}

  setFilteredData(data: Startup[]) {
    this.filteredDataSubject.next(data);
  }

  getFilteredData(): Observable<Startup[]> {
    return this.filteredData$;
  }

  setFilteredDataCanada(data: StartupCanada[]) {
    this.filteredDataCanadaSubject.next(data);
  }

  getFilteredDataCanada(): Observable<StartupCanada[]> {
    return this.filteredDataCanada$;
  }

  setFilteredDataFrance(data: StartupFrance[]) {
    this.filteredDataFranceSubject.next(data);
  }

  getFilteredDataFrance(): Observable<StartupFrance[]> {
    return this.filteredDataFrance$;
  }

  setFilteredDataEditeursCanada(data: EditeurCanada[]) {
    this.filteredDataEditeurCanadaSubject.next(data);
  }

  getFilteredDataEditeursCanada(): Observable<EditeurCanada[]> {
    return this.filteredEditeurCanada$;
  }

  setFilteredDataEditeursFrance(data: EditeurFrance[]) {
    this.filteredDataEditeurFranceSubject.next(data);
  }

  getFilteredDataEditeursFrance(): Observable<EditeurFrance[]> {
    return this.filteredEditeurFrance$;
  }


  setFilteredDataAppelOffre(data: AppelOffre[]) {
    this.filteredAppelOffreSubject.next(data);
  }

  getFilteredDataAppelOffre(): Observable<AppelOffre[]> {
    return this.filteredAppelOffre$;
  }


  setFilteredDataIncubaAcc(data: IncubateurAccelerateurs[]) {
    this.filteredIncubaAccSubject.next(data);
  }

  getFilteredDataIncubaAcc(): Observable<IncubateurAccelerateurs[]> {
    return this.filteredIncubaAcc$;
  }
}
