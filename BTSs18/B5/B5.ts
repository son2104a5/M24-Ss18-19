function composeDecorators(...decorators: Function[]) {
    return function(target: any, key: string, descriptor: PropertyDescriptor) {
      decorators.forEach(decorator => {
        descriptor.value = decorator(target, key, descriptor);
      });
      return descriptor;
    };
  }
  
  function uppercaseDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function(...args: any[]) {
      const result = originalMethod.apply(this, args);
      return result.toUpperCase();
    };
    return descriptor;
  }
  function exclamationDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function(...args: any[]) {
      const result = originalMethod.apply(this, args);
      return result + '!';
    };
    return descriptor;
  }
  
  class Example {
    @composeDecorators(uppercaseDecorator, exclamationDecorator)
    greet(name: string): string {
      return `Hello, ${name}`;
    }
  }
  
  const example = new Example();
  console.log(example.greet("John"));
  