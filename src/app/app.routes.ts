import { Routes } from '@angular/router';
import { BudgetPlannerModule } from './budget-planner/budget-planner.module';

export const routes: Routes = [
    {path:'budget-planner',
        loadChildren:()=> import('./budget-planner/budget-planner.module').then(m =>BudgetPlannerModule)}
];
