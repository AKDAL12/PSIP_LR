/**
 * Вычисляет Y по формуле y = sqrt(16 - x^2) / (x - 2)
 * @param {number} x Входное значение x
 * @returns {number|null} Значение Y или null в случае ошибки.
 */
function calculateY(x) {
    try {
        const numeratorRadicand = 16 - Math.pow(x, 2); // 16 - x^2
        const denominator = x - 2; // x - 2

        // Обработка исключений: корень из отрицательного числа
        if (numeratorRadicand < 0) {
            throw new Error(`Ошибка: Попытка извлечь квадратный корень из отрицательного числа. (16 - ${x}^2) = ${numeratorRadicand}`);
        }

        // Обработка исключений: деление на ноль
        if (denominator === 0) {
            throw new Error(`Ошибка: Деление на ноль. (x - 2) = (${x} - 2) = 0`);
        }

        const Y = Math.sqrt(numeratorRadicand) / denominator;
        return Y;
    } catch (error) {
        alert("Ошибка в расчетах Задания 4: " + error.message);
        return null;
    }
}

// Функции для кнопок Задания 4 (вызывают новую функцию calculateY)
function performCalculations() {
    const x_val = 3; // Пример значения для x
    const resultY = calculateY(x_val);

    if (resultY !== null) { // Проверяем не на undefined, а на null
        document.getElementById('resultY').innerText = resultY.toFixed(4);
        document.getElementById('resultX').innerText = 'Нет X для этой формулы'; // У этой формулы только Y
    } else {
        document.getElementById('resultY').innerText = 'Ошибка, см. alert.';
        document.getElementById('resultX').innerText = 'Ошибка, см. alert.';
    }
}

function testMathErrorCase() {
    // Пример для корня из отрицательного: x = 5 (16 - 25 = -9)
    // Пример для деления на ноль: x = 2 (2 - 2 = 0)
    // Давайте протестируем деление на ноль первым
    let x_error = 2; // Для деления на ноль
    let resultY_error = calculateY(x_error);
    if (resultY_error === null) {
        // Если была ошибка деления на ноль, попробуем ошибку корня
        x_error = 5; // Для корня из отрицательного
        resultY_error = calculateY(x_error);
    }


    if (resultY_error !== null) {
        document.getElementById('resultY').innerText = resultY_error.toFixed(4);
        document.getElementById('resultX').innerText = 'Нет X для этой формулы';
    } else {
        document.getElementById('resultY').innerText = 'Ошибка, см. alert.';
        document.getElementById('resultX').innerText = 'Ошибка, см. alert.';
    }
}