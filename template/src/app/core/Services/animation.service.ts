import { Injectable } from '@angular/core';
import { Animation, AnimationController, AnimationKeyFrames } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  constructor(private animationCtrl: AnimationController) { }

  createAnimation(element: Element, duration: number = 2000, iterations: number = 1,
                  fromTo: {property: string, fromValue: any, toValue: any},
                  easing: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out'): Animation {

    return this.animationCtrl.create()
    .addElement(element)
    .duration(duration)
    .iterations(iterations)
    .fromTo(fromTo.property, fromTo.fromValue, fromTo.toValue)
    .easing(easing);
  }

  createKeyFramedAnimation(element: Element, duration: number = 2000, iterations: number = 1,
                           keyFrames: AnimationKeyFrames, easing: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out'): Animation {
    return this.animationCtrl.create()
    .addElement(element)
    .duration(duration)
    .iterations(iterations)
    .easing(easing)
    .keyframes(keyFrames);
  }

  createGroupedAnimations(duration: number = 2000, iterations: number = 1, ...animations: Animation[]): Animation {
    return this.animationCtrl.create()
    .duration(duration)
    .iterations(iterations)
    .addAnimation(animations);
  }

  async playChainedAnimations(...animations: Animation[]): Promise<void> {
    animations.forEach(async animation => {
      await animation.play();
    });
  }
}
