/**
 * Derived from jspsych-same-different by Josh de Leeuw
 *
 * plugin for showing two stimuli sequentially with a mask between them. Will either show the
 * same image the second time or show the other image the second time. Similar to a delayed
 * match to sample but doing it as a yes/no (same/different) and not forced choice
 *
 * 4/21/20: CELS - shows dim version of prompt during initial so that the test image will be in the same spot 
 * 5/26/20: CELS - same dim prompt shows up during the mask for the same reason
 *
 */

jsPsych.plugins['delay-yesno-match'] = (function() {

  var plugin = {};

  jsPsych.pluginAPI.registerPreload('delay-yesno-match', 'stimuli', 'image')

  plugin.info = {
    name: 'delay-yesno-match',
    description: '',
    parameters: {
      stimuli: {
        type: jsPsych.plugins.parameterType.IMAGE,
        pretty_name: 'Stimuli',
        default: undefined,
        array: true,
        description: 'The images to be displayed. First is the target and 2nd the potential foil'
      },
      stimulus_width: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus width',
        default: null,
        description: 'How wide is the image'
      },
      stimulus_height: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Stimulus height',
        default: null,
        description: 'How wide is the image'
      },
      answer: {
        type: jsPsych.plugins.parameterType.SELECT,
        pretty_name: 'Answer',
        options: ['same', 'different'],
        default: 75,
        description: 'Either "same" or "different". Controls the correct answer and which is shown second'
      },
      same_key: {
        type: jsPsych.plugins.parameterType.KEYCODE,
        pretty_name: 'Same key',
        default: 'Q',
        description: ''
      },
      different_key: {
        type: jsPsych.plugins.parameterType.KEYCODE,
        pretty_name: 'Different key',
        default: 'P',
        description: 'The key that subjects should press to indicate that the two stimuli are the same.'
      },
      first_stim_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'First stimulus duration',
        default: 1000,
        description: 'How long to show the first stimulus for in milliseconds.'
      },
      gap_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Gap duration',
        default: 500,
        description: 'How long to show the mask in between the two stimuli.'
      },
      second_stim_duration: {
        type: jsPsych.plugins.parameterType.INT,
        pretty_name: 'Second stimulus duration',
        default: 1000,
        description: 'How long to show the second stimulus for in milliseconds.'
      },
      prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Prompt',
        default: null,
        description: 'Any content here will be displayed below the stimulus.'
      }
    }
  }

  plugin.trial = function(display_element, trial) {
    var size_spec = '';
    if (trial.stimulus_height !== null) {
      size_spec += ' height='+trial.stimulus_height;
    }
    if (trial.stimulus_width !== null) {
      size_spec += ' width='+trial.stimulus_width;
    }

    //display_element.innerHTML = '<img class="jspsych-yesno-match-stimulus" src="'+trial.stimuli[0]+'"></img>';
    display_element.innerHTML = '<img class="jspsych-yesno-match-stimulus" src="'+trial.stimuli[0]+'" ' + size_spec + '></img>';

    // START added block
    //show prompt
    if (trial.prompt !== null) {
      display_element.innerHTML += '<font color=WhiteSmoke>' + trial.prompt +'</font>'
    }
    // END added block
    var first_stim_info;
    if (trial.first_stim_duration > 0) {
      jsPsych.pluginAPI.setTimeout(function() {
        showMaskScreen();
      }, trial.first_stim_duration);
    } else {
      function afterKeyboardResponse(info) {
        first_stim_info = info;
        showMaskScreen();
      }
      jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: afterKeyboardResponse,
        valid_responses: trial.advance_key,
        rt_method: 'performance',
        persist: false,
        allow_held_key: false
      });
    }

    function showMaskScreen() {
      display_element.innerHTML = '<img class="jspsych-yesno-match-stimulus" src="'+trial.stimuli[2]+'" ' +size_spec+ '></img>';
      // Start added block
      // var buttons = [];
      // buttons.push(trial.button_html);
      // buttons.push(trial.button_html);
      // var html = '<div id="jspsych-html-button-response-btngroup-sample">';
      // var label = trial.same_label.replace(/./g,'-');
      // var str = buttons[0].replace(/%choice%/g, label);
      // str=str.replace(/<button/,'<button disabled');
      // html += '<div class="jspsych-yesno-match-button-response-button" style="display: inline-block; margin:'+trial.margin_vertical+' '+trial.margin_horizontal+'" id="jspsych-yesno-match-button-response-button-sampleX' + 0 +'" data-choice="'+0+'">'+str+'</div>';
      // label = trial.different_label.replace(/./g,'-');
      // str = buttons[1].replace(/%choice%/g, label);
      // str=str.replace(/<button/,'<button disabled');
      // html += '<div class="jspsych-yesno-match-button-response-button" style="display: inline-block; margin:'+trial.margin_vertical+' '+trial.margin_horizontal+'" id="jspsych-yesno-match-button-response-button-sampleX' + 1 +'" data-choice="'+1+'">'+str+'</div>';
      // html += '</div>';

      //show prompt
      // if (trial.prompt !== null) {
      //   html += '<font color=WhiteSmoke>'
      //   html += trial.prompt;
      //   html += '</font>'
      // }
      // display_element.innerHTML += html;
      // END added block
      jsPsych.pluginAPI.setTimeout(function() {
        showSecondStim();
      }, trial.gap_duration);
    }

    function showSecondStim() {

      var html = '<img class="jspsych-yesno-match-stimulus" src="'+trial.stimuli[1]+'" ' +size_spec+ '></img>';
      if (trial.answer == 'same') {
        html = '<img class="jspsych-yesno-match-stimulus" src="'+trial.stimuli[0]+'" ' +size_spec+ '></img>';
      }
      //show prompt
      if (trial.prompt !== null) {
        html += trial.prompt;
      }

      display_element.innerHTML = html;

      if (trial.second_stim_duration > 0) {
        jsPsych.pluginAPI.setTimeout(function() {
          display_element.querySelector('.jspsych-yesno-match-stimulus').style.visibility = 'hidden';
        }, trial.second_stim_duration);
      }

      var after_response = function(info) {

        // kill any remaining setTimeout handlers
        jsPsych.pluginAPI.clearAllTimeouts();

        var correct = false;

        var skey = typeof trial.same_key == 'string' ? jsPsych.pluginAPI.convertKeyCharacterToKeyCode(trial.same_key) : trial.same_key;
        var dkey = typeof trial.different_key == 'string' ? jsPsych.pluginAPI.convertKeyCharacterToKeyCode(trial.different_key) : trial.different_key;

        if (info.key == skey && trial.answer == 'same') {
          correct = true;
        }

        if (info.key == dkey && trial.answer == 'different') {
          correct = true;
        }

        var trial_data = {
          "rt": info.rt,
          "answer": trial.answer,
          "correct": correct,
          "stimulus": JSON.stringify([trial.stimuli[0], trial.stimuli[1]]),
          "key_press": info.key
        };
        if (first_stim_info) {
          trial_data["rt_stim1"] = first_stim_info.rt;
          trial_data["key_press_stim1"] = first_stim_info.key;
        }

        display_element.innerHTML = '';

        jsPsych.finishTrial(trial_data);
      }

      jsPsych.pluginAPI.getKeyboardResponse({
        callback_function: after_response,
        valid_responses: [trial.same_key, trial.different_key],
        rt_method: 'performance',
        persist: false,
        allow_held_key: false
      });

    }

  };

  return plugin;
})();
