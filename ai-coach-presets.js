(() => {
  const PRESET_ANSWERS = [
    { triggers: ['plan', 'program', 'azi', 'invăț', 'invat', 'studiu', 'orar'], answer: `Îți recomand un plan scurt și realist:\n\n1. 25 min: o lecție nouă sau recapitulare la materia principală.\n2. 5 min: pauză fără telefon.\n3. 20 min: 8-10 întrebări de quiz.\n4. 10 min: notează 3 greșeli și corectează-le.\n\nDacă ai puțin timp, fă doar un Pomodoro de 25 min și un mini-quiz.` },
    { triggers: ['greșeli', 'greseli', 'gresit', 'quiz', 'întrebări', 'intrebari', 'test'], answer: `Folosește regula 3 pași:\n\n1. Scrie pe scurt de ce răspunsul tău a fost greșit.\n2. Repetă teoria exactă din spatele întrebării.\n3. Refă întrebarea după 24 de ore.\n\nDacă greșești aceeași idee de 2 ori, transform-o într-o fișă rapidă.` },
    { triggers: ['eseu', 'română', 'romana', 'comentariu', 'argumentare', 'operă', 'opera'], answer: `Structură sigură pentru eseu la română:\n\n1. Introducere: autor, operă, curent/perioadă.\n2. Încadrare: 2 trăsături ale curentului sau speciei.\n3. Temă: formulare clară + 2 scene/secvențe relevante.\n4. Elemente de construcție: titlu, conflict, perspectivă, personaje, limbaj.\n5. Concluzie: reia ideea centrală, fără informații noi.\n\nÎnainte de examen, memorează scheme, nu eseuri întregi.` },
    { triggers: ['subiectul i', 'subiect i', 'text la prima vedere', 'text argumentativ'], answer: `Pentru Subiectul I la română:\n\n1. Citește cerința înainte de text, ca să știi ce cauți.\n2. Răspunde strict la întrebare, nu povesti textul.\n3. La argumentativ: opinie clară + 2 argumente + exemple + concluzie.\n4. Verifică exprimarea, acordurile și punctuația.\n\nFolosește formulări simple și clare. Punctele se pierd des pe neatenție, nu pe idei.` },
    { triggers: ['istorie', 'constitutie', 'constituție', 'secolul xx', 'stat român', 'stat roman', 'comunism', 'democratie', 'democrație'], answer: `La istorie, răspunsul bun are 3 ingrediente:\n\n1. Data/perioada: an, secol sau regim politic.\n2. Cauză → fapt istoric → consecință.\n3. Termeni istorici clari: autonomie, constituție, reformă, totalitarism, democrație.\n\nPentru eseu, fă un schelet înainte: introducere, 2-3 idei cronologice, concluzie. Nu amesteca perioadele.` },
    { triggers: ['geografie', 'relief', 'clima', 'climă', 'harta', 'hartă', 'râu', 'rau', 'carpati', 'carpați'], answer: `La geografie, gândește pe hartă:\n\n1. Localizare: unde este elementul?\n2. Caracteristică: relief, climă, ape, resurse sau populație.\n3. Explicație: de ce apare acolo?\n4. Exemplu concret: unitate de relief, oraș, râu, stat sau regiune.\n\nLa exercițiile cu hartă, verifică legenda și punctele cardinale înainte să răspunzi.` },
    { triggers: ['matematică', 'matematica', 'mate', 'funcție', 'functie', 'derivata', 'derivată', 'integrala', 'integrală', 'ecuație', 'ecuatie'], answer: `Pentru matematică, lucrează metodic:\n\n1. Scrie datele problemei și ce se cere.\n2. Alege formula/metoda potrivită.\n3. Rezolvă pe pași mici, fără să sari calcule.\n4. Verifică semnele, domeniul și condițiile de existență.\n\nLa funcții: domeniu → derivată → semn → tabel de variație → concluzie.` },
    { triggers: ['biologie', 'celula', 'celulă', 'genetica', 'genetică', 'sistem nervos', 'digestiv', 'respirator', 'circulator'], answer: `La biologie, învață prin scheme:\n\n1. Definește termenul-cheie.\n2. Notează structura sau componentele.\n3. Leagă structura de funcție.\n4. Adaugă un exemplu sau o consecință.\n\nPentru genetică, scrie întotdeauna genotipurile, gameții și combinațiile posibile. Nu calcula direct din memorie.` },
    { triggers: ['chimie', 'reactie', 'reacție', 'mol', 'concentrație', 'concentratie', 'ph', 'oxidare', 'reducere'], answer: `La chimie, începe cu organizarea datelor:\n\n1. Scrie reacția și echilibreaz-o.\n2. Transformă datele în moli, dacă este cazul.\n3. Folosește raportul stoichiometric din ecuație.\n4. Revino la unitatea cerută: grame, litri, concentrație sau pH.\n\nLa redox, separă oxidarea de reducere și verifică electronii.` },
    { triggers: ['fizică', 'fizica', 'mecanica', 'electricitate', 'optica', 'termica', 'forță', 'forta', 'energie'], answer: `La fizică, rezolvarea bună are pași clari:\n\n1. Notează mărimile cunoscute și unitățile.\n2. Transformă totul în SI.\n3. Alege formula potrivită.\n4. Înlocuiește numeric și verifică unitatea rezultatului.\n\nDacă nu știi formula, pornește de la relațiile de bază: viteză, forță, lucru mecanic, energie sau legea lui Ohm.` },
    { triggers: ['simulare', 'bac', 'examen', 'timp', 'cronometru'], answer: `La simulare, lucrează în 3 ture:\n\n1. Prima tură: rezolvă ce știi sigur.\n2. A doua tură: revino la exercițiile medii.\n3. Ultima tură: verifică cerințele, calculele și exprimarea.\n\nNu sta blocat mai mult de 5-7 minute pe o cerință. Marcheaz-o și mergi mai departe.` },
    { triggers: ['motivație', 'motivatie', 'stres', 'panică', 'panica', 'obosit', 'nu pot'], answer: `Începe foarte mic:\n\n1. Alege o singură lecție.\n2. Pune timer 10 minute.\n3. Scrie doar ideile-cheie.\n4. După 10 minute decizi dacă mai continui.\n\nScopul nu este să ai chef, ci să pornești. Motivația apare după primele minute de lucru.` },
    { triggers: ['recapitulare', 'repet', 'memorez', 'uit', 'spaced'], answer: `Folosește recapitularea 1-3-7-14-30:\n\n• după 1 zi: refaci ideile principale;\n• după 3 zile: quiz scurt;\n• după 7 zile: explici lecția cu voce tare;\n• după 14 zile: rezolvi exerciții;\n• după 30 zile: simulare sau test mixt.\n\nNu reciti pasiv. Încearcă să reproduci din memorie.` }
  ];

  const SUGGESTION_GROUPS = [
    {
      title: 'Plan & progres',
      icon: '🗓️',
      accent: 'var(--gold)',
      questions: [
        'Cum îmi fac un plan de studiu pentru azi?',
        'Cum repar greșelile din quiz?',
        'Cum recapitulez eficient?'
      ]
    },
    {
      title: 'Română',
      icon: '✍️',
      accent: 'var(--violet)',
      questions: [
        'Cum structurez eseul la română?',
        'Ce fac la Subiectul I?'
      ]
    },
    {
      title: 'Uman',
      icon: '🏛️',
      accent: 'var(--peach)',
      questions: [
        'Ajută-mă la istorie',
        'Dă-mi o strategie pentru geografie'
      ]
    },
    {
      title: 'Real',
      icon: '🔬',
      accent: 'var(--teal)',
      questions: [
        'Cum rezolv la matematică?',
        'Cum învăț la biologie?',
        'Cum abordez problemele la chimie?',
        'Cum rezolv la fizică?'
      ]
    },
    {
      title: 'Examen & stare',
      icon: '🎯',
      accent: 'var(--rose)',
      questions: [
        'Cum gestionez timpul la simulare?',
        'Ce fac când sunt stresat?'
      ]
    }
  ];

  const SUGGESTED_QUESTIONS = SUGGESTION_GROUPS.flatMap(group => group.questions);
  const DEFAULT_ANSWER = `Pot răspunde momentan cu sfaturi presetate. Alege una dintre întrebările sugerate sau scrie despre: plan de studiu, greșeli la quiz, română, istorie, geografie, matematică, biologie, chimie, fizică, simulare BAC, stres/motivație sau recapitulare.`;
  let lastCoachQuestion = '';

  function normalize(text) {
    return String(text || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
  }

  function getPresetAnswer(question) {
    const q = normalize(question || lastCoachQuestion);
    const found = PRESET_ANSWERS.find(item => item.triggers.some(trigger => q.includes(normalize(trigger))));
    return found ? found.answer : DEFAULT_ANSWER;
  }

  function appendCoachBubble(text, type = 'bot') {
    const chat = document.getElementById('am') || document.querySelector('.am');
    if (!chat) return false;
    const bubble = document.createElement('div');
    bubble.className = `bb ${type}`;
    bubble.textContent = text;
    chat.appendChild(bubble);
    chat.scrollTop = chat.scrollHeight;
    return true;
  }

  function getCoachInput() {
    return document.getElementById('aii') || document.getElementById('aiInput') || document.querySelector('#p-ai textarea, #p-ai input, .ar textarea');
  }

  function rememberQuestion(question) {
    const clean = String(question || '').trim();
    if (clean) lastCoachQuestion = clean;
    return clean;
  }

  function answerSuggestedQuestion(question) {
    const clean = rememberQuestion(question);
    if (clean) appendCoachBubble(clean, 'usr');
    appendCoachBubble(getPresetAnswer(clean), 'bot');
  }

  function fallbackAsk() {
    const input = getCoachInput();
    const question = rememberQuestion(input && input.value ? input.value : '');
    if (!question) return;
    appendCoachBubble(question, 'usr');
    appendCoachBubble(getPresetAnswer(question), 'bot');
    input.value = '';
  }

  function renderSuggestedQuestions() {
    const aiPanel = document.getElementById('p-ai');
    if (!aiPanel || document.getElementById('ai-coach-local-suggestions')) return;

    const anchor = aiPanel.querySelector('.ar') || getCoachInput()?.parentElement || aiPanel.firstElementChild;
    const wrap = document.createElement('div');
    wrap.id = 'ai-coach-local-suggestions';
    wrap.className = 'cd';
    wrap.style.marginBottom = '12px';
    wrap.innerHTML = `
      <div class="ct"><span class="dt" style="background:var(--teal)"></span>Întrebări sugerate</div>
      <div class="ai-suggestion-groups" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:10px"></div>
    `;

    const grid = wrap.querySelector('.ai-suggestion-groups');
    SUGGESTION_GROUPS.forEach(group => {
      const section = document.createElement('div');
      section.className = 'cs';
      section.style.padding = '10px';
      section.style.borderColor = 'var(--line)';
      section.innerHTML = `
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:8px;color:var(--txt);font-weight:700;font-size:.78rem">
          <span>${group.icon}</span>
          <span>${group.title}</span>
        </div>
        <div style="display:flex;flex-direction:column;gap:6px"></div>
      `;
      const list = section.querySelector('div:last-child');
      group.questions.forEach(question => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'bt ai-suggestion';
        button.dataset.aiQuestion = question;
        button.textContent = question;
        button.style.textAlign = 'left';
        button.style.whiteSpace = 'normal';
        button.style.borderColor = 'var(--line)';
        button.style.color = 'var(--txt2)';
        button.addEventListener('mouseenter', () => {
          button.style.color = group.accent;
          button.style.borderColor = group.accent;
        });
        button.addEventListener('mouseleave', () => {
          button.style.color = 'var(--txt2)';
          button.style.borderColor = 'var(--line)';
        });
        list.appendChild(button);
      });
      grid.appendChild(section);
    });

    if (anchor && anchor.parentElement) {
      anchor.parentElement.insertBefore(wrap, anchor);
    } else {
      aiPanel.prepend(wrap);
    }
  }

  function anthropicPresetPayload(question) {
    return {
      id: `preset-${Date.now()}`,
      type: 'message',
      role: 'assistant',
      model: 'bac-space-preset-coach',
      content: [{ type: 'text', text: getPresetAnswer(question) }],
      stop_reason: 'end_turn',
      stop_sequence: null,
      usage: { input_tokens: 0, output_tokens: 0 }
    };
  }

  function getQuestionFromAnthropicBody(body) {
    try {
      const payload = typeof body === 'string' ? JSON.parse(body) : body;
      const messages = Array.isArray(payload?.messages) ? payload.messages : [];
      const lastUser = [...messages].reverse().find(message => message.role === 'user');
      const content = lastUser?.content;
      if (typeof content === 'string') return rememberQuestion(content);
      if (Array.isArray(content)) {
        return rememberQuestion(content.map(part => typeof part === 'string' ? part : part?.text || '').join(' ').trim());
      }
    } catch (error) {
      console.warn('Could not parse AI Coach request body; using generic preset answer.', error);
    }
    return lastCoachQuestion;
  }

  function hideExternalAISettings() {
    const labels = ['anthropic api key', 'api key', 'model', 'șterge', 'sterge', 'nu ai setat încă o cheie', 'nu ai setat inca o cheie'];
    const aiPanel = document.getElementById('p-ai') || document.body;
    Array.from(aiPanel.querySelectorAll('label, input, select, button, small, p, div')).forEach(node => {
      const text = normalize(node.textContent || node.placeholder || node.value || '');
      const idName = normalize(`${node.id || ''} ${node.name || ''} ${node.className || ''}`);
      const match = labels.some(label => text.includes(normalize(label)) || idName.includes(normalize(label.replaceAll(' ', ''))));
      if (!match) return;
      const card = node.closest('.cd, .gt, .ge, .av, .cs') || node.parentElement;
      if (card && card !== aiPanel && card !== document.body) {
        card.style.display = 'none';
        card.setAttribute('aria-hidden', 'true');
      } else {
        node.style.display = 'none';
        node.setAttribute('aria-hidden', 'true');
      }
    });

    const noteId = 'local-ai-coach-note';
    if (document.getElementById(noteId) || !aiPanel || aiPanel === document.body) return;
    const note = document.createElement('div');
    note.id = noteId;
    note.className = 'cs';
    note.style.marginBottom = '10px';
    note.textContent = '🤖 AI Coach rulează local, cu răspunsuri presetate. Nu folosește servicii externe, nu consumă tokeni și nu cere API Key.';
    aiPanel.prepend(note);
  }

  const nativeFetch = window.fetch ? window.fetch.bind(window) : null;
  if (nativeFetch) {
    window.fetch = function patchedFetch(input, init = {}) {
      const url = typeof input === 'string' ? input : input?.url;
      if (url && url.includes('api.anthropic.com/v1/messages')) {
        const question = getQuestionFromAnthropicBody(init?.body);
        return Promise.resolve(new Response(JSON.stringify(anthropicPresetPayload(question)), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }));
      }
      return nativeFetch(input, init);
    };
  }

  window.BAC_AI_COACH_PRESETS = {
    answers: PRESET_ANSWERS,
    suggestionGroups: SUGGESTION_GROUPS,
    suggestions: SUGGESTED_QUESTIONS,
    getPresetAnswer,
    answerSuggestedQuestion,
    renderSuggestedQuestions,
    hideAnthropicSettings: hideExternalAISettings,
    hideExternalAISettings
  };

  ['askAI', 'aiAsk', 'sendAI', 'sendMsg'].forEach(name => {
    const original = window[name];
    window[name] = function patchedCoachAsk(...args) {
      try {
        if (typeof original === 'function') return original.apply(this, args);
      } catch (error) {
        console.warn('AI Coach live answer failed; using preset fallback.', error);
      }
      return fallbackAsk();
    };
  });

  document.addEventListener('click', event => {
    setTimeout(renderSuggestedQuestions, 50);
    const target = event.target.closest('[data-ai-question], [data-coach-question], .ai-suggestion, .coach-suggestion');
    if (!target) return;
    const question = target.dataset.aiQuestion || target.dataset.coachQuestion || target.textContent.trim();
    if (!question) return;
    event.preventDefault();
    answerSuggestedQuestion(question);
  });

  document.addEventListener('DOMContentLoaded', () => {
    hideExternalAISettings();
    renderSuggestedQuestions();
  });
  setTimeout(hideExternalAISettings, 300);
  setTimeout(renderSuggestedQuestions, 300);
  setTimeout(hideExternalAISettings, 1200);
  setTimeout(renderSuggestedQuestions, 1200);
})();
