import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecommandePage } from './recommande.page';

describe('RecommandePage', () => {
  let component: RecommandePage;
  let fixture: ComponentFixture<RecommandePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommandePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecommandePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
