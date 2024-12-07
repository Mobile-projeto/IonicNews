import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';  // Importar o HttpClientModule
import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';

// Importando o plugin SocialSharing
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),  // Certifique-se de incluir o IonicModule aqui
    AppRoutingModule,
    HttpClientModule,  // Certifique-se de incluir o HttpClientModule aqui
  ],
  providers: [
    SocialSharing
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
