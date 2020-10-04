import { trigger, transition, style, animate, keyframes, query, animateChild, group } from '@angular/animations';

export const FormFieldsEntranceAnimations =
    trigger('inOutTransition', [
        transition('* <=> *', [
            query(':enter', [
                animate('1s ease-in-out', keyframes([
                    style({ height: '0px', opacity: 0, offset: 0 }),
                    style({ height: '*', opacity: '100%', offset: 1.0 })
                ]))
            ], {optional: true}),
            query(':leave', [
                animate('1s ease-in-out', keyframes([
                    style({ height: '*', opacity: '100%', offset: 0 }),
                    style({ height: '0px', opacity: 0, offset: 1.0 })
                ]))
            ], {optional: true})
        ])
        ]);
