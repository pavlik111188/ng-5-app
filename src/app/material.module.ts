import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule, MatIconModule, MatMenuModule, MatSelectModule, MatTabsModule,
    MatToolbarModule
} from '@angular/material';

@NgModule({
    imports: [MatButtonModule, MatToolbarModule, MatMenuModule, MatIconModule, MatTabsModule, MatSelectModule],
    exports: [MatButtonModule, MatToolbarModule, MatMenuModule, MatIconModule, MatTabsModule, MatSelectModule],
})
export class MaterialModule { }