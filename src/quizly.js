function Quizly(id, data){
    this.container = $('#' + id);
    var self = this;
    var template = new QuizlyTemplate(this.container);

    var getValues = function($input, self){
      var typeAttr = $input.attr('type');
      var value = null;

      if(typeAttr && typeAttr.toLowerCase() == 'checkbox'){
        var checked = self.container.find('input[name='+$input.attr('name')+']:checked');
        var values = [];
        checked.each(function(){
          values.push($(this).val());
        });
        value = values;
      } else {
        value = $input.val();
      }
      return value instanceof Array ? value : [value];
    };

    var handler = function($input){
      var values = getValues($input, self);
      var $container = $input.parents('div[data-quiz-container]').length? $input.parents('div[data-quiz-container]') : $input.parent();
      var answer = $container.find('[data-answer]').attr('data-answer');
      var answers = answer.includes(',') ? answer.split(',') : [answer];

      var correct = true;
      for(var i =0; i < values.length; i++){
        if(answers.indexOf(values[i]) == -1){
          correct = false;
          break;
        }
      }
      $container.find('.right, .wrong').hide();
      if((correct && (values.length == answers.length))) {
        $container.find('.right').show();
      } else {
          $container.find('.wrong').show();
      }
    };

    var createQuizHtml = function(container, data){
      for(var i = 0; i < data.length; i++){
        var question = data[i];
        if(question.type == "select") {
          template.createSelect(question);
        } else {
            if(question.type == "radio" || question.type == "checkbox") {
              template.createCheckboxOrRadio(question);
            } else {
              template.createInput(question);
            }
        }
      }
    }

    if(data){
      createQuizHtml(this.container, data);
    }
    this.container.on('change', 'input, select', function(){handler($(this))})
    .find('.right, .wrong').hide();
}
