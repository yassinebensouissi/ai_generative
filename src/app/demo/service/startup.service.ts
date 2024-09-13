import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Startup } from '../api/startup';

@Injectable({
  providedIn: 'root'
})
export class StartupService {

  private apiServiceUrl=environment.apiBaseUrl;


  constructor(private http:HttpClient) { }
  GetAllStartups(): Observable<any> {
    return this.http.get<any>(`${this.apiServiceUrl}/all`);
  }
  getBySecteur(secteur: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiServiceUrl}/by-secteur?secteur=${secteur}`);
  }



  getAllSortedByDateCreation(order: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiServiceUrl}/sorted-by-date-creation?order=${order}`);
  }


  GetAllSecteurs(): Observable<any> {
    return this.http.get<any>(`${this.apiServiceUrl}/AllSecteurs`);
  }

  getBySecteurs(secteurs: string[]): Observable<any[]> {
    const secteursParam = secteurs.join(',');
    return this.http.get<any[]>(`${this.apiServiceUrl}/secteurs`, { params: { secteurs: secteursParam } });
    }

    importStartupDataFromExcel(): Observable<string> {
        return this.http.post(`${this.apiServiceUrl}/importFromExcel`, null, { responseType: 'text' });
    }

    GetAllStartupsCanada(): Observable<any> {
        return this.http.get<any>(`${this.apiServiceUrl}/allStartupsCanada`);
    }


    importStartupDataCanadaFromExcel(): Observable<string> {
        return this.http.post(`${this.apiServiceUrl}/importFromExcelCanada`, null, { responseType: 'text' });
    }

    getBySecteurAndDate(secteur: string, date: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiServiceUrl}/by-secteur-and-date`, { params: { secteur, date } });
    }

    getByDate(date: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiServiceUrl}/by-date`, { params: { date } });
    }

    importStartupDataFranceFromExcel(): Observable<string> {
        return this.http.post(`${this.apiServiceUrl}/importFromExcelFrance`, null, { responseType: 'text' });
    }

    GetAllStartupsFrance(): Observable<any> {
        return this.http.get<any>(`${this.apiServiceUrl}/allStartupsFrance`);
    }
    importEditeursCanada(): Observable<string> {
        return this.http.post(`${this.apiServiceUrl}/importFromExcelEditeursCanada`, null, { responseType: 'text' });
    }
    GetAllEditeursCanada(): Observable<any> {
        return this.http.get<any>(`${this.apiServiceUrl}/allEditeursCanada`);
    }

    importEditeursFrance(): Observable<string> {
        return this.http.post(`${this.apiServiceUrl}/importFromExcelEditeursFrance`, null, { responseType: 'text' });
    }
    GetAllEditeursFrance(): Observable<any> {
        return this.http.get<any>(`${this.apiServiceUrl}/allEditeursFrance`);
    }

    getAllRegionsCanada(): Observable<any> {
        return this.http.get<any>(`${this.apiServiceUrl}/regionsCanada`);
    }

    getAllSectorsCanada(): Observable<any> {
        return this.http.get<any>(`${this.apiServiceUrl}/sectorsCanada`);
    }
    getAllRegionsFrance(): Observable<any> {
        return this.http.get<any>(`${this.apiServiceUrl}/regionsFrance`);
    }

    getAllSectorsFrance(): Observable<any> {
        return this.http.get<any>(`${this.apiServiceUrl}/sectorsFrance`);
    }

    importAppelOffre(): Observable<string> {
        return this.http.post(`${this.apiServiceUrl}/importFromExcelAppelOffre`, null, { responseType: 'text' });
    }
    GetAllAppelOffre(): Observable<any> {
        return this.http.get<any>(`${this.apiServiceUrl}/allAppelOffre`);
    }

    getAllRegionsEditeursCanada(): Observable<any> {
        return this.http.get<any>(`${this.apiServiceUrl}/regionsEditeursCanada`);
    }

    getAllSectorsEditeursFrance(): Observable<any> {
        return this.http.get<any>(`${this.apiServiceUrl}/sectorsEditeursFrance`);
    }

    getAllRegionsEditeursFrance(): Observable<any> {
        return this.http.get<any>(`${this.apiServiceUrl}/regionsEditeursFrance`);
    }

    getAllSectorsEditeursCanada(): Observable<any> {
        return this.http.get<any>(`${this.apiServiceUrl}/sectorsEditeursCanada`);
    }

    getAllIncubateursAccelerateurs(): Observable<any> {
        return this.http.get<any>(`${this.apiServiceUrl}/allIncubateurAccelerateur`);
    }

    getAllSectorsIncubaAcc(): Observable<any> {
        return this.http.get<any>(`${this.apiServiceUrl}/sectorsIncubaAcc`);
    }

    getAllRegionsIncubaAcc(): Observable<any> {
        return this.http.get<any>(`${this.apiServiceUrl}/regionsIncubaAcc`);
    }

    getAllCountriesAppelOffre(): Observable<any> {
        return this.http.get<any>(`${this.apiServiceUrl}/countriesAppelOffre`);
    }

}




