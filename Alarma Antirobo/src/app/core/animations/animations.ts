import { AnimationService } from '../Services/animation.service';
import { Animation } from '@ionic/angular';

export let routingAnimation = (baseEl: HTMLElement, opts?: any): Animation => {
    const ENTERING_ANIMATION = AnimationService.
    createKeyFramedAnimation(opts.enteringEl, 500, 1, [
        {offset: 0, transform: 'translateX(50px)'},
        {offset: 0, opacity: 0},
        {offset: 1, transform: 'translateX(0px)'},
        {offset: 1, opacity: 1},
    ], 'normal', 'cubic-bezier', [0.390, 0.575, 0.565, 1.000]);

    const LEAVE_ANIMATION = AnimationService.
    createAnimation(opts.leavingEl, 500, 1,
                    {property: 'opacity', fromValue: 1, toValue: 0},
                    'normal', 'ease-in-out');

    return AnimationService.createGroupedAnimations(600, 1, ENTERING_ANIMATION, LEAVE_ANIMATION);
};

export let splashScreenRouting = (baseEl: HTMLElement, opts?: any): Animation => {
    const LEAVE_ANIMATION = AnimationService.
    createKeyFramedAnimation(opts.leavingEl, 1000, 1, [
        {offset: 0, transform: 'translate3d(0, 0, 0)'},
        {offset: 0, 'animation-timing-function': 'cubic-bezier(0.165, 0.84, 0.44, 1)'},
        {offset: 0.3, transform: 'translate3d(-30px, 0, 0)'},
        {offset: 0.3, 'animation-timing-function': 'cubic-bezier(0.55, 0.055, 0.675, 0.19)'},
        {offset: 0.6, opacity: 1},
        {offset: 1, opacity: 0},
        {offset: 1, transform: 'translate3d(400px, 0, 0)'},
        {offset: 1, 'animation-timing-function': 'cubic-bezier(0.165, 0.84, 0.44, 1)'},
    ], 'normal', 'cubic-bezier', [0.390, 0.575, 0.565, 1.000]);

    const ENTERING_ANIMATION = AnimationService.
    createKeyFramedAnimation(opts.enteringEl, 500, 1, [
        {offset: 0, transform: 'translateX(50px)'},
        {offset: 0, opacity: 0},
        {offset: 1, transform: 'translateX(0px)'},
        {offset: 1, opacity: 1},
    ], 'normal', 'cubic-bezier', [0.390, 0.575, 0.565, 1.000]);

    return AnimationService.createGroupedAnimations(600, 1, ENTERING_ANIMATION, LEAVE_ANIMATION);
};
