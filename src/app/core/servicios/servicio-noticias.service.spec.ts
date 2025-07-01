import { TestBed } from '@angular/core/testing';

import { ServicioNoticiasService } from './servicio-noticias.service';

describe('ServicioNoticiasService', () => {
  let service: ServicioNoticiasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioNoticiasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
