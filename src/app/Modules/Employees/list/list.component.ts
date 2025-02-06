import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog
} from '@angular/material/dialog';
import { CreateComponent } from '../create/create.component';
import { ApiService } from '../../../api.service';
import { CommonModule } from '@angular/common';

export interface Employee {
  id: number; // ✅ Added ID field
  name: string;
  department: string;
  designation: string;
  phone_number: number;
  email: string;
}
@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class ListComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  readonly employeeService = inject(ApiService);

  displayedColumns: string[] = ['name','department', 'phone_number','email', 'actions'];
  dataSource = new MatTableDataSource<Employee>([]);

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateComponent, {
      width: '90vw',
      height: '85vh',
      maxWidth: '90vw',
      maxHeight: '85vh',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteEmployee(id: number): void {
      this.employeeService.deleteEmployee(id).subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter(employee => employee.id !== id);
      });
  }
}
