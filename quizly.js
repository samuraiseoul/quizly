function Quizly(id, data){
    this.container = $('#' + id);
    var self = this;

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
      var answer = $input.parents('div[data-quiz-container]').length ? $input.parents('div[data-quiz-container]').find('span').attr('data-answer') : $input.attr('data-answer');
      var answers = answer.includes(',') ? answer.split(',') : [answer];

      var correct = true;
      for(var i =0; i < values.length; i++){
        if(answers.indexOf(values[i]) == -1){
          correct = false;
          break;
        }
      }
      console.log("Values: " + values);
      console.log("Answers: " + answers);
      console.log("Result: " + (correct && (values.length == answers.length)));
    };

    var createQuizHtml = function(container, data){
      for(var i = 0; i < data.length; i++){
        var question = data[i];
        if(question.type == "select") {
            var $label = $(document.createElement('label'));
            $label.append(question.question);
            $label.append('<br>');
            container.append($label);
            var $input = $(document.createElement('select'));
            $input.attr('data-answer', question.answers.length ? question.answers.join(',') : question.answer);
            $input.attr('name', question.name);
            for(var j = 0; j < question.values.length; j++){
              var $option = $(document.createElement('option'));
              $option.val(question.values[j]);
              $option.text(question.values[j]);
              $input.append($option);
            }
            $label.append($input);
            $label.append('<br>');
        } else {
            if(question.type == "radio" || question.type == "checkbox") {
              var $questionContainer = $(document.createElement('div'));
              $questionContainer.attr('data-quiz-container', '');
              var $questionLabel = $(document.createElement('span'));
              $questionLabel.text(question.question).append('<br>');
              $questionContainer.append($questionLabel);
              container.append($questionContainer);
              $questionLabel.attr('data-answer', question.answers.length ? question.answers.join(',') : question.answer);
              for(var j = 0; j < question.values.length; j++){
                var value = question.values[j];
                var val = typeof value === 'object' ? value.value : value;
                var label = typeof value === 'object' ? value.label : value;
                var $label = $(document.createElement('label'));
                $label.append(label);
                $questionContainer.append($label);
                var $input = $(document.createElement('input'));
                $input.attr('type', question.type);
                $input.attr('name', question.name);
                $input.val(val);
                $label.append($input);
                $label.append('<br>');
              }
            } else {
              var $label = $(document.createElement('label'));
              $label.append(question.question);
              $label.append('<br>');
              container.append($label);
              var $input = $(document.createElement('input'));
              $input.attr('data-answer', question.answer);
              $input.attr('type', question.type);
              $input.attr('name', question.name);
              $input.attr('placeholder', question.placeholder);
              $label.append($input);
              $label.append('<br>');
            }
        }
      }
    }

    if(data){
      createQuizHtml(this.container, data);
    }
    this.container.on('change', 'input, select', function(){handler($(this))});
}
