import {ModuleWithProviders, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MetadataRoutingModule} from './metadata-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {MetadataComponent} from './metadata.component';

@NgModule({
    imports: [
        CommonModule,
        MetadataRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [
        MetadataComponent
    ]
})
export class MetadataModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: MetadataModule,
            providers: []
        };
    }
}