class Quizly{
    container: HTMLElement;
    template: QuizlyTemplater;

    constructor(id: string, data :Array<QuizlyQuestion>){
      this.container = document.getElementById(id);
      var that = this;
      this.template = new QuizlyTemplater(this.container);

      if(data){
        this.createQuizHtml(this.container, data);
      }
      [].forEach.call(this.container.querySelectorAll('input, select'), function(el){
        el.quizly = that;
        el.addEventListener('change', function(event: Event){
          var input = <HTMLInputElement>event.srcElement;
          that.handler(input, that);
        });
      });

      var resultSpans = this.container.querySelectorAll('.right, .wrong');
      for(var i = 0; i < resultSpans.length; i++){
        (<HTMLElement>resultSpans[i]).style.display = 'none';
      }
    }

    private getValues(input: HTMLInputElement, self: Quizly) :Array<string>{
      var typeAttr = input.getAttribute('type');
      var value = null;

      if(typeAttr && typeAttr.toLowerCase() == 'checkbox'){
        var checked = this.container.querySelectorAll('input[name=' + input.getAttribute('name') + ']:checked');
        var values = [];
        for(var i = 0; i < checked.length; i++){
          var check = <HTMLInputElement>checked[i];
          values.push(check.value);
        }
        value = values;
      } else {
        value = input.value;
      }
      return value instanceof Array ? value : [value];
    }

    private parseAnswer(answer :string) :Array<string>{
      answer = answer.replace(/\[|\]/g, '');
      var answers =  answer.split("(?<!\\\\),");
      for(var i = 0; i < answers.length; i++) {
        answers[i] = answers[i].replace('\\,', ',');
      }
      return answers;
    }

    private handler(input: HTMLInputElement, quizly: Quizly) :void{
      var values :Array<string>= quizly.getValues(input, quizly);
      var grandparent = <HTMLElement>input.parentNode.parentNode;
      var container = grandparent !== null && grandparent.hasAttribute('data-quiz-container') ? <HTMLElement>input.parentNode.parentNode : <HTMLElement>input.parentNode;
      var answers = quizly.parseAnswer(container.querySelector('[data-answer]').getAttribute('data-answer'));

      var correct = true;
      for(var i =0; i < values.length; i++){
        if(answers.indexOf(values[i]) == -1){
          correct = false;
          break;
        }
      }
      var resultSpans = container.querySelectorAll('.right, .wrong');
      for(var i = 0; i < resultSpans.length; i++){
        var resultSpan = <HTMLElement>resultSpans[i];
        resultSpan.style.display = 'none';
      }
      if((correct && (values.length == answers.length))) {
        var right = <HTMLElement>container.querySelector('.right');
        right.style.display = '';
      } else {
        var wrong = <HTMLElement>container.querySelector('.wrong');
        wrong.style.display = '';
      }
    };

    private createQuizHtml(container :HTMLElement, data :Array<QuizlyQuestion>) :void{
      for(var i = 0; i < data.length; i++){
        var question = data[i];
        if(question.type == "select") {
          this.template.createSelect(question);
        } else {
            if(question.type == "radio" || question.type == "checkbox") {
              this.template.createCheckboxOrRadio(question);
            } else {
              this.template.createInput(question);
            }
        }
      }
    }
}
