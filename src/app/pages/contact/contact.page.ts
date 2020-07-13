import { Component, OnInit } from '@angular/core';
import { ModalController, AnimationController } from '@ionic/angular';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
  providers : [CallNumber]
})
export class ContactPage implements OnInit {
  // import d'Animation Controleur servant à créer une anim
  constructor(public modalController : ModalController,
              public animationCtrl : AnimationController,
              private callNumber: CallNumber) { }

  ngOnInit() {
  }


  // création de la modal
  async presentModal() {
    const enterAnimation = (baseEl: any) => {
      // création de l'animation via AnimationControleur
      const backdropAnimation = this.animationCtrl.create()
      .addElement(baseEl.querySelector('ion-backdrop'));
    
      // définition des paramétres de l'animation
    const wrapperAnimation = this.animationCtrl.create()
        .addElement(baseEl.querySelector('.modal-wrapper'));
    
      // la méthode fromTo permet de dire de quels parametres ça commence / ça fini
      wrapperAnimation.fromTo('transform', 'scaleX(0.1) scaleY(0,1)', 'translateX(0%) scaleX(1) scaleY(1)')
      .fromTo('opacity', 0, 1);

      backdropAnimation.fromTo('opacity', 0.01, 0.4);

      // on retourne l'animation
      return this.animationCtrl.create()
        .addElement(baseEl)
        .easing('cubic-bezier(0.36,0.66,0.04,1)')
        .duration(400)
        .beforeAddClass('show-modal')
        .addAnimation([backdropAnimation, wrapperAnimation]);
    }

      // 
    const leaveAnimation = (baseEl: any) => {
      return enterAnimation(baseEl).direction('reverse');
    }

    // Création du modal avec les animations et les css défini
    const modal = await this.modalController.create({
      component: ContactPage,
      enterAnimation,
      leaveAnimation,
      cssClass : 'modal-pop'
    });

    // lancement du modal
    return await modal.present();
  }

  dissmisModal() {
    this.modalController.dismiss();
  }

  // Pour que l'appel fonctionne, il fallait ajouter CallNumber au provider dans cette
  // page et non dans app.module.ts sous peine d'une erreur. Besoin d'android pour tester

  onClicJerome() {
    this.callNumber.callNumber("0676411829", true)
    .then(res => console.log('Numéro composé', res))
    .catch(err => console.log('Composition échoué', err));
  }

  onClicXavier() {
    this.callNumber.callNumber("0607950620", true)
    .then(res => console.log('Numéro composé', res))
    .catch(err => console.log('Composition échoué', err));
  }

  onClicJulien() {
    this.callNumber.callNumber("0607547499", true)
    .then(res => console.log('Numéro composé', res))
    .catch(err => console.log('Composition échoué', err));
  }

}
