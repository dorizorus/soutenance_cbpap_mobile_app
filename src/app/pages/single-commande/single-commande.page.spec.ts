import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SingleCommandePage } from './single-commande.page';

describe('SingleCommandePage', () => {
  let component: SingleCommandePage;
  let fixture: ComponentFixture<SingleCommandePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleCommandePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SingleCommandePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
