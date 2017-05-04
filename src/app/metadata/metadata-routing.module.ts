import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MetadataComponent} from './metadata.component';

const routes: Routes = [
    {
        path: 'metadata', component: MetadataComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MetadataRoutingModule {

}
