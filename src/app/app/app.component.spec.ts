import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NavbarComponent } from '../layout/navbar/navbar.component';
import { SearchComponent } from '../layout/search/search.component';
import { SearchResultComponent } from '../layout/search-result/search-result.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthenticationService } from '../services/authentication-service';
import { HttpClientModule } from '@angular/common/http';
import { MoviesService } from '../services/movies.service';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
      ],
      declarations: [
        AppComponent,
        NavbarComponent,
        SearchComponent,
        SearchResultComponent
      ],
      providers: [
        AuthenticationService,
        MoviesService
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
  it('should create the search', () => {
    const fixture = TestBed.createComponent(SearchComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
  it('should create the search result', () => {
    const fixture = TestBed.createComponent(SearchResultComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
  it('should create the navbar', () => {
    const fixture = TestBed.createComponent(NavbarComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
