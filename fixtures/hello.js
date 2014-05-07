class Hello {
    toString() {
        return "Hello World!";
    }
}

var create = () => new Hello();
console.log(create().toString());
