
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, PipeTransform } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Book } from 'src/app/models/book.model';
import { of } from 'rxjs';
import { BookService } from 'src/app/services/book.service';
import { HomeComponent } from './home.component';




describe('home component', ()=>{
    let component : HomeComponent;
    let fixture : ComponentFixture<HomeComponent>;

    /*Se configura el test*/ 
    beforeEach(()=>{
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            declarations: [
                HomeComponent
            ],
            providers: [
               BookService
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
        }).compileComponents;
    });

    //Se instancia el componente
    beforeEach(()=>{
       fixture = TestBed.createComponent(HomeComponent);
       component = fixture.componentInstance;
       fixture.detectChanges();
    });


    // public getBooks(): void {
    // this.bookService.getBooks().pipe(take(1)).subscribe((resp: Book[]) => {
    //   this.listBook = resp;
    // });

    it('getBook get books fron the subscription',() =>{
        const bookService = fixture.debugElement.injector.get(BookService); //Traer el servicio 
        const listBooks: Book[]=[];  //crear un mock para hacer un retorno
        const spy1 = spyOn(bookService, 'getBooks').and.returnValue(of(listBooks)); // Primero se lanza el espia
        component.getBooks();
        expect(spy1).toHaveBeenCalled();
    });
     


});