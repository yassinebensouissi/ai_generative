import { Component, OnInit } from '@angular/core';

import { SelectItem } from 'primeng/api';
import { AppelOffre } from 'src/app/demo/api/appeloffre';
import { FilteredDataServiceService } from 'src/app/demo/service/filtered-data-service.service';
import { StartupService } from 'src/app/demo/service/startup.service';
import { DataView } from 'primeng/dataview';
import Swal from 'sweetalert2';
interface MonthIndex {
    [key: string]: number;
}
@Component({
    templateUrl: './inputdemo.component.html',
})
export class InputDemoComponent implements OnInit {
    startups: AppelOffre[] = [];
    //sortOptions: SelectItem[] = [];
    sortOrder: number = 1;
    sortField: string = '';
    filteredStartups: AppelOffre[] = [];
    advancedFilterSecteur: string = '';
    advancedFilterCountry: string = '';
    creationYearOptions: SelectItem[] = [];
    sortOptions: SelectItem[] = [
        { label: 'Date New to Old', value: '!date' },
        { label: 'Date Old to New', value: 'date' }
    ];
    countryOptions: SelectItem[] = [];


    constructor(private startupService: StartupService, private filteredDataService: FilteredDataServiceService) { }

    ngOnInit() {
        this.loadStartups();
        this.loadCountries();


        this.filteredDataService.getFilteredDataAppelOffre().subscribe(data => {
            this.filteredStartups = data;
        });
    }

    loadCountries() {
        this.startupService.getAllCountriesAppelOffre().subscribe(data => {
            this.countryOptions = [{ label: 'All', value: '' }, ...data.map((country: any) => ({ label: country, value: country }))];
        });
    }

    onCountryChange(event: any) {
        this.advancedFilterCountry = event.value;
        this.applyAdvancedFilter();
    }




    onFilter(dv: DataView, event: Event) {
        dv.filter((event.target as HTMLInputElement).value);
    }

    loadStartups() {
        this.startupService.GetAllAppelOffre().subscribe(data => {
            this.startups = data;
            this.applyAdvancedFilter();
            console.log(this.startups);
        });
    }

    applyAdvancedFilter() {
        this.filteredStartups = this.startups.filter(startup => {
            const countryMatch = !this.advancedFilterCountry ||
                (startup.country && startup.country.toLowerCase().includes(this.advancedFilterCountry.toLowerCase())) ||
                this.advancedFilterCountry === '';
            return countryMatch;
        });
    }




    importStartupData() {
        Swal.fire({
            title: 'Confirmation',
            text: 'Are you sure you want to import editeurs data?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                this.startupService.importAppelOffre().subscribe(
                    response => {
                        console.log(response);
                        this.loadStartups();
                        Swal.fire('Success', 'Editeurs data imported successfully!', 'success');
                    },
                    error => {
                        console.error(error);
                        Swal.fire('Error', 'Failed to import Editeurs data.', 'error');
                    }
                );
            }
        });
    }
}
