import { ReduceTextPipe } from './reduce-text.pipe';
describe('reduceTextPipe', ()=>{
    let pipe: ReduceTextPipe;

    beforeEach(()=>{
      pipe = new ReduceTextPipe();
    });

    it('create pipe', ()=>{
        expect(pipe).toBeTruthy();
    });

    // transform(value: string, ...args: number[]): string {
    //     return value.substring(0, args[0]);
    //   }
    it('use tranform correctly', ()=>{
       const text = 'hola soy el mejor';
       const newText = pipe.transform(text, 5);
       expect(newText.length).toBe(5);
    })

});