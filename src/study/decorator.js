class Model1 {
    getData() {
        let start = new Date().valueOf();
        try {
            return [{
                id: 1,
                name: 'John'
            }, {
                id: 2,
                name: 'Jason'
            }]
        } finally {
            let end = new Date().valueOf();
            console.log(`start: ${start}, end: ${end}, consume: ${end - start}`);
        }
    }
}
console.log(new Model1().getData());
console.log(Model1.prototype.getData());

function wrap(Model, key) {
    let target = Model.prototype;
    let descriptor = Object.getOwnPropertyDescriptor(target, key);
    let log = function(...arg) {
        let start = new Date().valueOf();
        try {
            return descriptor.value.apply(this, arg);

        } finally {
            let end = new Date().valueOf();
            console.log(`start: ${start}, end: ${end}, consume: ${end-start}`);
        }
    }
    Object.defineProperties(target, key, {
        ...descriptor,
        value: log
    });
}
