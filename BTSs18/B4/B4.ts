function parameterValidator(validationFunction: (args: any[]) => boolean) {
    return function(target: any, key: string, descriptor: PropertyDescriptor) {
      const originalMethod = descriptor.value;
  
      descriptor.value = function(...args: any[]) {
        if (validationFunction(args)) {
          return originalMethod.apply(this, args);
        } else {
          throw new Error("Invalid parameters passed to function");
        }
      };
  
      return descriptor;
    };
  }
  
  function validateNumbers(args: any[]): boolean {
    return args.every(arg => typeof arg === 'number');
  }
  
  class Example {
    @parameterValidator(validateNumbers)
    add(a: number, b: number): number {
      return a + b;
    }
  }
  
  const example = new Example();
  
  try {
    console.log(example.add(1, 2));
    console.log(example.add(1, "2"));
  } catch (error) {
    console.error(error.message);
  }
  