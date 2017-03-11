class Quizly{
  container: HTMLElement;
  template: QuizlyTemplater;

  constructor(target: HTMLElement, data? :Array<QuizlyQuestion>)
  constructor(target: any, data? :Array<QuizlyQuestion>){
    this.container = this.parseContainer(target);

    this.template = new QuizlyTemplater(this.container);
    if(data){
      this.createQuizHtml(this.container, data);
    }

    this.bindListener();
    this.hideResults();
  }

  private hideResults(){
    var resultSpans = this.container.querySelectorAll('.right, .wrong');
    for(var i = 0; i < resultSpans.length; i++){
      (<HTMLElement>resultSpans[i]).style.display = 'none';
    }
  }

  private bindListener(){
    var that = this;
    [].forEach.call(this.container.querySelectorAll('input, select'), function(el){
      //bind reference so it's available in the handler.
      //don't assign type check til after or typescript complains about the custom property
      el.quizly = that;
      el.addEventListener('change', function(event: Event){
        var input = <HTMLInputElement>event.srcElement;
        that.handler(input, that);
      });
    });
  }

  private parseContainer(target: any) :HTMLElement{
    if(typeof target === 'string'){
      var targetElement = document.getElementById(target);
      if(!targetElement) {
        throw "Invalid id, please check your spelling.";
      }
      return targetElement;
    } else if(target instanceof HTMLElement) {
      return target;
    } else {
      throw "First parameter passed into Quizly must be an element or element Id!";
    }
  }

  private getCheckboxValues(input: HTMLInputElement): Array<string>{
    var checked = this.container.querySelectorAll('input[name=' + input.getAttribute('name') + ']:checked');
    var values = [];
    for(var i = 0; i < checked.length; i++){
      var check = <HTMLInputElement>checked[i];
      values.push(check.value);
    }
    return values;
  }

  private getValues(input: HTMLInputElement, self: Quizly) :Array<string>{
    var typeAttr = input.getAttribute('type');
    var values: Array<string> = [];
    if(typeAttr && typeAttr.toLowerCase() == 'checkbox'){
      values = this.getCheckboxValues(input);
    } else {
      values = [input.value];
    }
    return values;
  }

  private parseAnswers(answer :string) :Array<string>{
    answer = answer.replace(/\[|\]/g, '');
    var answers =  answer.match(/([^\\\][^,]|\\,)+/g);
    for(var i = 0; i < answers.length; i++) {
      answers[i] = this.normalize(answers[i]);
    }
    return answers;
  }

  private normalize(text :string): string{
    return text.replace('\\,', ',').trim().replace(/^[0]+/g,"").toLowerCase()
  }

  private getInputContainer(input: HTMLInputElement): HTMLElement{
    var grandparent = <HTMLElement>input.parentNode.parentNode;
    return grandparent !== null && grandparent.hasAttribute('data-quiz-container') ? <HTMLElement>input.parentNode.parentNode : <HTMLElement>input.parentNode;
  }

  private checkAnswers(answers: Array<string>, values: Array<string>): boolean{
    var correct = true;
    for(var i =0; i < values.length; i++){
      if(answers.indexOf(this.normalize(values[i])) == -1){
        correct = false;
        break;
      }
    }
    return (correct && (values.length == answers.length));
  }

  private displayResults(container: HTMLElement, correct:boolean): void{
    var resultSpans = container.querySelectorAll('.right, .wrong');
    for(var i = 0; i < resultSpans.length; i++){
      var resultSpan = <HTMLElement>resultSpans[i];
      resultSpan.style.display = 'none';
    }
    if(correct) {
      var right = <HTMLElement>container.querySelector('.right');
      right.style.display = '';
    } else {
      var wrong = <HTMLElement>container.querySelector('.wrong');
      wrong.style.display = '';
    }
  }

  private handler(input: HTMLInputElement, quizly: Quizly) :void{
    var values :Array<string>= quizly.getValues(input, quizly);
    var container = quizly.getInputContainer(input);
    var answers = quizly.parseAnswers(container.querySelector('[data-answer]').getAttribute('data-answer'));

    var correct = quizly.checkAnswers(answers, values);
    quizly.displayResults(container, correct);
  };

  private createQuizHtml(container :HTMLElement, data :Array<QuizlyQuestion>) :void{
    for(var i = 0; i < data.length; i++){
      var question = data[i];
      if(question.type == "select") {
        this.template.createSelect(question);
      } else if(question.type == "radio" || question.type == "checkbox") {
            this.template.createCheckboxOrRadio(question);
      } else {
            this.template.createInput(question);
      }
    }
  }
}


/**
Example Data Structure for Quizly
[
  {
    name: "",
    type: "",
    answer: "",
    answers: [],
    value: "",
    values: [],
    placeholder: "",
    multiple: "",
    question: "",
    right: "",
    wrong: ""
  },
  {
    name: "",
    type: "checkbox", //or radio
    answer: "",
    answers: [],
    value: "",
    values: [
      {
        value: "",
        label: ""
      },
      {
        value: "",
        label: ""
      }
    ],
    placeholder: "",
    multiple: "",
    question: "",
    right: "",
    wrong: ""
  }
]
**/
