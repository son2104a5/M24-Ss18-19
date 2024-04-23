function cachingDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const cache: { [key: string]: any } = {};
  
    descriptor.value = function(...args: any[]) {
      const cacheKey = JSON.stringify(args);
  
      if (cacheKey in cache) {
        console.log(`Using cached result for function ${key} with arguments ${cacheKey}`);
        return cache[cacheKey];
      }
  
      const result = originalMethod.apply(this, args);
      cache[cacheKey] = result;
      console.log(`Function ${key} with arguments ${cacheKey} executed and cached`);
  
      return result;
    };
  
    return descriptor;
  }
  
  class Example {
    @cachingDecorator
    add(a: number, b: number): number {
      console.log("Calculating sum...");
      return a + b;
    }
  }
  
  const example = new Example();
  
  console.log(example.add(1, 2));
  console.log(example.add(1, 2));
  console.log(example.add(3, 4)); 
  