import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {IonicModule} from '@ionic/angular';

import {AccChoicePage} from './acc-choice.page';

describe('ChoixComptePage', () => {
    let component: AccChoicePage;
    let fixture: ComponentFixture<AccChoicePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AccChoicePage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(AccChoicePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
