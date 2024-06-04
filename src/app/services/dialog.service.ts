import { Injectable } from '@angular/core';
import { DeleteConfirmationComponent } from '../components/delete-confirmation/delete-confirmation.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  DeleteConfirmationDialog(dialogData:any): MatDialogRef<DeleteConfirmationComponent> {
    return this.dialog.open(DeleteConfirmationComponent, {
      data: dialogData, 
      width: '500px',
      disableClose: true,
    });
  }
}
