import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../../../api.service';

@Component({
  selector: 'app-create',
  imports: [MatDialogModule, MatButtonModule,ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent implements OnInit{
  constructor (private users: ApiService,private dialogRef: MatDialogRef<CreateComponent>) {}
  
  isLoading: boolean = false; 
  departments: any[] = [];
  positions: any[] = [];
  designations: any[] = [];

  ngOnInit(): void {
    this.users.getdepartment().subscribe(data => {
      this.departments = data;
    });
    this.users.getdesignation().subscribe(data => {
      this.positions = data;
    });

    this.users.getposition().subscribe(data => {
      this.designations = data;
    });
  }

  userform = new FormGroup({
    name: new FormControl('', Validators.required),
    birthdate: new FormControl('', Validators.required),
    birthplace: new FormControl('', Validators.required),
    phone_number: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    address : new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    department: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
    designation: new FormControl('', Validators.required),
    email : new FormControl('', [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required, Validators.minLength(8)])
  });

  register() {
    console.log('Registering user with data:', this.userform.value); // Log request payload
    this.isLoading = true;
  
    this.users.postusers(this.userform.value).subscribe(
      (result: any) => {
        console.log('submitted successfully:', result);
        this.userform.reset();
        this.dialogRef.close(true); 
      },
      (error) => {
        console.log('Error:', error); // Log error for more details
        this.isLoading = false;
        
      }
    );
  }
  
}
