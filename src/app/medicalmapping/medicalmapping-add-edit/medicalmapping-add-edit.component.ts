import { DatePipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from 'src/app/common/common.module';
import MedicalMappingService from 'src/app/shared/api/medicalmapping.service';
import { MedicalMappingModel } from 'src/app/shared/models/MedicalMapping';

@Component({
  selector: 'hcf-medicalmapping-add-edit',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe, NgIf],
  templateUrl: './medicalmapping-add-edit.component.html',
  styleUrl: './medicalmapping-add-edit.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class MedicalmappingAddEditComponent {
  id?: number;
  title!: string;

  readonly medicalMappingForm = new FormGroup({
    Description: new FormControl('', [Validators.required]),
    ItemCode: new FormControl('', [Validators.required]),
    Speciality: new FormControl('', [Validators.required]),
    DateOn: new FormControl('', [Validators.required]),
    DateOff: new FormControl(undefined),
    Lst_Upd_UserID: new FormControl(''),
    Action: new FormControl('')
  });

  constructor(private route: ActivatedRoute,
    private router: Router, private medicalMappingService: MedicalMappingService) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.title = 'Add Medical Mapping';
    if (this.id) {
      this.title = 'Edit Medical Mapping';
      this.medicalMappingService.getById(this.id)
        .subscribe((x: any) => {
          this.medicalMappingForm.patchValue(x);
        });
    }
  }
  getMedicalMappingsIndex(): number {
    this.medicalMappingService.getAllMedicalMappings().subscribe(result => {
      if (result) {
        console.log(result)
        return result.length + 1
      }
    });
    return 1
  }

  onSubmit(): void {
    if (this.medicalMappingForm.invalid) {
      return;
    }
    this.medicalMappingService.getAllMedicalMappings().subscribe(result => {
      if (result) {
        this.saveMedicalMapping(result.length + 1)
          .subscribe({
            next: () => {
              this.router.navigateByUrl('/');
            },
            error: error => {
              console.log(error)
            }
          })
      }
    });
  }
  private saveMedicalMapping(id: number) {

    let medicalMappingObj: MedicalMappingModel = new MedicalMappingModel();
    medicalMappingObj.id = id;
    medicalMappingObj.Description = String(this.medicalMappingForm.controls.Description.value);
    medicalMappingObj.ItemCode = String(this.medicalMappingForm.controls.ItemCode.value);
    medicalMappingObj.Speciality = String(this.medicalMappingForm.controls.Speciality.value);
    medicalMappingObj.Lst_Upd_UserID = String(this.medicalMappingForm.controls.Lst_Upd_UserID.value);
    medicalMappingObj.Action = String(this.medicalMappingForm.controls.Action.value);
    medicalMappingObj.DateOn = String(new DatePipe("en-US").transform(String(this.medicalMappingForm.controls.DateOn.value), 'YYYY-MM-dd'));
    if (String(this.medicalMappingForm.controls.DateOff.value) != '' && String(this.medicalMappingForm.controls.DateOff.value) != null && String(this.medicalMappingForm.controls.DateOff.value) != 'null') {
      medicalMappingObj.DateOff = String(new DatePipe("en-US").transform(String(this.medicalMappingForm.controls.DateOff.value), 'YYYY-MM-dd'));
    }
    if (this.id) {
      medicalMappingObj.id = this.id;
    }
    medicalMappingObj.Lst_Upd_TimeStamp = String(new DatePipe("en-US").transform(new Date(), 'YYYY-MM-dd'));
    console.log(medicalMappingObj)
    return this.id
      ? this.medicalMappingService.updateMedicalMapping(this.id!, medicalMappingObj)
      : this.medicalMappingService.create(medicalMappingObj);
  }
}
