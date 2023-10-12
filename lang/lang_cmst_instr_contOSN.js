// Notes for translators:
//  The <i>...</i> and <b>...</b> bits are for italics and bold
//  The <p> bit starts a new line or paragraph
//  Just overwrite the English bit

// How to handle non-US keyboards?
// zho: chinese
// cmn: mandarin
// yue: cantonese
// kor: korean
// spa: spanish
// mar: marathi
// hin: hindi

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
    
    "b_prompt_new": 'You have not seen this image yet so you should select <b>New</b> here.',
    "k_prompt_new": 'You have not seen this image yet so you should select <i>New</i> (<b>n</b>) here.',
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
    "span": { 
      "lang": "Español", 
      "k_instr_choice": [" "],
      "b_instr_choice": ['OK'],
      "k_trial_text": '<i>Viejo</i> (<b>v</b>), <i>Simila</i> (<b>b</b>), or <i>Nuevo</i> (<b>n</b>)?',
      "k_trial_choices": ['v','b','n'],
      "b_trial_text": '<i>Viejo</i>, <i>Similar</i>, or <i>Nuevo</i>',
      "b_trial_choices": ['Viejo','Similar','Nuevo'],
  
      "k_prompt0": 'Presione <i>la barra espaciadora</i> para comenzar',
      "b_prompt0": 'Presione <i>OK</i> para comenzar',
      "text0": 'Verá imágenes de artículos cotidianos, uno en uno. Para cada imágen, seleccionará <b>Viejo</b> si usted ha visto esta imágen exacta antes, <b>Similar</b> si es similar, pero no es exactamente idéntica a la imágen que vió \
        antes, o <b>Nuevo</b> si es una nueva imágen totalmente. <p> La manera de pensar en <i>Similar</i> es si el artículo tiene el mismo nombre, pero es una imágen differente de algún modo. <p> Unas pruebas de práctica deberían aclarar esto.',
      
      "b_prompt_new": 'Todavía no ha visto esta imágen, así que debería seleccionar <b>Nuevo</b> aquí.', // I think these are switched
      "k_prompt_new": 'Todavía no ha visto esta imágen, así que debería seleccionar <i>Nuevo</i> (<b>n</b>) aquí.', //I think these are switched
      "k_inc_new": "Todavía no ha visto esta imágen, así que presione <i>Nuevo</i> (<b>n</b>)",
      "b_inc_new": "Todavía no ha visto esta imágen, así que presione <b>Nuevo</b>",
      "cor_new": "Bueno! Todavía no ha visto esta imágen, así que ha seleccionado correctamente <b>Nuevo</b>",
  
      "k_prompt_rep": 'Usted ya ha visto esto artículo antes, presione <i>Viejo</i> (<b>v</b>). ',
      "b_prompt_rep": 'Usted ya ha visto esto artículo antes, presione <b>Viejo</b>',
      "k_inc_rep": "Usted ya ha visto esta imágen exacta, así que presione <i>Viejo/i> (<b>v</b>)",
      "b_inc_rep": "Usted ya ha visto esta imágen exacta, así que presione <b>Viejo</b>" ,
      "cor_rep": "Bueno! Usted ya ha visto esta imágen exacta, así que ha seleccionado correctamente <b>Viejo</b> ",
  
      "k_prompt_lure": 'Esto artículo es similar a uno que ya ha visto antes, pero no es exactamente idéntico, así que debería seleccionar <i>Similar</i> (<b>b</b>) aquí.',
      "b_prompt_lure": 'Esto artículo es similar a uno que ya ha visto antes, pero no es exactamente idéntico, así que debería seleccionar <b>Similar</b> aquí.',
      "k_inc_lure": "Usted ya ha visto uno que era <i>similar a esto, pero no era exactamente idéntico</i>, así que presione <i>Similar</i> (<b>b</b>)",
      "b_inc_lure": "Usted ya ha visto uno que era <i>similar a esto, pero no era exactamente idéntico</i>. Así que, la respuesta correcta es <b>Similar</b>" ,
      "cor_lure": "Bueno! No ha visto esto imágen <i>exactamente</i>, así que ha seleccionado correctamente <b>Similar</b>",
  
      "prompt_test": "Es su turno. Ya ha visto esto? ",
      "side_by_side": "Como puede ver, estos artículos son similares, pero no son exactamente idénticos. Para este tipo de imágen, debería seleccionar <b>Similar</b> para indicar que ha visto algo similar a esta imagén, pero no ha visto esta imagén exacta antes durante esta sesión.",
      "end": "Esta es la idea. Ahora, vamos a hacer la prueba real <p><i> Durante la tarea real, si la imágen desaparezca antes de responda, no se preocupe. Haz su respuesta incluso si la pantalla esté en blanco.</i>"
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

    "b_prompt_new": 'You have not seen this image yet so you should select <b>New</b> here.',
    "k_prompt_new": 'You have not seen this image yet so you should select <i>New</i> (<b>n</b>) here.',
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