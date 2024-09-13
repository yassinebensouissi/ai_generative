import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { IncubateurAccelerateurs } from 'src/app/demo/api/incubateuraccelerateur';
import { Product } from 'src/app/demo/api/product';
import { FilteredDataServiceService } from 'src/app/demo/service/filtered-data-service.service';
import { PhotoService } from 'src/app/demo/service/photo.service';
import { ProductService } from 'src/app/demo/service/product.service';
import { StartupService } from 'src/app/demo/service/startup.service';
import { DataView } from 'primeng/dataview';

@Component({
    templateUrl: './mediademo.component.html'
})
export class MediaDemoComponent implements OnInit {

    startups: IncubateurAccelerateurs[] = [];
    sortOptions: SelectItem[] = [];
    sortOrder: number = 0;
    sortField: string = '';
    filteredStartups: IncubateurAccelerateurs[] = [];
    advancedFilterSecteur: string = '';
    advancedFilterRegion: string = ''; // Add advancedFilterRegion
    creationYearOptions: SelectItem[] = [];
    secteurOptions: SelectItem[] = [];
    regionOptions: SelectItem[] = []; // Add regionOptions

    constructor(private startupService: StartupService, private filteredDataService: FilteredDataServiceService) { }

    ngOnInit() {
        this.loadStartups();
        this.loadSectors();
        this.loadRegions(); // Load regions
        this.filteredDataService.getFilteredDataIncubaAcc().subscribe(data => {
            this.filteredStartups = data;
        });
    }

    loadStartups() {
        this.startupService.getAllIncubateursAccelerateurs().subscribe(data => {
            this.startups = data;
            this.applyAdvancedFilter();
        });
    }

    loadRegions() {
        this.startupService.getAllRegionsIncubaAcc().subscribe(data => {
            this.regionOptions = [{ label: 'All', value: '' }, ...data.map((region: any) => ({ label: region, value: region }))];
        });
    }

    onRegionChange(event: any) {
        this.advancedFilterRegion = event.value;
        this.applyAdvancedFilter();
    }

    loadSectors() {
        this.startupService.getAllSectorsIncubaAcc().subscribe(data => {
            this.secteurOptions = [{ label: 'All', value: '' }, ...data.map((sector: any) => {
                const splitSector = sector.split(', ');
                const label = splitSector[splitSector.length - 1].trim() || "Développement et conception de sites Web";
                return { label, value: sector };
            })];
        });
    }

    applyAdvancedFilter() {
        this.filteredStartups = this.startups.filter(startup => {
            const sectorMatch = !this.advancedFilterSecteur || startup.sector.toLowerCase().includes(this.advancedFilterSecteur.toLowerCase());
            const regionMatch = !this.advancedFilterRegion || startup.region.toLowerCase().includes(this.advancedFilterRegion.toLowerCase());
            return sectorMatch && regionMatch;
        });
    }

    onFilter(dv: DataView, event: Event) {
        dv.filter((event.target as HTMLInputElement).value);
    }

    onSectorChange(event: any) {
        this.advancedFilterSecteur = event.value;
        this.applyAdvancedFilter();
    }

    /*importStartupData() {
        Swal.fire({
            title: 'Confirmation',
            text: 'Are you sure you want to import startup data?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                this.startupService.importStartupDataCanadaFromExcel().subscribe(
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
    }*/
}
