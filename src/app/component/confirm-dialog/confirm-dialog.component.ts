import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit {
  public static open(
    dialog: MatDialog,
    data: any
  ): MatDialogRef<ConfirmDialogComponent, boolean> {
    return dialog.open(ConfirmDialogComponent, {
      data: data,
      disableClose: data.disableClose,
    });
  }

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent, boolean>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.data.msg = this.data.msg.replaceAll('\n', '<br>');
  }

  ngOnInit(): void {}
}
