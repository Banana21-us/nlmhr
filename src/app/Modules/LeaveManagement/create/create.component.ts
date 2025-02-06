import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../../../api.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-create',
  imports: [MatDialogModule, MatButtonModule,ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  
constructor (private leaveTypeService: ApiService) {}
  isLoading: boolean = false; 
  leaveform = new FormGroup({
    type: new FormControl('', Validators.required),
    days_allowed: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')]),
    description: new FormControl('', Validators.required),
  });

  register() {
    console.log('Registering user with data:', this.leaveform.value); // Log request payload
    this.isLoading = true;
  
    this.leaveTypeService.createLeaveType(this.leaveform.value).subscribe(
      (result: any) => {
        console.log('submitted successfully:', result);
        this.leaveform.reset();
      },
      (error) => {
        console.log('Error:', error); // Log error for more details
        this.isLoading = false;
      }
    );
  }

}
