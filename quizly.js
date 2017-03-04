function Quizly(id){
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
      var answer = $input.attr('data-answer');
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

      // console.log($input.attr('name'));
      // if(String(value) == answer){
      //   console.log("Correct!");
      // } else {
      //   console.log("Wrong!")
      // }
    };

    this.container.on('change', 'input, select', function(){handler($(this))});
}
