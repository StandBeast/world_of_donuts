let question_field = document.querySelector('.question')
let answer_buttons = document.querySelectorAll('.ans')
let container_h3 = document.querySelector('.container_h3')
let start_btn = document.querySelector('.start-btn')
let container_start = document.querySelector('.start')
let container_main = document.querySelector('.main')


function randint(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

let signs = ['+','-','*','/']

function getRandomSign(){
    return signs[randint(0,3)]
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {  // Цикл проходиться по всіх елементах з кінця до початку
    let j = Math.floor(Math.random() * (i + 1));  // Вибираємо індекс рандомного елемента
    [array[i], array[j]] = [array[j], array[i]] // Міняємо місцями з поточним елементом.
  } 
}

class Question {
    constructor(question,answer1,answer2,correct,answer4,answer5){
        let a = randint(1,30)
        let b = randint(1,30)
        let sign = getRandomSign()
        this.question = `${a} ${sign} ${b}`
        if (sign == '+'){
            this.correct = a + b
        }
        else if (sign == '-'){
            this.correct = a - b
        }
        else if (sign == '*'){
            this.correct = a * b
        }
        else if (sign == '/'){
            this.correct = parseFloat((a / b).toFixed(3))
        }

        this.answers = [
            randint(this.correct-15,this.correct -1),
            randint(this.correct-15,this.correct -1),
            this.correct,
            randint(this.correct+1,this.correct+15),
            randint(this.correct+1,this.correct+15)
        ]   
        shuffle(this.answers)
    
    }
    display(){
        question_field.innerHTML = this.question
        for (let i = 0; i < this.answers.length; i+=1){
            answer_buttons[i].innerHTML = this.answers[i]
        }
    }
}

let correct_answer_given = 0
let total_answers_given = 0
let current_question = new Question()


start_btn.addEventListener('click',function(){
    container_start.style.display = "none"
    container_main.style.display = "flex"
    current_question.display()
    setTimeout(function(){
    container_start.style.display = "flex"
    container_main.style.display = "none"
container_h3.innerHTML = `Ви дали ${correct_answer_given} правильних відповідей із ${total_answers_given} 
Точність - ${Math.round(correct_answer_given * 100 / total_answers_given)}%`
}, 10000)
})

setTimeout(function(){
container_h3.innerHTML = `Ви дали ${correct_answer_given} правильних відповідей із ${total_answers_given} 
Точність - ${Math.round(correct_answer_given * 100 / total_answers_given)}%`
}, 10000)

for (let i=0; i<answer_buttons.length;i+=1){
    answer_buttons[i].addEventListener('click',function(){
        if (answer_buttons[i].innerHTML == current_question.correct){
            correct_answer_given += 1
            answer_buttons[i].style.background = '#63d90f'
            anime({
                targets: answer_buttons[i],
                background: '#1e1e1e',
                duration: 1000,
                delay: 100,
                easing:'linear'
            })
        }
        else{
            answer_buttons[i].style.background = '#d9160f'
            anime({
                targets: answer_buttons[i],
                background: '#1e1e1e',
                duration: 1000,
                delay: 100,
                easing:'linear'
            })
        }
        total_answers_given += 1
        current_question = new Question()
        current_question.display()
    })
}



