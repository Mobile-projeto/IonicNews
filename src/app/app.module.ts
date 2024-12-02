import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';  // Importar o HttpClientModule
import { AppComponent } from './app.component';
import { IonicModule } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,  // Certifique-se de incluir o HttpClientModule aqui
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
