import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { MatInputModule,
        MatCardModule,
        MatButtonModule,
        MatToolbarModule,
        MatExpansionModule,
        MatSelectModule,
        MatDividerModule,
        MatProgressSpinnerModule} from '@angular/material';


import { AppComponent } from './app.component';
import { NewsCreateComponent } from './news/news-create/news-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { NewsListComponent } from './news/news-list/news-list.component';
import { LoginComponent } from './auth/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { MenuComponent } from './kitchen/menu/menu.component';
import { MenuListComponent } from './kitchen/menu-list/menu-list.component';
import { MenuSessionItemComponent } from './kitchen/SessionItem/menu-session-item/menu-session-item.component';
import { EventsComponent } from './Events/events/events.component';
import {FullCalendarModule} from 'ng-fullcalendar'
import { EventService } from './Events/events.service';

@NgModule({
  declarations: [
    AppComponent,
    NewsCreateComponent,
    HeaderComponent,
    NewsListComponent,
    LoginComponent,
    SignupComponent,
    MenuComponent,
    MenuListComponent,
    MenuSessionItemComponent,
    EventsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatSelectModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    FullCalendarModule,
    MatDividerModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }
