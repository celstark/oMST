// Notes for translators:
//  The <i>...</i> and <b>...</b> bits are for italics and bold
//  The <p> bit starts a new line or paragraph
//  Just overwrite the English bit

// How to handle non-US keyboards?
// zho: chinese
// cmn: mandarin
// yue: cantonese
// kor: korean

let all_prompts= {
  "eng": { 
    "lang": "English", 
    "k_instr_choice": [" "],
    "b_instr_choice": ['OK'],
    "k_trial_text": '<i>Old</i> (<b>v</b>), <i>Similar</i> (<b>b</b>), or <i>New</i> (<b>n</b>)?',
    "k_trial_choices": ['v','b','n'],
    "b_trial_text": '<i>Old</i>, <i>Similar</i>, or <i>New</i>',
    "b_trial_choices": ['Old','Similar','New'],

    "k_prompt0": 'Press <i>spacebar</i> to begin',
    "b_prompt0": 'Press <i>OK</i> to begin',
    "text0": 'You are going to see pictures of everyday items, one at a time. For each one, you will select <b>Old</b> if you have seen this exact picture before, <b>Similar</b> if it is similar, but not exactly the same as one you saw \
      before, or <b>New</b> if it is entirely a new picture. <p>The way to think of <i>Similar</i> is whether it has the same name, but is a different picture in any way.  <p>A few practice trials should make this clear.',
    
    "k_prompt_new": 'You have not seen this image yet so you should select <b>New</b> here.',
    "b_prompt_new": 'You have not seen this image yet so you should select <i>New</i> (<b>n</b>) here.',
    "k_inc_new": "You haven't seen this image yet, so press <i>New</i> (<b>n</b>)",
    "b_inc_new": "You haven't seen this image yet, so press <b>New</b>",
    "cor_new": "Good! You have not seen this image yet, so you correctly selected <b>New</b>",

    "k_prompt_rep": 'You have already seen this item before, press <i>Old</i> (<b>v</b>). ',
    "b_prompt_rep": 'You have seen this image, so press <b>Old</b>',
    "k_inc_rep": "You have seen this exact image, so press <i>Old/i> (<b>v</b>)",
    "b_inc_rep": "You have seen this exact image, so press <b>Old</b>" ,
    "cor_rep": "Good! You have seen this exact image, so you correctly selected <b>Old</b> ",

    "k_prompt_lure": 'This item is similar to one you have seen before, but not exactly the same, so you should select <i>Similar</i> (<b>b</b>) here.',
    "b_prompt_lure": 'This item is similar to one you have seen before, but not exactly the same, so you should select <b>Similar</b> here.',
    "k_inc_lure": "You saw one <i>similar to this, but not exactly the same</i>, so press <i>Similar</i> (<b>b</b>)",
    "b_inc_lure": "You saw one <i>similar to this, but not exactly the same</i>. So, the correct response is <b>Similar</b>" ,
    "cor_lure": "Good! You have not seen this <i>exact</i> image, so you correctly selected <b>Similar</b>",

    "prompt_test": "Your turn. Have you seen this? ",
    "side_by_side": "As you can see, these items are similar, but not exactly the same. For this kind of image, you should select <b>Similar</b> to indicate that you saw something similar to this but have not seen that exact item before during this session.",
    "end": "That's the idea. Now, we'll do the actual test <p><i>As you do the actual task, if the picture disappears before you respond, don't worry. Just make your response even if the screen is blank.</i>"
    },

  "kor": {
    "lang": "Korean", 
    "k_instr_choice": [" "],
    "b_instr_choice": ['OK'],
    "k_trial_text": '<i>앞서</i> (<b>v</b>), <i>Similar</i> (<b>b</b>), or <i>New</i> (<b>n</b>)?',
    "k_trial_choices": ['v','b','n'],
    "b_trial_text": '<i>앞서/i>, <i>Similar</i>, or <i>New</i>',
    "b_trial_choices": ['앞서','Similar','New'],

    "k_prompt0": '<p>시작하려면 스페이스바를 누르세요.</p>',
    "b_prompt0": '<p>시작하려면 확인을 누르세요.</p>',
    "text0": '한 번에 하나씩 일상 용품의 사진을 보게 될 것입니다. 각각에 대해 이전에 이 정확한 사진을 본 적이 있는 경우 "이전"을 선택하고, \
    유사하지만 이전에 본 것과 정확히 동일하지 않은 경우 "유사한"을, 완전히 새로운 사진인 경우 "신규"를 선택합니다. 비슷한 를 생각하는 방식은 이름은 같지만 어떤 식으로든 다른 그림입니다. 몇 가지 연습 시도를 통해 이를 명확히 알 수 있습니다.',

    "k_prompt_new": 'You have not seen this image yet so you should select <b>New</b> here.',
    "b_prompt_new": 'You have not seen this image yet so you should select <i>New</i> (<b>n</b>) here.',
    "k_inc_new": "You haven't seen this image yet, so press <i>New</i> (<b>n</b>)",
    "b_inc_new": "You haven't seen this image yet, so press <b>New</b>",
    "cor_new": "Good! You have not seen this image yet, so you correctly selected <b>New</b>",

    "k_prompt_rep": 'You have already seen this item before, press <i>Old</i> (<b>v</b>). ',
    "b_prompt_rep": 'You have seen this image, so press <b>Old</b>',
    "k_inc_rep": "You have seen this exact image, so press <i>Old/i> (<b>v</b>)",
    "b_inc_rep": "You have seen this exact image, so press <b>Old</b>" ,
    "cor_rep": "Good! You have seen this exact image, so you correctly selected <b>Old</b> ",

    "k_prompt_lure": '<p>This item is similar to one you have seen before, but not exactly the same, so you should select <i>Similar</i> (<b>b</b>) here. </p>',
    "b_prompt_lure": '<p>This item is similar to one you have seen before, but not exactly the same, so you should select <b>Similar</b> here. </p>',
    "k_inc_lure": "<p> You saw one <i>similar to this, but not exactly the same</i>, so press <i>Similar</i> (<b>b</b>)</p>",
    "b_inc_lure": "<p> You saw one <i>similar to this, but not exactly the same</i>. So, the correct response is <b>Similar</b></p>" ,
    "cor_lure": "Good! You have not seen this <i>exact</i> image, so you correctly selected <b>Similar</b></p> ",

    "prompt_test": "Your turn. Have you seen this? ",
    "side_by_side": "As you can see, these items are similar, but not exactly the same. For this kind of image, you should select <b>Similar</b> to indicate that you saw something similar to this but have not seen that exact item before during this session.",
    "end": "That's the idea. Now, we'll do the actual test <p><i>As you do the actual task, if the picture disappears before you respond, don't worry. Just make your response even if the screen is blank.</i>"
    }



};