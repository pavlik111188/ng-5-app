import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatButtonModule, MatExpansionModule, MatIconModule, MatMenuModule, MatSelectModule,
    MatTabsModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule
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
        MatInputModule,
        MatFormFieldModule,
        MatCardModule
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
        MatCardModule
    ],
})
export class MaterialModule { }