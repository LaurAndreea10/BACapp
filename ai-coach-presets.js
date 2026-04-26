(() => {
  const PRESET_ANSWERS = [
    {
      triggers: ['plan', 'program', 'azi', 'invăț', 'invat', 'studiu', 'orar'],
      title: 'Plan rapid pentru azi',
      answer: `Îți recomand un plan scurt și realist:\n\n1. 25 min: o lecție nouă sau recapitulare la materia principală.\n2. 5 min: pauză fără telefon.\n3. 20 min: 8-10 întrebări de quiz.\n4. 10 min: notează 3 greșeli și corectează-le.\n\nDacă ai puțin timp, fă doar un Pomodoro de 25 min și un mini-quiz.`
    },
    {
      triggers: ['greșeli', 'greseli', 'gresit', 'quiz', 'întrebări', 'intrebari', 'test'],
      title: 'Cum repari greșelile din quiz',
      answer: `Folosește regula 3 pași:\n\n1. Scrie pe scurt de ce răspunsul tău a fost greșit.\n2. Repetă teoria exactă din spatele întrebării.\n3. Refă întrebarea după 24 de ore.\n\nDacă greșești aceeași idee de 2 ori, transform-o într-o fișă rapidă.`
    },
    {
      triggers: ['eseu', 'română', 'romana', 'comentariu', 'argumentare', 'operă', 'opera'],
      title: 'Structură pentru eseu la română',
      answer: `Structură sigură pentru eseu:\n\n1. Introducere: autor, operă, curent/perioadă.\n2. Încadrare: 2 trăsături ale curentului sau speciei.\n3. Temă: formulare clară + 2 scene/secvențe relevante.\n4. Elemente de construcție: titlu, conflict, perspectivă, personaje, limbaj.\n5. Concluzie: reia ideea centrală, fără informații noi.\n\nÎnainte de examen, memorează scheme, nu eseuri întregi.`
    },
    {
      triggers: ['simulare', 'bac', 'examen', 'timp', 'cronometru'],
      title: 'Strategie pentru simulare BAC',
      answer: `La simulare, lucrează în 3 ture:\n\n1. Prima tură: rezolvă ce știi sigur.\n2. A doua tură: revino la exercițiile medii.\n3. Ultima tură: verifică cerințele, calculele și exprimarea.\n\nNu sta blocat mai mult de 5-7 minute pe o cerință. Marcheaz-o și mergi mai departe.`
    },
    {
      triggers: ['motivație', 'motivatie', 'stres', 'panică', 'panica', 'obosit', 'nu pot'],
      title: 'Când ești blocat sau stresat',
      answer: `Începe foarte mic:\n\n1. Alege o singură lecție.\n2. Pune timer 10 minute.\n3. Scrie doar ideile-cheie.\n4. După 10 minute decizi dacă mai continui.\n\nScopul nu este să ai chef, ci să pornești. Motivația apare după primele minute de lucru.`
    },
    {
      triggers: ['recapitulare', 'repet', 'memorez', 'uit', 'spaced'],
      title: 'Metodă de recapitulare',
      answer: `Folosește recapitularea 1-3-7-14-30:\n\n• după 1 zi: refaci ideile principale;\n• după 3 zile: quiz scurt;\n• după 7 zile: explici lecția cu voce tare;\n• după 14 zile: rezolvi exerciții;\n• după 30 zile: simulare sau test mixt.\n\nNu reciti pasiv. Încearcă să reproduci din memorie.`
    }
  ];

  const DEFAULT_ANSWER = `Pot răspunde momentan cu sfaturi presetate. Alege una dintre întrebările sugerate sau scrie despre: plan de studiu, greșeli la quiz, eseu la română, simulare BAC, stres/motivație sau recapitulare.`;
  let lastCoachQuestion = '';

  function normalize(text) {
    return String(text || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
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
        const text = content.map(part => typeof part === 'string' ? part : part?.text || '').join(' ').trim();
        return rememberQuestion(text);
      }
    } catch (error) {
      console.warn('Could not parse AI Coach request body; using generic preset answer.', error);
    }
    return lastCoachQuestion;
  }

  function hideAnthropicSettings() {
    const labels = ['anthropic api key', 'api key', 'model', 'șterge', 'sterge', 'nu ai setat încă o cheie', 'nu ai setat inca o cheie'];
    const aiPanel = document.getElementById('p-ai') || document.body;
    const candidates = Array.from(aiPanel.querySelectorAll('label, input, select, button, small, p, div'));

    candidates.forEach(node => {
      const text = normalize(node.textContent || node.placeholder || node.value || '');
      const idName = normalize(`${node.id || ''} ${node.name || ''} ${node.className || ''}`);
      const isAnthropicControl = labels.some(label => text.includes(normalize(label)) || idName.includes(normalize(label.replaceAll(' ', ''))));
      if (!isAnthropicControl) return;

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
    note.innerHTML = '🤖 AI Coach rulează local, cu răspunsuri presetate. Nu folosește Anthropic, nu consumă tokeni și nu cere API Key.';
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
    getPresetAnswer,
    answerSuggestedQuestion,
    hideAnthropicSettings
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
    const target = event.target.closest('[data-ai-question], [data-coach-question], .ai-suggestion, .coach-suggestion');
    if (!target) return;
    const question = target.dataset.aiQuestion || target.dataset.coachQuestion || target.textContent.trim();
    if (!question) return;
    event.preventDefault();
    answerSuggestedQuestion(question);
  });

  document.addEventListener('DOMContentLoaded', hideAnthropicSettings);
  setTimeout(hideAnthropicSettings, 300);
  setTimeout(hideAnthropicSettings, 1200);
})();
