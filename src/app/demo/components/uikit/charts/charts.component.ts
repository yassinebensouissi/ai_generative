import { Component, OnDestroy, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { StartupFrance } from 'src/app/demo/api/startupfrance';
import { FilteredDataServiceService } from 'src/app/demo/service/filtered-data-service.service';
import { StartupService } from 'src/app/demo/service/startup.service';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import Swal from 'sweetalert2';

@Component({
    templateUrl: './charts.component.html'
})
export class ChartsComponent implements OnInit {

    startups: StartupFrance[] = [];
    sortOptions: SelectItem[] = [];
    sortOrder: number = 0;
    sortField: string = '';
    filteredStartups: StartupFrance[] = [];
    advancedFilterSecteur: string = '';
    advancedFilterRegion: string = '';
    creationYearOptions: SelectItem[] = [];
    regionOptions: SelectItem[] = []; // Define regionOptions
    secteurOptions: SelectItem[] = [];

    constructor(private startupService: StartupService, private filteredDataService: FilteredDataServiceService) { }

    ngOnInit() {
        this.loadStartups();
        this.loadRegions(); // Load regions
        this.loadSectors();
        this.filteredDataService.getFilteredDataFrance().subscribe(data => {
            this.filteredStartups = data;
        });
    }

    loadStartups() {
        this.startupService.GetAllStartupsFrance().subscribe(data => {
            this.startups = data;
            this.applyAdvancedFilter();
        });
    }

    onFilter(dv: any, event: any) {
        const value = event.target.value.toLowerCase();
        this.filteredStartups = this.startups.filter(startup => {
            return startup.name.toLowerCase().includes(value);
        });
    }


    loadSectors() {
        this.startupService.getAllSectorsFrance().subscribe(data => {
            this.secteurOptions = [{ label: 'All', value: '' }, ...data.map((sector: any) => ({ label: sector, value: sector }))];
        });
    }

    loadRegions() {
        this.startupService.getAllRegionsFrance().subscribe(data => {
            this.regionOptions = [{ label: 'All', value: '' }, ...data.map((region: any) => ({ label: region, value: region }))];
        });
    }

    applyAdvancedFilter() {
        this.filteredStartups = this.startups.filter(startup => {
            const sectorMatch = !this.advancedFilterSecteur || startup.sector.toLowerCase().includes(this.advancedFilterSecteur.toLowerCase());
            const regionMatch = !this.advancedFilterRegion || startup.region.toLowerCase().includes(this.advancedFilterRegion.toLowerCase());
            return sectorMatch && regionMatch;
        });
    }

    onSectorChange(event: any) {
        this.advancedFilterSecteur = event.value;
        this.applyAdvancedFilter();
    }

    onRegionChange(event: any) {
        this.advancedFilterRegion = event.value;
        this.applyAdvancedFilter();
    }

    importStartupData() {
        Swal.fire({
            title: 'Confirmation',
            text: 'Are you sure you want to import startup data?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                this.startupService.importStartupDataFranceFromExcel().subscribe(
                    response => {
                        console.log(response);
                        this.loadStartups();
                        Swal.fire('Success', 'Startup data imported successfully!', 'success');
                    },
                    error => {
                        console.error(error);
                        Swal.fire('Error', 'Failed to import startup data.', 'error');
                    }
                );
            }
        });
    }
}

