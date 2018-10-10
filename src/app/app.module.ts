import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DescriptionComponent } from './description/description.component';
import { MockupComponent } from './mockup/mockup.component';
import { LandingComponent } from './landing/landing.component';
import { CalculationsComponent } from './calculations/calculations.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { TracksService } from './shared/tracks.service';
import { SingleDescComponent } from './description/single-desc/single-desc.component';
import { CanvasComponent } from './mockup/canvas/canvas.component';
import { ChoiceComponent } from './mockup/choice/choice.component';
import { MockupTracksService } from './mockup/mockup-tracks.service';

const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'description', component: DescriptionComponent },
  { path: 'mockup', component: MockupComponent },
  { path: 'calculations', component: CalculationsComponent }
 ];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DescriptionComponent,
    MockupComponent,
    LandingComponent,
    CalculationsComponent,
    DropdownDirective,
    SingleDescComponent,
    CanvasComponent,
    ChoiceComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [TracksService, MockupTracksService],
  bootstrap: [AppComponent]
})
export class AppModule { }
