import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule, MatExpansionModule, MatIconModule, MatMenuModule, MatSelectModule,
    MatTabsModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatNativeDateModule,
    MatProgressBarModule
} from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';


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
        MatNativeDateModule,
        MatGridListModule,
        MatProgressBarModule
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
        MatNativeDateModule,
        MatGridListModule,
        MatProgressBarModule
    ],
})
export class MaterialModule { }