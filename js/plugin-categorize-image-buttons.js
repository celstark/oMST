var jsPsychCategorizeImageButtons = (function (jspsych) {
  'use strict';

  const info = {
      name: "categorize-image-buttons",
      parameters: {
          /** The image content to be displayed. */
          stimulus: {
              type: jspsych.ParameterType.IMAGE,
              pretty_name: "Stimulus",
              default: undefined,
          },
          /** The button to indicate the correct response. */
          button_answer: {
              type: jspsych.ParameterType.INT,
              pretty_name: "Button answer",
              default: undefined,
          },
          /** Array containing the button labels the subject is allowed to press to respond to the stimulus. */
          choices: {
              type: jspsych.ParameterType.STRING,
              pretty_name: "Choices",
              default: undefined,
              array: true,
          },
          /** Label that is associated with the correct answer. */
          text_answer: {
              type: jspsych.ParameterType.HTML_STRING,
              pretty_name: "Text answer",
              default: null,
          },
          /** String to show when correct answer is given. */
          correct_text: {
              type: jspsych.ParameterType.HTML_STRING,
              pretty_name: "Correct text",
              default: "<p class='feedback'>Correct</p>",
          },
          /** String to show when incorrect answer is given. */
          incorrect_text: {
              type: jspsych.ParameterType.HTML_STRING,
              pretty_name: "Incorrect text",
              default: "<p class='feedback'>Wrong</p>",
          },
          /** The HTML for creating button. Can create own style. Use the "%choice%" string to indicate where the label from the choices parameter should be inserted. */
          button_html: {
            type: jspsych.ParameterType.HTML_STRING,
            pretty_name: "Button HTML",
            default: '<button class="jspsych-btn">%choice%</button>',
            array: true,
          },
          /** Any content here will be displayed below the stimulus. */
          prompt: {
              type: jspsych.ParameterType.HTML_STRING,
              pretty_name: "Prompt",
              default: null,
          },
          /** If set to true, then the subject must press the correct response key after feedback in order to advance to next trial. */
          force_correct_button_press: {
              type: jspsych.ParameterType.BOOL,
              pretty_name: "Force correct button press",
              default: false,
          },
          /** Whether or not the stimulus should be shown on the feedback screen. */
          show_stim_with_feedback: {
              type: jspsych.ParameterType.BOOL,
              default: true,
              no_function: false,
          },
          /** If true, stimulus will be shown during feedback. If false, only the text feedback will be displayed during feedback. */
          show_feedback_on_timeout: {
              type: jspsych.ParameterType.BOOL,
              pretty_name: "Show feedback on timeout",
              default: false,
          },
          /** The message displayed on a timeout non-response. */
          timeout_message: {
              type: jspsych.ParameterType.HTML_STRING,
              pretty_name: "Timeout message",
              default: "<p>Please respond faster.</p>",
          },
          /** How long to show the stimulus. */
          stimulus_duration: {
              type: jspsych.ParameterType.INT,
              pretty_name: "Stimulus duration",
              default: null,
          },
          /** How long to show the trial. */
          trial_duration: {
              type: jspsych.ParameterType.INT,
              pretty_name: "Trial duration",
              default: null,
          },
          /** How long to show the feedback. */
          feedback_duration: {
              type: jspsych.ParameterType.INT,
              pretty_name: "Feedback duration",
              default: 2000,
          },
          /** The vertical margin of the button. */
          margin_vertical: {
            type: jspsych.ParameterType.STRING,
            pretty_name: "Margin vertical",
            default: "0px",
          },
          /** The horizontal margin of the button. */
          margin_horizontal: {
            type: jspsych.ParameterType.STRING,
            pretty_name: "Margin horizontal",
            default: "8px",
          },
      },
  };
  /**
   * **categorize-image**
   *
   * jsPsych plugin for image categorization trials with feedback using button responses
   *
   * @author Josh de Leeuw and Craig Stark
   * @see {@link https://www.jspsych.org/plugins/jspsych-categorize-image/ categorize-image plugin documentation on jspsych.org}
   */
  class CategorizeImageButtonsPlugin {
      constructor(jsPsych) {
          this.jsPsych = jsPsych;
      }
      trial(display_element, trial) {
        var html = '<img id="jspsych-categorize-image-buttons-stimulus" class="jspsych-categorize-image-buttons-stimulus" src="' +
                trial.stimulus +
                '"></img>';
        // hide image after time if the timing parameter is set
        if (trial.stimulus_duration !== null) {
            this.jsPsych.pluginAPI.setTimeout(() => {
                display_element.querySelector("#jspsych-categorize-image-buttons-stimulus").style.visibility = "hidden";
            }, trial.stimulus_duration);
        }
        var buttons = [];
        if (Array.isArray(trial.button_html)) {
            if (trial.button_html.length == trial.choices.length) {
                buttons = trial.button_html;
            }
            else {
                console.error("Error in categorize-image-buttons-response plugin. The length of the button_html array does not equal the length of the choices array");
            }
        }
        else {
            for (var i = 0; i < trial.choices.length; i++) {
                buttons.push(trial.button_html);
            }
        }
        html += '<div id="jspsych-categorize-image-buttons-response-btngroup">';
        for (var i = 0; i < trial.choices.length; i++) {
            var str = buttons[i].replace(/%choice%/g, trial.choices[i]);
            html +=
                '<div class="jspsych-categorize-image-buttons-response-button" style="display: inline-block; margin:' +
                    trial.margin_vertical +
                    " " +
                    trial.margin_horizontal +
                    '" id="jspsych-categorize-image-buttons-response-button-' +
                    i +
                    '" data-choice="' +
                    i +
                    '">' +
                    str +
                    "</div>";
        }
        html += "</div>";       
        display_element.innerHTML = html;

        // if prompt is set, show prompt
        if (trial.prompt !== null) {
            display_element.innerHTML += trial.prompt;
        }
        var trial_data = {};
        // start timing
        var start_time = performance.now();
        for (var i = 0; i < trial.choices.length; i++) {
            display_element
                .querySelector("#jspsych-categorize-image-buttons-response-button-" + i)
                .addEventListener("click", (e) => {
                var btn_el = e.currentTarget;
                var choice = btn_el.getAttribute("data-choice"); // don't use dataset for jsdom compatibility
                after_response(choice);
            });
        }
        // store response
        var response = {
            rt: null,
            button: null,
        };
        // function to end trial when it is time
        const end_trial = () => {
            //console.log('et0');
            // kill any remaining setTimeout handlers
            this.jsPsych.pluginAPI.clearAllTimeouts();
            // gather the data to store for the trial
            //var trial_data = {
            //   rt: response.rt,
            //    stimulus: trial.stimulus,
            //    response: response.button,
            //};
            // clear the display
            display_element.innerHTML = "";
            // move on to the next trial
            //console.log('et1');
            this.jsPsych.finishTrial(trial_data);
            //console.log('et2');
        };

        const stopTimers = () => {
            this.jsPsych.pluginAPI.clearAllTimeouts();
        }
        
        // function to handle responses by the subject
        function after_response(choice) {
            // measure rt
            var end_time = performance.now();
            var rt = Math.round(end_time - start_time);
            response.button = parseInt(choice);
            response.rt = rt;
            // kill any remaining setTimeout handlers
            //this.jsPsych.pluginAPI.clearAllTimeouts();
            stopTimers();
            // after a valid response, the stimulus will have the CSS class 'responded'
            // which can be used to provide visual feedback that a response was recorded
            //display_element.querySelector("#jspsych-categorize-image-buttons-response-stimulus").className +=
            //    " responded";
            // disable all the buttons after a response
            var btns = document.querySelectorAll(".jspsych-categorize-image-buttons-response-button button");
            for (var i = 0; i < btns.length; i++) {
                //console.log('ar - disabling button '+i);
                //btns[i].removeEventListener('click');
                btns[i].setAttribute("disabled", "disabled");
            }
            //if (trial.response_ends_trial) {
            //    end_trial();
            //}
            var correct=false;
            if (response.button == trial.button_answer) {correct = true; }
            // save data
            trial_data = {
                rt: response.rt,
                correct: correct,
                stimulus: trial.stimulus,
                response: response.button,
            };
            display_element.innerHTML = "";
            var timeout = choice == null;
            //console.log('after_response - correct:' + trial_data.correct + " rt: "+ trial_data.rt + " response: " + trial_data.response + " timeout:" + timeout);
            doFeedback(correct, timeout);
            //console.log('after_response - doFeedback returned');
        }
        // hide image if timing is set
        if (trial.stimulus_duration !== null) {
            this.jsPsych.pluginAPI.setTimeout(() => {
                display_element.querySelector("#jspsych-categorize-image-buttons-response-stimulus").style.visibility = "hidden";
            }, trial.stimulus_duration);
        }
        // end trial if time limit is set
        if (trial.trial_duration !== null) {
            this.jsPsych.pluginAPI.setTimeout(() => {
                after_response(null);
            }, trial.trial_duration);
        }
        else if (trial.response_ends_trial === false) {
            console.warn("The experiment may be deadlocked. Try setting a trial duration or set response_ends_trial to true.");
        }

        const doFeedback = (correct, timeout) => {
            //console.log('dFB0 ',correct,timeout,trial.show_feedback_on_timeout);
            // substitute answer in feedback string.
            var atext = "";
            if (timeout && !trial.show_feedback_on_timeout) {
                //console.log('dFB1');
                display_element.innerHTML += trial.timeout_message;
            }
            else {
                //console.log('dFB2');
                // show image during feedback if flag is set
                if (trial.show_stim_with_feedback) {
                    display_element.innerHTML =
                        '<img id="jspsych-categorize-image-buttons-stimulus" class="jspsych-categorize-image-buttons-stimulus" src="' +
                            trial.stimulus +
                            '"></img>';
                }
                
                if (correct) {
                    atext = trial.correct_text.replace("%ANS%", trial.text_answer);
                }
                else {
                    atext = trial.incorrect_text.replace("%ANS%", trial.text_answer);
                }
                
            }


            // Recreate the buttons - do this always so that the spacing remains constant
            // We'll only have a listener if we're forcing the right button.
            var buttons = [];
            if (Array.isArray(trial.button_html)) {
                buttons = trial.button_html;
            }
            else {
                for (var i = 0; i < trial.choices.length; i++) {
                    buttons.push(trial.button_html);
                }
            }
            display_element.innerHTML += '<div id="jspsych-categorize-image-buttons-response-btngroup">';
            for (var i = 0; i < trial.choices.length; i++) {
                var str = buttons[i].replace(/%choice%/g, trial.choices[i]);
                display_element.innerHTML +=
                    '<div class="jspsych-categorize-image-buttons-response-button" style="display: inline-block; margin:' +
                        trial.margin_vertical +
                        " " +
                        trial.margin_horizontal +
                        '" id="jspsych-categorize-image-buttons-response-button-' +
                        i +
                        '" data-choice="' +
                        i +
                        '">' +
                        str +
                        "</div>";
            }
            // show the feedback
            display_element.innerHTML += atext;

            // check if force correct button press is set
            if (trial.force_correct_button_press &&
                correct === false &&
                ((timeout && trial.show_feedback_on_timeout) || !timeout)) {
                // Add our listener to force the correct answer
                display_element.querySelector('#jspsych-categorize-image-buttons-response-button-' + trial.button_answer).addEventListener('click',function(e){
                    end_trial();
                });
            }
            else {
                //console.log('dFB4');
                this.jsPsych.pluginAPI.setTimeout(end_trial, trial.feedback_duration);
            }
        };
      }
      
  }
  CategorizeImageButtonsPlugin.info = info;

  return CategorizeImageButtonsPlugin;

})(jsPsychModule);
