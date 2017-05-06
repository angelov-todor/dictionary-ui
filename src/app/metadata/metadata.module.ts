import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetadataRoutingModule } from './metadata-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MetadataComponent } from './metadata.component';
import { MetadataListComponent } from './metadata-list/metadata-list.component';
import { MetadataService } from './metadata.service';

@NgModule({
    imports: [
        CommonModule,
        MetadataRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [
        MetadataComponent,
        MetadataListComponent
    ],
    providers: [MetadataService]
})
export class MetadataModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MetadataModule
        };
    }
}
