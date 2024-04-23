function Log(target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
  
    descriptor.value = function(...args: any[]) {
      console.log(`Calling function ${key} with arguments: ${JSON.stringify(args)}`);
  
      const result = originalMethod.apply(this, args);
  
      console.log(`Function ${key} returned: ${JSON.stringify(result)}`);
      return result;
    };
  
    return descriptor;
  }
  
  class Example {
    @Log
    add(a: number, b: number): number {
      return a + b;
    }
  }
  
  const example = new Example();
  example.add(1, 2);
  