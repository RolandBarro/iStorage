import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { ImagePickerModule } from '../shared/image-picker/image-picker.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,

    // custom
    Tab1PageRoutingModule,
    ImagePickerModule,
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
