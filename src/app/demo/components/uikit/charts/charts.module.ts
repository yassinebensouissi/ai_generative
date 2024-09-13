
import { ChartsComponent } from './charts.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { DataViewModule } from 'primeng/dataview';
import { PickListModule } from 'primeng/picklist';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { OrderListModule } from 'primeng/orderlist';
import { FormsModule } from '@angular/forms';
import { ChartsRoutingModule } from './charts-routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChartsRoutingModule,
        FileUploadModule,
        DataViewModule,
        PickListModule,
        OrderListModule,
        InputTextModule,
        DropdownModule,
        RatingModule,
        ButtonModule
    ],
    declarations: [ChartsComponent]
})
export class ChartsModule { }
