import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-terms-dialog',
    templateUrl: './terms-dialog.component.html',
    styleUrls: ['./terms-dialog.component.scss']
})
export class TermsDialogComponent {
    constructor(public dialogRef: MatDialogRef<TermsDialogComponent>) {}

    onAgree() {
        this.dialogRef.close(true);  // Return true when user agrees
    }

    onDisagree() {
        this.dialogRef.close(false); // Return false when user disagrees
    }
}
