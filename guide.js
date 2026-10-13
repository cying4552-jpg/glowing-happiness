(()=>{
const stops=[
['开场：我与石狮','先说明这里不只是景点合集，而是我从小生活的家乡。','home',0],
['姑嫂塔与我的村子','讲海上航标意义，再说村子在山体前方、距离塔约2.5公里。','intro',1],
['洛伽寺：镜头与日常','先介绍海中寺庙，再补充热门取景和本地人烧香的真实日常。','places',2],
['小香港：市场长成城市','用1977旧影切入，解释1987年石狮为何从晋江析置建市。','history',4],
['老街：名字与信俗','从凤里庵石狮讲地名，再带到八卦街、城隍庙和文创小狮子。','oldtown',6],
['街头味道与服装城','从日常味道说到服装产业，让家乡不只停留在风景里。','food',7],
['结尾：写给家乡','落在“走过这些路，我就快到家了”，比口号更真诚。','ending',12]];
let current=0,start=0,timer=0,elapsed=0;const coach=document.createElement('aside');coach.id='presentation-coach';coach.hidden=true;coach.setAttribute('aria-label','网站任务引导');coach.innerHTML='<div class="coach-head"><div><small>GUIDED JOURNEY</small><span>网站任务引导</span></div><button id="coach-close" aria-label="关闭任务引导">×</button></div><div class="coach-time"><strong id="coach-clock">自由浏览</strong><button id="coach-timer">开启5分钟计时</button></div><div class="coach-route" role="tablist" aria-label="选择引导步骤"></div><div class="coach-card"><small id="coach-step"></small><h3 id="coach-title"></h3><p id="coach-copy"></p><div class="coach-progress"><i></i></div></div><div class="coach-actions"><button id="coach-prev">上一站</button><button id="coach-open">前往这一站</button><button id="coach-next">下一站</button></div><p class="coach-tip">可自由点选任意一步；关闭后随时可从地图工具栏重新开启。</p>';document.body.append(coach);
const route=coach.querySelector('.coach-route');stops.forEach((s,i)=>{const b=document.createElement('button');b.type='button';b.role='tab';b.dataset.guide=i;b.innerHTML=`<em>${String(i+1).padStart(2,'0')}</em><span>${s[0]}</span>`;b.onclick=()=>{current=i;render()};route.append(b)});
const launch=document.createElement('button');launch.id='coach-launch';launch.type='button';launch.setAttribute('aria-pressed','false');launch.setAttribute('aria-controls','presentation-coach');launch.innerHTML='<span aria-hidden="true">◇</span><b>任务引导</b><small>7步可自由选择</small>';document.body.append(launch);
function remember(on){try{localStorage.setItem('shishi-guide-open',on?'1':'0')}catch{}}
function render(){const s=stops[current];coach.querySelector('#coach-step').textContent=`第 ${current+1} 站 / 共 ${stops.length} 站`;coach.querySelector('#coach-title').textContent=s[0];coach.querySelector('#coach-copy').textContent=s[1];coach.querySelector('.coach-progress i').style.width=`${(current+1)/stops.length*100}%`;coach.querySelector('#coach-prev').disabled=current===0;coach.querySelector('#coach-next').disabled=current===stops.length-1;route.querySelectorAll('button').forEach((b,i)=>{b.setAttribute('aria-selected',String(i===current));if(i===current)b.scrollIntoView({block:'nearest',inline:'nearest'})})}
function setOpen(on){coach.hidden=!on;launch.setAttribute('aria-pressed',String(on));launch.innerHTML=on?'<span aria-hidden="true">◆</span><b>关闭引导</b><small>当前第 '+(current+1)+' / 7 步</small>':'<span aria-hidden="true">◇</span><b>任务引导</b><small>7步可自由选择</small>';remember(on);if(on)render()}
launch.onclick=()=>setOpen(coach.hidden);coach.querySelector('#coach-close').onclick=()=>setOpen(false);coach.querySelector('#coach-prev').onclick=()=>{if(current>0){current--;render()}};coach.querySelector('#coach-next').onclick=()=>{if(current<stops.length-1){current++;render()}};
coach.querySelector('#coach-open').onclick=()=>{const s=stops[current],a=document.querySelector(`a[href="#${s[2]}"]`);if(a)a.click();else window.dispatchEvent(new CustomEvent('town-open',{detail:s[3]}));setOpen(false)};
function tick(){const left=Math.max(0,300-(Date.now()-start+elapsed)/1000),m=Math.floor(left/60),s=Math.floor(left%60);coach.querySelector('#coach-clock').textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;coach.classList.toggle('overtime',left<=0);if(left>0)timer=requestAnimationFrame(tick);else{timer=0;elapsed=300000;coach.querySelector('#coach-timer').textContent='重新计时'}}
coach.querySelector('#coach-timer').onclick=e=>{if(timer){cancelAnimationFrame(timer);timer=0;elapsed+=Date.now()-start;e.currentTarget.textContent='继续计时'}else{if(elapsed>=300000){elapsed=0;coach.classList.remove('overtime')}start=Date.now();e.currentTarget.textContent='暂停计时';timer=requestAnimationFrame(tick)}};
render();
})();
