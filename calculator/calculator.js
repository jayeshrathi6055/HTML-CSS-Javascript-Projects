console.log("This is calculator project.");

function press(id) {
    let input = document.getElementById('input').value + id;
    document.getElementById('input').value = input;
}

function answer() {
    let input = document.getElementById('input').value
    let num = []
    let operators = []
    var a = ''
    for (var iterator of input) {
        if (Number(iterator) || (iterator == '0') || (iterator == '.')) {
            a = a + iterator
            console.log(a)
            continue
        } else if ((iterator == '+' || (iterator == '-') || (iterator == '/') || (iterator == '*'))) {
            operators.push(iterator)
        } else {
            continue
        }
        num.push(a)
        a = ''
    }
    num.push(a)

    // For division
    var count = 0

    for (var iterator of operators) {
        if (iterator == "/") {
            count++
        }
    }
    for (let index = 0; index < count; index++) {
        if (operators.includes('/')) {
            var i = operators.indexOf('/')
            var ans = div(Number(num[i]), Number(num[i + 1]))
            num.splice(i, 2)
            num.splice(i, 0, ans)
            operators.splice(i, 1)
        }
    }

    // For Multiplication
    var count = 0

    for (var iterator of operators) {
        if (iterator == "*") {
            count++
        }
    }
    for (let index = 0; index < count; index++) {
        if (operators.includes('*')) {
            var i = operators.indexOf('*')
            var ans = mul(Number(num[i]), Number(num[i + 1]))
            num.splice(i, 2)
            num.splice(i, 0, ans)
            operators.splice(i, 1)
        }
    }

    // For addition
    var count = 0

    for (var iterator of operators) {
        if (iterator == "+") {
            count++
        }
    }
    for (let index = 0; index < count; index++) {
        if (operators.includes('+')) {
            var i = operators.indexOf('+')
            var ans = add(Number(num[i]), Number(num[i + 1]))
            num.splice(i, 2)
            num.splice(i, 0, ans)
            operators.splice(i, 1)
        }
    }

    // For Subtraction
    var count = 0

    for (var iterator of operators) {
        if (iterator == "-") {
            count++
        }
    }
    for (let index = 0; index < count; index++) {
        if (operators.includes('-')) {
            var i = operators.indexOf('-')
            var ans = sub(Number(num[i]), Number(num[i + 1]))
            num.splice(i, 2)
            num.splice(i, 0, ans)
            operators.splice(i, 1)
        }
    }

    document.getElementById('input').value = num[0]
}

function add(a, b) { return a + b }

function sub(a, b) { return a - b }

function div(a, b) { return a / b }

function mul(a, b) { return a * b }

function clearit() {
    document.getElementById('input').value = ""
}

function square() {
    if (Number(document.getElementById('input').value)) {
        let num = Number(document.getElementById('input').value)
        document.getElementById('input').value = num * num
    }
    else {
        document.getElementById('input').value = 'INVALID INPUT'
    }
}

function inverse() {
    if (Number(document.getElementById('input').value)) {
        let num = Number(document.getElementById('input').value)
        document.getElementById('input').value = 1 / num
    }
    else {
        document.getElementById('input').value = 'INVALID INPUT'
    }
}

function squareRoot() {
    if (Number(document.getElementById('input').value)) {
        let num = Number(document.getElementById('input').value)
        document.getElementById('input').value = Math.sqrt(num)
    }
    else {
        document.getElementById('input').value = 'INVALID INPUT'
    }
}

function remove() {
    let str = document.getElementById('input').value
    str = str.slice(0, str.length - 1)
    document.getElementById('input').value = str
}