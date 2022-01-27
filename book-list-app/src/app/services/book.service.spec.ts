import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { BookService } from './book.service';
import { TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Book } from '../models/book.model';
import { environment } from '../../environments/environment.prod';

const listBook: Book[] = [
    {name: '',
     author: '',
     isbn: '',
     price: 15,
     amount:2},
    {name: '',
     author: '',
     isbn: '',
     price: 20,
     amount:1},
    {name: '',
     author: '',
     isbn: '',
     price: 8,
     amount:7}
]

describe('bookService', ()=>{
    let service: BookService;
    let httpMock : HttpTestingController;

    beforeEach(()=>{
        TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [BookService],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        });
    });

    beforeEach(()=>{
        service = TestBed.inject(BookService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(()=>{  //Se utilizan en los servicios despues de cada test
          httpMock.verify();     //verifica que no haya peticiones pendientes entre cada test
    });

    it('create bookService', ()=>{
        expect(service).toBeTruthy();
    });


    // public getBooks(): Observable<any[]> {
    //     const url: string = environment.API_REST_URL + `/book`;
    //     return this._httpClient.get<Book[]>(url);
    //   }

    // it('test getBooks in service, retorna una lista de boos y que sea un metodo get', ()=>{
    //    service.getBooks().subscribe((resp:Book[])=>{
    //        expect(resp).toEqual(listBook);  //Permite comparar objetos
    //    });
    //    //imcompleto
    // });
})