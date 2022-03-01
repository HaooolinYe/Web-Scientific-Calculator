class Calculator {
    constructor(previousOperandTextElement,currentOperandTextElement,secondOperationButtons) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.secondOperationButtons = secondOperationButtons
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const pre = parseFloat(this.previousOperand)
        const cur = parseFloat(this.currentOperand)
        if (!isNaN(pre) && !isNaN(cur)) {
        switch (this.operation) {
            case '+':
                computation = pre + cur
                break
            case '-':
                computation = pre - cur
                break
            case '*':
                computation = pre * cur
                break
            case '÷':
                computation = pre / cur
                break
            default:
                return
        }
    }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    instantCompute(operation) {
        const cur = parseFloat(this.currentOperand)
        if (isNaN(cur)) return
        switch(operation) {
                case 'sin':
                    cur = Math.sin(cur)
                    break
                case 'cos':
                    cur = Math.cos(cur)
                    break
                case 'tan':
                    cur = Math.tan(cur)
                    break
                case '!':
                    const fac = function(n) {
                        let acc = 1
                        while (n > 1) {
                            acc *= n
                        }
                        return acc
                    }
                    cur = fac(cur)
                    break
                default:
                    return
        }
        this.currentOperand = cur
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
          integerDisplay = ''
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`
        } else {
          return integerDisplay
        }
      }

      updateDisplay() {
          this.currentOperandTextElement.innerText =
          this.getDisplayNumber(this.currentOperand)
          if (this.operation != null) {
            this.previousOperandTextElement.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
          } else {
          this.previousOperandTextElement.innerText = ''
          }
      }
      
    changeButton() {
        let sin = document.getElementById('sin')
        let cos = document.getElementById("cos")
        let tan = document.getElementById("tan")
        let ln = document.getElementById("ln")
        let log = document.getElementById("log")
        if (sin.innerHTML == 'sin') {
            sin.innerHTML = "sin<sup>-1</sup>"
        } else sin.innerHTML = 'sin'
        if (cos.innerHTML == "cos") {
            cos.innerHTML = "cos<sup>-1</sup>"
        } else cos.innerHTML = 'cos'
        if (tan.innerHTML == 'tan') {
            tan.innerHTML = 'tan<sup>-1</sup>'
        } else tan.innerHTML = 'tan'
        if (ln.innerHTML == 'ln') {
            ln.innerHTML = 'e<sup>x</sup>'
        } else ln.innerHTML = 'ln'
        if (log.innerHTML == 'log') {
            log.innerHTML = '10<sup>x</sup>'
        } else log.innerHTML = 'log'
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const secondOperationButtons = document.querySelectorAll('[data-2nd-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const secondButton = document.querySelector('[data-2nd]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')


const calculator = new Calculator(previousOperandTextElement,currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

secondOperationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.instantCompute(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click',() =>{
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click',() =>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click',() =>{
    calculator.delete()
    calculator.updateDisplay()
})

secondButton.addEventListener('click',() => {
    calculator.changeButton()
})