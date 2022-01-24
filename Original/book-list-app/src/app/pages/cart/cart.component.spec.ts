import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartComponent } from './cart.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookService } from 'src/app/services/book.service';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Book } from 'src/app/models/book.model';

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

describe('Cart component', ()=>{
    let component: CartComponent;
    let fixture: ComponentFixture<CartComponent>; //Permite manejar el servicio inyectado en el component, detectar cambios
    let service: BookService;

    beforeEach(()=>{                         //Se ejecuta antes de lanzar los test
      TestBed.configureTestingModule({
         imports: [
            HttpClientTestingModule          //Permite realizar peticiones fake
         ],
         declarations: [CartComponent],      //Se coloca el componente que necesitamos
         providers: [BookService],           // Van los servicios que utiliza el componente
         schemas:[CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      }).compileComponents();  //Evitar errores (Opcional)
    });  


    //   ngOnInit(): void {
    //     this.listCartBook = this._bookService.getBooksFromCart();
    //     this.totalPrice = this.getTotalPrice(this.listCartBook);
    //   }

    beforeEach(()=>{
        fixture = TestBed.createComponent(CartComponent);
        component = fixture.componentInstance;   //Se instancia el componente
        fixture.detectChanges();
        service = fixture.debugElement.injector.get(BookService);   // SpyON para utilizar el service
        spyOn(service, 'getBooksFromCart').and.callFake(()=> listBook);
    });

    it('should create', () =>{
        expect(component).toBeTruthy();
    });


    // public getTotalPrice(listCartBook: Book[]): number {
    //     let totalPrice = 0;
    //     listCartBook.forEach((book: Book) => {
    //       totalPrice += book.amount * book.price;
    //     });
    //     return totalPrice;
    //   }

    it('getTotalPrice return amount', ()=>{
       const totalPrice = component.getTotalPrice(listBook);
       expect(totalPrice).toBeGreaterThan(0);  //Mayor a cero
       //expect(totalPrice).toBe(0);  // sea cero
    });

    // public onInputNumberChange(action: string, book: Book): void {
    //     const amount = action === 'plus' ? book.amount + 1 : book.amount - 1;
    //     book.amount = Number(amount);
    //     this.listCartBook = this._bookService.updateAmountBook(book);
    //     this.totalPrice = this.getTotalPrice(this.listCartBook);
    //   }
    
    it('onInputNumberChange increment correctly', ()=>{
        const action= 'plus';
        const book = listBook[0];
        //Simular un servicio SpyOn
        const spy1 = spyOn(service,'updateAmountBook').and.callFake(()=> {
            return null;
        });  //El espia se crea antes 
        const spy2 = spyOn(component, 'getTotalPrice').and.callFake(()=> {
            return null;
        });
        expect(book.amount).toBe(2);
        component.onInputNumberChange(action,book);
        expect(book.amount).toBe(3);
        expect(spy1).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();
    });

    // public onClearBooks(): void {
    //     if (this.listCartBook && this.listCartBook.length > 0) {
    //       this._clearListCartBook();
    //     } else {
    //        console.log("No books available");
    //     }
    //   }
    
    //   private _clearListCartBook() {
    //     this.listCartBook = [];
    //     this._bookService.removeBooksFromCart();
    //   }
    
    it('onClearBooks works correctly', ()=>{  //En este caso se prueba un metodo privado por medio de un metodo publico
        const spy1 = spyOn((component as any), '_clearListCartBook').and.callThrough(); //El metodo se va a llamar y se va a espiar
        const spy2 = spyOn(service, 'removeBooksFromCart').and.callFake(()=> null);  // se debe llamar por que si no estariamos rompiendo las reglas de una prueba unitaria
        component.listCartBook = listBook;
        component.onClearBooks();

        expect(component.listCartBook.length).toBe(0);
        expect(spy1).toHaveBeenCalled();
        expect(spy2).toHaveBeenCalled();
      });

      //   private _clearListCartBook() {
    //     this.listCartBook = [];
    //     this._bookService.removeBooksFromCart();
    //   }

      it('_clearListCartBook works correctly', ()=>{ //En este caso se prueba un metodo privado directamente
        const spy1 = spyOn(service, 'removeBooksFromCart').and.callFake(()=> null);  // se debe llamar por que si no estariamos rompiendo las reglas de una prueba unitaria
        component.listCartBook = listBook;
        component['_clearListCartBook']();

        expect(component.listCartBook.length).toBe(0);
        expect(spy1).toHaveBeenCalled();
      })


    



    
});