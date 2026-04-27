(() => {
  const EXTRA_ANSWERS = [
    { triggers: ['roman interbelic', 'ion', 'baltagul', 'enigma otiliei', 'ultima noapte'], answer: `Pentru romanul interbelic, învață pe schemă:\n\n1. Context: perioada interbelică și orientarea realistă/modernă.\n2. Tema: socială, psihologică, iubire, familie sau destin.\n3. Personajul central: statut social, moral și psihologic.\n4. Două scene importante, explicate clar.\n5. Elemente de construcție: perspectivă narativă, conflict, timp, spațiu, limbaj.\n\nNu încerca să memorezi eseul întreg. Memorează structura și exemplele.` },
    { triggers: ['poezie', 'eminescu', 'arghezi', 'blaga', 'barbu', 'modernism', 'romantism'], answer: `Pentru poezie, folosește această ordine:\n\n1. Încadrare în curent: romantism, modernism, tradiționalism etc.\n2. Tema poeziei, formulată într-o propoziție clară.\n3. Două imagini poetice importante.\n4. Două figuri de stil și rolul lor.\n5. Elemente de prozodie sau limbaj, dacă sunt relevante.\n\nLa Bac contează să explici efectul, nu doar să numești figura de stil.` },
    { triggers: ['caracterizare', 'personaj', 'relația dintre personaje', 'relatia dintre personaje'], answer: `Pentru caracterizare sau relația dintre personaje:\n\n1. Prezintă statutul social, moral și psihologic.\n2. Alege două scene reprezentative.\n3. Explică trăsătura demonstrată de fiecare scenă.\n4. Menționează mijloace de caracterizare: directă, indirectă, limbaj, gesturi, relații.\n5. În concluzie, leagă personajul de tema operei.\n\nEvită rezumatul. Fiecare paragraf trebuie să demonstreze o idee.` },
    { triggers: ['cronologie istorie', 'cronologie', 'ani istorie', 'date istorie'], answer: `Pentru cronologie la istorie:\n\n1. Fă o axă cu 5-7 repere mari, nu cu 30 de date.\n2. Leagă fiecare dată de o cauză și o consecință.\n3. Repetă pe epoci: medieval, modern, contemporan.\n4. Verifică dacă răspunsul respectă ordinea cronologică.\n\nFormulă utilă: „În anul/perioada..., ca urmare a..., s-a produs..., ceea ce a dus la...”` },
    { triggers: ['constitutii', 'constituții', '1866', '1923', '1938', '1991'], answer: `Pentru constituțiile României:\n\n1. 1866: monarhie constituțională, separarea puterilor, drepturi și libertăți.\n2. 1923: România Mare, vot universal masculin, consolidare democratică.\n3. 1938: autoritarism regal, puterea regelui crește.\n4. 1991: stat democratic postcomunist, pluralism politic, drepturi fundamentale.\n\nCompară mereu regimul politic și drepturile cetățenilor.` },
    { triggers: ['harta romaniei', 'romania geografie', 'unitati de relief', 'unități de relief'], answer: `Pentru harta României:\n\n1. Începe cu poziția: nord, sud, est, vest, centru.\n2. Identifică unitatea mare: Carpați, Subcarpați, podiș, câmpie, deltă.\n3. Adaugă o caracteristică: altitudine, fragmentare, resurse, climă.\n4. Dă un exemplu concret: oraș, râu, depresiune, masiv.\n\nLa hartă, legenda și orientarea cardinală sunt primele lucruri de verificat.` },
    { triggers: ['europa geografie', 'state europa', 'capitale', 'ue', 'uniunea europeana'], answer: `Pentru Europa la geografie:\n\n1. Grupează statele pe regiuni: Vest, Nord, Sud, Est, Central.\n2. Reține câte 2-3 exemple pentru fiecare regiune.\n3. Leagă clima de latitudine și apropierea de ocean.\n4. Pentru economie, menționează resurse, industrie, servicii și transporturi.\n\nNu învăța liste mecanic. Învață relații: poziție → climă → populație → economie.` },
    { triggers: ['derivate', 'derivata', 'tabel de variatie', 'monotonie', 'extreme'], answer: `Pentru derivate și tabel de variație:\n\n1. Stabilește domeniul funcției.\n2. Calculează derivata.\n3. Rezolvă ecuația f'(x)=0.\n4. Faci tabelul de semn pentru derivată.\n5. Tragi concluziile: crescătoare, descrescătoare, minim, maxim.\n\nNu sări peste domeniu. Multe greșeli apar înainte de derivată.` },
    { triggers: ['integrale', 'integrala', 'primitiva'], answer: `Pentru integrale:\n\n1. Identifică tipul: putere, exponent, logaritm, trigonometrie sau substituție simplă.\n2. Scrie formula folosită.\n3. Ai grijă la constante și semne.\n4. La integrală definită, calculează F(b)-F(a).\n\nVerificare rapidă: derivează rezultatul. Dacă obții funcția inițială, e corect.` },
    { triggers: ['genetica', 'monohibridare', 'dihibridare', 'genotip', 'fenotip'], answer: `Pentru genetică:\n\n1. Notează alelele și ce reprezintă fiecare.\n2. Scrie genotipurile părinților.\n3. Determină gameții.\n4. Completează combinațiile posibile.\n5. Separă raportul genotipic de raportul fenotipic.\n\nNu face calcule direct din enunț. Tabelul te ajută să nu ratezi combinații.` },
    { triggers: ['anatomie', 'sistem digestiv', 'sistem respirator', 'sistem circulator', 'sistem nervos'], answer: `Pentru anatomie:\n\n1. Învață pe traseu: organ → structură → funcție.\n2. Fă scheme cu săgeți pentru procese.\n3. Leagă fiecare organ de rolul lui.\n4. Repetă prin întrebări scurte: „ce face?”, „unde se află?”, „cu ce se conectează?”.\n\nO schemă bună valorează mai mult decât o pagină recitită pasiv.` },
    { triggers: ['stoichiometrie', 'calcule chimie', 'masa molara', 'moli'], answer: `Pentru stoichiometrie:\n\n1. Echilibrează reacția.\n2. Transformă datele în moli.\n3. Folosește raportul molar din ecuație.\n4. Transformă în unitatea cerută.\n5. Verifică ordinul de mărime al rezultatului.\n\nEcuația neechilibrată strică tot calculul, deci începe mereu de acolo.` },
    { triggers: ['ph', 'acid', 'baza', 'bază', 'concentratie molara'], answer: `Pentru pH:\n\n1. Identifică dacă soluția este acidă sau bazică.\n2. Notează concentrația ionilor relevanți.\n3. Aplică formula potrivită pentru pH sau pOH.\n4. Verifică interpretarea: pH < 7 acid, pH = 7 neutru, pH > 7 bazic.\n\nAi grijă la puterile lui 10 și la logaritmi.` },
    { triggers: ['legea lui ohm', 'ohm', 'circuit', 'rezistenta', 'rezistență', 'curent electric'], answer: `Pentru circuite electrice:\n\n1. Notează datele: tensiune, intensitate, rezistență.\n2. Transformă unitățile dacă este nevoie.\n3. Folosește U = R · I.\n4. Pentru rezistențe: serie se adună, paralel se inversează.\n5. Verifică unitatea rezultatului.\n\nDesenează circuitul simplificat înainte de calcule.` },
    { triggers: ['mecanica', 'viteza', 'acceleratie', 'forța', 'forta', 'lucru mecanic'], answer: `Pentru mecanică:\n\n1. Scrie datele și unitățile SI.\n2. Alege relația: v=d/t, a=Δv/t, F=m·a, L=F·d.\n3. Fă desen sau schemă dacă există direcții/forțe.\n4. Calculează pe pași și verifică unitatea.\n\nDacă rezultatul pare imposibil, verifică transformările de unități.` }
  ];

  const EXTRA_GROUPS = [
    {
      title: 'Română avansat', icon: '📖', accent: 'var(--violet)', questions: [
        'Cum abordez romanul interbelic?',
        'Cum comentez o poezie?',
        'Cum fac caracterizarea unui personaj?'
      ]
    },
    {
      title: 'Istorie & geografie', icon: '🧭', accent: 'var(--peach)', questions: [
        'Cum rețin cronologia la istorie?',
        'Cum compar constituțiile României?',
        'Cum învăț harta României?',
        'Cum învăț Europa la geografie?'
      ]
    },
    {
      title: 'Științe exacte', icon: '🧪', accent: 'var(--teal)', questions: [
        'Cum fac tabelul de variație?',
        'Cum rezolv integralele?',
        'Cum rezolv problemele de genetică?',
        'Cum rezolv stoichiometria?',
        'Cum lucrez cu pH-ul?',
        'Cum aplic legea lui Ohm?'
      ]
    }
  ];

  function installExtras() {
    const coach = window.BAC_AI_COACH_PRESETS;
    if (!coach || !Array.isArray(coach.answers) || !Array.isArray(coach.suggestionGroups)) return false;

    EXTRA_ANSWERS.forEach(extra => {
      const exists = coach.answers.some(item => item.answer === extra.answer);
      if (!exists) coach.answers.push(extra);
    });

    EXTRA_GROUPS.forEach(group => {
      const exists = coach.suggestionGroups.some(item => item.title === group.title);
      if (!exists) coach.suggestionGroups.push(group);
    });

    if (Array.isArray(coach.suggestions)) {
      EXTRA_GROUPS.flatMap(group => group.questions).forEach(question => {
        if (!coach.suggestions.includes(question)) coach.suggestions.push(question);
      });
    }

    const old = document.getElementById('ai-coach-local-suggestions');
    if (old) old.remove();
    if (typeof coach.renderSuggestedQuestions === 'function') coach.renderSuggestedQuestions();
    return true;
  }

  if (!installExtras()) {
    document.addEventListener('DOMContentLoaded', installExtras);
    setTimeout(installExtras, 300);
    setTimeout(installExtras, 1200);
  }
})();
