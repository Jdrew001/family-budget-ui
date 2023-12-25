import { trigger, state, style, transition, animate } from '@angular/animations';

export const loadingContentAnimation = trigger('loadingContent', [
    state('void', style({
        opacity: 0
    })),
    transition(':enter', [  // Fade in when entering
        style({ opacity: 0 }),
        animate('450ms', style({ opacity: 1 }))
    ])
]);