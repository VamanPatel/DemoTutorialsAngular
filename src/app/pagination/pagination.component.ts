import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../component/confirm-dialog/confirm-dialog.component';

export interface Items {
  Name: string;
}

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  name = 'Angular';
  page = 1;
  pageSize = 5;
  items: Items[] = [];

  selectedOrderFromDate!: Date;
  constructor(private dialog: MatDialog, private snak: MatSnackBar) {
    for (let i = 1; i <= 9; i++) {
      this.items.push({ Name: 'Shop ' + i });
      console.log(this.items.length);
    }
  }

  ngOnInit(): void {}

  clear() {
    console.log('datepicker', this.selectedOrderFromDate);
  }

  showDialog() {
    ConfirmDialogComponent.open(this.dialog, {
      msg: `Are you sure you want to save the filters?`,
      noText: 'No',
      title: 'Save Filter',
      yesText: 'Yes',
      disableClose: true,
      isDangerAction: true,
    })
      .afterClosed()
      .subscribe((confirm) => {
        if (confirm) {
          this.snak.open('Confirm', 'Ok', { duration: 3000 });
        }
      });
  }
}
