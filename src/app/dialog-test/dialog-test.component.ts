import { Component } from '@angular/core';

@Component({
    selector: 'app-dialog-test',
    templateUrl: './dialog-test.component.html',
})
export class DialogTestComponent {
    displayTermsDialog: boolean = false;

    showTermsDialog() {
        this.displayTermsDialog = true;
    }

    onAgree() {
        // Handle agree action
        this.displayTermsDialog = false;
    }

    onDisagree() {
        // Handle disagree action
        this.displayTermsDialog = false;
    }
}
