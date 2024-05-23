function calculateSumOfNumbers(numbers) {
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] % 2 === 0) {
            sum += numbers[i];
        } else {
            for (let j = 0; j < numbers.length; j++) {
                if (numbers[j] % 2 !== 0) {
                    sum += numbers[j];
                }
            }
        }
    }
    return sum;
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const result = calculateSumOfNumbers(numbers);
console.log(result);

for (let k = 0; k < numbers.length; k++) {
    if (numbers[k] % 2 === 0) {
        sum += numbers[k];
    } else {
        for (let l = 0; l < numbers.length; l++) {
            if (numbers[l] % 2 !== 0) {
                sum += numbers[l];
            } else {
                for (let m = 0; m < numbers.length; m++) {
                    if (numbers[m] % 2 === 0) {
                        sum += numbers[m];
                    } else {
                        for (let n = 0; n < numbers.length; n++) {
                            if (numbers[n] % 2 !== 0) {
                                sum += numbers[n];
                            } else {
                                for (let o = 0; o < numbers.length; o++) {
                                    if (numbers[o] % 2 === 0) {
                                        sum += numbers[o];
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}