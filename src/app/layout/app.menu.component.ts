import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { StartupService } from '../demo/service/startup.service';
import { FilteredDataServiceService } from '../demo/service/filtered-data-service.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];
    selectedSecteur: string | null = null;
    selectedDate: string | null = null;

    constructor(
        public layoutService: LayoutService,
        public startupService: StartupService,
        private filteredDataService: FilteredDataServiceService,
        private router: Router
    ) {}

    ngOnInit() {
        this.loadMenu();
        this.router.events.pipe(
            filter((event: any) => event instanceof NavigationEnd) // Specify type for 'event'
        ).subscribe(() => {
            this.filterMenu();
        });
    }

    loadMenu() {
        this.loadStaticMenuItems();
        this.filterMenu();
    }

    

    filterMenu() {
        const currentUrl = this.router.url;
        const isDashboardPage = currentUrl === '/';
    
        this.model.forEach((menuItem: any) => {
            if (isDashboardPage) {
                // Always show 'Home', 'Startups', 'Éditeurs de logiciels', and 'Appels d\'Offres' when in 'Dashboard'
                menuItem.visible = menuItem.label === 'Home' || menuItem.label === 'Startups' || menuItem.label === 'Éditeurs de logiciels' || menuItem.label === 'Appels d\'Offres' || menuItem.label === 'Incubateurs & Accélérateurs';
            } else {
                // Apply regular filtering logic based on the current route for other menu items
                menuItem.visible = menuItem.items.some((item: any) => currentUrl.startsWith(item.routerLink[0]));
            }
        });
    }
    
    

    loadStaticMenuItems() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },
            {
                label: 'Startups',
                items: [
                    { label: 'Tunisie', icon: 'pi pi-fw pi-flag', routerLink: ['/uikit/list'] },
                    { label: 'Canada', icon: 'pi pi-fw pi-flag', routerLink: ['/uikit/file'] },
                    { label: 'France', icon: 'pi pi-fw pi-flag', routerLink: ['/uikit/charts'] }
                ]
            },

            {
                label: 'Éditeurs de logiciels',
                items: [
                    { label: 'Canada', icon: 'pi pi-fw pi-flag', routerLink: ['/uikit/floatlabel'] },
                    { label: 'France', icon: 'pi pi-fw pi-flag', routerLink: ['/uikit/formlayout'] }
                ]
            },
            {
                label: 'Appels d\'Offres',
                items: [
                    { label: 'Tous les appels d\'Offres', icon: 'pi pi-fw pi-search-plus', routerLink: ['/uikit/input'] },
                ]
            },

            {
                label: 'Incubateurs & Accélérateurs',
                items: [
                    { label: 'Incubateurs et Accélérateurs', icon: 'pi pi-fw pi-compass', routerLink: ['/uikit/media'] },
                ]
            }

        ];
    }


    /*onSectorChange(sector: string) {
        this.selectedSecteur = sector;
        this.onSecteurClick({ item: { label: sector } }); // Trigger the existing method to handle sector selection
    }

    loadDynamicSecteurs() {
        this.startupService.GetAllSecteurs().subscribe(
            (secteurs) => {
                const transformedSecteurs = this.transformSecteurs(secteurs);
                this.addSecteursToMenu(transformedSecteurs);
            },
            (error) => {
                console.error('An error occurred while fetching secteurs: ', error);
            }
        );
    }

    transformSecteurs(secteurs: any[]): any[] {
        const transformedItems: any[] = [];
        secteurs.forEach(secteur => {
            const menuItem: any = {
                label: secteur,
                selected: false,
                items: this.transformItems(secteur.items || []),
            };
            transformedItems.push(menuItem);
        });
        return transformedItems;
    }
*/
    transformItems(items: any[]): any[] {
        const transformedItems: any[] = [];

        items.forEach(item => {
            let menuItem: any;

            if (item.checkbox) {
                menuItem = {
                    label: item.label,
                    icon: item.icon,
                    checkbox: true
                };
            } else {
                menuItem = {
                    label: item.label,
                    icon: item.icon,
                    routerLink: item.routerLink,
                    url: item.url ? item.url[0] : undefined,
                    target: item.target,
                    items: this.transformItems(item.items)
                };
            }

            transformedItems.push(menuItem);
        });

        return transformedItems;
    }

    /*addSecteursToMenu(secteurs: any[]) {
        const secteursMenuItem = this.model.find(item => item.label === 'Secteurs');
        if (secteursMenuItem) {
            secteursMenuItem.items = [{
                items: [{
                    label: 'Secteurs',
                    items: secteurs.map(secteur => ({
                        label: secteur.label,
                        checkbox: true,
                        command: (event: MenuItem) => this.onSecteurClick(event)
                    }))
                }]
            }];
        } else {
            this.model.push({
                label: 'Secteurs',
                items: [{
                    label: 'Secteurs',
                    items: secteurs.map(secteur => ({
                        label: secteur.label,
                        checkbox: true,
                        command: (event: MenuItem) => this.onSecteurClick(event)
                    }))
                }]
            });
        }
    }

    onSecteurClick(event: any) {
        if (event && event.item && event.item.label) {
            const secteur = event.item;
            secteur.selected = !secteur.selected; // Toggle selected state
            if (secteur.selected) {
                this.selectedSecteur = secteur.label;
            } else {
                this.selectedSecteur = null;
            }
            this.filterData(); // Update filter on sector change
        } else {
            console.error('Invalid event object:', event);
        }
    }


    filterData() {
        if (this.selectedSecteur !== null && this.selectedDate !== null) {
            this.startupService.getBySecteurAndDate(this.selectedSecteur, this.selectedDate).subscribe(data => {
                this.filteredDataService.setFilteredData(data);
            });
        } else if (this.selectedSecteur !== null) {
            this.startupService.getBySecteur(this.selectedSecteur).subscribe(data => {
                this.filteredDataService.setFilteredData(data);
            });
        } else if (this.selectedDate !== null) {
            this.startupService.getByDate(this.selectedDate).subscribe(data => {
                this.filteredDataService.setFilteredData(data);
            });
        } else {
            // No filters applied, reset data
            this.filteredDataService.setFilteredData([]);
        }
    } */
}

