
import {Component, OnInit, ViewChild} from '@angular/core';
import { SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { Product } from 'src/app/demo/api/product';
import { Startup } from 'src/app/demo/api/startup';
import { FilteredDataServiceService } from 'src/app/demo/service/filtered-data-service.service';
import { ProductService } from 'src/app/demo/service/product.service';
import { StartupService } from 'src/app/demo/service/startup.service';
import Swal from 'sweetalert2';


@Component({
    templateUrl: './listdemo.component.html'
})
export class ListDemoComponent implements OnInit {
    startups: Startup[] = [];
    filteredStartups: Startup[] = [];
    advancedFilterSecteur: string | null = null;
    selectedCreationYear: number | null = null;
    sortOptions: SelectItem[] = [
        { label: 'Date Creation New to Old', value: '!creation' },
        { label: 'Date Creation Old to New', value: 'creation' }
    ];
    sortOrder: number = 0;
    sortField: string = '';
    creationYearOptions: SelectItem[] = [];
    secteurOptions: SelectItem[] = [];

    constructor(private startupService: StartupService, private filteredDataService: FilteredDataServiceService) {}

    ngOnInit() {
        this.loadStartups();
        this.filteredDataService.getFilteredData().subscribe(data => {
            this.filteredStartups = data;
        });
        this.generateCreationYearOptions();
        this.loadSecteurs();
    }

    loadStartups() {
        this.startupService.GetAllStartups().subscribe(data => {
            this.startups = data;
            this.applyFilters();
        });
    }
    loadSecteurs() {
        this.startupService.GetAllSecteurs().subscribe(data => {
            this.secteurOptions = data.map((sector: any) => ({ label: sector, value: sector }));
            this.secteurOptions.unshift({ label: 'All', value: null });
        });
    }

    // Method to handle sector filter change
    onSectorChange(event: any) {
        this.advancedFilterSecteur = event.value;
        this.applyFilters();
    }
    applyFilters() {
        this.filteredStartups = this.startups.filter(startup => {
            let sectorMatch = true;
            let yearMatch = true;

            if (this.advancedFilterSecteur !== null && this.advancedFilterSecteur !== undefined &&
                !startup.secteur.toLowerCase().includes(this.advancedFilterSecteur.toLowerCase())) {
                sectorMatch = false;
            }

            if (this.selectedCreationYear !== null && this.selectedCreationYear !== undefined) {
                // Convert creation year to string for comparison
                yearMatch = startup.creation.toString() === this.selectedCreationYear.toString();
            }

            return sectorMatch && yearMatch;
        });
    }


    onCreationYearChange(event: any) {
        this.selectedCreationYear = event.value;
        this.applyFilters();
    }

    generateCreationYearOptions() {
        const currentYear = new Date().getFullYear();
        this.creationYearOptions = [
            ...Array.from({ length: currentYear - 2009 }, (_, i) => 2010 + i).map(year => ({ label: year.toString(), value: year })),
            { label: 'All', value: null }
        ];
    }

    onSortChange(event: any) {
        const value = event.value;
        if (value === '!creation') {
            // Sort by Date Creation New to Old
            this.sortOrder = -1;
            this.sortField = 'creation';
        } else {
            // Sort by Date Creation Old to New
            this.sortOrder = 1; 
            this.sortField = 'creation';
        }
        this.applySorting();
    }
    

    applySorting() {
        this.filteredStartups.sort((a, b) => {
            if (a.creation < b.creation) {
                return this.sortOrder;
            } else if (a.creation > b.creation) {
                return -this.sortOrder;
            }
            return 0;
        });
    }

    onFilter(dv: DataView, event: Event) {
        dv.filter((event.target as HTMLInputElement).value);
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
                this.startupService.importStartupDataFromExcel().subscribe(
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
