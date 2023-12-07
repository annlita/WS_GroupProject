import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { EventsComponent } from './pages/events/events.component';
import { FacultiesComponent } from './pages/faculties/faculties.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'events', component: EventsComponent},
    {path: 'faculties', component: FacultiesComponent},
    {path: 'feedback', component: FeedbackComponent},
    {path: '', redirectTo:'/home', pathMatch: 'full'}
    
];

