import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiCallService } from '../../services/api-call.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrl: './delete-confirmation.component.css'
})
export class DeleteConfirmationComponent {

  isDeleteSuccessful: boolean = false;
  selectedBookId: number = 0;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DeleteConfirmationComponent>,
    private apiCall: ApiCallService,
    private router: Router) {
    this.selectedBookId = this.data.additionalData.selectedBookId;
  }

  CloseDialog() {
    this.dialogRef.close();
  }

  DeleteAndClose() {
    this.apiCall.DeleteBookById(this.selectedBookId).subscribe(
      (response) => {
        setTimeout(() => {
          this.isDeleteSuccessful = response;
          setTimeout(() => {
            this.dialogRef.close();
            this.router.navigate([`/allBooks`]);
          }, 2000);  
        }, 1000);  
      });
  }
}
