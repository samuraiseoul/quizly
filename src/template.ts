class QuizlyTemplater {
  container: HTMLElement;
  constructor(container: HTMLElement){
    this.container = container;
  }
  private createLabel(question: string, includeRightWrong? :boolean, right? :string, wrong? :string) {
        var label = document.createElement('label');
        label.textContent = question;
        if(includeRightWrong){
          var rightAndWrong = this.createRightWrong(right, wrong);
          for(var i = 0; i < rightAndWrong.length; i++) {
            label.appendChild(rightAndWrong[i]);
          }
        }
        var br = document.createElement('br');
        label.appendChild(br);
        return label;
  }
  private createSelectElement(answer: string, name: string) {
      var select = document.createElement('select');
      select.setAttribute('data-answer', answer);
      select.setAttribute('name', name);
      return select;
  }
  private createOption(value: string, text: string) {
      var option= document.createElement('option');
      option.value = value;
      option.textContent = text;
      return option;
  }
  private createQuestionContainer(text: string, answer: string, right: string, wrong: string) {
      var div = document.createElement('div')
      div.setAttribute('data-quiz-container', '');
      var span = document.createElement('span');
      span.textContent = text;
      span.setAttribute('data-answer', answer);
      var rightAndWrong = this.createRightWrong(right, wrong);
      for(var i = 0; i < rightAndWrong.length; i++) {
        span.appendChild(rightAndWrong[i]);
      }
      div.appendChild(span);
      div.appendChild(document.createElement('br'));
      return div;
  }
  private createInputElement(type :string, name :string) {
      var input = document.createElement('input');
      input.setAttribute('type', type);
      input.setAttribute('name', name);
      return input;
  }
  private createRightWrong(rightText: string, wrongText :string) {
    var right: Element = document.createElement('span');
    right.textContent = rightText ? rightText : "Correct";
    right.classList.add('right');
    var wrong: Element = document.createElement('span');
    wrong.textContent = wrongText ? wrongText : "Incorrect"
    wrong.classList.add('wrong');
    return [right, wrong];
  }


  public createSelect(question :QuizlyQuestion) {
      var answer = question.answers.length ? question.answers.join(',') : question.answer;
      var select = this.createSelectElement(answer, question.name);
      for (var j = 0; j < question.values.length; j++) {
          var option = this.createOption(question.values[j], question.values[j]);
          select.appendChild(option);
      }
      var label = this.createLabel(question.question, true, question.right, question.wrong);
      label.appendChild(select);
      label.appendChild(document.createElement('br'));
      this.container.appendChild(label);
  }
  public createCheckboxOrRadio(question :QuizlyQuestion) {
      var questionContainer = this.createQuestionContainer(question.question, question.answers.length ? question.answers.join(',') : question.answer, question.right, question.wrong);
      this.container.appendChild(questionContainer);
      for (var j = 0; j < question.values.length; j++) {
          var value = question.values[j];
          var label = this.createLabel(typeof value === 'object' ? value.label : value);
          var input = this.createInputElement(question.type, question.name);
          input.value = typeof value === 'object' ? value.value : value;
          label.insertBefore(input, label.firstChild);
          questionContainer.appendChild(label);
      }
  }
  public createInput(question :QuizlyQuestion) {
    var label = this.createLabel(question.question, true, question.right, question.wrong);
    var input = this.createInputElement(question.type, question.name);
    input.setAttribute('data-answer', question.answer);
    input.setAttribute('placeholder', question.placeholder);
    label.appendChild(input)
    this.container.appendChild(label);
  }
}
