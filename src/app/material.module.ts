import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule, MatIconModule, MatMenuModule, MatTabsModule, MatToolbarModule} from '@angular/material';

@NgModule({
    imports: [MatButtonModule, MatToolbarModule, MatMenuModule, MatIconModule, MatTabsModule],
    exports: [MatButtonModule, MatToolbarModule, MatMenuModule, MatIconModule, MatTabsModule],
})
export class MaterialModule { }