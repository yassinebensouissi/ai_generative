import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { HttpClientModule } from '@angular/common/http';

// New TODO my dashboard
import { MydashboardComponent } from './demo/components/mydashboard/mydashboard.component';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { MatDialogModule } from '@angular/material/dialog';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { DialogModule } from 'primeng/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { DialogTestComponent } from './dialog-test/dialog-test.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TermsDialogComponent } from './terms-dialog/terms-dialog.component';
import { EyeMovementComponent } from './eye-movement/eye-movement.component';

@NgModule({
    declarations: [
        AppComponent,
        NotfoundComponent,
        MydashboardComponent,
        ImageUploadComponent,
        DialogTestComponent,
        TermsDialogComponent,
        EyeMovementComponent // Ensure this is declared
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        AppLayoutModule,
        TableModule,
        CommonModule,
        RatingModule,
        ButtonModule,
        SliderModule,
        InputTextModule,
        ToggleButtonModule,
        RippleModule,
        MultiSelectModule,
        DropdownModule,
        ProgressBarModule,
        ToastModule,
        FormsModule,
        DialogModule,
        BrowserAnimationsModule, // Required for animations in dialogs
        MatDialogModule // Required for Material dialogs
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService,
        CustomerService,
        EventService,
        IconService,
        NodeService,
        PhotoService,
        ProductService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
