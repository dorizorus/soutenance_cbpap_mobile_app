import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ValidationComPage } from './validation-com.page';

describe('ValidationComPage', () => {
  let component: ValidationComPage;
  let fixture: ComponentFixture<ValidationComPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationComPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ValidationComPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
