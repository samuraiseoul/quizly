class Quizly{
    container: HTMLElement;
    self;
    template: QuizlyTemplater;

    constructor(id: string, data){
      this.container = document.getElementById(id);
      this.self = this;
      var that = this;
      this.template = new QuizlyTemplater(this.container);

      if(data){
        this.createQuizHtml(this.container, data);
      }
      [].forEach.call(this.container.querySelectorAll('input, select'), function(el){
        el.quizly = that;
        el.addEventListener('change', that.handler);
      });

      var resultSpans = this.container.querySelectorAll('.right, .wrong');
      for(var i = 0; i < resultSpans.length; i++){
        (<HTMLElement>resultSpans[i]).style.display = 'none';
      }
    }

    private getValues(input, self){
      var typeAttr = input.getAttribute('type');
      var value = null;

      if(typeAttr && typeAttr.toLowerCase() == 'checkbox'){
        var checked = input.quizly.container.querySelectorAll('input[name=' + input.getAttribute('name') + ']:checked');
        var values = [];
        for(var i = 0; i < checked.length; i++){
          values.push(checked[i].value);
        }
        value = values;
      } else {
        value = input.value;
      }
      return value instanceof Array ? value : [value];
    }

    private handler(event){
      var input = event.srcElement;
      var values = input.quizly.getValues(input, self);
      var container = input.parentNode.parentNode !== null ? input.parentNode.parentNode : input.parentNode;
      var answer = container.querySelector('[data-answer]').getAttribute('data-answer');
      var answers = answer.includes(',') ? answer.split(',') : [answer];

      var correct = true;
      for(var i =0; i < values.length; i++){
        if(answers.indexOf(values[i]) == -1){
          correct = false;
          break;
        }
      }
      var resultSpans = container.querySelectorAll('.right, .wrong');
      for(var i = 0; i < resultSpans.length; i++){
        resultSpans[i].style.display = 'none';
      }
      if((correct && (values.length == answers.length))) {
        container.querySelector('.right').style.display = '';
      } else {
        container.querySelector('.wrong').style.display = '';
      }
    };

    private createQuizHtml(container, data){
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
