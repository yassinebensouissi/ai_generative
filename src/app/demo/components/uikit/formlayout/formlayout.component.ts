import { Component } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { EditeurFrance } from 'src/app/demo/api/editeurfrance';
import { FilteredDataServiceService } from 'src/app/demo/service/filtered-data-service.service';
import { StartupService } from 'src/app/demo/service/startup.service';
import Swal from 'sweetalert2';
import { DataView } from 'primeng/dataview';


@Component({
    templateUrl: './formlayout.component.html'
})
export class FormLayoutComponent {

    startups: EditeurFrance[] = [];
    sortOptions: SelectItem[] = [];
    sortOrder: number = 0;
    sortField: string = '';
    filteredStartups: EditeurFrance[] = [];
    advancedFilterSecteur: string = '';
    creationYearOptions: SelectItem[] = [];

    advancedFilterRegion: string = ''; 
    regionOptions: SelectItem[] = [];
    secteurOptions: SelectItem[] = [];



    constructor(private startupService: StartupService, private filteredDataService: FilteredDataServiceService) { }

    ngOnInit() {
        this.loadStartups();

        this.loadSectors();
        this.loadRegions(); 

        this.filteredDataService.getFilteredDataEditeursFrance().subscribe(data => {
            this.filteredStartups = data;
        });
    }

    loadRegions() {
        this.startupService.getAllRegionsEditeursFrance().subscribe(data => {
            this.regionOptions = [{ label: 'All', value: '' }, ...data.map((region: any) => ({ label: region, value: region }))];
        });
    }

    onRegionChange(event: any) {
        this.advancedFilterRegion = event.value;
        this.applyAdvancedFilter();
    }

    loadSectors() {
        this.startupService.getAllSectorsEditeursFrance().subscribe(data => {
            this.secteurOptions = [{ label: 'All', value: '' }, ...data.map((sector: any) => {
                const splitSector = sector.split(', ');
                const label = splitSector[splitSector.length - 1].trim() || "Développement et conception de sites Web";
                return { label, value: sector };
            })];
        });
    }

    



    onFilter(dv: DataView, event: Event) {
        dv.filter((event.target as HTMLInputElement).value);
    }

    loadStartups() {
        this.startupService.GetAllEditeursFrance().subscribe(data => {
            this.startups = data;
            this.applyAdvancedFilter();
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


    /*applyAdvancedFilter() {
        this.filteredStartups = this.startups.filter(startup => {
            if (this.advancedFilterSecteur && !startup.sector.toLowerCase().includes(this.advancedFilterSecteur.toLowerCase())) {
                return false;
            }
            return true;
        });
    }*/
    

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
                this.startupService.importEditeursFrance().subscribe(
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