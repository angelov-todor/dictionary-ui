import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolsRootComponent } from './tools-root/tools-root.component';
import { GeneralComponent } from './general/general.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ToolsRoutingModule } from './tools-routing.module';
import { ToolsService } from './tools.service';
import {SharedModule} from '../shared/shared.module';
import { SokobanGameComponent } from './sokoban-game/sokoban-game.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ToolsRoutingModule,
    SharedModule
  ],
  declarations: [ToolsRootComponent, GeneralComponent, SokobanGameComponent]
})
export class ToolsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: ToolsModule,
      providers: [ToolsService]
    };
  }
}
