'use strict';

/*
 * Аникурсы: тест политических взглядов (демоверсия 1.0)
 * Вопросы оригинальные; концепция 4 осей вдохновлена 8values / Pew.
 * Ответы: +2 / +1 = согласие, 0 = затруднение, -1 / -2 = несогласие.
 * polarity: +1 = ответ "да" сдвигает к левому полюсу оси, -1 = к правому.
 * Никакой политической рекламы, трекинга или отправки ответов на сервер нет.
 */

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
  { key:'economy',   title:'ЭКОНОМИКА',               short:'Кто регулирует экономику', left:'Госучастие',        right:'Свободный рынок',         color:'#ff681f' },
  { key:'freedoms',  title:'СВОБОДЫ И БЕЗОПАСНОСТЬ',  short:'Свободы и полномочия власти', left:'Личные свободы',    right:'Госполномочия',          color:'#e74779' },
  { key:'society',   title:'ОБЩЕСТВЕННЫЕ ЦЕННОСТИ',   short:'Отношение к изменениям', left:'Перемены',          right:'Традиции',              color:'#ff891c' },
  { key:'world',     title:'МЕЖДУНАРОДНЫЕ ОТНОШЕНИЯ', short:'Отношения между странами', left:'Сотрудничество',    right:'Самостоятельность',     color:'#dd547e' },
];

const ANSWER_LABELS = [
  { value:-2, label:'Не согласен', lines:['Не','согласен'] },
  { value:-1, label:'Скорее не согласен', lines:['Скорее','не согласен'] },
  { value:0, label:'Трудно ответить', lines:['Трудно','ответить'] },
  { value:1, label:'Скорее согласен', lines:['Скорее','согласен'] },
  { value:2, label:'Согласен', lines:['Согласен'] },
];

const QUIPS = {
  intro: [
    'Начинаем! Я тут главный эксперт. Без диплома.',
    'Так, опрос! Я уже проголосовал за обед.',
    'Комиссия кротов собралась. Один я пришёл.',
  ],
  result: [
    'Готово! Мой политический портрет почему-то с короной.',
    'Результат готов. Мой манифест опять съели.',
    'Вот твои взгляды. Мои — на холодильник.',
  ],
  reactions: {
    economy: {
      agree: [
        'Я за общий склад печенья. Ключ — у меня.',
        'Экономика под контролем. Кроме моего кошелька.',
        'Учёт запасов? У меня уже три пустые банки.',
      ],
      disagree: [
        'Рыночек свободен. Мои черви разбежались.',
        'Открываю бизнес: продаю воздух из норы.',
        'Конкуренция? Соседний крот украл мой ценник.',
      ],
      neutral: [
        'Экономика сложная. Я делю одну печеньку на троих.',
        'Мой бухгалтер ушёл в спячку.',
        'Бюджет не сошёлся. Осталась одна крошка.',
      ],
    },
    freedoms: {
      agree: [
        'Свобода слова? Тогда заявляю: хочу спать.',
        'Пойду на митинг за выходной во вторник.',
        'Никаких запретов! Кроме будильника.',
      ],
      disagree: [
        'Порядок в норе есть. Я его вчера потерял.',
        'Полномочия? Мне бы право не мыть чашку.',
        'У нас строгий режим: после обеда — сон.',
      ],
      neutral: [
        'Я воздержался. Меня и не спрашивали.',
        'Совет кротов спорит. Я на обеде.',
        'Спорный вопрос. Пульт пока у меня.',
      ],
    },
    society: {
      agree: [
        'Перемены? Ладно, переставлю диван.',
        'Реформирую нору. Вход теперь через кухню.',
        'Новое поколение требует второй холодильник.',
      ],
      disagree: [
        'Наш главный обычай — воровать одеяло.',
        'Традиции! По пятницам прячем пульт.',
        'У прадеда тоже была эта кружка. Наверное.',
      ],
      neutral: [
        'Старое или новое? Я даже носки не выбрал.',
        'Совет старейшин кротов опять ушёл на обед.',
        'Вопрос тонкий. Как стенка моей норы.',
      ],
    },
    world: {
      agree: [
        'Саммит нор открыт. Повестка: печенье.',
        'Соседний ёж просит совместный ужин.',
        'Дипломатия: я принёс чай, ёж — колючки.',
      ],
      disagree: [
        'Строю таможню у входа. Пропуск — морковка.',
        'Границы норы охраняет тапок.',
        'У меня суверенная нора. И общая кухня.',
      ],
      neutral: [
        'Переговоры с ежом сорваны. Он свернулся.',
        'Я пока нейтрален: чай пью со всеми.',
        'Дипломаты спорят. Я ищу сахар.',
      ],
    },
  },
};
function randomLine(lines){return lines[Math.floor(Math.random()*lines.length)];}
let lastReactionIndex=-10;
let reactionCount=0;
function maybeQueueReaction(questionIndex,value){
  // Only occasional jokes reacting to the answer just given; no answer is "right".
  if(questionIndex<2 || questionIndex>=QUESTIONS.length-1 ||
      questionIndex-lastReactionIndex<4 || reactionCount>=4 || Math.random()>.48)return;
  const stance=value>0?'agree':value<0?'disagree':'neutral';
  const lines=QUIPS.reactions[QUESTIONS[questionIndex].axis][stance];
  queuedQuip={text:randomLine(lines),kind:'reaction'};
  lastReactionIndex=questionIndex;reactionCount++;
}


const APP = document.getElementById('app');
const IS_EMBEDDED = window.parent !== window;
if (IS_EMBEDDED) document.documentElement.classList.add('in-iframe');
const STORAGE_KEY='anikursy-political-quiz-v1';
let state={screen:'start',index:0,answers:Array(QUESTIONS.length).fill(null),muted:false};
let audioPlaying=null;
let currentQuip=null;
let toastTimer;
let advanceTimer=null;
let queuedQuip=null;
function cancelAdvance(){if(advanceTimer!==null){clearTimeout(advanceTimer);advanceTimer=null;}}

function safeLoad(){
  try {
    const raw=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null');
    if(raw && Array.isArray(raw.answers) && [25,QUESTIONS.length].includes(raw.answers.length)){
      const okay=raw.answers.every(x=>x===null || [-2,-1,0,1,2].includes(x));
      if(okay){
        state.answers=raw.answers.concat(Array(QUESTIONS.length-raw.answers.length).fill(null));
        const previousComplete=raw.answers.length===25 && raw.answers.every(v=>v!==null);
        state.index=previousComplete?25:(Number.isInteger(raw.index)?Math.max(0,Math.min(QUESTIONS.length-1,raw.index)):0);
        state.muted=raw.muted===true;
      }
    }
  } catch(_){ /* Incognito and some embedded browsers disallow storage */ }
}
function save(){
  try { localStorage.setItem(STORAGE_KEY,JSON.stringify({answers:state.answers,index:state.index,muted:state.muted})); } catch(_){}
}
function answeredCount(){return state.answers.filter(x=>x!==null).length;}
function stopAudio(){
  if(audioPlaying){audioPlaying.pause();audioPlaying.currentTime=0;audioPlaying=null;}
  try { window.speechSynthesis?.cancel(); } catch(_){}
}
function speakFallback(text){
  if(state.muted || !('speechSynthesis' in window))return;
  try {
    const utterance=new SpeechSynthesisUtterance(text);
    utterance.lang='ru-RU'; utterance.rate=1.14; utterance.pitch=.7;
    const voices=speechSynthesis.getVoices();
    const ru=voices.find(x=>x.lang.toLowerCase().startsWith('ru'));
    if(ru)utterance.voice=ru;
    speechSynthesis.speak(utterance);
  }catch(_){}
}
function showQuipCard(quip){
  document.querySelector('.mole-appearance')?.remove();
  if(state.screen!=='question' || !quip?.text)return;
  const page=document.getElementById('page');
  if(!page)return;
  const label=quip.kind==='reaction'?'КРОТ ПРО ТВОЙ ОТВЕТ':'КРОТ ВЛЕЗ В ЭФИР';
  page.insertAdjacentHTML('beforeend', `<aside class="mole-appearance" aria-label="Реплика Крота">
    <button type="button" class="mole-close" id="mole-close" aria-label="Закрыть реплику">×</button>
    <img class="mole-pop-image" src="assets/mole-chaos.webp" alt="Крот комментирует">
    <div class="mole-pop-copy"><span class="mole-pop-label">${label}</span>
      <p data-mole-message>${escapeHtml(quip.text)}</p>
      <button type="button" class="replay-btn" id="replay-quep">↻ Слушать ещё</button>
    </div></aside>`);
  document.getElementById('mole-close')?.addEventListener('click',()=>{stopAudio();currentQuip=null;document.querySelector('.mole-appearance')?.remove();});
  document.getElementById('replay-quep')?.addEventListener('click',()=>playQuip(quip));
}
function playQuip(quip){
  if(!quip?.text)return;
  currentQuip=quip;
  if(state.screen==='question')showQuipCard(quip);
  else {
    const msg=document.querySelector('[data-mole-message]');
    if(msg)msg.textContent=quip.text;
  }
  stopAudio();
  if(!state.muted)speakFallback(quip.text);
}
function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
}
function iconClock(){return `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.9" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 3"/></svg>`;}
function header(showSound=true){
  return `<header class="site-header">
    <div class="brand-box">
      <a class="brand-link" href="https://anicourses.ru" target="_blank" rel="noopener noreferrer" title="Аникурсы — перейти на сайт"><img src="assets/anikursy-logo.png" alt="АНИКУРСЫ"></a>
    </div>
    <div class="header-actions"><span class="pill">Обществознание</span><button type="button" class="pill pink restart-control" id="header-restart" aria-label="Начать тест заново" title="Сбросить ответы и начать сначала">Начать заново</button>
      ${showSound?`<button class="sound-button" type="button" id="sound-toggle" aria-label="${state.muted?'Включить звук':'Выключить звук'}" title="${state.muted?'Включить звук':'Выключить звук'}">${state.muted?'🔇':'🔊'}</button>`:''}
    </div>
  </header>`;
}
function bindSound(){
 const restart=document.getElementById('header-restart');
 if(restart)restart.addEventListener('click',()=>{
   if(answeredCount()>0 && !window.confirm('Начать тест заново? Предыдущие ответы будут удалены.'))return;
   stopAudio();reset();state.screen='question';renderQuestion();
   lastReactionIndex=state.index;reactionCount=0;
   playQuip({text:randomLine(QUIPS.intro),kind:'intro'});
 });
 const btn=document.getElementById('sound-toggle');
 if(btn)btn.addEventListener('click',()=>{state.muted=!state.muted;save();if(state.muted)stopAudio();btn.textContent=state.muted?'🔇':'🔊';btn.setAttribute('aria-label',state.muted?'Включить звук':'Выключить звук');btn.title=state.muted?'Включить звук':'Выключить звук';});
}
function bindRerender(){
 // Only re-render interface; don't restart a voice track by entering a screen.
 if(state.screen==='start')renderStart();
 else if(state.screen==='question')renderQuestion();
 else renderResults();
}
function renderStart(){
  cancelAdvance();queuedQuip=null;document.documentElement.classList.remove('quiz-active');
  state.screen='start';
  const saved=answeredCount();
  const completed=saved===QUESTIONS.length;
  APP.innerHTML=`<main class="page-card" id="page">
    ${header()}
    <section class="hero slide-in" aria-labelledby="landing-title">
      <div class="hero-copy">
        <h1 id="landing-title">Какие у тебя <span class="highlight">политические</span> взгляды?</h1>
        <p class="subtitle">Пройди тест и узнай, к каким идеям ты ближе</p>
        <button class="primary-btn" type="button" id="start-button">${saved>0 && !completed?'Продолжить тест':'Начать тест'} <span class="arrow" aria-hidden="true">→</span></button>
        <div class="meta-line">${iconClock()} 7–10 минут · ${QUESTIONS.length} вопросов · без регистрации</div>
        <p class="help-note">Здесь нет правильных ответов: выбирай то, что тебе ближе.</p>
      </div>
      <div class="hero-art" aria-hidden="true"><div class="orange-blob"></div><img src="assets/mole-relax.webp" alt=""><span class="doodle">✦</span></div>
    </section>
  </main>`;
  bindSound();
  document.getElementById('start-button').addEventListener('click',()=>{
    if(completed)reset();
    state.screen='question';state.index=(saved>0 && !completed)?state.index:0;
    currentQuip=null;queuedQuip=null;renderQuestion();
    lastReactionIndex=state.index;reactionCount=0;
    playQuip({text:randomLine(QUIPS.intro),kind:'intro'});
  });
}
function renderQuestion(){
  cancelAdvance();document.documentElement.classList.add('quiz-active');
  state.screen='question';save();
  const idx=state.index, question=QUESTIONS[idx],selected=state.answers[idx],progress=Math.round((idx+(selected!==null?1:0))*100/QUESTIONS.length);
  const theme=idx%7;
  APP.innerHTML=`<main class="page-card quiz-card quiz-theme-${theme}" id="page">
    <div class="quiz-header">${header()}
      <div class="progress-heading"><span class="step-name">Вопрос ${idx+1} / ${QUESTIONS.length}</span></div>
      <div class="progress-track" role="progressbar" aria-label="Прогресс теста" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100"><div class="progress-fill" style="width:${progress}%"></div></div>
    </div>
    <section class="question-stage slide-in" aria-labelledby="question-title">
      <div class="question-copy">
        <h2 class="question-title${question.text.length>120?" long-question":""}" id="question-title">${escapeHtml(question.text)}</h2>
        <p class="question-hint">Насколько ты согласен с утверждением?</p>
        <div class="answers" role="radiogroup" aria-label="Выбери один ответ">
          ${ANSWER_LABELS.map((a,i)=>`<button type="button" class="answer ${selected===a.value?'selected':''}" role="radio" aria-checked="${selected===a.value}" data-value="${a.value}" aria-label="${a.label}"><span class="radio-circle"></span><span class="answer-label">${a.lines.map(escapeHtml).join('<br>')}</span></button>`).join('')}
        </div>
      </div>
      <div class="nav-controls">
        <button type="button" class="text-btn" id="back-button">← ${idx===0?'На главную':'Назад'}</button>
      </div>
    </section>
  </main>`;
  bindSound();
  if(currentQuip)showQuipCard(currentQuip);
  const answers=APP.querySelectorAll('.answer');
  answers.forEach(btn=>btn.addEventListener('click',()=>{
    if(advanceTimer!==null)return;
    const value=Number(btn.dataset.value);state.answers[idx]=value;save();
    answers.forEach(el=>{const on=Number(el.dataset.value)===value;el.classList.toggle('selected',on);el.setAttribute('aria-checked',String(on));el.disabled=true;});
    const updated=Math.round((idx+1)*100/QUESTIONS.length);
    document.querySelector('.progress-fill').style.width=`${updated}%`;
    document.querySelector('.progress-track').setAttribute('aria-valuenow',String(updated));
    maybeQueueReaction(idx,value);
    advanceTimer=setTimeout(()=>{advanceTimer=null;if(state.screen==='question' && state.index===idx)advance();},280);
  }));
  document.getElementById('back-button').addEventListener('click',()=>{
    cancelAdvance();queuedQuip=null;stopAudio();
    if(state.index===0){currentQuip=null;renderStart();return;}
    state.index-=1;currentQuip=null;renderQuestion();
  });
}
function advance(){
  if(state.screen!=='question' || state.answers[state.index]===null)return;
  stopAudio();
  if(state.index===QUESTIONS.length-1){currentQuip=null;renderResults();return;}
  state.index+=1; currentQuip=null;
  renderQuestion();
  const quip=queuedQuip;queuedQuip=null;
  if(quip)playQuip(quip);
}
function getScores(){
  const scores={};
  for(const axis of AXES){
    const indexes=QUESTIONS.map((q,i)=>({q,i})).filter(x=>x.q.axis===axis.key);
    let points=0;
    for(const {q,i} of indexes){points+=(state.answers[i]??0)*q.polarity;}
    const percentage=Math.max(0,Math.min(100,Math.round(50+(points/(indexes.length*2))*50)));
    scores[axis.key]=percentage;
  }
  return scores;
}
const AXIS_INTERPRETATIONS = {
  "economy": {
    "left": [
      "Государство активнее участвует в экономике",
      "Ты чаще за регулирование компаний, доступные общественные услуги и социальные гарантии."
    ],
    "right": [
      "Больше свободы для рынка",
      "Ты чаще за самостоятельность бизнеса, конкуренцию и более ограниченное государственное вмешательство."
    ],
    "center": [
      "Сочетание разных подходов",
      "В одних вопросах ты за участие государства, в других — за свободный рынок."
    ]
  },
  "freedoms": {
    "left": [
      "Важнее личные свободы",
      "Ты чаще поддерживаешь свободу слова и собраний, а также контроль над действиями власти."
    ],
    "right": [
      "Важнее безопасность и порядок",
      "Ты чаще допускаешь расширение полномочий государства ради порядка и безопасности."
    ],
    "center": [
      "Баланс свободы и безопасности",
      "По разным вопросам ты выбирал и защиту гражданских свобод, и полномочия власти."
    ]
  },
  "society": {
    "left": [
      "Ближе к общественным переменам",
      "Ты чаще за обновление общественных норм и свободу личного выбора."
    ],
    "right": [
      "Ближе к сохранению традиций",
      "Ты чаще считаешь важным сохранять привычные нормы и культурные традиции."
    ],
    "center": [
      "Между переменами и традициями",
      "Одни традиции ты готов сохранять, другие общественные нормы — пересматривать."
    ]
  },
  "world": {
    "left": [
      "Ближе к международному сотрудничеству",
      "Ты чаще за договорённости и совместные проекты разных стран."
    ],
    "right": [
      "Ближе к самостоятельности страны",
      "Ты чаще за независимость решений страны от международных объединений."
    ],
    "center": [
      "Сотрудничество и самостоятельность",
      "Твои ответы сочетают поддержку международных договорённостей и свободы решений страны."
    ]
  }
};
function axisInterpretation(axis,score){
  const direction=score>=57?'left':score<=43?'right':'center';
  const [title,description]=AXIS_INTERPRETATIONS[axis.key][direction];
  const strength=(direction==='center')?'mixed':(Math.abs(score-50)>=18?'clear':'mild');
  const label=direction==='center'?'Нет явного уклона':strength==='mild'?('Небольшой уклон: '+title.toLowerCase()):title;
  return {label,description,direction};
}
function resultSummary(scores){
  const neutral=state.answers.filter(v=>v===0).length;
  if(neutral>=12)return 'Ты часто выбирал «Трудно ответить», поэтому некоторые позиции пока не определились. Ниже — расшифровка остальных ответов.';
  const candidates=AXES.map(axis=>({axis,score:scores[axis.key],distance:Math.abs(scores[axis.key]-50)})).sort((a,b)=>b.distance-a.distance);
  const strongest=candidates[0];
  if(strongest.distance<12)return 'Твои ответы оказались разными в зависимости от темы. Это не обязательно «центристская» позиция — посмотри расшифровку каждой шкалы.';
  return `Наиболее заметный уклон у тебя в теме «${strongest.axis.title.toLowerCase()}»: ${axisInterpretation(strongest.axis,strongest.score).label.toLowerCase()}. Остальные направления смотри ниже.`;
}
function renderResults(){
  cancelAdvance();queuedQuip=null;document.documentElement.classList.remove('quiz-active');
  state.screen='result';save();
  const scores=getScores();
  APP.innerHTML=`<main class="page-card results-card" id="page">
     ${header()}
     <section class="slide-in">
      <div class="results-heading"><div>
        <h1 class="results-title">Твоя политическая <span style="color:var(--pink)">карта</span></h1>
        <p class="results-lead">${escapeHtml(resultSummary(scores))}</p>
        <p class="results-guide">Значок показывает, в какую сторону склоняются твои ответы. Середина шкалы означает, что явного уклона нет.</p>
      </div><img class="results-mole" src="assets/mole-relax.webp" alt="Крот смотрит на результаты"></div>
      <div class="results-list">
        ${AXES.map(axis=>{
          const score=scores[axis.key],meaning=axisInterpretation(axis,score),markerPos=4+(100-score)*.92;
          return `<article class="axis-card" style="--axis-color:${axis.color}">
            <div class="axis-header"><span class="axis-heading">${axis.title}</span><span class="axis-short">${axis.short}</span></div>
            <div class="axis-labels"><span>${axis.left}</span><span>${axis.right}</span></div>
            <div class="axis-line" role="img" aria-label="Положение на шкале: ${escapeHtml(meaning.label)}">
              <span class="axis-mid-line" aria-hidden="true"></span>
              <svg class="axis-pin" style="left:${markerPos}%" viewBox="0 0 24 30" width="30" height="38" aria-hidden="true"><path d="M12 1.5C6.1 1.5 2 5.8 2 11c0 7.1 10 17.5 10 17.5S22 18.1 22 11C22 5.8 17.9 1.5 12 1.5Z" fill="var(--axis-color)" stroke="#242426" stroke-width="1.2"/><circle cx="12" cy="11" r="4" fill="white"/></svg>
            </div>
            <div class="axis-interpretation"><strong class="axis-tendency">${escapeHtml(meaning.label)}</strong><p class="axis-explanation">${escapeHtml(meaning.description)}</p></div>
          </article>`;
        }).join('')}
      </div>
      <div class="results-footer">
       <div class="disclaimer">Это развлекательный образовательный тест, а не научная диагностика или характеристика личности. Отметки показывают распределение твоих ответов на 30 утверждений, а не научно установленную политическую принадлежность. Ни одна из позиций не считается правильной или неправильной. Ответы не отправляются на сервер.</div>
       <div class="results-actions"><button class="secondary-btn" type="button" id="copy-button">↗ Скопировать результат</button><button class="primary-btn" type="button" id="retry-button">Пройти ещё раз <span class="arrow">↻</span></button></div>
      </div>
    </section>
  </main><div class="toast" id="toast" role="status"></div>`;
  bindSound();
  document.getElementById('retry-button').addEventListener('click',()=>{stopAudio();reset();renderStart();});
  document.getElementById('copy-button').addEventListener('click',async()=>{
   const text=`Моя политическая карта — тест АНИКУРСОВ\n${AXES.map(a=>`${a.title}: ${axisInterpretation(a,scores[a.key]).label}`).join('\n')}\nПройди тест: ${location.href.split('#')[0]}`;
   try { await navigator.clipboard.writeText(text);toast('Результат скопирован!'); }
   catch(_) {const area=document.createElement('textarea');area.value=text;document.body.appendChild(area);area.select();const success=document.execCommand('copy');area.remove();toast(success?'Результат скопирован!':'Не удалось скопировать автоматически');}
  });
}
function toast(msg){
 const el=document.getElementById('toast');if(!el)return;
 el.textContent=msg;el.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('visible'),2400);
}
function reset(){cancelAdvance();queuedQuip=null;state.answers=Array(QUESTIONS.length).fill(null);state.index=0;lastReactionIndex=-10;reactionCount=0;currentQuip=null;save();}
window.addEventListener('keydown',e=>{
 if(state.screen!=='question' || e.altKey||e.ctrlKey||e.metaKey||['INPUT','TEXTAREA'].includes(document.activeElement?.tagName))return;
 if(['1','2','3','4','5'].includes(e.key)){
  const btn=APP.querySelectorAll('.answer')[Number(e.key)-1];if(btn){btn.click();e.preventDefault();}
 }
 if(e.key==='ArrowLeft' && document.activeElement?.tagName!=='BUTTON'){
  document.getElementById('back-button')?.click();e.preventDefault();
 }
});
window.addEventListener('beforeunload',stopAudio);
safeLoad();renderStart();
// When framed in Tilda, report the document height so Tilda can resize the iframe.
if (IS_EMBEDDED) {
  const reportHeight = () => {
    window.parent.postMessage({type:'anikursyQuizHeight',height:Math.ceil(APP.scrollHeight)},'*');
  };
  if ('ResizeObserver' in window) new ResizeObserver(reportHeight).observe(APP);
  reportHeight();
}