import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule, MatExpansionModule, MatIconModule, MatMenuModule, MatSelectModule,
    MatTabsModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatNativeDateModule
} from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';


@NgModule({
    imports: [
        MatButtonModule,
        MatToolbarModule,
        MatMenuModule,
        MatIconModule,
        MatTabsModule,
        MatSelectModule,
        MatExpansionModule,
        MatInputModule,
        MatFormFieldModule,
        MatCardModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
    exports: [
        MatButtonModule,
        MatToolbarModule,
        MatMenuModule,
        MatIconModule,
        MatTabsModule,
        MatSelectModule,
        MatExpansionModule,
        MatInputModule,
        MatFormFieldModule,
        MatCardModule,
        MatDatepickerModule,
        MatNativeDateModule
    ],
})
export class MaterialModule { }