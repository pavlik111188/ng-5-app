import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule, MatDatepickerModule, MatExpansionModule, MatIconModule, MatMenuModule, MatSelectModule,
    MatTabsModule,
    MatToolbarModule
} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatToolbarModule,
        MatMenuModule,
        MatIconModule,
        MatTabsModule,
        MatSelectModule,
        MatExpansionModule,
        MatDatepickerModule
    ],
    exports: [
        MatButtonModule,
        MatToolbarModule,
        MatMenuModule,
        MatIconModule,
        MatTabsModule,
        MatSelectModule,
        MatExpansionModule,
        MatDatepickerModule
    ],
})
export class MaterialModule { }