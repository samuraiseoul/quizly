function QuizlyTemplate(container){
  this.container = container;

  createLabel = function(question){
    return $(document.createElement('label')).append(question).append('<br>');
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
}

QuizlyTemplate.prototype.createSelect = function(question){
    var answer = question.answers.length ? question.answers.join(',') : question.answer;
    var $select = createSelectElement(answer, question.name);
    for(var j = 0; j < question.values.length; j++){
      var $option = createOption(question.values[j], question.values[j]);
      $select.append($option);
    }
    this.container.append(createLabel(question.question).append($select).append('<br>'));
}

QuizlyTemplate.prototype.createCheckboxOrRadio = function(question){
    var $questionLabel = $(document.createElement('span'))
      .text(question.question)
      .attr('data-answer', question.answers.length ? question.answers.join(',') : question.answer)
      .append('<br>');
    var $questionContainer = $(document.createElement('div')).attr('data-quiz-container', '').append($questionLabel);
    this.container.append($questionContainer);
    for(var j = 0; j < question.values.length; j++){
      var value = question.values[j];
      var val = typeof value === 'object' ? value.value : value;
      var $label = createLabel(typeof value === 'object' ? value.label : value);
      $questionContainer.append($label);
      var $input = $(document.createElement('input'))
        .attr('type', question.type)
        .attr('name', question.name)
        .val(val);
      $label.prepend($input);
    }
}

QuizlyTemplate.prototype.createInput = function(question){
    var $label = createLabel(question.question);
    this.container.append(createLabel(question.question).append(
      $(document.createElement('input'))
        .attr('data-answer', question.answer)
        .attr('type', question.type)
        .attr('name', question.name)
        .attr('placeholder', question.placeholder)
    ));
}
