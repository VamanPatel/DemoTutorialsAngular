import { DatePipe } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, FormControl } from '@angular/forms';

@Component({
  selector: 'app-ts-datepicker',
  templateUrl: './ts-datepicker.component.html',
  styleUrls: ['./ts-datepicker.component.scss'],
})
export class TSDatePickerComponent implements ControlValueAccessor {
  private INVALID_DATE_MSG = 'Invalid date';
  @Input() public set required(value: boolean) {
    this._required = value;
    if (this.controlDate) {
      this.controlDate.updateValueAndValidity();
    }
  }
  public get required(): boolean {
    return this._required && JSON.parse(String(this._required).toLowerCase());
  }

  @Input() showClear!: boolean;
  @Output() onClear: EventEmitter<any>;
  @Output() dateChange: EventEmitter<Date>;

  @Input() disableInput!: boolean;
  @Input() filter!: (date: Date | any) => boolean;
  @Input() label: string;
  @Input() public set min(minDate: Date | null) {
    this._min = <any>this.toDate(minDate);
  }
  @Input() public set max(maxDate: Date | null) {
    this._max = <any>this.toDate(maxDate);
  }
  // For Control Value Accessor: Start
  private onChange: any;
  private onTouch: any;
  // For Control Value Accessor: End
  public set date(date: Date) {
    if (date === undefined || this.matchDate(date, this.date)) {
      return;
    }
    this._date = <any>this.toDate(date);
    this.onChange(this.date);
    this.onTouch(this.date);
    this.dateChange.emit(this.date);
  }

  public get date(): Date {
    return this._date;
  }

  public get min(): Date | null {
    return this._min;
  }

  public get max(): Date | null {
    return this._max;
  }

  public get valid(): boolean {
    return this.controlDate.untouched || this.controlDate.valid;
  }

  @ViewChild('inputDate', { static: true }) inputDate!: ElementRef;
  public controlDate: FormControl;

  public _date!: Date;
  public _min!: Date | null;
  public _max!: Date | null;
  private _required!: boolean;
  private currYearSuffix: number;
  private currCentury: number;
  private prevCentury: number;

  constructor(private datePipe: DatePipe) {
    this.onChange = () => {};
    this.onTouch = () => {};
    this.label = 'Date';
    this.required = true;
    this.onClear = new EventEmitter<any>();
    this.dateChange = new EventEmitter<Date>();
    this.controlDate = new FormControl(null, <any>this.validateDate());
    const currYear = new Date().getFullYear();
    this.currYearSuffix = new Date().getFullYear() % 100;
    this.currCentury = currYear - this.currYearSuffix;
    this.prevCentury = this.currCentury - 100;
  }

  private matchDate(date1: Date, date2: Date): boolean {
    if (date1 === null && date2 === null) {
      return true;
    }
    return date1 && date2 && this.formatDate(date1) === this.formatDate(date2);
  }

  private toDate(date: Date | null): Date | null {
    return date
      ? new Date(date.getFullYear(), date.getMonth(), date.getDate())
      : null;
  }

  // Control Value Accessor Methods: Start
  writeValue(date: Date): void {
    this.date = date;
    this.onMatDateSelected(this.date);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.controlDate.disable() : this.controlDate.enable();
  }
  // Control Value Accessor Methods: End

  public onMatDateSelected(date: Date) {
    (this.inputDate.nativeElement as HTMLInputElement).value = <any>(
      (date ? this.formatDate(date) : null)
    );
    this.controlDate.updateValueAndValidity();
  }

  private validateDate() {
    return (_control: FormControl) => {
      var error = null;
      let inputValue: string | null;
      try {
        inputValue = this.inputDate.nativeElement.value;
      } catch (err) {
        inputValue = null;
      }

      if (!inputValue) {
        if (this.required) {
          error = { custom: '* Required' };
        } else {
          this.date = <any>null;
          return null;
        }
      }

      if (!error) {
        const array = inputValue ? inputValue.split('/') : null;
        if (!array || array.length !== 3) {
          error = { custom: this.INVALID_DATE_MSG };
        } else if (array[2].length !== 4 && array[2].length !== 2) {
          error = { custom: this.INVALID_DATE_MSG };
        } else if (!this.isValidDate(<string>inputValue)) {
          error = { custom: this.INVALID_DATE_MSG };
        } else {
          var year = +array[2];
          if (year < 100) {
            year +=
              year <= this.currYearSuffix ? this.currCentury : this.prevCentury;
          }
          const date = new Date(year, +array[0] - 1, +array[1]);
          const inputMillis = date.getTime();
          if (this.min && inputMillis < this.min.getTime()) {
            // Date is too past
            error = { custom: this.INVALID_DATE_MSG };
          } else if (this.max && inputMillis > this.max.getTime()) {
            // Date is too future
            error = { custom: this.INVALID_DATE_MSG };
          } else if (this.filter && !this.filter(date)) {
            // Date is filtered
            error = { custom: this.INVALID_DATE_MSG };
          }

          this.date = <any>(error ? null : date);
        }
      } else {
        this.date = <any>null;
      }

      return error;
    };
  }

  private isValidDate(inputDate: string) {
    const dayArray = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const dateArray = inputDate.split('/');
    const month = +dateArray[0];
    const day = +dateArray[1];
    const year = +dateArray[2];

    if (month <= 12 && day <= dayArray[month - 1]) {
      return true;
    }

    if (month === 2 && year % 4 === 0 && day <= 29) {
      return true;
    }
    return false;
  }

  public clearDate() {
    this.writeValue(<any>null);
    this.onClear.emit();
  }

  public onKeyDown(event: KeyboardEvent) {
    if (event.keyCode === 13) {
      this.onMatDateSelected(this.date);
    }
  }

  public formatDate(date: any) {
    return this.datePipe.transform(date, 'M/d/yyyy');
  }
}
