import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import MedicalMappingService from '../../shared/api/medicalmapping.service';
import * as moment from 'moment';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MedicalMappingModel } from '../../shared/models/MedicalMapping';
import { CommonModule } from 'src/app/common/common.module';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { first } from 'rxjs';

@Component({
  selector: 'hcf-medicalmapping-list',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  templateUrl: './medicalmapping-list.component.html',
  styleUrls: ['./medicalmapping-list.component.scss'],
  providers: [provideNativeDateAdapter()],
})

export class MedicalMappingListComponent implements OnInit {
  public filterForm: FormGroup;
  public addRowForm: FormGroup;
  medicalMappingForm: FormGroup;
  description = '';
  error = '';
  showDescription: Boolean = false;
  showError: Boolean = false;
  showMessage: Boolean = false;
  successMessage = '';
  isLoadingResults = false;
  columns: string[];
  displayedColumns: string[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<MedicalMappingModel>;

  constructor(
    private medicalMappingService: MedicalMappingService) {
    this.displayedColumns = ["Action", "Description", "ItemCode", "Speciality", "DateOn", "DateOff", "Lst_Upd_UserId", "Lst_Upd_Timestamp","opration"];
  }

  ngOnInit(): void {
    this.filterForm = new FormGroup({
      description: new FormControl('', [Validators.required])
    });

    this.addRowForm = new FormGroup({
      newDescription: new FormControl('', [Validators.required]),
      newDateOn: new FormControl(''),
      newDateOff: new FormControl(''),
    });

    this.getAllMedicalMappings();
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

    this.medicalMappingService.updateMedicalMapping(1,this.dataSource).subscribe(data => {
      if (!this.description)
        this.getAllMedicalMappings();
      else
        this.searchMappingByDescription();

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
    const newMedicalMapping: MedicalMappingModel = {
      id: 0,
      Action: '',
      Description: '',
      ItemCode: '',
      Speciality: 'M',
      DateOn: '',
      DateOff: '',
      Lst_Upd_UserID: '',
      Lst_Upd_TimeStamp: ''
    };
    if (this.dataSource == null) {
      this.dataSource = new MatTableDataSource();
    }

    const data = this.dataSource.data;
    data.push(newMedicalMapping);
    this.dataSource.data = data;
    this.paginator.pageIndex = this.paginator.length + 1;
    this.showError = false;
  }


  getAllMedicalMappings() {

    this.medicalMappingService.getAllMedicalMappings().subscribe(result => {
      if (result) {
        // if (result["Response"].length === 0) {
        if (result.length === 0) {
          this.pushNewRow();
        }
        else {
          // this.dataSource = new MatTableDataSource(result['Response']);
          this.dataSource = new MatTableDataSource(result);
          this.dataSource.paginator = this.paginator;

        }
      } else {
        {
          this.showError = true;
          this.isLoadingResults = false;
          this.dataSource = new MatTableDataSource();
        }
      }
    }, error => {
      if (error.error.Message != null) {
        this.error = error.error.Message;
      } else if (error.message) {
        this.error = error.message;
      }
      this.resetPageDataSource();
      this.showError = true;
    });
  }
  deletemedical(id: number) {
    this.medicalMappingService.delete(id)
      .pipe(first())
      .subscribe(() => this.dataSource.data = this.dataSource.data!.filter(x => x.id !== id));
  }

  searchMappingByDescription() {

    if (!this.description)
      return;

    this.isLoadingResults = true;

    this.showMessage = false;
    this.dataSource = null;
    this.paginator.firstPage();
    this.showError = false;

    if (this.description || this.description == "") {
      // this.medicalMappingService.searchMedicalMappingByDescription(this.description).subscribe(result => {
        this.medicalMappingService.getAllMedicalMappings().subscribe(result => {
        if (result) {
          // if (result["Response"].length === 0) {
          if (result.length === 0) {
            this.pushNewRow();
          }
          else {
            // this.dataSource = new MatTableDataSource(result['Response'].filter(x => x.Description.includes(this.description)));
            this.dataSource = new MatTableDataSource(result.filter(x => x.Description.includes(this.description)));
            this.dataSource.paginator = this.paginator;

          }
          this.isLoadingResults = false;

        } else {
          {
            this.showError = true;
            this.isLoadingResults = false;
            this.dataSource = new MatTableDataSource();
          }
        }
      }, error => {
        this.isLoadingResults = false;
        if (error.error.Message != null) {
          this.error = error.error.Message;
        } else if (error.message) {
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
            this.error = 'Date Off should be greater then Date On.';
            return false;
          }
        }
      }
    }
    return true;
  }

  isNumber(str: string) {
    const pattern = /^\d+$/;
    return pattern.test(str);
  }

  parseDate(dateToParse: any) {
    const date = moment(dateToParse, 'DD/MM/YYYY').toString();
    return new Date(date);
  }

  resetPageDataSource() {
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
  }

}
