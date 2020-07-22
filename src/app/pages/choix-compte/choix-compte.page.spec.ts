import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChoixComptePage } from './choix-compte.page';

describe('ChoixComptePage', () => {
  let component: ChoixComptePage;
  let fixture: ComponentFixture<ChoixComptePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoixComptePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChoixComptePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
