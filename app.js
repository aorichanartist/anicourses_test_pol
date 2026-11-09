'use strict';

/*
 * Аникурсы: тест политических взглядов (демоверсия 1.0)
 * Вопросы оригинальные; концепция 4 осей вдохновлена 8values / Pew.
 * Ответы: 1 = скорее да, 0 = трудно ответить, -1 = скорее нет.
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
];

const AXES = [
  { key:'economy',   title:'ЭКОНОМИКА',               short:'Кто регулирует экономику', left:'Госучастие',        right:'Свободный рынок',         color:'#ff681f' },
  { key:'freedoms',  title:'СВОБОДЫ И БЕЗОПАСНОСТЬ',  short:'Свободы и полномочия власти', left:'Личные свободы',    right:'Госполномочия',          color:'#e74779' },
  { key:'society',   title:'ОБЩЕСТВЕННЫЕ ЦЕННОСТИ',   short:'Отношение к изменениям', left:'Перемены',          right:'Традиции',              color:'#ff891c' },
  { key:'world',     title:'МЕЖДУНАРОДНЫЕ ОТНОШЕНИЯ', short:'Отношения между странами', left:'Сотрудничество',    right:'Самостоятельность',     color:'#dd547e' },
];

const ANSWER_LABELS = [
  { value:1, label:'Скорее да' },
  { value:0, label:'Трудно ответить' },
  { value:-1, label:'Скорее нет' },
];

const QUIPS = {
  intro: { text:'Так, юный политолог! Я тут главный эксперт. Меня даже с дивана не выгнали.', file:'intro.mp3' },
  q4: { text:'Четыре вопроса! А я уже устал сильнее, чем после трёх минут работы.', file:'q4.mp3' },
  q7: { text:'Мой политический курс простой: сначала обед, потом государственные дела.', file:'q7.mp3' },
  q10: { text:'Тишина в кабинете! Здесь мыслит великий крот. Ну, почти.', file:'q10.mp3' },
  q13: { text:'Если что, я тоже центр. Центр дивана.', file:'q13.mp3' },
  q16: { text:'Я за свободу! Особенно свободу от домашки.', file:'q16.mp3' },
  q19: { text:'Моя партия называется «Поспим ещё пять минут». Пока нас двое.', file:'q19.mp3' },
  q22: { text:'Осталось чуть-чуть. Я бы на твоём месте уже потребовал печеньку.', file:'q22.mp3' },
  q25: { text:'Последний вопрос! Сейчас узнаем, кто тут самый политический.', file:'q25.mp3' },
  unsure: { text:'Трудно ответить? Уважаю. Я так отвечал на вопрос, сколько будет два плюс два.', file:'unsure.mp3' },
  result: { text:'Готово! Твой политический портрет. Себе я, кстати, нарисовал корону.', file:'result.mp3' },
};

const APP = document.getElementById('app');
const IS_EMBEDDED = window.parent !== window;
if (IS_EMBEDDED) document.documentElement.classList.add('in-iframe');
const STORAGE_KEY='anikursy-political-quiz-v1';
let state={screen:'start',index:0,answers:Array(QUESTIONS.length).fill(null),muted:false};
let audioPlaying=null;
let currentQuip=null;
let unsureQuipPlayed=false;
let toastTimer;

function safeLoad(){
  try {
    const raw=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null');
    if(raw && Array.isArray(raw.answers) && raw.answers.length===QUESTIONS.length){
      const okay=raw.answers.every(x=>x===null || x===1 || x===0 || x===-1);
      if(okay){
        state.answers=raw.answers;
        state.index=Number.isInteger(raw.index)?Math.max(0,Math.min(QUESTIONS.length-1,raw.index)):0;
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
function showQuipCard(key){
  document.querySelector('.mole-appearance')?.remove();
  if(state.screen!=='question' || !QUIPS[key]) return;
  const page=document.getElementById('page');
  if(!page) return;
  page.insertAdjacentHTML('beforeend', `<aside class="mole-appearance" aria-label="Реплика Крота">
    <button type="button" class="mole-close" id="mole-close" aria-label="Закрыть реплику">×</button>
    <img class="mole-pop-image" src="assets/mole-chaos.webp" alt="Крот внезапно влез в тест">
    <div class="mole-pop-copy"><span class="mole-pop-label">КРОТ ВЛЕЗ В ЭФИР</span>
      <p data-mole-message>${escapeHtml(QUIPS[key].text)}</p>
      <button type="button" class="replay-btn" id="replay-quep">↻ Слушать ещё</button>
    </div></aside>`);
  document.getElementById('mole-close')?.addEventListener('click',()=>{stopAudio();currentQuip=null;document.querySelector('.mole-appearance')?.remove();});
  document.getElementById('replay-quep')?.addEventListener('click',()=>playQuip(key,true));
}
function playQuip(key, force=false){
  if(!QUIPS[key])return;
  currentQuip=key;
  if(state.screen==='question')showQuipCard(key);
  else {
    const msg=document.querySelector('[data-mole-message]');
    if(msg) msg.textContent=QUIPS[key].text;
  }
  stopAudio();
  if(state.muted)return;
  speakFallback(QUIPS[key].text);
}
function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
}
function iconClock(){return `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.9" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 3"/></svg>`;}
function header(showSound=true){
  return `<header class="site-header">
    <div class="brand-box">
      <a class="brand-link" href="https://anicourses.ru" target="_blank" rel="noopener noreferrer" title="Аникурсы — перейти на сайт"><img src="assets/anikursy-logo.png" alt="АНИКУРСЫ"></a>
      <div class="brand-caption">подготовка к ЕГЭ/ОГЭ на высокие баллы</div>
    </div>
    <div class="header-actions"><span class="pill">Обществознание</span><span class="pill pink">Тест</span>
      ${showSound?`<button class="sound-button" type="button" id="sound-toggle" aria-label="${state.muted?'Включить звук':'Выключить звук'}" title="${state.muted?'Включить звук':'Выключить звук'}">${state.muted?'🔇':'🔊'}</button>`:''}
    </div>
  </header>`;
}
function bindSound(){
 const btn=document.getElementById('sound-toggle');
 if(btn)btn.addEventListener('click',()=>{state.muted=!state.muted;save();if(state.muted)stopAudio();bindRerender();});
}
function bindRerender(){
 // Only re-render interface; don't restart a voice track by entering a screen.
 if(state.screen==='start')renderStart();
 else if(state.screen==='question')renderQuestion();
 else renderResults();
}
function renderStart(){
  state.screen='start';
  const saved=answeredCount();
  APP.innerHTML=`<main class="page-card" id="page">
    ${header()}
    <section class="hero slide-in" aria-labelledby="landing-title">
      <div class="hero-copy">
        <h1 id="landing-title">Какие у тебя <span class="highlight">политические</span> взгляды?</h1>
        <p class="subtitle">Пройди тест и узнай, к каким идеям ты ближе</p>
        <button class="primary-btn" type="button" id="start-button">${saved>0?'Продолжить тест':'Начать тест'} <span class="arrow" aria-hidden="true">→</span></button>
        ${saved>0?`<button class="text-btn" id="restart-button" type="button">Начать заново</button>`:''}
        <div class="meta-line">${iconClock()} 5–8 минут · 25 вопросов · без регистрации</div>
        <p class="help-note">Здесь нет правильных ответов: выбирай то, что тебе ближе.</p>
      </div>
      <div class="hero-art" aria-hidden="true"><div class="orange-blob"></div><img src="assets/mole-relax.webp" alt=""><span class="doodle">✦</span></div>
    </section>
  </main>`;
  bindSound();
  document.getElementById('start-button').addEventListener('click',()=>{state.screen='question';state.index=saved>0?state.index:0;currentQuip=null;renderQuestion();});
  const restart=document.getElementById('restart-button');
  if(restart)restart.addEventListener('click',()=>{reset();state.screen='question';currentQuip=null;renderQuestion();});
}
function renderQuestion(){
  state.screen='question';save();
  const idx=state.index, question=QUESTIONS[idx],selected=state.answers[idx],progress=Math.round((idx+(selected!==null?1:0))*100/QUESTIONS.length);
  const theme=idx%7;
  APP.innerHTML=`<main class="page-card quiz-card quiz-theme-${theme}" id="page">
    <div class="quiz-header">${header()}
      <div class="progress-heading"><span class="step-name">Вопрос ${idx+1} / ${QUESTIONS.length}</span><span>Пройдено ${progress}%</span></div>
      <div class="progress-track" role="progressbar" aria-label="Прогресс теста" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100"><div class="progress-fill" style="width:${progress}%"></div></div>
    </div>
    <section class="question-stage slide-in" aria-labelledby="question-title">
      <div class="question-copy">
        <div class="topic-kicker">ТВОЯ ПОЗИЦИЯ · ${String(idx+1).padStart(2,'0')}</div>
        <h2 class="question-title" id="question-title">${escapeHtml(question.text)}</h2>
        <p class="question-hint">Насколько ты согласен с утверждением?</p>
        <div class="answers" role="radiogroup" aria-label="Выбери один ответ">
          ${ANSWER_LABELS.map((a,i)=>`<button type="button" class="answer ${selected===a.value?'selected':''}" role="radio" aria-checked="${selected===a.value}" data-value="${a.value}" aria-label="${a.label}"><span class="radio-circle"></span><span>${a.label}</span></button>`).join('')}
        </div>
      </div>
      <div class="nav-controls">
        <button type="button" class="text-btn" id="back-button">← ${idx===0?'На главную':'Назад'}</button>
        <button type="button" class="primary-btn quiz-next" id="next-button" ${selected===null?'disabled':''}>${idx===QUESTIONS.length-1?'Узнать результат':'Далее'} <span class="arrow" aria-hidden="true">→</span></button>
      </div>
    </section>
  </main>`;
  bindSound();
  if(currentQuip && QUIPS[currentQuip])showQuipCard(currentQuip);
  const answers=APP.querySelectorAll('.answer');
  answers.forEach(btn=>btn.addEventListener('click',()=>{
    const value=Number(btn.dataset.value);state.answers[idx]=value;save();
    answers.forEach(el=>{const on=Number(el.dataset.value)===value;el.classList.toggle('selected',on);el.setAttribute('aria-checked',String(on));});
    const next=document.getElementById('next-button');next.disabled=false;
    document.querySelector('.progress-heading span:last-child').textContent=`Пройдено ${Math.round((idx+1)*100/QUESTIONS.length)}%`;
    document.querySelector('.progress-fill').style.width=`${Math.round((idx+1)*100/QUESTIONS.length)}%`;
    document.querySelector('.progress-track').setAttribute('aria-valuenow',String(Math.round((idx+1)*100/QUESTIONS.length)));
    const neutralCount=state.answers.filter(x=>x===0).length;
    if(value===0 && neutralCount>=4 && !unsureQuipPlayed){unsureQuipPlayed=true;playQuip('unsure');}
  }));
  document.getElementById('next-button').addEventListener('click',advance);
  document.getElementById('back-button').addEventListener('click',()=>{
    stopAudio();
    if(state.index===0){currentQuip=null;renderStart();return;}
    state.index-=1;currentQuip=null;renderQuestion();
  });
}
function advance(){
  if(state.screen!=='question' || state.answers[state.index]===null)return;
  stopAudio();
  if(state.index===QUESTIONS.length-1){currentQuip=null;renderResults();playQuip('result');return;}
  state.index+=1; currentQuip=null;
  renderQuestion();
  const n=state.index+1;
  const key='q'+n;
  if(QUIPS[key] && [4,10,16,22,25].includes(n))playQuip(key);
}
function getScores(){
  const scores={};
  for(const axis of AXES){
    const indexes=QUESTIONS.map((q,i)=>({q,i})).filter(x=>x.q.axis===axis.key);
    let points=0;
    for(const {q,i} of indexes){points+=(state.answers[i]??0)*q.polarity;}
    const percentage=Math.max(0,Math.min(100,Math.round(50+(points/indexes.length)*50)));
    scores[axis.key]=percentage;
  }
  return scores;
}
function resultSummary(scores){
  const extremes=AXES.map(a=>({a,score:scores[a.key],deviation:Math.abs(scores[a.key]-50)})).filter(x=>x.deviation>=16).sort((a,b)=>b.deviation-a.deviation);
  if(state.answers.filter(x=>x===0).length>=12) return 'Ты пока оставляешь многие вопросы открытыми — и это нормально. На шкалах ниже видно, где позиция определилась, а где ещё есть над чем подумать.';
  if(!extremes.length)return 'Твои ответы оказались близки к середине нескольких шкал. Возможно, ты выбираешь разные подходы в зависимости от ситуации.';
  const first=extremes[0];
  const direction=first.score>50?first.a.left.toLowerCase():first.a.right.toLowerCase();
  return `Сильнее всего в ответах проявилась склонность к позиции «${direction}» в разделе «${first.a.title.toLowerCase()}». Остальные шкалы показывают, в чём твои взгляды совпадают с разными подходами.`;
}
function axisComment(score){
  if(score>=67)return 'Ближе к позиции слева';
  if(score<=33)return 'Ближе к позиции справа';
  return 'Смешанная или умеренная позиция';
}
function renderResults(){
  state.screen='result';save();
  const scores=getScores();
  APP.innerHTML=`<main class="page-card results-card" id="page">
     ${header()}
     <section class="slide-in">
      <div class="results-heading"><div><div class="hero-eyebrow">25 из 25 · тест завершён</div>
       <h1 class="results-title">Твоя политическая <span style="color:var(--pink)">карта</span></h1>
       <p class="results-lead">${escapeHtml(resultSummary(scores))}</p><div class="mole-caption results-quip" data-mole-message>Крот готовит торжественную речь...</div></div>
       <img class="results-mole" src="assets/mole-relax.webp" alt="Довольный Крот завершил подсчёт">
      </div>
      <div class="results-list">
       ${AXES.map(a=>{const p=scores[a.key];return `<div class="axis-card">
         <div class="axis-header"><span class="axis-heading">${a.title}</span><span class="axis-short">${a.short}</span></div>
         <div class="axis-labels"><span>${a.left} <strong>${p}%</strong></span><span><strong>${100-p}%</strong> ${a.right}</span></div>
         <div class="axis-bar" role="img" aria-label="${a.left} ${p} процентов, ${a.right} ${100-p} процентов"><div class="left-fill" style="width:${p}%;background:${a.color}"></div><span class="mid-line"></span></div>
         <div class="axis-summary">${axisComment(p)}</div>
       </div>`;}).join('')}
      </div>
      <div class="results-footer">
       <div class="disclaimer">Это развлекательный образовательный тест, а не научная диагностика или характеристика личности. Проценты отражают только твои ответы на эти 25 утверждений. Они не определяют политическую принадлежность и не означают, что одна позиция лучше другой. Ответы не отправляются на сервер.</div>
       <div class="results-actions"><button class="secondary-btn" type="button" id="copy-button">↗ Скопировать результат</button><button class="primary-btn" type="button" id="retry-button">Пройти ещё раз <span class="arrow">↻</span></button></div>
      </div>
    </section>
  </main><div class="toast" id="toast" role="status"></div>`;
  bindSound();
  document.getElementById('retry-button').addEventListener('click',()=>{stopAudio();reset();renderStart();});
  document.getElementById('copy-button').addEventListener('click',async()=>{
   const text=`Мой результат в тесте АНИКУРСОВ «Какие у тебя политические взгляды?»\n${AXES.map(a=>`${a.title}: ${a.left} ${scores[a.key]}% / ${a.right} ${100-scores[a.key]}%`).join('\n')}\nПройди тест: ${location.href.split('#')[0]}`;
   try { await navigator.clipboard.writeText(text);toast('Результат скопирован!'); }
   catch(_) {const area=document.createElement('textarea');area.value=text;document.body.appendChild(area);area.select();const success=document.execCommand('copy');area.remove();toast(success?'Результат скопирован!':'Не удалось скопировать автоматически');}
  });
}
function toast(msg){
 const el=document.getElementById('toast');if(!el)return;
 el.textContent=msg;el.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('visible'),2400);
}
function reset(){state.answers=Array(QUESTIONS.length).fill(null);state.index=0;unsureQuipPlayed=false;currentQuip=null;save();}
window.addEventListener('keydown',e=>{
 if(state.screen!=='question' || e.altKey||e.ctrlKey||e.metaKey||['INPUT','TEXTAREA'].includes(document.activeElement?.tagName))return;
 if(['1','2','3'].includes(e.key)){
  const btn=APP.querySelectorAll('.answer')[Number(e.key)-1];if(btn){btn.click();e.preventDefault();}
 }
 if(e.key==='Enter' && document.activeElement?.tagName!=='BUTTON'){
   const next=document.getElementById('next-button');if(next && !next.disabled){next.click();e.preventDefault();}
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