import { Routes } from '@angular/router';
import { FirstPageComponent } from './first-page/first-page.component';
import { SecondPageComponent } from './second-page/second-page.component';

export const routes: Routes = [
    {
        path: 'firstPage/:id',
        component: FirstPageComponent,
    },
    {
        path: 'secondPage',
        component: SecondPageComponent,
    },
];

