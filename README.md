# Quizly
A simple javascript attribute based quizing library

To initialize your quiz, simply instantiate a new Quizly object like so:

``` new Quizly('id'); ```

or

``` new Quizly(document.getElementById('id')); ```

*Note: To use a jQuery object simply pass it in like so: `new Quizly($('#id')[0]);`

---

If you plan to use Quizly with attribute based data it must be formated as follows.

For inputs that are not checkboxes, radios, or selects, you can do the following:

```
<label>Question?
	<span class="right" data-right>Marvelous</span>
	<span class="wrong" data-wrong>Wrong or place a hint here.</span>
    <input type="text" name="city" placeholder="Hold the line!" data-answer="questionAnswer"/><br>
</label>
```
*Note: some of the newer HTML5 inputs may not work as expected.

For selects, the format is:
```
<label>When was the USA founded?
    <span class="right" style="display: none;">Correct</span>
    <span class="wrong" style="display: none;">Incorrect</span><br>
    <select data-answer="1776" name="founded">
        <option value="1778">1778</option>
        <option value="1777">1777</option>
        <option value="1776">1776</option>
        <option value="2779">2779</option>
        <option value="1234">1234</option>
    </select><br>
</label>
```
*Note: multi-selects are not currently supported.

And for radio or checkbox inputs:
```
<div data-quiz-container>
      <span data-answer="[1,4]">Which of the following are mammals?</span>
      <span class="right" data-right>Wonderful!</span>
      <span class="wrong" data-wrong>Mammals have hair.</span><br>
      <label><input type="checkbox" name="mammal" value="1"/> Human</label><br>
      <label><input type="checkbox" name="mammal" value="2"/> Crow</label><br>
      <label><input type="checkbox" name="mammal" value="3"/> Goldfish</label><br>
      <label><input type="checkbox" name="mammal" value="4"/> Deer</label><br>
</div>
```

---

If you are loading quizes from a server and don't want to parse your data into html, you can simply pass it into quizly as a second parameter! `new Quizly('id', data);`    

The format for the data should be:
```
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
```

---
# Contributers
to compile, navigate to the src/ fodler and run:
 - tsc --output quizly.js
