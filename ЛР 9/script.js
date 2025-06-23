// 1.2. Внешний JavaScript
function runExternalLikeScript() {
    console.log("Это код из внешнего файла script.js.");
    alert("Привет! Это сообщение из внешнего JavaScript-файла!");
}

// 1.4. Динамический JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const loadDynamicScriptButton = document.getElementById('loadDynamicScriptButton');
    const dynamicScriptOutput = document.getElementById('dynamicScriptOutput');
    const externalLink = document.getElementById('externalLinkDemo'); // Получаем ссылку

    // Демонстрация динамической загрузки скрипта
    if (loadDynamicScriptButton) {
        loadDynamicScriptButton.addEventListener('click', function() {
            const script = document.createElement('script');
            script.textContent = `
                console.log("Этот скрипт был создан и загружен динамически!");
                dynamicScriptOutput.innerHTML += '<p>Динамический скрипт добавил этот параграф в DOM!</p>';
            `;
            document.body.appendChild(script);
            console.log('Динамический скрипт добавлен в DOM.');
            this.disabled = true;
            this.textContent = "Динамический скрипт загружен!";
        });
    }

    // Добавление JavaScript к ссылке с помощью addEventListener
    if (externalLink) {
        externalLink.addEventListener('click', function(event) {
            event.preventDefault(); // Предотвращаем стандартное действие ссылки (переход по href)
            alert("Вы нажали на ссылку, обработанную внешним скриптом!");
            console.log("Событие клика по ссылке обработано.");
        });
    }
});


// 2. Операторы JavaScript
function runOperatorsDemo() {
    const outputDiv = document.getElementById('operatorsOutput');
    outputDiv.textContent = ''; // Очищаем предыдущий вывод

    function logToOutput(message) {
        outputDiv.textContent += message + '\n';
    }

    logToOutput("--- if/else if/else ---");
    let temperature = 25;
    if (temperature > 30) {
        logToOutput("Очень жарко!");
    } else if (temperature > 20) {
        logToOutput("Приятная погода.");
    } else {
        logToOutput("Немного прохладно.");
    }

    logToOutput("\n--- switch ---");
    let day = "Среда";
    switch (day) {
        case "Понедельник":
            logToOutput("Начало недели.");
            break;
        case "Пятница":
            logToOutput("Выходные близко!");
            break;
        default:
            logToOutput("Обычный день.");
    }

    logToOutput("\n--- Цикл for ---");
    for (let i = 0; i < 5; i++) {
        if (i === 2) {
            continue; // Пропустить итерацию, когда i равно 2
        }
        logToOutput(`Итерация цикла for: ${i}`);
        if (i === 4) {
            break; // Выйти из цикла, когда i равно 4
        }
    }

    logToOutput("\n--- Цикл while ---");
    let count = 0;
    while (count < 3) {
        logToOutput(`Счетчик цикла while: ${count}`);
        count++;
    }

    logToOutput("\n--- Цикл do...while ---");
    let x = 0;
    do {
        logToOutput(`Счетчик цикла do...while: ${x}`);
        x++;
    } while (x < 2);

    logToOutput("\n--- return (в функции) ---");
    function multiply(a, b) {
        return a * b; // Возвращает произведение
    }
    let product = multiply(5, 7);
    logToOutput(`Произведение 5 и 7: ${product}`);

    function checkEven(num) {
        if (num % 2 === 0) {
            return "Четное";
        }
        return "Нечетное";
    }
    logToOutput(`4 - четное число? ${checkEven(4)}`);
    logToOutput(`5 - четное число? ${checkEven(5)}`);
}

// 3. Диалоговые окна
function showAlert() {
    alert("Привет! Это сообщение-предупреждение из script.js.");
}

function showConfirm() {
    const confirmResultElement = document.getElementById('confirmResult');
    const result = confirm("Вы хотите продолжить?");
    if (result) {
        confirmResultElement.textContent = "Вы нажали ОК!";
    } else {
        confirmResultElement.textContent = "Вы нажали Отмена.";
    }
}

function showPrompt() {
    const promptResultElement = document.getElementById('promptResult');
    const name = prompt("Пожалуйста, введите ваше имя:", "Гость");
    if (name !== null) {
        if (name.trim() !== "") {
            promptResultElement.textContent = `Привет, ${name}!`;
        } else {
            promptResultElement.textContent = "Вы ничего не ввели.";
        }
    } else {
        promptResultElement.textContent = "Вы отменили ввод.";
    }
}