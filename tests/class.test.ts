import { VM, ObjNull, ObjNativeFunction, ObjInstance, ObjString, ObjNumber } from "../src";
import ObjClosure from "../src/objects/ObjClosure";

describe('class', () => {

  it('should generate an instance of a class', async () => {
    const vm = new VM();

    let result: any;
    const setResultFn = () => {
      result = vm.pop();
      return new ObjNull();
    };
    vm.setGlobal('setResult', new ObjNativeFunction(setResultFn, 'setResult'));

    await vm.interpret(`
      class ClassA {

      }

      let instance = new ClassA();

      print(ClassA);
      print(instance);
      setResult(instance);
    `)

    expect(result instanceof ObjInstance).toBeTruthy();
    if (result instanceof ObjInstance) {
      expect(result.klass.name).toEqual('ClassA');
    }
  })

  it('should call the constructor of a class', async () => {
    const vm = new VM();

    let result: any;
    const setResultFn = () => {
      result = vm.pop();
      return new ObjNull();
    };
    vm.setGlobal('setResult', new ObjNativeFunction(setResultFn, 'setResult'));

    await vm.interpret(`
      class ClassA {
        constructor() {
          setResult('constructor called');
        }
      }

      let instance = new ClassA();
    `)

    expect(result).toEqual(new ObjString('constructor called'));
  })

  it('should set properties on an instance', async () => {
    const vm = new VM();

    let result: any;
    const setResultFn = () => {
      result = vm.pop();
      return new ObjNull();
    };
    vm.setGlobal('setResult', new ObjNativeFunction(setResultFn, 'setResult'));

    await vm.interpret(`
      class ClassA {
        constructor() {
          this.a = 4;
        }
      }

      let instance = new ClassA();

      setResult(instance);
    `)

    expect(result instanceof ObjInstance).toBeTruthy();
    if (result instanceof ObjInstance) {
      expect(result.getField('a')).toEqual(new ObjNumber(4n));
    }
  })

  it('should set methods on an instance', async () => {
    const vm = new VM();

    let result: any;
    const setResultFn = () => {
      result = vm.pop();
      return new ObjNull();
    };
    vm.setGlobal('setResult', new ObjNativeFunction(setResultFn, 'setResult'));

    await vm.interpret(`
      class ClassA {
        MethodA() {
          return null;
        }
      }

      let instance = new ClassA();

      setResult(instance);
    `)

    expect(result instanceof ObjInstance).toBeTruthy();
    if (result instanceof ObjInstance) {
      expect(result.klass.getMethod('MethodA') instanceof ObjClosure).toBeTruthy();
    }
  })

  it('should call method on an instance', async () => {
    const vm = new VM();

    let result: any;
    const setResultFn = () => {
      result = vm.pop();
      return new ObjNull();
    };
    vm.setGlobal('setResult', new ObjNativeFunction(setResultFn, 'setResult'));

    await vm.interpret(`
      class ClassA {
        MethodA() {
          return 'a';
        }
      }

      let instance = new ClassA();
      print(instance.MethodA);
      setResult(instance.MethodA());
    `)

    expect(result).toEqual(new ObjString('a'));
  })

  it('should inherit', async () => {
    const vm = new VM();

    let results: Array<any> = [];
    const addResultFn = () => {
      results.push(vm.pop());
      return new ObjNull();
    };
    vm.setGlobal('addResult', new ObjNativeFunction(addResultFn, 'addResult'));

    await vm.interpret(`
      class Doughnut {
        cook() {
          return this.finish("sprinkles");
        }
      
        finish(ingredient) {
          return "Finish with " + ingredient;
        }
      }

      class Cruller extends Doughnut {
        finish() {
          // No sprinkles, always icing.
          return super.finish('icing');
        }
      }

      const e = new Doughnut();
      addResult(e.finish('chocolate'));

      const t = new Cruller();
      addResult(t.finish());
    `)

    expect(results[0]).toEqual(new ObjString('Finish with chocolate'));
    expect(results[1]).toEqual(new ObjString('Finish with icing'));
  })
})