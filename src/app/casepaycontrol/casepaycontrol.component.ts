import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

import { ConfigService } from '../core/config.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { Provider } from '../shared/models/provider';
import CasePayControlService from '../shared/api/casepaycontrol.service';
import { CasePayControl } from '../shared/models/CasePayControl';
import * as moment from 'moment';

@Component({
  selector: 'hcf-casepaycontrol',
  templateUrl: './casepaycontrol.component.html',
  styleUrls: ['./casepaycontrol.component.scss']
})



export class CasePayControlComponent implements OnInit {
  provider: Provider = new Provider();
  providerType = '';
  providerCode = '';
  caseItem = '';
  error  = '';
  showError: Boolean = false;
  isLoadingResults = false;
  message = null;
  dataSaved: Boolean = false;
  newRowAdded: Boolean = false;
  searchPerformed: Boolean = false;
  newCasePayControl: any = {};

  public providerForm: FormGroup;
  public casePayDefinitionForm: FormGroup;


  displayedColumns: string[] = ['casepaycontrol'];

  @ViewChild(MatTable, {static: true}) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<any>;

  constructor(private casePayControlService: CasePayControlService,
              private formBuilder: FormBuilder) {}



  ngOnInit() {
                this.providerForm = new FormGroup({
                  providerType: new FormControl('', [Validators.required]),
                  providerCode: new FormControl('', [Validators.required]),
                  caseItem: new FormControl('', [Validators.required])
             });

 }

 onPaginateChange(event: any) {
    this.caseItem = this.dataSource.data[this.paginator.pageIndex].CaseItemCode;
 }

 pushNewRow() {
  this.showError = false;
  this.dataSaved = false;
  this.newCasePayControl = {

    LstUpdUserId : '',
    LstUpdTerminal : '',
    LstUpdTimestamp : null,
    CodeType : '',
    ProviderType : this.providerType,
    ProviderCode : this.providerCode,
    CaseItemCode : this.caseItem,
    DteOn : '',
    DteOff : '',
    PtsDays : 0,
    CaseStartInd : '',
    CaseItemGroup : '',
    CasePayAmount : 0,
    TargetLos : 0,
    LongStayDays : 0,
    LongStayRate : 0,
    ShortStayDays : 0,
    PerDiemInd : '',
    ShortStayRate : 0,
    IcuDays : 0,
    IcuRate1 : 0,
    IcuServCode1 : '',
    IcuRate2 : 0,
    IcuServCode2 : '',
    IcuRate3 : 0,
    IcuServCode3 : '',
    IcuRate4 : 0,
    IcuServCode4 : '',
    MaxIcuDays : 0,
    IcuPerDiemInd : '',
    PrivAddOnRate : 0,
    PrivAddOnInd : '',
    AccessUsedInd : '',
    MedSSRate : 0,
    SurgSSRate : 0,
    AdvSurgSSRate : 0


  };
  if (this.dataSource == null) {
    this.dataSource = new MatTableDataSource();
  }

  const data = this.dataSource.data;
  data.push(this.newCasePayControl);
  this.dataSource.data = data;
  this.dataSource._updateChangeSubscription();
  this.paginator.pageIndex = this.paginator.length + 1;
  this.newRowAdded = true;
  this.showError = false;
 }

  saveNewRowData() {
    if (!this.validateDates()) {
      this.showError = true;
      return;
    }

    if (!this.validateRates()) {
      this.showError = true;
      return;
    }

    this.showError = false;
    this.dataSaved = false;
    this.casePayControlService.addCasePayControl(this.dataSource.data[this.paginator.pageIndex]).subscribe(() => {
      this.message = 'Record Added Successfully';
      this.dataSaved = true;
      this.getCasePayDefinitionByProviderAndCaseItem();
      this.paginator.firstPage();
    }, error => {
      if (error.error.Message != null) {
        this.error = error.error.Message;
        this.showError = true;
      }
    });
  }

  deleteNewRow() {
    this.showError = false;
    this.dataSaved = false;

    if (this.newRowAdded) {
      this.dataSource.data.pop();
    }

    this.dataSource._updateChangeSubscription();
    if (this.dataSource.data.length === 0) {
       this.resetPageDataSource();
    }

    this.newRowAdded = false;
 }

  public hasError = (controlName: string, errorName: string) => {
    return this.providerForm.controls[controlName].hasError(errorName);
  }


  updateRowData() {

    this.showError = false;
    this.dataSaved = false;

    if (!this.validateDates()) {
      this.showError = true;
      return;
    }

    if (!this.validateRates()) {
      this.showError = true;
      return;
    }



    const casePayControl = this.dataSource.data[this.paginator.pageIndex];
    casePayControl.CaseItemCode = this.caseItem;
    casePayControl.ProviderType = this.providerType;
    casePayControl.ProviderCode = this.providerCode;

    if (casePayControl.IcuRate1 == null) {
      casePayControl.IcuRate1 = 0;
    }
    if (casePayControl.IcuRate2 == null) {
      casePayControl.IcuRate2 = 0;
    }
    if (casePayControl.IcuRate3 == null) {
      casePayControl.IcuRate3 = 0;
    }
    if (casePayControl.IcuRate4 == null) {
      casePayControl.IcuRate4 = 0;
    }

    this.casePayControlService.updateCasePayControl(casePayControl).subscribe(() => {
      this.message = 'Record Updated Successfully';
      this.dataSaved = true;
      this.getCasePayDefinitionByProviderAndCaseItem();
    }, error => {
      if (error.error.Message != null) {
        this.error = error.error.Message;
        this.showError = true;
        this.dataSaved = false;
      }
    });
  }

  deleteRowData() {
    this.showError = false;
    this.dataSaved = false;
    if (confirm('Are you sure you want to delete this record?')) {
      this.casePayControlService.deleteCasePayControl(this.dataSource.data[this.paginator.pageIndex]).subscribe(() => {
        this.message = 'Record Deleted Successfully';
        this.dataSaved = true;
        this.getCasePayDefinitionByProviderAndCaseItem();
        this.paginator.firstPage();
      }, error => {
        if (error.error.Message != null) {
          this.error = error.error.Message;
          this.showError = true;
          this.dataSaved = false;
        }
      });
    }
  }

 findIndexInData(data, property, value) {
    var result = -1;
    data.some(function (item, i) {
        if (item[property].toLowerCase() === value.toLowerCase()) {
            result = i;
            return true;
        }
    });
    return result;
  }

  performSearch() {
    this.resetForm();
    this.getCasePayDefinitionByProviderAndCaseItem();
  }

  getCasePayDefinitionByProviderAndCaseItem() {
    if (this.providerType && this.providerCode) {
      this.isLoadingResults = true;
    }

    this.dataSource = null;
    this.showError = false;

    if (this.providerCode && this.providerType && this.caseItem) {
      // tslint:disable-next-line: max-line-length
      this.casePayControlService.getCasePayControlByProviderAndCaseItem(this.providerCode, this.providerType, this.caseItem).subscribe(result => {
        if (result && result['Response']) {
              this.dataSource = new MatTableDataSource(result['Response']);
              this.dataSource.paginator = this.paginator;
              const pageIndex = this.findIndexInData(this.dataSource.data, 'CaseItemCode', this.caseItem);
              this.dataSource.paginator.pageIndex = pageIndex;
              this.dataSource._updateChangeSubscription();

        } else {
          this.resetPageDataSource();
        }
        this.isLoadingResults = false;
        this.showError = false;
        this.searchPerformed = true;
      }, error => {
          this.isLoadingResults = false;
          if (error.error.Message != null) {
              this.error = error.error.Message;
              this.resetPageDataSource();
              this.searchPerformed = true;
          } else if (error.message) {
             this.error = error.message;
             this.searchPerformed = false;
          }
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

  validateRates() {

    const currentRow = this.dataSource.data[this.paginator.pageIndex];
    // tslint:disable-next-line: max-line-length
    if (currentRow.IcuRate1 !== null && currentRow.IcuRate1 !== '' && currentRow.IcuRate1 > 0 && (currentRow.IcuServCode1 === null || currentRow.IcuServCode1 === '')) {
      this.error = 'Service code should not be blank.';
      return false;
    }

    // tslint:disable-next-line: max-line-length
    if (currentRow.IcuRate2 !== null && currentRow.IcuRate2 !== '' && currentRow.IcuRate2 > 0 && (currentRow.IcuServCode2 === null || currentRow.IcuServCode2 === '')) {
      this.error = 'Service code should not be blank.';
      return false;
    }

    // tslint:disable-next-line: max-line-length
    if (currentRow.IcuRate3 !== null && currentRow.IcuRate3 !== '' && currentRow.IcuRate3 > 0 && (currentRow.IcuServCode3 === null || currentRow.IcuServCode3 === '')) {
      this.error = 'Service code should not be blank.';
      return false;
    }

    // tslint:disable-next-line: max-line-length
    if (currentRow.IcuRate4 !== null && currentRow.IcuRate4 !== '' && currentRow.IcuRate4 > 0 && (currentRow.IcuServCode4 === null || currentRow.IcuServCode4 === '')) {
      this.error = 'Service code should not be blank.';
      return false;
    }


    // tslint:disable-next-line: max-line-length
    if ((currentRow.IcuRate1 === null || currentRow.IcuRate1 === '' || currentRow.IcuRate1 === 0) && (currentRow.IcuServCode1 !== null && currentRow.IcuServCode1 !== '')) {
      this.error = 'Please provide rates.';
      return false;
    }

    // tslint:disable-next-line: max-line-length
    if ((currentRow.IcuRate2 === null || currentRow.IcuRate2 === '' || currentRow.IcuRate2 === 0) && (currentRow.IcuServCode2 !== null && currentRow.IcuServCode2 !== '')) {
      this.error = 'Please provide rates.';
      return false;
    }

    // tslint:disable-next-line: max-line-length
    if ((currentRow.IcuRate3 === null || currentRow.IcuRate3 === '' || currentRow.IcuRate3 === 0) && (currentRow.IcuServCode3 !== null && currentRow.IcuServCode3 !== '')) {
      this.error = 'Please provide rates.';
      return false;
    }

    // tslint:disable-next-line: max-line-length
    if ((currentRow.IcuRate4 === null || currentRow.IcuRate4 === '' || currentRow.IcuRate4 === 0) && (currentRow.IcuServCode4 !== null && currentRow.IcuServCode4 !== '')) {
      this.error = 'Please provide rates.';
      return false;
    }

    return true;
  }

  validateDates() {

    let dteOn = this.dataSource.data[this.paginator.pageIndex].DteOn;
    let dteOff = this.dataSource.data[this.paginator.pageIndex].DteOff;

     if (dteOn === null || dteOn === '') {
        this.error = 'Please enter a valid date.';
        return false;
     }

     if (dteOff === null || dteOff === '') {
       this.dataSource.data[this.paginator.pageIndex].DteOff = '31129999';
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
          this.error = 'Date Off should be greater then Date On.';
          return false;
        }
      }

    return true;
  }

  resetPageDataSource() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
  }

  resetForm() {
    this.message = null;
    this.dataSaved = false;
    this.newRowAdded = false;
  }
}
