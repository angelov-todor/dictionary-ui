import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeViewComponent } from './tree-view/tree-view.component';
import { NodeComponent } from './node/node.component';
import { PagerComponent } from './pager/pager.component';
import { ProcessingDirective } from './directives/processing.directive';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TreeViewComponent, NodeComponent, PagerComponent, ProcessingDirective],
  exports: [TreeViewComponent, PagerComponent, ProcessingDirective]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    };
  }
}
