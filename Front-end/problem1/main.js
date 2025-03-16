function sum_to_n_a (n) {
    return n * (n + 1) / 2;
}

const sum_to_n_b = function(n) {
    let sum = 0;
    for(i=1;i<=n;i++){
        sum += i;
    }
    return sum;
}

const sum_to_n_c = (n) => {
    if (n === 1) return 1;
    return n + sum_to_n_c(n - 1);
}

console.log(sum_to_n_a(7)); // 1 + 2 + 3 + 4 + 5 + 6 + 7 = 28
console.log(sum_to_n_b(7)); //
console.log(sum_to_n_c(7)); //