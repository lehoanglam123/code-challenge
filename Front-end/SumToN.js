function sum_to_a(n) {
    if(n == 1)
        return 1;
    return n * (n + 1) / 2;
}

const sum_to_b = function (n) {
    if(n == 1) 
        return 1;
    return n + sum_to_b(n - 1);
}

const sum_to_c = (n)=>{
    if(n == 1)
        return 1;
    let sum = 0;
    for(let i = 1; i<=n; i++){
        sum += i;
    }
    return sum;
}

console.log(sum_to_a(5));
console.log(sum_to_b(5));
console.log(sum_to_c(5));
