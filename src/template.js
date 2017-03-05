function QuizlyTemplate(container){
  this.container = container;

  createLabel = function(question, includeRightWrong, right, wrong){
    return $(document.createElement('label'))
    .append(question)
    .append(includeRightWrong ? createRightWrong(right, wrong) : '')
    .append('<br>');
  }
  createSelectElement = function(answer, name){
    return $(document.createElement('select'))
      .attr('data-answer', answer)
      .attr('name', name);
  }
  createOption = function(value, text){
    return $(document.createElement('option'))
      .val(value)
      .text(text);
  }
  createQuestionContainer = function(text, answer, right, wrong){
    return $(document.createElement('div')).attr('data-quiz-container', '').append(
      $(document.createElement('span'))
        .text(text)
        .attr('data-answer', answer)
    )
    .append(createRightWrong(right, wrong))
    .append('<br>');
  }
  createInput = function(type, name){
    return $(document.createElement('input'))
      .attr('type', type)
      .attr('name', name);
  }
  createRightWrong = function(right, wrong){
    return [
      $(document.createElement('span'))
      .text(right ? right : "Correct").addClass('right'),
      $(document.createElement('span'))
        .text(wrong ? wrong : "Incorrect").addClass('wrong')
      ];
  }
}

QuizlyTemplate.prototype.createSelect = function(question){
    var answer = question.answers.length ? question.answers.join(',') : question.answer;
    var $select = createSelectElement(answer, question.name);
    for(var j = 0; j < question.values.length; j++){
      var $option = createOption(question.values[j], question.values[j]);
      $select.append($option);
    }
    this.container.append(createLabel(question.question, true, question.right, question.wrong)
    .append($select)
    .append('<br>'));
}

QuizlyTemplate.prototype.createCheckboxOrRadio = function(question){
    var $questionContainer = createQuestionContainer(question.question, question.answers.length ? question.answers.join(',') : question.answer, question.right, question.wrong);
    this.container.append($questionContainer);
    for(var j = 0; j < question.values.length; j++){
      var value = question.values[j];
      var $label = createLabel(typeof value === 'object' ? value.label : value)
        .prepend(createInput(question.type, question.name).val(typeof value === 'object' ? value.value : value));
      $questionContainer.append($label);
    }
}

QuizlyTemplate.prototype.createInput = function(question){
    this.container.append(createLabel(question.question, true, question.right, question.wrong).append(
      createInput(question.type, question.name)
        .attr('data-answer', question.answer)
        .attr('placeholder', question.placeholder)
    ));
}
