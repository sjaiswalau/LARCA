import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { Provider } from '../shared/models/provider';
import ProviderService from '../shared/api/provider.service';
import CasePayDefinitionService from '../shared/api/casepaydefinition.service';
import * as moment from 'moment';

@Component({
  selector: 'hcf-example',
  templateUrl: './casepaydefinition.component.html',
  styleUrls: ['./casepaydefinition.component.scss']
})

export class CasePayDefinitionComponent implements OnInit {
  provider: Provider = new Provider();
  providerType = '';
  providerCode = '';
  providerDescription = '';
  error  = '';
  showProviderDescription: Boolean = false;
  showError: Boolean = false;
  showMessage: Boolean = false;
  successMessage = '';
  isLoadingResults = false;
  public providerForm: FormGroup;
  public casePayDefinitionForm: FormGroup;

  displayedColumns: string[] = ['action', 'date', 'servicecode1', 'caseitem1',
                                'servicecode2', 'caseitem2', 'servicecode3', 'caseitem3', 'illnesscodes'];

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<any>;

  constructor(private providerService: ProviderService,
              private casePayDefinitionService: CasePayDefinitionService,
              private formBuilder: FormBuilder) {}



  ngOnInit() {
                this.providerForm = new FormGroup({
                  providerType: new FormControl('', [Validators.required]),
                  providerCode: new FormControl('', [Validators.required])
                });

  }

  public hasError = (controlName: string, errorName: string) => {
    return this.providerForm.controls[controlName].hasError(errorName);
  }

  onKeyUp(e: any) {
    e.preventDefault();
    let value = e.srcElement.value.split(' ').join('');

    if (value.length > 0) {
      value = value.substring(0, 25).match(new RegExp('.{1,5}', 'g')).join(' ');
    }

    e.srcElement.value = value;
  }



  updateRowData() {
    this.showError = false;
    this.showMessage = false;

    if (!this.validateDates()) {
      this.showError = true;
      return;
    }
    this.casePayDefinitionService.updateCasePayDefinition(this.dataSource, this.providerCode, this.providerType).subscribe(data => {
      this.getCasePayDefinition();
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

  searchProvider() {
    if (this.providerType && this.providerCode) {
      this.isLoadingResults = true;
    }
    this.showMessage = false;
    this.dataSource = null;
    this.paginator.firstPage();
    this.showError = false;
    this.showProviderDescription = false;
    if (this.providerCode && this.providerType) {
      this.providerService.getByProviderCodeAndType(this.providerCode, this.providerType).subscribe(result => {
        if (result && result['Response']) {
              this.providerDescription = result['Response'].ProviderDescription;
              this.showProviderDescription = true;
              this.getCasePayDefinition();
              this.isLoadingResults = false;

        } else {
              this.showProviderDescription = false;
              this.showError = true;
              this.isLoadingResults = false;
              this.dataSource = new MatTableDataSource();
              this.dataSource.paginator = this.paginator;
        }
      }, error => {
          this.isLoadingResults = false;
          if (error.error.Message != null) {
              this.error = error.error.Message;
          } else if ( error.message) {
             this.error = error.message;
          }
          this.resetPageDataSource();
          this.showProviderDescription = false;
          this.showError = true;
      });
    }
  }

  parseDate (dateToParse: any) {
    const date = moment(dateToParse, 'DD/MM/YYYY').toString();
    return new Date(date);
  }

  isNumber (str: string) {
    const pattern = /^\d+$/;
    return pattern.test(str);
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

  resetPageDataSource() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
  }

  getCasePayDefinition() {
      this.casePayDefinitionService.getCasePayDefinitionByProviderCodeAndType(this.providerCode, this.providerType).subscribe(result => {
        if (result) {
          this.dataSource = new MatTableDataSource(result['Response']);
          this.dataSource.paginator = this.paginator;
        } else {
          this.resetPageDataSource();
        }
      }, error => {
          if (error.error.Message != null) {

          }
      });
    }
}
