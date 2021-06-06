console.log("This is calculator project.");

function press(id) {
    let input = document.getElementById('input').value + id;
    document.getElementById('input').value = input;
}

function answer() {
    let operation = document.getElementById('input').value;
    let splitting;
    if (operation.includes('+')) {
        splitting = operation.split('+')
        document.getElementById('input').value = Number(splitting[0]) + Number(splitting[1]);
    }
    else if (operation.includes('-')) {
        splitting = operation.split('-')
        document.getElementById('input').value = Number(splitting[0]) - Number(splitting[1]);
    }
    else if (operation.includes('*')) {
        splitting = operation.split('*')
        document.getElementById('input').value = Number(splitting[0]) * Number(splitting[1]);
    }
    else if (operation.includes('/')) {
        splitting = operation.split('/')
        document.getElementById('input').value = Number(splitting[0]) / Number(splitting[1]);
    }
    else if (operation == "" || operation == 0){
        document.getElementById('input').value = 0
    }
    else{
        document.getElementById('input').value = 'INVALID INPUT'
    }
}

function clearit() {
    document.getElementById('input').value = ""
}

function square(){
    let num = Number(document.getElementById('input').value)
    document.getElementById('input').value = num*num
}

function inverse(){
    let num = Number(document.getElementById('input').value)
    document.getElementById('input').value = 1/num
}

function squareRoot(){
    let num = Number(document.getElementById('input').value)
    document.getElementById('input').value = Math.sqrt(num)
}

function remove() {
    let str = document.getElementById('input').value
    str = str.slice(0,str.length - 1)
    document.getElementById('input').value = str
}