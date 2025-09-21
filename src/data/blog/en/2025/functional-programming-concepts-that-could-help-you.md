---
author: Luismi Barcos
pubDatetime: 2025-09-21
title: "Functional Programming: Concepts that Could Help You"
description: "Discover how core Functional Programming concepts like pure functions, immutability, and function composition can improve the readability, maintainability, and reliability of your Java code."
featured: true
draft: true
tags:
  - Functional Programming
  - Java
  - Software Development
---

# Functional Programming: Concepts that Could Help You

Functional Programming (FP) is commonly referred to as a discipline reserved for mathematicians or functional programming language lovers. But in reality, FP has core concepts that could benefit you in your day-to-day work. Adopting functional concepts could improve your code’s readability, maintainability, and reliability.

In this post, we will explore how to take advantage of some FP concepts.

# What is Functional Programming?

> **\*Functional programming** is a programming paradigm where programs are constructed by applying and composing functions. – Wikipedia\*

Functional Programming is a way of writing code using functions that behave like math: the same input always gives the same output.

In programming, state is the data a program keeps and can change over time. FP avoids changing this state directly, which helps prevent bugs. By keeping data immutable and functions predictable, FP makes programs easier to read, more reliable, and easier to grow.

This may sound abstract, so let’s jump into some core concepts.

## Functional Programming Core Concepts

### Pure Functions

When a function is pure means that the function fulfils the following aspects:

- Always produce the same output for the same input.

- Has no side effects. That means it does not modify any external state.

Below is an example of a pure function:

```java
public int square(int number) {
return number * number;
}
```

Because of their nature, pure functions have the following benefits:

- They are predictable. They must always behave in the same way for the same input.

- They are more testable. As the output depends on the input and has no side effects, it is really easy to create tests for them.

- They help us to think of one single responsibility for each part of the code.

### First-Class and Higher-Order Functions

The First-Class functions are functions that can be treated as variables. It is possible to store them, pass them as an argument to another function, and return them from another function.

The Higher-Order functions are functions that can take other functions as an argument and/or return a function as their result. This is only possible in languages that support First-Class functions.

The combinations of these types of functions allow powerful patterns like callbacks, strategy patterns, and custom logic pipelines. Also, they reduce the boilerplate code and improve flexibility.

```java
public static List<String> processNumbers(
    List<Integer> input,
    Predicate<Integer> filter, // Function that takes a value and returns a boolean
    Function<Integer, String> transformer // Function that takes an Integer and returns a String
) {
    return input.stream()
        .filter(filter)
        .map(transformer)
        .toList();
}

public static void main(String[] args) {
    List<Integer> numbers = List.of(5, 12, 20, 7, 30);
    List<String> result = processNumbers(numbers,
        n -> n > 10,
        n -> "Value: " + n);
    result.forEach(System.out::println);
}
/*
Result:
Value: 12
Value: 20
Value: 30
*/
```

_NOTE: In Java; Predicate, Function, and similar enable functional-style programming, but they are not actual functions as in pure functional programming languages—they are objects that implement functional interfaces. While Java supports lambdas and function composition, these constructs are still based on objects, not first-class functions in the traditional functional programming sense._

### Immutability

Immutability refers to the principle that once an object or data structure is created, it cannot be changed.

In case we need to make some modifications to the value or structure, we should create a new instance with the desired changes. This practice avoids bugs related to mutable states.

This is a great advantage in concurrent systems because no part of the code can unexpectedly change, making debugging also easier.

```java
public record User(String name, int age) {
    // Method to create a new User with updated age
    public User withAge(int newAge) {
        return new User(this.name, newAge);
    }

    // Method to create a new User with updated name
    public User withName(String newName) {
        return new User(newName, this.age);
    }
}

// Main.java
List<User> users = Arrays.asList(
    new User("Alice", 30),
    new User("Bob", 25),
    new User("Charlie", 35)
);

// Function to increment age
UnaryOperator<User> incrementAge = user -> user.withAge(user.age() + 1);

// Predicate to filter users over 30
Predicate<User> isOver30 = user -> user.age() > 30;

// Apply transformations without modifying states
List<User> updatedUsers = users.stream()
    .map(incrementAge)   // Create new updated User instances
    .filter(isOver30)    // Filter based on age
    .toList();

updatedUsers.forEach(System.out::println); // Result -> [Alice, Charlie]
```

### Function Composition

Simple functions can be combined to build more complex behaviors. This encourages code reuse and modular design. The logic will become a bunch of small, testable functions chained together.

Let’s see a simple example of chaining two functions:

```java
IntUnaryOperator addOne = x -> x + 1;
IntUnaryOperator triple = x -> x * 3;
IntUnaryOperator addOneThenTriple = addOne.andThen(triple);
addOneThenTriple.applyAsInt(5); // (5 + 1) * 3 = 18
```

# Benefits of Functional Programming

## Easier to Test and Debug

Thanks to the pure functions, it is easier to unit test as it is not necessary to mock or elaborate complex setups. Just inputs and expected outputs.  
This also makes debugging easier as the logic is isolated from behavior.

## Improve Reusability and Composition

Dividing the core logic into small functions that can be compounded aligns with the clean code principles like the Single Responsibility Principle (SRP) and favors DRY (Don’t Repeat Yourself).

Furthermore, FP facilitates code extensibility by encouraging the addition of new functions rather than modifying existing ones. If current functions don’t meet new requirements, you simply compose or introduce new ones without modifying the original logic. This aligns with the Open/Closed Principle: software should be open for extension but closed for modification.

## Safe Concurrency

Immutable data makes the code naturally thread-safe. This eliminates race conditions and reduces the need for locks in concurrent systems.

## Improve Maintainability of the Code

Making functions behave consistently and data structures immutable helps to trace bugs more easily. The system becomes more modular and maintainable over time.

## Cleaner Code thanks to Declarative Programming

FP encourages using Declarative Programming instead of Imperative Programming. This changes the way of thinking from “how I want to do something” to “what I want to do”. Let’s see an example of this in both programming paradigms. The example is about calculating the quadratic of the even numbers in a given list:

```java
// Imperative Programming
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6);
List<Integer> result = new ArrayList<>();

for (int n : numbers) {
    if (n % 2 == 0) {
        result.add(n * n);
    }
}
System.out.println(result); // [4, 16, 36]
```

The imperative programming sets step by step what should be done next: iterate, check if it is even, multiply, and save.

```java
// Declarative Programming
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6);
List<Integer> result = numbers.stream()
    .filter(n -> n % 2 == 0)
    .map(n -> n * n)
    .toList();
System.out.println(result); // [4, 16, 36]
```

The declarative programming declares what we want to do: filter even numbers, square them, and return a list.

# Applying Functional Programming Concepts in Java

_NOTE: Java is not a functional programming language because it was designed primarily for object-oriented programming. However, since Java 8, it supports functional features like lambdas, streams, and functional interfaces, allowing functional-style programming._

## Use Streams for Data Transformation

Java Streams allow you to perform operations like `map`, `filter`, and `reduce` in a functional style. This encourages declarative code and avoids mutating data structures.

```java
List<String> names = List.of("Bob", "Ben", "Alice");
List<String> uppercased =
    names.stream()
         .map(String::toUpperCase)
         .toList();
System.out.println(uppercased); // [BOB, BEN, ALICE]
```

## Use Optionals and Avoid Null

FP encourages avoiding nulls as they can lead to unpredictable behavior. Java’s Optional encourages the safe handling of possible null values.

```java
Optional<String> maybeName = Optional.of("Alice");
maybeName.ifPresent(name -> System.out.println(name.toUpperCase()));
```

## Embrace the use of Immutable Data Structures

Java does not force immutable values by default, but it is possible to use final variables and immutable collections, like _List.of(...)_. Also, _record_ classes can be used to define immutable data holders.

```java
// Use immutable collections in Java
List<String> names = List.of("Alice", "Bob");
List<String> newNames = Stream
    .concat(
        names.stream(),
        Stream.of("Charlie"))
    .toList(); // returns newNames = ["Alice", "Bob", "Charlie"]
```

## Use Functions

When possible, define pure and small functions. Avoid modifying the global state to reduce side effects. Use functional interfaces (like _Function, Predicate, Supplier…)_.

```java
Function<Integer, Integer> doubleIt = x -> x * 2;
doubleIt.apply(10); // 20
```

## Apply Function Composition

Chain behaviors to create complex logic by composing functions.

```java
Function<Integer, Integer> incrementByOne = x -> x + 1;
Function<Integer, Integer> square = x -> x * x;
Function<Integer, Integer> incrementThenSquare = incrementByOne.andThen(square);

incrementThenSquare.apply(3); // (3 + 1)^2 = 16
```

# Conclusion

Adding Functional Programming principles like pure functions, immutability, and function composition can improve code clarity, testability, and maintainability.

Although Java was not designed to be a functional language, it has incorporated different features that allow the application of these FP concepts.

Thanks to lambda expressions, Stream, functional interfaces, and so on, it is possible to start writing more declarative, robust, and modular applications that will help to create better software.
