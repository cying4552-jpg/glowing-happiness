(()=>{
  const style=document.createElement('link');style.rel='stylesheet';style.href='enhancement.css';document.head.append(style);
  // Each visit starts as a fresh journey; preferences and stamps live only for the current page.
  try{['shishi-journey','shishi-saved-stops','shishi-guide-open','shishi-footsteps'].forEach(key=>localStorage.removeItem(key));sessionStorage.removeItem('shishi-music-enabled')}catch{}

  const replaceDistance=root=>{
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
    nodes.forEach(n=>{n.nodeValue=n.nodeValue.replace(/约两公里/g,'约2.5公里').replace(/大约两公里/g,'大约2.5公里').replace(/离塔大约两公里/g,'离塔大约2.5公里').replace(/距离大约两公里/g,'距离大约2.5公里').replace(/距离姑嫂塔大约两公里/g,'距离姑嫂塔大约2.5公里')});
  };
  const correctVillageRelation=text=>text
    .replace(/姑嫂塔山下方的村子/g,'村后山顶的姑嫂塔')
    .replace(/姑嫂塔山下的村子/g,'村后山顶的姑嫂塔')
    .replace(/我家所在的村子就在姑嫂塔山下方/g,'我家所在的村子位于姑嫂塔所在山体前方')
    .replace(/我家所在的村子位于姑嫂塔山下方/g,'我家所在的村子位于姑嫂塔所在山体前方')
    .replace(/她家所在的村子就在姑嫂塔山下方/g,'她家所在的村子位于姑嫂塔所在山体前方')
    .replace(/因为我家所在的村子就在姑嫂塔山下方/g,'因为我家所在的村子位于姑嫂塔所在山体前方')
    .replace(/我家所在的绿郊村子/g,'我家所在的村子')
    .replace(/她家所在的绿郊村子/g,'她家所在的村子')
    .replace(/一个在姑嫂塔山下村子长大的石狮女孩/g,'一个在姑嫂塔后山前方村子长大的石狮女孩')
    .replace(/一个在姑嫂塔后山前方村子长大的石狮女孩/g,'一个在村后望着姑嫂塔长大的石狮女孩')
    .replace(/山下方村子的童年/g,'村后那座熟悉的塔')
    .replace(/塔下邻居/g,'村里邻居')
    .replace(/山前邻居/g,'村里邻居');
  const correctTree=root=>{const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);nodes.forEach(n=>n.nodeValue=correctVillageRelation(n.nodeValue))};
  replaceDistance(document.body);
  const initialDayTitle=document.querySelector('#day-title');
  if(initialDayTitle)initialDayTitle.textContent='清晨，从一碗面线糊开始。';
  correctTree(document.body);
  const metaDescription=document.querySelector('meta[name="description"]');if(metaDescription)metaDescription.content='从村后约2.5公里外的姑嫂塔，到海中的洛伽寺，再到热闹的服装城。一个石狮女孩的家乡介绍。';
  if(typeof places!=='undefined')places.forEach(place=>place.pages.forEach(page=>{page.title=correctVillageRelation(page.title.replace(/约两公里/g,'约2.5公里'));page.text=correctVillageRelation(page.text.replace(/大约两公里/g,'大约2.5公里').replace(/约两公里/g,'约2.5公里'))}));
  const refreshDistance=()=>{
    replaceDistance(document.body);
    if(typeof places!=='undefined')places.forEach(place=>place.pages.forEach(page=>{page.title=correctVillageRelation(page.title.replace(/约两公里/g,'约2.5公里'));page.text=correctVillageRelation(page.text.replace(/大约两公里/g,'大约2.5公里').replace(/约两公里/g,'约2.5公里'))}));
    window.townExperience?.npcs?.forEach(n=>{n.name=correctVillageRelation(n.name);n.line=correctVillageRelation(n.line.replace(/大约两公里/g,'大约2.5公里').replace(/约两公里/g,'约2.5公里'))});
    const grandpa=window.townExperience?.npcs?.[0];
    if(grandpa){
      grandpa.name='陈阿公 · 村里邻居';
      grandpa.line='来啦，慢慢走。姑嫂塔就在村后那片山的山顶，从村子过去大约2.5公里。小时候那里的热闹，讲起来还有好多话呢。';
      const label=document.querySelectorAll('.npc span')[0];if(label)label.innerHTML='陈阿公 · 村里邻居 <b>⋯</b>';
    }
  };
  setTimeout(refreshDistance,0);window.addEventListener('town-arrive',refreshDistance);
  new MutationObserver(records=>records.forEach(r=>r.addedNodes.forEach(n=>{if(n.nodeType===1){replaceDistance(n);correctTree(n)}}))).observe(document.body,{childList:true,subtree:true});

  const intro=document.querySelector('.intro');
  if(intro){
    const geo=document.createElement('section');geo.className='village-distance';geo.id='home-distance';geo.setAttribute('aria-labelledby','distance-title');
    geo.innerHTML=`<div class="distance-copy"><span class="story-mark memory-mark">我记得</span><p class="eyebrow">MY VIEW OF HOME / 后山前方两公里半</p><h2 id="distance-title">塔在后山山顶，<br>家在山体前方。</h2><p>我家所在的村子在姑嫂塔所在山体的前方，村子到姑嫂塔大约2.5公里。我们习惯把那座山简称为“后山”；家并不在山体里面，而是在山体前方的村落。</p><blockquote>对游客来说，它是一处古迹；<br>对我来说，它是抬头就能辨认的家乡坐标。</blockquote></div><div class="distance-landscape" aria-label="姑嫂塔山顶与山体前方村落的艺术化关系示意"><div class="distance-sun"></div><div class="distance-cloud c1"></div><div class="distance-cloud c2"></div><svg viewBox="0 0 760 330" role="img" aria-label="姑嫂塔在后山山顶，村落在山体前方，相距约2.5公里"><defs><linearGradient id="mountainWash" x2="0" y2="1"><stop stop-color="#658070" stop-opacity=".3"/><stop offset="1" stop-color="#294b42" stop-opacity=".75"/></linearGradient></defs><path class="far-hill" d="M0 236 Q120 129 231 213 Q340 76 461 210 Q572 113 760 228 L760 330 L0 330Z"/><path class="near-hill" d="M0 270 Q150 195 280 266 Q430 177 570 258 Q660 210 760 249 L760 330 L0 330Z"/><path class="path-line" d="M210 109 C282 145 309 194 363 221 S465 270 536 285"/><g class="tower-icon" transform="translate(185 54)"><path d="M-24 91H24L21 25H-21ZM-27 92H27M-24 72H24M-23 53H23M-22 34H22M-29 25L0 10L29 25M-20 10L0 0L20 10"/></g><g class="village-icon" transform="translate(533 250)"><path d="M-62 42V10L-31-10L0 10V42M-44 42V22H-22V42M8 42V19L36 2L64 19V42M28 42V27H45V42M-72 43H73"/></g></svg><div class="distance-label tower-label"><b>姑嫂塔</b><span>后山山顶</span></div><div class="distance-label village-label"><b>我的村子</b><span>山体前方 · 不标注精确位置</span></div><div class="distance-number"><strong>约 2.5 km</strong><span>一段熟悉的路</span></div><i class="walker-dot" aria-hidden="true"></i></div>`;
    // Keep this inside the existing chapter: the atlas maps top-level sections
    // by index, so inserting another main child would stop player initialization.
    intro.append(geo);
    geo.querySelector('#distance-title').innerHTML='村子在前，<br>姑嫂塔在后山。';
    geo.querySelector('.eyebrow').textContent='MY VIEW OF HOME / 村前日常 · 后山古塔';
    geo.querySelector('.distance-copy>p:not(.eyebrow)').textContent='我家所在的村子位于姑嫂塔所在山体前方，属于城郊村落，周围较为开阔，也有现代村居和道路建设。村子并不在山体或山脚之中；因为村后就是这片山体，日常可以把它简称为“后山”。从村子到姑嫂塔大约2.5公里。';
    geo.querySelector('.village-label b').textContent='我的村子';
    geo.querySelector('.village-label span').textContent='山体前方 · 村后是山';
    geo.querySelector('.distance-number span').textContent='从村子前往后山古塔';
    geo.querySelector('.distance-landscape').setAttribute('aria-label','村子位于姑嫂塔所在山体前方，村后是山体，到塔约2.5公里的艺术化关系示意');
    geo.querySelector('svg').setAttribute('aria-label','村子在前，村后是山体，姑嫂塔位于后山山顶，两地相距约2.5公里');
  }

  const classify=()=>{
    const book=document.querySelector('#book-content');if(!book)return;
    const eyebrow=book.querySelector('.book-text .eyebrow');if(!eyebrow||book.querySelector('.story-mark'))return;
    const txt=eyebrow.textContent;let type='地方档案',cls='archive-mark';
    if(/传说|名字里的牵挂/.test(txt)){type='民间传说';cls='legend-mark'}
    else if(/我的|日常|镜头/.test(txt)){type='我记得';cls='memory-mark'}
    eyebrow.insertAdjacentHTML('beforebegin',`<span class="story-mark ${cls}">${type}</span>`);
  };
  const book=document.querySelector('#book-content');if(book)new MutationObserver(classify).observe(book,{childList:true,subtree:true});

  const mountTown=()=>{
    const controls=document.querySelector('.town-buttons'),help=document.querySelector('.town-help');if(!controls||controls.dataset.refined)return;
    controls.dataset.refined='true';
    const toggle=document.createElement('button');toggle.id='town-tools-toggle';toggle.textContent='游览方式 ▾';toggle.setAttribute('aria-expanded','false');controls.prepend(toggle);
    toggle.onclick=()=>{const open=controls.classList.toggle('tools-open');toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'收起工具 ▴':'游览方式 ▾'};
    const daily=document.createElement('button');daily.id='town-daily';daily.textContent='石狮的一天';daily.setAttribute('aria-label','打开石狮的一天与我的记忆');daily.onclick=()=>window.dispatchEvent(new CustomEvent('town-open',{detail:9}));controls.append(daily);
    const dailyPin=document.querySelector('[data-explore="9"] .pin-label');if(dailyPin)dailyPin.innerHTML='<small>从清晨走到归家 · 再听小时候与后来</small><strong>石狮的一天与我的记忆</strong><em>探索 ＋</em>';
    const dailyDirectory=document.querySelector('[data-destination="9"]');if(dailyDirectory)dailyDirectory.innerHTML='石狮的一天与我的记忆<small>从清晨走到归家 · 再听小时候与后来</small>';
    let met=new Set;try{met=new Set(JSON.parse(localStorage.getItem('shishi-journey')||'[]'))}catch{}
    const notebook=document.createElement('aside');notebook.className='journey-notebook';notebook.innerHTML='<button class="notebook-toggle" aria-expanded="false">行程册 <b>0/6</b></button><div class="notebook-sheet"><small>石狮行旅</small><h3>这一程，慢慢认识家乡。</h3><div class="notebook-stamps"></div><p class="notebook-next"></p></div>';
    document.body.append(notebook);const names=['塔','街','海','衣','味','影'];
    const render=()=>{notebook.querySelector('.notebook-toggle b').textContent=`${met.size}/6`;notebook.querySelector('.notebook-stamps').innerHTML=names.map((x,i)=>`<i class="${met.has(i)?'met':''}">${x}</i>`).join('');const next=[0,1,2,3,4,5].find(i=>!met.has(i));notebook.querySelector('.notebook-next').textContent=next==null?'六位街坊都见过了，家书印章已经完整。':`下一位可拜访：${['陈阿公','阿蓉姐','小林','许老板','阿玉姨','周伯'][next]}`;document.body.classList.toggle('journey-complete',met.size===6)};
    notebook.querySelector('.notebook-toggle').onclick=()=>{const open=notebook.classList.toggle('open');notebook.querySelector('.notebook-toggle').setAttribute('aria-expanded',String(open))};
    window.addEventListener('npc-met',e=>{met.add(e.detail);try{localStorage.setItem('shishi-journey',JSON.stringify([...met]))}catch{}render()});render();
  };
  queueMicrotask(mountTown);setTimeout(mountTown,0);document.addEventListener('DOMContentLoaded',mountTown,{once:true});window.addEventListener('load',mountTown,{once:true});
})();

(()=>{const cinema=document.querySelector('#cinema .section-heading>p');if(cinema)cinema.textContent='LOCAL CINEMA · 四部内容各不相同的石狮影像'})();

/* Presentation-mode feedback: a restrained seal reveal and a short two-note chime. */
(()=>{
  const button=document.querySelector('#present');if(!button)return;
  const chime=entering=>{try{const Audio=window.AudioContext||window.webkitAudioContext,ctx=new Audio(),now=ctx.currentTime,gain=ctx.createGain();gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(.055,now+.025);gain.gain.exponentialRampToValueAtTime(.0001,now+.48);gain.connect(ctx.destination);(entering?[523.25,659.25]:[659.25,493.88]).forEach((frequency,i)=>{const osc=ctx.createOscillator();osc.type='sine';osc.frequency.setValueAtTime(frequency,now+i*.1);osc.connect(gain);osc.start(now+i*.1);osc.stop(now+.5)});setTimeout(()=>ctx.close(),700)}catch{}};
  button.addEventListener('click',()=>{const entering=button.textContent.trim()!=='退出展示';chime(entering);document.querySelector('.presentation-cue')?.remove();const cue=document.createElement('div');cue.className='presentation-cue';cue.setAttribute('aria-hidden','true');cue.innerHTML=`<span>${entering?'展':'收'}</span><small>${entering?'山海入卷 · 开始展示':'合卷归常 · 退出展示'}</small>`;document.body.append(cue);button.classList.remove('presentation-button-pop');void button.offsetWidth;button.classList.add('presentation-button-pop');setTimeout(()=>{cue.remove();button.classList.remove('presentation-button-pop')},900)},{capture:true});
})();

/* Town soundscape: the user's continuous footstep track plus supplied NPC readings. */
(()=>{
  let ready=false,enabled=true,currentVoice=null;
  const stepSrc='assets/footstep-stone.mp3';
  const stepTrack=new Audio(stepSrc);stepTrack.preload='auto';stepTrack.loop=true;stepTrack.volume=1;
  const voiceSources=['npc-chen-agong.mp3','npc-arong-jie.mp3','npc-xiaolin.mp3','npc-xu-laoban.mp3','npc-ayu-yi.mp3','npc-zhou-bo.mp3'].map(name=>'assets/'+name);
  const voices=voiceSources.map(src=>{const audio=new Audio(src);audio.preload='metadata';audio.volume=.92;return audio});
  const stopVoice=()=>{if(currentVoice){currentVoice.pause();currentVoice.currentTime=0;currentVoice=null}window.dispatchEvent(new CustomEvent('npc-voice-state',{detail:false}))};
  const unlock=()=>{if(ready)return;ready=true;stepTrack.load();voices.forEach(audio=>audio.load());const volume=stepTrack.volume;stepTrack.volume=.001;stepTrack.play().then(()=>{stepTrack.pause();stepTrack.currentTime=0;stepTrack.volume=volume}).catch(()=>{stepTrack.volume=volume})};
  window.addEventListener('pointerdown',unlock,{capture:true,passive:true});
  window.addEventListener('keydown',unlock,{capture:true});
  const startWalking=()=>{stopVoice();if(!enabled||!ready||document.hidden||!stepTrack.paused)return;stepTrack.currentTime=0;stepTrack.play().catch(()=>{})};
  const stopWalking=()=>{stepTrack.pause();stepTrack.currentTime=0};
  const playVoice=index=>{stopWalking();stopVoice();const audio=voices[index];if(!audio)return;currentVoice=audio;audio.currentTime=0;window.dispatchEvent(new CustomEvent('npc-voice-state',{detail:true}));const finish=()=>{if(currentVoice===audio)currentVoice=null;window.dispatchEvent(new CustomEvent('npc-voice-state',{detail:false}))};audio.onended=finish;audio.onerror=finish;audio.play().catch(finish)};
  const mount=()=>{const controls=document.querySelector('.town-buttons');if(controls&&!controls.querySelector('#town-footsteps')){const toggle=document.createElement('button');toggle.id='town-footsteps';toggle.setAttribute('aria-pressed',String(enabled));toggle.title='仅在玩家移动时播放您提供的脚步音效';const label=()=>toggle.textContent=enabled?'脚步声：开':'脚步声：关';label();toggle.onclick=()=>{unlock();enabled=!enabled;toggle.setAttribute('aria-pressed',String(enabled));if(!enabled)stopWalking();else if(document.querySelector('#player')?.classList.contains('walking'))startWalking();label()};controls.append(toggle)}};
  window.addEventListener('town-walk-state',e=>e.detail?startWalking():stopWalking());
  window.addEventListener('npc-voice-play',e=>playVoice(Number(e.detail)));
  window.addEventListener('npc-voice-stop',stopVoice);
  window.addEventListener('town-open',()=>{stopWalking();stopVoice()});
  window.addEventListener('town-arrive',()=>setTimeout(mount,0));
  document.addEventListener('visibilitychange',()=>{if(document.hidden){stopWalking();stopVoice()}});
  mount();setTimeout(mount,700);
})();
