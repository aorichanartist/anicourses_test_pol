'use strict';

const STORAGE_KEY = 'anikursy-political-quiz-v1';
const QUESTIONS = [
  { text:'Государство должно строже регулировать деятельность крупных компаний, даже если это увеличит их расходы.', axis:'economy', polarity: 1 },
  { text:'Ради безопасности государству можно расширять наблюдение за личной перепиской граждан.', axis:'freedoms', polarity:-1 },
  { text:'Общественные нормы должны меняться вместе с образом жизни новых поколений.', axis:'society', polarity: 1 },
  { text:'Мировые проблемы лучше решать совместно с другими странами, даже если ради этого нужны компромиссы.', axis:'world', polarity: 1 },
  { text:'Чем меньше государство вмешивается в конкуренцию между компаниями, тем лучше для экономики.', axis:'economy', polarity:-1 },
  { text:'Люди должны иметь право публично критиковать руководство своей страны.', axis:'freedoms', polarity: 1 },
  { text:'В школе сохранению культурных традиций следует уделять больше внимания, чем их переосмыслению.', axis:'society', polarity:-1 },
  { text:'В международных спорах интересы своей страны должны иметь приоритет перед решениями международных организаций.', axis:'world', polarity:-1 },
  { text:'Люди с более высокими доходами должны платить большую долю своих доходов в виде налогов.', axis:'economy', polarity: 1 },
  { text:'В чрезвычайных ситуациях правительство должно иметь право временно принимать решения без обычных парламентских процедур.', axis:'freedoms', polarity:-1 },
  { text:'Законы должны учитывать разные формы семейной жизни, даже если они непривычны старшему поколению.', axis:'society', polarity: 1 },
  { text:'Международные соглашения по защите природы полезны, даже если накладывают дополнительные обязательства на страны.', axis:'world', polarity: 1 },
  { text:'Частные компании, как правило, лучше управляют предприятиями, чем государство.', axis:'economy', polarity:-1 },
  { text:'Мирные митинги и собрания должны быть разрешены, даже когда власти не поддерживают требования участников.', axis:'freedoms', polarity: 1 },
  { text:'Сохранение давно сложившихся общественных традиций важнее быстрого обновления норм.', axis:'society', polarity:-1 },
  { text:'Страна должна самостоятельно определять свою торговую политику, даже если это усложняет соглашения с партнёрами.', axis:'world', polarity:-1 },
  { text:'Государство должно гарантировать доступ к базовой медицинской помощи, даже если для этого потребуется повышение налогов.', axis:'economy', polarity: 1 },
  { text:'Ради борьбы с преступностью допустимо расширять полномочия полиции по проверке граждан.', axis:'freedoms', polarity:-1 },
  { text:'Общественные правила стоит пересматривать, если они чрезмерно ограничивают личный выбор людей.', axis:'society', polarity: 1 },
  { text:'Государствам стоит активнее поддерживать обмен студентами и учёными между странами.', axis:'world', polarity: 1 },
  { text:'Для развития экономики лучше снижать налоги для бизнеса, даже если это уменьшит государственные расходы.', axis:'economy', polarity:-1 },
  { text:'Журналисты должны иметь право независимо расследовать и публиковать информацию о действиях чиновников.', axis:'freedoms', polarity: 1 },
  { text:'Религиозные и культурные традиции должны заметно влиять на законы государства.', axis:'society', polarity:-1 },
  { text:'В ключевых политических решениях стране лучше меньше зависеть от зарубежных объединений и союзов.', axis:'world', polarity:-1 },
  { text:'Даже в кризисные времена независимые суды должны проверять решения властей, ограничивающие свободы граждан.', axis:'freedoms', polarity: 1 },
  { text:'Государство должно устанавливать минимальную оплату труда, даже если некоторым компаниям станет сложнее нанимать сотрудников.', axis:'economy', polarity: 1 },
  { text:'Государство должно защищать право человека на непопулярные публичные высказывания, если в них нет призывов к насилию.', axis:'freedoms', polarity: 1 },
  { text:'Для общества важнее сохранять привычные семейные роли, чем пересматривать их в соответствии с современными представлениями.', axis:'society', polarity:-1 },
  { text:'Страна должна участвовать в международных гуманитарных проектах, даже если это не приносит ей прямой экономической выгоды.', axis:'world', polarity: 1 },
  { text:'Государство должно ограничивать рост цен на товары первой необходимости, даже если бизнесу это невыгодно.', axis:'economy', polarity: 1 },
];

const AXES = [
  { key:'economy', title:'ЭКОНОМИКА', subtitle:'Госучастие ↔ свободный рынок', left:'Госучастие', right:'Свободный рынок', color:'#ff762d' },
  { key:'freedoms', title:'СВОБОДЫ И БЕЗОПАСНОСТЬ', subtitle:'Личные свободы ↔ усиление полномочий власти', left:'Личные свободы', right:'Полномочия власти', color:'#e84b88' },
  { key:'society', title:'ОБЩЕСТВЕННЫЕ ЦЕННОСТИ', subtitle:'Перемены ↔ традиции', left:'Перемены', right:'Традиции', color:'#ff9f2f' },
  { key:'world', title:'МЕЖДУНАРОДНЫЕ ОТНОШЕНИЯ', subtitle:'Сотрудничество ↔ самостоятельность', left:'Сотрудничество', right:'Самостоятельность', color:'#7a5be2' },
];

const ANSWERS = [
  { value:-2, label:['Не','согласен'] },
  { value:-1, label:['Скорее','не согласен'] },
  { value:0, label:['Трудно','ответить'] },
  { value:1, label:['Скорее','согласен'] },
  { value:2, label:['Согласен'] },
];

const QUIPS = {
  intro:[
    'Комиссия кротов собралась. Один я пришёл.',
    'Начинаем. Я уже морально не согласен с будильником.',
    'Поехали. Истина где-то рядом, а чай — у меня.'
  ],
  reaction:{
    economy:{ agree:['Общий склад печенья одобряю.', 'Налоги? Если на печенье — я слушаю.', 'Бюджет спорный, но холодильник святой.'], disagree:['Свободный рынок? Тогда я продаю воздух из норы.', 'Бизнес любит свободу. И скидки тоже.', 'Конкуренция началась. Я уже проиграл ёжу.'], neutral:['Экономика сложная. Я делю одну печеньку на троих.', 'Бухгалтер-крот ушёл спать.', 'Тут бы калькулятор.'] },
    freedoms:{ agree:['Свобода слова? Тогда заявляю: хочу спать.', 'За переписку лапами не следить.', 'Свободы люблю. Особенно от дел.'], disagree:['Порядок в норе сам себя не наведёт.', 'Полномочия? Мне бы право не мыть кружку.', 'Строгий режим: сон после обеда.'], neutral:['Сложный вопрос. Пульт пока у меня.', 'Я воздержался и пошёл пить чай.', 'Совет кротов спорит, я нет.'] },
    society:{ agree:['Перемены? Передвину диван.', 'Обновление норм звучит бодро.', 'Новое поколение требует второй холодильник.'], disagree:['Традиции! По пятницам прячем пульт.', 'Старый порядок хотя бы знаком.', 'У прадеда тоже была эта кружка. Наверное.'], neutral:['Старое или новое? Я и носки не выбрал.', 'Вопрос тонкий, как стенка норы.', 'Пока без революций в диванной зоне.'] },
    world:{ agree:['Саммит нор открыт. Повестка: печенье.', 'Соседний ёж за диалог.', 'Договоримся, если принесут чай.'], disagree:['Таможня у входа. Пропуск — морковка.', 'У меня суверенная нора.', 'Границы охраняет тапок.'], neutral:['Переговоры с ежом сорваны. Он свернулся.', 'Я нейтрален: чай пью со всеми.', 'Дипломаты спорят, я ем.' ] }
  }
};

const IDEOLOGY_INFO = {
  social: {title:'Социал-демократические идеи', description:'Социальные гарантии и заметная роль государства в экономике сочетаются с защитой гражданских свобод.'},
  liberal: {title:'Либеральные идеи', description:'Личные свободы и самостоятельность людей и организаций играют важную роль. У либеральных течений разные взгляды на экономику.'},
  conservative: {title:'Консервативные идеи', description:'Особое внимание уделяется преемственности, общественным традициям и осторожности в переменах.'},
  centrist: {title:'Умеренные и смешанные позиции', description:'В зависимости от темы ты можешь поддерживать разные подходы, не придерживаясь одной последовательной идеологии.'},
};
function ideologyCards(scores){
  const tags=[];
  if(scores.economy>=57 && scores.freedoms>=55)tags.push(IDEOLOGY_INFO.social);
  if(scores.freedoms>=58 && scores.economy<=55)tags.push(IDEOLOGY_INFO.liberal);
  if(scores.society<=43)tags.push(IDEOLOGY_INFO.conservative);
  if(!tags.length)tags.push(IDEOLOGY_INFO.centrist);
  if(tags.length===1 && tags[0]!==IDEOLOGY_INFO.centrist)tags.push(IDEOLOGY_INFO.centrist);
  return tags.slice(0,2);
}

// Справочные сравнения, без политического рейтинга и рекомендаций.
const PARTY_INFO = [
  {name:'«Яблоко»',desc:'В партийной программе: социальная рыночная экономика, правовое государство и политическая конкуренция.',url:'https://spb.yabloko.ru/about/'},
  {name:'«Новые люди»',desc:'В собственной программе партия подчёркивает поддержку предпринимательства, конкуренции и свободы инициативы.',url:'https://newpeople.spb.ru/about'}
];
const PUBLIC_INFO = [
  {name:'Павел Дуров',desc:'Публично выступает за свободу слова и приватность цифрового общения; эти позиции не составляют полной политической программы.',url:'https://t.me/durov'},
  {name:'Олег Тиньков',desc:'Известен как предприниматель и публичный критик ограничений для бизнеса; одних интервью недостаточно, чтобы определить его позиции по всем четырём шкалам.',url:'https://thebell.io/bolezn-olega-tinkova-konkurentsiya-s-gosbankami-i-russkij-mat-oliver-hyuz-tinkoff-bank-v-proekte-russkie-norm'}
];
const HISTORICAL_INFO = [
  {name:'Пётр I',years:'1682–1725',tag:'Реформы сверху',desc:'Проводил масштабную военную и административную модернизацию, заимствовал европейские технологии, одновременно укрепляя самодержавную власть.',url:'https://www.rep.routledge.com/articles/thematic/enlightenment-russian/v-1/sections/state-enlightenment'},
  {name:'Екатерина II',years:'1762–1796',tag:'Просвещённый абсолютизм',desc:'Обращалась к идеям Просвещения, но сохраняла самодержавие; расширение привилегий дворянства сопровождалось усилением зависимости крепостных.',url:'https://www.thebritishacademy.ac.uk/blog/how-did-catherine-the-great-reign-shape-imperial-russian-history/'},
  {name:'Николай I',years:'1825–1855',tag:'Самодержавие и контроль',desc:'Укреплял централизацию власти, применял цензуру и политический надзор, противодействовал революционным движениям.',url:'https://www.encyclopediaofukraine.com/display.asp?linkpath=pages%5CN%5CI%5CNicholasI.htm'},
  {name:'Александр II',years:'1855–1881',tag:'Реформы при монархии',desc:'Отменил крепостное право в 1861 году и провёл крупные реформы, оставаясь самодержавным императором.',url:'https://www.history.org.uk/historian/resource/2339/alexander-ii'},
  {name:'Иосиф Сталин',years:'1924–1953',tag:'Однопартийная диктатура',desc:'Форсированная индустриализация и коллективизация сочетались с репрессиями, массовыми депортациями и строгим контролем над обществом.',url:'https://www.loc.gov/exhibits/archives/intn.html'},
  {name:'Адольф Гитлер',years:'1933–1945',tag:'Нацистская диктатура',desc:'Нацистская идеология опиралась на расизм, антисемитизм и отказ от демократии. Режим проводил преследования и организовал Холокост.',url:'https://encyclopedia.ushmm.org/content/en/article/the-nazi-party-1'}
];

const state = { screen:'start', index:0, answers:Array(QUESTIONS.length).fill(null), muted:false, currentQuip:null };
let toastTimer = null;
let advanceTimer = null;
let quipKeyCounter = 0;
let pendingQuip = null;
let lastQuipAt = -10;
const APP = document.getElementById('app');

function save(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ index:state.index, answers:state.answers, muted:state.muted }));
}
function load(){
  try{
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || localStorage.getItem('anikursyPoliticalQuizV4') || 'null');
    if(!raw || !Array.isArray(raw.answers)) return;
    if(![25,QUESTIONS.length].includes(raw.answers.length)) return;
    if(!raw.answers.every(v => v===null || [-2,-1,0,1,2].includes(v))) return;
    const wasComplete = raw.answers.length===25 && raw.answers.every(v=>v!==null);
    state.answers = raw.answers.concat(Array(QUESTIONS.length-raw.answers.length).fill(null));
    state.index = wasComplete ? 25 : (Number.isInteger(raw.index) ? Math.max(0, Math.min(QUESTIONS.length-1, raw.index)) : 0);
    state.muted = raw.muted === true;
  } catch(err){}
}
function answeredCount(){ return state.answers.filter(v => v!==null).length; }
function reset(keepMute=true){
  const mute = keepMute ? state.muted : false;
  state.screen='start';
  state.index=0;
  state.answers=Array(QUESTIONS.length).fill(null);
  state.currentQuip=null;
  pendingQuip=null;lastQuipAt=-10;
  state.muted=mute;
  cancelAdvance();
  save();
}
function cancelAdvance(){ if(advanceTimer!==null){ clearTimeout(advanceTimer); advanceTimer=null; } }
function escapeHtml(str){
  return String(str).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
}
function randomItem(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function maybeSpeak(text){
  try{
    if(state.muted || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const ut = new SpeechSynthesisUtterance(text);
    ut.lang = 'ru-RU';
    ut.rate = 1;
    window.speechSynthesis.speak(ut);
  } catch(err){}
}
function stopSpeech(){ try{ if('speechSynthesis' in window) window.speechSynthesis.cancel(); }catch(err){} }

function header(showRestart=true){
  return `
  <header class="site-header">
    <a class="brand-link" href="https://anicourses.ru" target="_blank" rel="noopener"><img src="assets/anikursy-logo.png" alt="Аникурсы"></a>
    <div class="header-actions">
      ${showRestart ? `<button class="header-pill" id="restart-top" type="button">Начать заново</button>` : ''}
      <button class="sound-button" id="sound-toggle" type="button" aria-label="${state.muted ? 'Включить звук' : 'Выключить звук'}">${state.muted ? '🔇' : '🔊'}</button>
    </div>
  </header>`;
}

function bindCommon(){
  const sound = document.getElementById('sound-toggle');
  if(sound){
    sound.addEventListener('click', ()=>{
      state.muted = !state.muted;
      save();
      if(state.muted) stopSpeech();
      render();
    });
  }
  const restart = document.getElementById('restart-top');
  if(restart){
    restart.addEventListener('click', ()=>{
      const count = answeredCount();
      if(count>0 && !window.confirm('Начать тест заново? Предыдущие ответы будут удалены.')) return;
      stopSpeech();
      reset();
      renderStart();
    });
  }
}

function renderStart(){
  document.documentElement.classList.remove('quiz-active');
  const count = answeredCount();
  APP.innerHTML = `
    <main class="page-card">
      ${header(false)}
      <section class="hero">
        <div class="hero-copy">
          <h1>Какие у тебя<br><span class="highlight">политические взгляды?</span></h1>
          <p class="subtitle">Быстрый тест из ${QUESTIONS.length} вопросов для школьников: экономика, свободы, общественные ценности и отношения между странами.</p>
          <button class="primary-btn" id="start-btn" type="button">${count===QUESTIONS.length ? 'Начать тест' : count ? 'Продолжить тест' : 'Начать тест'}</button>
          <div class="meta-line">7–10 минут · ${QUESTIONS.length} вопросов · без регистрации</div>
        </div>
        <div class="hero-art">
          <div class="blob"></div>
          <div class="doodle">★</div>
          <img src="assets/mole-relax.webp" alt="Крот с ноутбуком">
        </div>
      </section>
    </main>
    <div class="site-footer-note">Это развлекательный образовательный тест, а не научная диагностика или характеристика личности. Результаты показывают только распределение твоих ответов на ${QUESTIONS.length} утверждений. Ни одна из позиций не считается правильной или неправильной. Ответы не отправляются на сервер.</div>
    <div class="toast" id="toast" role="status"></div>`;
  bindCommon();
  document.getElementById('start-btn').addEventListener('click', ()=>{
    state.screen='question';
    if(count===QUESTIONS.length){reset();state.index=0;state.screen='question';}
    document.documentElement.classList.add('quiz-active');
    renderQuestion();
    showQuip(randomItem(QUIPS.intro));
  });
}

function renderQuestion(){
  document.documentElement.classList.add('quiz-active');
  const idx = state.index;
  const q = QUESTIONS[idx];
  const progress = Math.round(idx / QUESTIONS.length * 100);
  const answerValue = state.answers[idx];
  const titleClass = q.text.length > 115 ? 'question-title long' : 'question-title';
  APP.innerHTML = `
    <main class="page-card quiz-card quiz-theme-${idx % 6}">
      <div class="quiz-header">
        ${header(true)}
        <div class="progress-head"><span>${String(idx+1).padStart(2,'0')} / ${QUESTIONS.length}</span><span>${Math.round((idx+1)/QUESTIONS.length*100)}%</span></div>
        <div class="progress-track" aria-hidden="true"><div class="progress-fill" style="width:${progress}%"></div></div>
      </div>
      <section class="question-stage">
        <div class="question-copy">
          <h2 class="${titleClass}">${escapeHtml(q.text)}</h2>
          <p class="question-hint">Выбери вариант, который ближе всего к твоему мнению.</p>
          <div class="answers">
            ${ANSWERS.map(a => `
              <button class="answer ${answerValue===a.value ? 'selected' : ''}" type="button" data-value="${a.value}" aria-pressed="${answerValue===a.value}">
                <span class="radio-circle"></span>
                <span class="label">${a.label.map(escapeHtml).join('<br>')}</span>
              </button>`).join('')}
          </div>
        </div>
        <div class="nav-controls"><button class="text-btn" id="back-btn" type="button">← Назад</button></div>
      </section>
    </main>
    <div class="toast" id="toast" role="status"></div>`;
  bindCommon();
  document.getElementById('back-btn').addEventListener('click', ()=>{
    cancelAdvance();
    stopSpeech();
    if(state.index===0){ renderStart(); return; }
    state.index -= 1;
    save();
    renderQuestion();
  });
  document.querySelectorAll('.answer').forEach(btn => {
    btn.addEventListener('click', ()=>{
      if(advanceTimer!==null) return;
      const value = Number(btn.dataset.value);
      state.answers[idx] = value;
      save();
      document.querySelectorAll('.answer').forEach(el => {
        const active = Number(el.dataset.value) === value;
        el.classList.toggle('selected', active);
        el.disabled = true;
      });
      const group = QUIPS.reaction[q.axis];
      const key = value > 0 ? 'agree' : value < 0 ? 'disagree' : 'neutral';
      if(idx-lastQuipAt>=4 && Math.random()<0.48){ pendingQuip=randomItem(group[key]);lastQuipAt=idx; }
      advanceTimer = setTimeout(()=>{
        advanceTimer = null;
        if(state.index === QUESTIONS.length - 1) renderResults();
        else { state.index += 1; save(); renderQuestion(); if(pendingQuip){showQuip(pendingQuip);pendingQuip=null;} }
      }, 280);
    });
  });
}

function getScores(){
  const scores = {};
  AXES.forEach(axis => {
    const related = QUESTIONS.map((q,i)=>({q,i})).filter(x=>x.q.axis===axis.key);
    let points = 0;
    related.forEach(({q,i}) => { points += (state.answers[i] ?? 0) * q.polarity; });
    scores[axis.key] = Math.max(0, Math.min(100, Math.round(50 + (points / (related.length * 2)) * 50)));
  });
  return scores;
}

const AXIS_TEXT = {
  economy:{ left:['Государство активнее участвует в экономике','Ты чаще поддерживаешь регулирование компаний, социальные гарантии и более заметную роль государства.'], center:['Сочетание разных подходов','В одних экономических вопросах тебе ближе участие государства, в других — рыночные решения.'], right:['Больше свободы для рынка','Ты чаще выбираешь самостоятельность бизнеса, конкуренцию и менее активное государственное вмешательство.'] },
  freedoms:{ left:['Важнее личные свободы','Ты чаще ставишь свободу слова, собраний и независимый контроль над властью выше расширения её полномочий.'], center:['Баланс свободы и безопасности','В зависимости от ситуации ты поддерживаешь и защиту прав, и усиление мер безопасности.'], right:['Важнее порядок и безопасность','Ты чаще допускаешь расширение полномочий государства ради порядка и безопасности.'] },
  society:{ left:['Ближе к общественным переменам','Ты чаще поддерживаешь обновление общественных норм и расширение личного выбора.'], center:['Между переменами и традициями','В одних вопросах тебе ближе обновление норм, в других — сохранение привычного порядка.'], right:['Ближе к сохранению традиций','Ты чаще считаешь важным сохранять привычные нормы и культурные ориентиры.'] },
  world:{ left:['Ближе к международному сотрудничеству','Ты чаще поддерживаешь договорённости, обмены и совместные проекты между странами.'], center:['Сотрудничество и самостоятельность','Ты видишь ценность и в международном сотрудничестве, и в самостоятельности решений страны.'], right:['Ближе к самостоятельности страны','Ты чаще считаешь, что страна должна меньше зависеть от внешних союзов и международных структур.'] },
};

function interpretAxis(axisKey, score){
  const side = score >= 57 ? 'left' : score <= 43 ? 'right' : 'center';
  const [title, desc] = AXIS_TEXT[axisKey][side];
  const strength = Math.abs(score - 50);
  let label = title;
  if(side !== 'center' && strength < 16) label = 'Небольшой уклон: ' + title.toLowerCase();
  return { title:label, desc, side };
}

function renderResults(){
  stopSpeech();
  document.documentElement.classList.remove('quiz-active');
  state.screen='result';
  save();
  const scores = getScores();
  const ideologies=ideologyCards(scores);
  APP.innerHTML = `
    <main class="page-card results-card">
      ${header(true)}
      <section class="results-top">
        <div><h1>Твоя политическая <span class="highlight">карта</span></h1></div>
        <img class="results-mole" src="assets/mole-chaos.webp" alt="Крот изучает результаты">
      </section>
      <section class="results-grid">
        ${AXES.map(axis => {
          const score = scores[axis.key];
          const info = interpretAxis(axis.key, score);
          const pos = 4 + (100 - score) * 0.92;
          return `<article class="axis-card" style="--axis-color:${axis.color}">
            <div class="axis-head"><div class="axis-title">${axis.title}</div><div class="axis-sub">${axis.subtitle}</div></div>
            <div class="axis-labels"><span>${axis.left}</span><span>${axis.right}</span></div>
            <div class="axis-line" role="img" aria-label="${escapeHtml(info.title)}">
              <span class="axis-mid"></span>
              <svg class="axis-pin" style="left:${pos}%" viewBox="0 0 24 30" aria-hidden="true"><path d="M12 1.5C6.1 1.5 2 5.8 2 11c0 7.1 10 17.5 10 17.5S22 18.1 22 11C22 5.8 17.9 1.5 12 1.5Z" fill="${axis.color}" stroke="#242426" stroke-width="1.2"></path><circle cx="12" cy="11" r="4" fill="#fff"></circle></svg>
            </div>
            <p class="axis-tendency">${escapeHtml(info.title)}</p>
            <p class="axis-desc">${escapeHtml(info.desc)}</p>
          </article>`;
        }).join('')}

        <section class="section-card">
          <h2 class="section-title">Какие идеи тебе ближе</h2>
          <p class="section-note">Это лишь ориентиры по нескольким темам, а не твоя окончательная политическая позиция.</p>
          <div class="ideology-cards">
            ${ideologies.map(item=>`<div class="idea-card"><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.description)}</p></div>`).join('')}
          </div>
        </section>
        <section class="section-card">
          <h2 class="section-title">Партии и публичные люди</h2>
          <p class="section-note">Для сравнения: отдельные задокументированные позиции. Тест не устанавливает, за какую партию или политика ты должен быть.</p>
          <div class="reference-grid">
            <div class="match-card"><h3>Партии</h3>
              ${PARTY_INFO.map(item=>`<div class="reference-item"><strong>${escapeHtml(item.name)}</strong><p>${escapeHtml(item.desc)}</p><a href="${item.url}" target="_blank" rel="noopener noreferrer">Источник</a></div>`).join('')}
            </div>
            <div class="match-card"><h3>Публичные люди</h3>
              ${PUBLIC_INFO.map(item=>`<div class="reference-item"><strong>${escapeHtml(item.name)}</strong><p>${escapeHtml(item.desc)}</p><a href="${item.url}" target="_blank" rel="noopener noreferrer">Источник</a></div>`).join('')}
            </div>
          </div>
        </section>
        <section class="section-card">
          <h2 class="section-title">Политика в истории</h2>
          <p class="section-note">Исторические примеры разных моделей власти. Это не «двойники» игрока: четыре шкалы не охватывают насилие, репрессии, устройство режима и другие принципиальные различия.</p>
          <div class="history-grid">
            ${HISTORICAL_INFO.map(item=>`<article class="history-card"><div class="history-meta"><span>${escapeHtml(item.years)}</span><span>${escapeHtml(item.tag)}</span></div><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.desc)}</p><a href="${item.url}" target="_blank" rel="noopener noreferrer">Читать об эпохе</a></article>`).join('')}
          </div>
        </section>
        <section class="cta-banner">
          <div class="cta-pattern"></div>
          <div class="cta-copy">
            <span class="cta-pill">Аникурсы</span>
            <h3>Самостоятельная подготовка<br>к обществознанию</h3>
            <p>Если обществознание всё ещё путается в голове — можно готовиться спокойно и системно на онлайн-платформе: короткие уроки, конспекты, тесты и тренажёры.</p>
            <div class="cta-buttons">
              <a class="cta-btn" href="https://anicourses.ru" target="_blank" rel="noopener">ОГЭ</a>
              <a class="cta-btn" href="https://anicourses.ru" target="_blank" rel="noopener">ЕГЭ</a>
            </div>
          </div>
          <div class="cta-photo"><img src="assets/teacher.jpg" alt="Преподаватель Аникурсов"></div>
        </section>

        <div class="results-actions">
          <button class="secondary-btn" id="copy-btn" type="button">↗ Скопировать результат</button>
          <button class="primary-btn" id="again-btn" type="button">Пройти ещё раз</button>
        </div>
      </section>
    </main>
    <div class="site-footer-note">Это развлекательный образовательный тест, а не научная диагностика или характеристика личности. Отметки показывают распределение твоих ответов на ${QUESTIONS.length} утверждений, а не научно установленную политическую принадлежность. Ни одна из позиций не считается правильной или неправильной. Ответы не отправляются на сервер.</div>
    <div class="toast" id="toast" role="status"></div>`;

  bindCommon();
  document.getElementById('again-btn').addEventListener('click', ()=>{ stopSpeech(); reset(); renderStart(); });
  document.getElementById('copy-btn').addEventListener('click', async ()=>{
    const text = `Моя политическая карта — тест АНИКУРСОВ\n${AXES.map(axis => `${axis.title}: ${interpretAxis(axis.key, scores[axis.key]).title}`).join('\n')}\nИдеи: ${ideologies.map(x=>x.title).join(', ')}\n${location.href}`;
    try{
      await navigator.clipboard.writeText(text);
      toast('Результат скопирован!');
    } catch(err){
      const area = document.createElement('textarea');
      area.value = text;
      document.body.appendChild(area);
      area.select();
      const ok = document.execCommand('copy');
      area.remove();
      toast(ok ? 'Результат скопирован!' : 'Не удалось скопировать автоматически');
    }
  });
}

function showQuip(text){
  quipKeyCounter += 1;
  const key = quipKeyCounter;
  state.currentQuip = key;
  maybeSpeak(text);
  const prev = APP.querySelector('.mole-popup');
  if(prev) prev.remove();
  const host = APP.querySelector('.page-card');
  if(!host || state.screen !== 'question') return;
  host.insertAdjacentHTML('beforeend', `<aside class="mole-popup" data-quip="${key}"><button class="mole-close" type="button" aria-label="Закрыть">×</button><img src="assets/mole-chaos.webp" alt="Крот комментирует"><div class="mole-copy"><span class="mole-label">КРОТ В ЭФИРЕ</span><p>${escapeHtml(text)}</p></div></aside>`);
  host.querySelector('.mole-close')?.addEventListener('click', ()=>{ host.querySelector('.mole-popup')?.remove(); stopSpeech(); });
}

function toast(msg){
  const el = document.getElementById('toast');
  if(!el) return;
  el.textContent = msg;
  el.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>el.classList.remove('visible'), 2300);
}

function render(){
  if(state.screen === 'question') renderQuestion();
  else if(state.screen === 'result') renderResults();
  else renderStart();
}

window.addEventListener('keydown', (e)=>{
  if(state.screen !== 'question' || e.ctrlKey || e.altKey || e.metaKey) return;
  const tags = ['INPUT','TEXTAREA'];
  if(tags.includes(document.activeElement?.tagName)) return;
  if(['1','2','3','4','5'].includes(e.key)){
    const btn = APP.querySelectorAll('.answer')[Number(e.key)-1];
    if(btn){ btn.click(); e.preventDefault(); }
  }
  if(e.key === 'ArrowLeft'){
    const back = document.getElementById('back-btn');
    if(back){ back.click(); e.preventDefault(); }
  }
});
window.addEventListener('beforeunload', stopSpeech);
load();
renderStart();