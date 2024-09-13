import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormLayoutComponent } from './formlayout.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { FormlayoutRoutingModule } from './formlayout-routing.module';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DataViewModule } from 'primeng/dataview';
import { PickListModule } from 'primeng/picklist';
import { OrderListModule } from 'primeng/orderlist';
import { RatingModule } from 'primeng/rating';


@NgModule({
    imports: [
        CommonModule,
        DropdownModule,
        FormsModule,
        InputTextModule,
        InputTextareaModule,
        ButtonModule,
        FormlayoutRoutingModule,
        CommonModule,
        FormsModule,
        DataViewModule,
        PickListModule,
        OrderListModule,
        InputTextModule,
        DropdownModule,
        RatingModule,
        ButtonModule
    ],
    declarations: [FormLayoutComponent]
})
export class FormlayoutModule { }
