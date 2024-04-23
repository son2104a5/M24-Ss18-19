function typeCheckDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
  
    descriptor.value = function(...args: any[]) {
      const paramTypes = Reflect.getMetadata('design:paramtypes', target, key);
  
      if (paramTypes.length !== args.length) {
        throw new Error(`Invalid number of arguments passed to function ${key}`);
      }
  
      for (let i = 0; i < args.length; i++) {
        const argType = typeof args[i];
        const expectedType = paramTypes[i]?.name.toLowerCase();
  
        if (argType !== expectedType) {
          throw new Error(`Invalid type for argument ${i} in function ${key}. Expected ${expectedType}, got ${argType}`);
        }
      }
  
      return originalMethod.apply(this, args);
    };
  
    return descriptor;
  }
  
  class Example {
    @typeCheckDecorator
    greet(name: string, age: number): string {
      return `Hello, ${name}. You are ${age} years old.`;
    }
  }
  
  const example = new Example();
  
  try {
    console.log(example.greet("John", 30));
    console.log(example.greet("John", "30"));
  } catch (error) {
    console.error(error.message);
  }
  