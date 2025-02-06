
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

export interface leavemanagement {
  id: number;
  type: string;
  days_allowed: number;
  description: string;
  
}

@Component({
  selector: 'app-list',
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatButtonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})

export class ListComponent implements OnInit{
  readonly dialog = inject(MatDialog)
  readonly leavemanagementService = inject(ApiService);
  
  dataSource = new MatTableDataSource<leavemanagement>([]);
  displayedColumns: string[] = ['type', 'days_allowed','description', 'actions'];

  ngOnInit(): void {
    this.leavemanagementService.getleave().subscribe(data => {
      this.dataSource.data = data;
    });
  }
  
  openDialog() {
    const dialogRef = this.dialog.open(CreateComponent, {
      width: 'auto',  // 90% of viewport width
      height: 'auto', // 90% of viewport height
      
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteleave(id: number): void {
    this.leavemanagementService.deleteleave(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(employee => employee.id !== id);
    });
  }
}





