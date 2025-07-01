document.addEventListener('DOMContentLoaded', () => {
    // --- Задание 2: Работа с объектом Document + Обработка событий в JavaScript + HDOM ---
    const showUrlButton = document.getElementById('showUrlButton');
    const urlOutput = document.getElementById('urlOutput');
    const myFavoriteLink = document.getElementById('myFavoriteLink'); // Ваша ссылка

    // 2.2: Получить текущий URL и вывести однократно при нажатии на кнопку «Посмотреть URL».
    let urlDisplayed = false;
    showUrlButton.addEventListener('click', () => {
        if (!urlDisplayed) {
            urlOutput.textContent = `Текущий URL: ${window.location.href}`;
            urlDisplayed = true;
        }
    });

    // 2.3: При клике на саму ссылку, она удаляется И происходит переход.
    if (myFavoriteLink) {
        // Сохраним исходные стили ссылки, чтобы можно было их восстановить, если бы это было нужно
        // В данном случае, так как ссылка удаляется, это не критично, но хорошая практика.
        myFavoriteLink.style.textDecoration = 'none'; // Уберем подчеркивание по умолчанию
        myFavoriteLink.style.color = '#007bff'; // Базовый цвет для ссылки

        myFavoriteLink.addEventListener('click', (event) => {
            // Удаляем элемент немедленно
            myFavoriteLink.remove(); 
            urlOutput.textContent = "Ссылка 'Мой любимый сайт' удалена и будет произведен переход...";

            // Получаем URL из href ссылки и переходим с небольшой задержкой
            const targetUrl = event.currentTarget.href; 
            setTimeout(() => {
                window.location.href = targetUrl; 
            }, 100); 
        });

        // --- Задание 3: Оформление элемента через DOM (вместо CSS) ---
        // Стили должны применяться к элементу только при наведении курсора мыши на него.
        myFavoriteLink.addEventListener('mouseover', () => {
            myFavoriteLink.style.color = 'blue'; // 1. Цвет текста синий
            myFavoriteLink.style.fontFamily = 'Verdana, sans-serif'; // 2. Текст Verdana
            myFavoriteLink.style.fontWeight = 'bold'; // 2. Толстый шрифт
            myFavoriteLink.style.fontSize = '25px'; // 2. Размер 25 пикселей
            myFavoriteLink.style.border = '1px solid green'; // 3. Граница зеленого цвета
            myFavoriteLink.style.cursor = 'pointer'; // Курсор-указатель
        });

        myFavoriteLink.addEventListener('mouseout', () => {
            // Возвращаем стили к исходным или к пустым значениям
            myFavoriteLink.style.color = '#007bff'; // Исходный цвет
            myFavoriteLink.style.fontFamily = 'Arial, sans-serif'; // Возвращаем к чему-то базовому или пустой строке
            myFavoriteLink.style.fontWeight = 'normal'; // Нормальная толщина
            myFavoriteLink.style.fontSize = '1em'; // Исходный размер
            myFavoriteLink.style.border = 'none'; // Удаляем границу
            myFavoriteLink.style.cursor = 'auto'; // Обычный курсор
        });
    }


    // --- Задание 4: Объектная модель браузера ---
    const hostname = window.location.hostname;

    urlOutput.addEventListener('click', () => {
        if (urlOutput.textContent.includes('Текущий URL:')) {
            const newWindow = window.open('', '_blank', 'width=300,height=500,scrollbars=yes,status=no');
            if (newWindow) {
                newWindow.document.write(`<!DOCTYPE html>
                <html lang="ru">
                <head>
                    <title>Информация о хосте</title>
                    <style>body { font-family: Arial, sans-serif; padding: 20px; text-align: center; }</style>
                </head>
                <body>
                    <h1>Имя компьютера (hostname):</h1>
                    <p>${hostname}</p>
                </body>
                </html>`);
                newWindow.document.close();
            } else {
                alert('Не удалось открыть новое окно. Возможно, оно было заблокировано браузером.');
            }
        }
    });

    // --- Задание 5: Валидация пользовательских форм ---
    const registrationForm = document.getElementById('registrationForm');

    const fields = [
        { id: 'account-number', errorId: 'accountNumberError', minLength: 6, maxLength: 10, pattern: /^\d+$/, message: 'Обязательное поле. Только цифры, от 6 до 10 знаков.' },
        { id: 'house-number', errorId: 'houseNumberError', minLength: 1, maxLength: 5, pattern: /^\d+$/, message: 'Обязательное поле. Только цифры.' },
        { id: 'house-letter', errorId: 'houseLetterError', maxLength: 1, pattern: /^[а-яА-Яa-zA-Z]$/, message: 'Только одна буква (кириллица/латиница).' },
        { id: 'apartment-number', errorId: 'apartmentNumberError', minLength: 1, maxLength: 5, pattern: /^\d+$/, message: 'Только цифры.' },
        { id: 'apartment-extension', errorId: 'apartmentExtensionError', maxLength: 3, message: 'Максимум 3 символа.' },
        { id: 'email', errorId: 'emailError', pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Обязательное поле. Введите корректный email.' },
        { id: 'password', errorId: 'passwordError', minLength: 6, maxLength: 20, message: 'Обязательное поле. От 6 до 20 символов.' }
    ];

    const dataProcessingCheckbox = document.getElementById('data-processing');
    const dataProcessingError = document.getElementById('dataProcessingError');

    function resetValidation(inputElement, errorElement) {
        if (inputElement) inputElement.classList.remove('invalid-field', 'valid-field');
        if (errorElement) errorElement.textContent = '';
    }

    function showError(inputElement, errorElement, message) {
        if (inputElement) {
            inputElement.classList.add('invalid-field');
            inputElement.classList.remove('valid-field');
        }
        if (errorElement) errorElement.textContent = message;
    }

    function showSuccess(inputElement, errorElement) {
        if (inputElement) {
            inputElement.classList.remove('invalid-field');
            inputElement.classList.add('valid-field');
        }
        if (errorElement) errorElement.textContent = '';
    }

    function validateForm() {
        let isValid = true;

        fields.forEach(field => {
            const input = document.getElementById(field.id);
            const error = document.getElementById(field.errorId);
            resetValidation(input, error);

            const value = input.value.trim();

            const isRequired = ['account-number', 'house-number', 'email', 'password'].includes(field.id);
            if (isRequired && value === '') {
                showError(input, error, 'Это обязательное поле.');
                isValid = false;
                return;
            }
            
            if (!isRequired && value === '') {
                showSuccess(input, error);
                return;
            }

            if (field.pattern && !field.pattern.test(value)) {
                showError(input, error, field.message);
                isValid = false;
                return;
            }

            if (field.minLength && value.length < field.minLength) {
                showError(input, error, `Минимальная длина: ${field.minLength} символов.`);
                isValid = false;
                return;
            }
            if (field.maxLength && value.length > field.maxLength) {
                showError(input, error, `Максимальная длина: ${field.maxLength} символов.`);
                isValid = false;
                return;
            }
            
            showSuccess(input, error);
        });

        resetValidation(null, dataProcessingError);
        if (!dataProcessingCheckbox.checked) {
            dataProcessingError.textContent = 'Необходимо принять условия обработки данных.';
            isValid = false;
        }

        return isValid;
    }

    registrationForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (validateForm()) {
            alert('Форма успешно заполнена!');
            registrationForm.reset();
            fields.forEach(field => {
                const input = document.getElementById(field.id);
                resetValidation(input, document.getElementById(field.errorId));
            });
            dataProcessingError.textContent = '';
        } else {
            alert('Пожалуйста, исправьте ошибки в форме.');
        }
    });

    fields.forEach(field => {
        const input = document.getElementById(field.id);
        if (input) {
            input.addEventListener('input', () => validateForm());
            input.addEventListener('blur', () => validateForm());
        }
    });

    dataProcessingCheckbox.addEventListener('change', () => {
        resetValidation(null, dataProcessingError);
        if (!dataProcessingCheckbox.checked) {
            dataProcessingError.textContent = 'Необходимо принять условия обработки данных.';
        }
    });
});