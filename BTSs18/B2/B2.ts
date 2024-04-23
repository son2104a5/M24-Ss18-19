function timingDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
  
    descriptor.value = function(...args: any[]) {
      const start = performance.now(); 

      const result = originalMethod.apply(this, args);
  
      const end = performance.now();
      const executionTime = end - start;
  
      console.log(`Function ${key} with arguments ${JSON.stringify(args)} executed in ${executionTime} milliseconds`);
      console.log(`Function ${key} returned: ${JSON.stringify(result)}`);
  
      return result;
    };
  
    return descriptor;
  }
  
  class Example {
    @timingDecorator
    add(a: number, b: number): number {
      let sum = 0;
      for (let i = 0; i < 1000000; i++) {
        sum += i;
      }
      return a + b;
    }
  }
  
  const example = new Example();
  example
  