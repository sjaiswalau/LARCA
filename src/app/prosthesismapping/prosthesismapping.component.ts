import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import ProsthesisMappingService from '../shared/api/prosthesismapping.service';
import * as moment from 'moment';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'hcf-prosthesismapping',
  templateUrl: './prosthesismapping.component.html',
  styleUrls: ['./prosthesismapping.component.scss']
})

export class ProsthesisMappingComponent implements OnInit {

  public filterForm: FormGroup;
  public addRowForm: FormGroup;
  prosthesisMappingForm: FormGroup;
  itemCode = '';
  error  = '';
  showDescription: Boolean = false;
  showError: Boolean = false;
  showMessage: Boolean = false;
  successMessage = '';
  isLoadingResults = false;
  columns: string[];
  displayedColumns: string[];
  displayColumns: string[];

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<any>;

  constructor(private formBuilder: FormBuilder,
              private prosthesisMappingService: ProsthesisMappingService) {
    this.displayedColumns = ["Action", "Description", "ItemCode", "Speciality", "DateOn", "DateOff", "Lst_Upd_UserId", "Lst_Upd_Timestamp"];
    this.displayColumns = ['Attribute_No', 'Desc', 'Value'];
  }

  ngOnInit(): void {
    this.createForm();

    this.filterForm = new FormGroup({
      itemCode: new FormControl('', [Validators.required])
    });

    this.addRowForm = new FormGroup({
      newItemCode: new FormControl(''),
      newDateOn: new FormControl(''),
      newDateOff: new FormControl(''),
    });
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.filterForm.controls[controlName].hasError(errorName);
  }


  updateRowData() {
    this.showError = false;
    this.showMessage = false;

    if (!this.validateDates()) {
      this.showError = true;
      return;
    }

    this.prosthesisMappingService.updateProsthesisMapping(this.dataSource).subscribe(data => {
      this.searchMappingByItemCode();
      this.showMessage = true;
      this.successMessage = 'Record updated successfully.';
    }, error => {
      if (error['Message'] !== '') {
        this.error = error.error['Message'];
        this.showError = true;
        this.dataSource = new MatTableDataSource(error.error['Response']);
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  pushNewRow() {
    const newProsthesisMapping = {
      Action : '',
      Description : '',
      ItemCode :  '',
      Speciality : 'H',
      DateOn :  '',
      DateOff :  '',
      Lst_Upd_UserId : '',
      Lst_Upd_Timestamp : ''
    };
    if (this.dataSource == null) {
      this.dataSource = new MatTableDataSource();
    }

    const data = this.dataSource.data;
    data.push(newProsthesisMapping);
    this.dataSource.data = data;
    this.paginator.pageIndex = this.paginator.length + 1;
    this.showError = false;
   }

  searchMappingByItemCode() {
    if (this.itemCode) {
      this.isLoadingResults = true;
    }
    this.showMessage = false;
    this.dataSource = null;
    this.paginator.firstPage();
    this.showError = false;

    if (this.itemCode) {
      this.prosthesisMappingService.searchProsthesisMappingByItemCode(this.itemCode).subscribe(result => {
        if (result) {
          if(result["Response"].length === 0)
          {
              this.pushNewRow();
          }
          else
          {
              this.dataSource = new MatTableDataSource(result['Response']);
              this.dataSource.paginator = this.paginator;

          }
          this.isLoadingResults = false;

        } else {
          {
            this.showError = true;
            this.isLoadingResults = false;
            this.dataSource = new MatTableDataSource();
            //this.dataSource.paginator = this.paginator;

          }
        }
      }, error => {
        this.isLoadingResults = false;
        if (error.error.Message != null) {
            this.error = error.error.Message;
        } else if ( error.message) {
           this.error = error.message;
        }
        this.resetPageDataSource();
        this.showError = true;
      });
    }
  }

  validateDates() {

    for (let i = 0; i < this.dataSource.data.length; i++) {

      if (this.dataSource.data[i].Action.toLowerCase() === 'a' || this.dataSource.data[i].Action.toLowerCase() === 'm') {


        let dteOn = this.dataSource.data[i].DateOn;
        let dteOff = this.dataSource.data[i].DateOff;

        if (dteOn === null || dteOn === '') {
            this.error = 'Please enter a valid date.';
            return false;
          }

        if (dteOff === null || dteOff === '') {
          this.dataSource.data[i].DateOff = '31129999';
          dteOff = '31129999';
        }

        if (!this.isNumber(dteOff)) {
          this.error = 'Please enter a valid date.';
          return false;
        }

        if (!this.isNumber(dteOn)) {
         this.error = 'Please enter a valid date.';
         return false;
       }

        const parsedDateOff = this.parseDate(dteOff);
        const parsedDateOn = this.parseDate(dteOn);

        if (dteOn != null && parsedDateOn.toString() === 'Invalid Date') {
          this.error = 'Please enter a valid date.';
          return false;
        }

        if (dteOff != null && parsedDateOff.toString() === 'Invalid Date') {
          this.error = 'Please enter a valid date.';
          return false;
        }

        if (dteOn != null && dteOff != null) {

          if (parsedDateOff < parsedDateOn) {
            this.error = 'Date Off should be grater then Date On.';
            return false;
          }
        }
      }
    }
    return true;
  }

  isNumber (str: string) {
    const pattern = /^\d+$/;
    return pattern.test(str);
  }

  parseDate (dateToParse: any) {
    const date = moment(dateToParse, 'DD/MM/YYYY').toString();
    return new Date(date);
  }


  resetPageDataSource() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
  }

   /**
   * Initializes the Form & by default adds an empty row to the PRIMENG TABLE
   */
  private createForm(): void {
    this.prosthesisMappingForm = this.formBuilder.group({
      tableRowArray: this.formBuilder.array([
        this.createTableRow()
      ])
    });
  }


  private createTableRow(): FormGroup {
    return this.formBuilder.group({
      Description: new FormControl(null, { validators: [Validators.required, Validators.maxLength(80)] })
    });
  }
}
