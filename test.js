const myVar = "Mauricio"

const x = (function() {
    const myVar = "Mike"
    console.log('init repo');
    return "testxxx"
})();

console.log(x);
console.log(myVar); 