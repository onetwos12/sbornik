// Состояние приложения
const AppState = {
    currentSection: 'part1',
    selectedQuestions: [],
    correctAnswers: {},
    usedHints: {},
    testCompleted: false,
    currentScore: 0
};


const TEST_CONFIG = {
    questionsPerTest: 5,
    pointsPerQuestion: 2,
    hintPenalty: 0.5
};


const QuestionsDB = {
    part1: [
        {
            question: "Клиент А. сделал вклад в банке в размере 7700 рублей. Проценты по вкладу начисляются раз в год и прибавляются к текущей сумме вклада. Ровно через год на тех же условиях такой же вклад в том же банке сделал клиент Б. Еще ровно через год клиенты А. и Б. закрыли вклады и забрали все накопившиеся деньги. При этом клиент А. получил на 847 рублей больше клиента Б. Какой процент годовых начислял банк по этим вкладам?",
            answer: "10",
            hints: [
                "Пусть банк начислял p% годовых. Тогда клиент А. за два года получил 7700(1+0,01p)^2",
                "Клиет Б. получил 7700(1+0,01p); А. получил на 847 руб. больше"
            ],
            solution:
                      "Клиент А через 2 года получит: 7700*(1 + p/100)^2\n" +
                      "Клиент Б через 1 год получит: 7700*(1 + p/100)\n" +
                      "Разница: 7700*(1 + p/100)^2 - 7700*(1 + p/100) = 847\n" +
                      "Упрощаем: p^2 + 100p - 1100 = 0\n" +
                      "Решаем квадратное уравнение: p = 10%\n" +
                      "Ответ: 10%"
        },
        {
            question: "Имеется два сплава. Первый содержит 15% никеля, второй — 35% никеля. Из этих двух сплавов получили третий сплав массой 140 кг, содержащий 30% никеля. На сколько килограммов масса первого сплава была меньше массы второго?",
            answer: "70",
            hints: [
                "В первом стакане содержание полезного вещества 15%, во втором 35%, в третьем 30%",
                "Обозначим за x массу первого сплава, тогда масса второго x, искомое 140-x-x"
            ],
            solution: `
                <div class="solution-image">
                    <img src="https://imgur.com/W8LMbiP.png" alt="Графическое решение задачи о сплавах">
                </div>
                    1. Пусть масса первого сплава = x кг, тогда второго = (140 - x)  кг
                    2. Содержание никеля в первом сплаве: 0.15x
                    3. Содержание никеля во втором сплаве: 0.35(140 - x)
                    4. Общее содержание никеля в новом сплаве: 0.30 * 140 = 42 кг
                    5. Уравнение: 0.15x + 0.35(140 - x) = 42
                    0.15x + 49 - 0.35x = 42
                    x = 35 кг (масса первого сплава)
                    6. Масса второго сплава: 140 - 35 = 105 кг
                    7. Разница: 105 - 35 = 70 кг
                    8. Ответ: 70 кг
                </div>
            `
        },
        {
            question: "В сосуд, содержащий 5 литров 12−процентного водного раствора некоторого вещества, добавили 7 литров воды. Сколько процентов составляет концентрация получившегося раствора?",
            answer: "5",
            hints: [
                "В первом стакане содержание полезного вещества 12%, во втором 0%, в третьем x",
                "В полученном стакане 12 л вещества"
            ],
            solution: `
                <div class="solution-image">
                    <img src="https://imgur.com/ipr47sx.png" alt="Графическое решение задачи о растворах">
                </div>
                <div class="solution-steps">
                    1. Исходный раствор: 5 л × 12/100 полезного вещества
                    2. Добавили 7л*0/100 (0) полезного вещества
                    3. Общий объем нового раствора: 5 + 7 = 12 л
                    4. Концентрация полезного вещества нового раствора: x/100*12
                    5. Составим уравнение: x/100*12 = 5*12/100
                    6. Решим уравнение: x=5
                    7. Ответ: 5%
                </div>
            `
        },
        {
            question: "Митя, Антон, Гоша и Борис учредили компанию с уставным капиталом 200000 рублей. Митя внес 14% уставного капитала, Антон — 42000 рублей, Гоша — 0,12 уставного капитала, а оставшуюся часть капитала внес Борис. Учредители договорились делить ежегодную прибыль пропорционально внесенному в уставной капитал вкладу. Какая сумма от прибыли 1000000 рублей причитается Борису? Ответ дайте в рублях.",
            answer: "530000",
            hints: [
                "Антон внес 42000/200000*100%=21%",
                "Борис внес 100-12-14-21=53%"
            ],
            solution: 
                     "1. Вычисляем доли каждого учредителя:\n" +
                     "- Митя: 14%\n" +
                     "- Антон: 42000/20000=0,21 (21%)\n" +
                     "- Гоша: 0.12 (12%)\n" +
                     "- Борис: 100-14-21-12 = 53 (53%)\n" +
                     "2. Доля Бориса в прибыли:\n" +
                     "1000000 * 0,53 = 530000 руб."
        },
        {
            question: "Цена холодильника в магазине ежегодно уменьшается на одно и то же число процентов от предыдущей цены. Определите, на сколько процентов каждый год уменьшалась цена холодильника, если, выставленный на продажу за 20 000 рублей, через два года был продан за 15 842 рублей.",
            answer: "11",
            hints: [
                "Пусть цена холодильника ежегодно снижалась на p процентов в год",
                "Тогда за два года она снизилась на 20000(1-0,01p)^2"
            ],
            solution: 
                     "Пусть цена снижается на p% каждый год.\n" +
                     "Через 1 год цена: 20000 * (1 - p/100)\n" +
                     "Через 2 года цена: 20000 * (1 - p/100)^2 = 15842\n" +
                     "(1 - p/100)^2 = 15842 / 20000 = 0.7921\n" +
                     "1 - p/100 = √0.7921 = 0.89\n" +
                     "p/100 = 1 - 0.89 = 0.11\n" +
                     "p = 11%"
        }
    ],
    part2: [
        {
            question: "Имеется два сплава. Первый содержит 15% никеля, второй — 35% никеля. Из этих двух сплавов получили третий сплав массой 140 кг, содержащий 30% никеля. На сколько килограммов масса первого сплава была меньше массы второго?",
            answer: "70",
            hints: [
                "В первом стакане содержание полезного вещества 15%, во втором 35%, в третьем 30%",
                "Обозначим за x массу первого сплава, тогда масса второго x, искомое 140-x-x"
            ],
            solution: `
                <div class="solution-image">
                    <img src="https://imgur.com/lIqf2hw.png" alt="Графическое решение задачи о сплавах">
                </div>
                    1. Пусть масса первого сплава = x кг, тогда второго = (140 - x)  кг
                    2. Содержание никеля в первом сплаве: 0.15x
                    3. Содержание никеля во втором сплаве: 0.35(140 - x)
                    4. Общее содержание никеля в новом сплаве: 0.30 * 140 = 42 кг
                    5. Уравнение: 0.15x + 0.35(140 - x) = 42
                    0.15x + 49 - 0.35x = 42
                    x = 35 кг (масса первого сплава)
                    6. Масса второго сплава: 140 - 35 = 105 кг
                    7. Разница: 105 - 35 = 70 кг
                    8. Ответ: 70 кг
                </div>
            `
        },
    ]
};


function initApp() {
    // Добавляем стили для изображений
    const style = document.createElement('style');
    style.textContent = `
        .solution-image {
            margin: 15px 0;
            text-align: center;
        }
        .solution-image img {
            max-width: 75%;
            height: auto;
            border: 1px solid #ddd;
            border-radius: 4px;
            padding: 5px;
        }
        .visualization pre {
            background-color: #f5f5f5;
            padding: 10px;
            border-radius: 4px;
            font-family: monospace;
        }
    `;
    document.head.appendChild(style);
    
    generateTest();
    setupEventListeners();
}

// Генерация нового теста
function generateTest() {
    resetTestState();
    const questionsSource = QuestionsDB[AppState.currentSection];
    const shuffledQuestions = shuffleArray([...questionsSource]);
    
    AppState.selectedQuestions = shuffledQuestions.slice(0, TEST_CONFIG.questionsPerTest);
    renderQuestions();
    updateProgressBar();
}

// Сброс состояния теста
function resetTestState() {
    AppState.testCompleted = false;
    AppState.correctAnswers = {};
    AppState.usedHints = {};
    AppState.currentScore = 0;
    
    document.getElementById('questionsContainer').innerHTML = '';
    resetSubmitButton();
}

// Рендеринг вопросов
function renderQuestions() {
    const container = document.getElementById('questionsContainer');
    
    AppState.selectedQuestions.forEach((question, index) => {
        AppState.correctAnswers[`q${index}`] = question.answer.toLowerCase().trim();
        
        const questionHTML = `
            <div class="question">
                <div class="question-text">
                    <span class="question-number">${index + 1}</span>${question.question}
                </div>
                <div class="hint-selector">
                    <span class="hint-label">Подсказки:</span>
                    ${renderHintOptions(index, question.hints.length)}
                </div>
                ${renderHints(index, question.hints)}
                <input type="text" name="q${index}" placeholder="Введите ответ">
                <div class="correct-answer" style="display: none;">Правильный ответ: ${question.answer}</div>
            </div>
        `;
        
        container.innerHTML += questionHTML;
    });
}

// Рендеринг вариантов подсказок
function renderHintOptions(questionIndex, hintsCount) {
    let optionsHTML = '';
    for (let i = 0; i < hintsCount; i++) {
        optionsHTML += `
            <span id="hint-option-${questionIndex}-${i}" class="hint-option" 
                  onclick="showHint(${questionIndex}, ${i})">${i + 1}</span>
        `;
    }
    return optionsHTML;
}

// Рендеринг подсказок
function renderHints(questionIndex, hints) {
    return hints.map((hint, i) => `
        <div id="hint-${questionIndex}-${i}" class="hint">${hint}</div>
    `).join('');
}

// Показ подсказки
function showHint(questionIndex, hintIndex) {
    if (AppState.testCompleted) return;
    
    const hintElement = document.getElementById(`hint-${questionIndex}-${hintIndex}`);
    hintElement.classList.add('show');
    
    const hintOption = document.getElementById(`hint-option-${questionIndex}-${hintIndex}`);
    hintOption.classList.add('hint-used');
    hintOption.onclick = null;
    
    if (!AppState.usedHints[questionIndex]) {
        AppState.usedHints[questionIndex] = [];
    }
    AppState.usedHints[questionIndex].push(hintIndex);
}

function checkAnswers() {
    if (AppState.testCompleted) return;
    
    let score = 0;
    let hintPenalty = 0;
    
    AppState.selectedQuestions.forEach((_, index) => {
        const questionName = `q${index}`;
        const userAnswer = document.querySelector(`input[name="${questionName}"]`).value.toLowerCase().trim();
        const correctAnswer = AppState.correctAnswers[questionName];
        
        const hintsUsed = AppState.usedHints[index] ? AppState.usedHints[index].length : 0;
        hintPenalty += hintsUsed * TEST_CONFIG.hintPenalty;
        
        if (userAnswer === correctAnswer) {
            score += Math.max(TEST_CONFIG.pointsPerQuestion - (hintsUsed * TEST_CONFIG.hintPenalty), 1);
        }
    });
    
    AppState.currentScore = Math.max(0, Math.round(score * 10) / 10);
    AppState.testCompleted = true;
    
    displayResults(hintPenalty);
    showSolutions(); // Добавлен вызов функции показа решений
    disableTestInteraction();
}

// Новая функция для отображения решений
function showSolutions() {
    AppState.selectedQuestions.forEach((question, index) => {
        const questionElement = document.querySelectorAll('.question')[index];
        const solutionElement = document.createElement('div');
        solutionElement.className = 'solution';
        solutionElement.innerHTML = `<strong>Решение:</strong><br>${question.solution.replace(/\n/g, '<br>')}`;
        questionElement.appendChild(solutionElement);
    });
}

// Отображение результатов
function displayResults(hintPenalty) {
    const resultElement = document.getElementById('testResult');
    const maxPossibleScore = AppState.selectedQuestions.length * TEST_CONFIG.pointsPerQuestion;
    
    let resultText = `Вы набрали ${AppState.currentScore} ${declinePoints(AppState.currentScore)} из ${maxPossibleScore} ${declinePoints(maxPossibleScore)}`;
    
    if (hintPenalty > 0) {
        resultText += `. Использовано подсказок: ${hintPenalty/TEST_CONFIG.hintPenalty} (штраф -${hintPenalty} ${declinePoints(hintPenalty)})`;
    }
    
    resultElement.textContent = resultText;
    resultElement.style.display = "block";
    applyResultStyle(resultElement, AppState.currentScore / maxPossibleScore);
}

// Склонение слова "балл"
function declinePoints(points) {
    points = Math.abs(points);
    const lastDigit = points % 10;
    const lastTwoDigits = points % 100;
    
    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) return 'баллов';
    if (lastDigit === 1) return 'балл';
    if (lastDigit >= 2 && lastDigit <= 4) return 'балла';
    return 'баллов';
}

// Применение стилей к результату
function applyResultStyle(element, percentage) {
    if (percentage >= 0.8) {
        element.style.backgroundColor = "#dff0d8";
        element.style.color = "#3c763d";
    } else if (percentage >= 0.5) {
        element.style.backgroundColor = "#fcf8e3";
        element.style.color = "#8a6d3b";
    } else {
        element.style.backgroundColor = "#f2dede";
        element.style.color = "#a94442";
    }
}

// Отключение взаимодействия после завершения 1а
function disableTestInteraction() {
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.disabled = true;
    submitBtn.textContent = "Тест завершен";
    submitBtn.classList.add('disabled');
    
    // Делаем все поля ввода только для чтения
    document.querySelectorAll('input[type="text"]').forEach(input => {
        input.readOnly = true;
    });
}

// Сброс кнопки отправки
function resetSubmitButton() {
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.disabled = false;
    submitBtn.textContent = "Проверить ответы";
    submitBtn.classList.remove('disabled');
}

// Обновление прогресс-бара
function updateProgressBar() {
    const answeredCount = Array.from(document.querySelectorAll('input[type="text"]'))
        .filter(input => input.value.trim() !== '').length;
    const progress = (answeredCount / AppState.selectedQuestions.length) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
}

// Перемешивание массива
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Выбор раздела
function selectSection(section) {
    if (AppState.testCompleted) return;
    
    AppState.currentSection = section;
    document.querySelectorAll('.section-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    generateTest();
}

// Настройка обработчиков событий
function setupEventListeners() {
    document.addEventListener('input', function(e) {
        if (e.target.matches('input[type="text"]')) {
            updateProgressBar();
        }
    });
}

// Запуск приложения при загрузке страницы
window.onload = initApp;