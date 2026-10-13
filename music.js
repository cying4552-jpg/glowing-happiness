(()=>{
const button=document.querySelector('#music-toggle'),volume=document.querySelector('#music-volume'),status=document.querySelector('#music-status');
const audio=new Audio();audio.id='background-audio';audio.loop=true;audio.preload='metadata';audio.volume=.3;document.body.append(audio);
let enabled=false,cinemaHold=false,voiceHold=false,loaded=false,loading=false,lastError='';
try{enabled=sessionStorage.getItem('shishi-music-enabled')==='1'}catch{}
const ensureLoaded=()=>{if(!loaded){audio.src='assets/user-background.m4a';audio.load();loaded=true}};
const activeVideo=()=>[...document.querySelectorAll('video')].some(v=>v.id!=='coast-video'&&!v.paused&&!v.ended&&!v.muted);
const blocked=()=>document.hidden||cinemaHold||voiceHold||activeVideo();
function update(){const playing=enabled&&!audio.paused&&audio.readyState>=2;button.textContent=loading?'♫ 音乐加载中…':playing?'♫ 关闭音乐':'♫ 开启音乐';button.setAttribute('aria-pressed',String(playing));status.textContent=!enabled?'背景音乐已关闭':voiceHold?'人物讲述时音乐暂停':(cinemaHold||activeVideo())?'观看影片时音乐暂停':loading?'背景音乐加载中…':lastError?'音乐加载失败 · 点击重试':playing?'背景音乐 · 正在播放':'点击恢复背景音乐';window.dispatchEvent(new CustomEvent('music-state',{detail:{playing,enabled,loading}}))}
async function sync(){if(!enabled||blocked()){loading=false;audio.pause();update();return false}ensureLoaded();loading=true;lastError='';update();try{await Promise.race([audio.play(),new Promise(resolve=>setTimeout(resolve,2500))])}catch(error){lastError=error?.name||'play-error'}loading=false;update();return !audio.paused}
function setEnabled(value){enabled=value;lastError='';try{sessionStorage.setItem('shishi-music-enabled',value?'1':'0')}catch{}return sync()}
window.enableTownMusic=()=>setEnabled(true);
button.onclick=()=>setEnabled(!(enabled&&!audio.paused));volume.value=30;volume.oninput=()=>audio.volume=Number(volume.value)/100;
document.addEventListener('play',e=>{if(e.target instanceof HTMLVideoElement)sync()},true);document.addEventListener('pause',e=>{if(e.target instanceof HTMLVideoElement)setTimeout(sync,0)},true);document.addEventListener('ended',e=>{if(e.target instanceof HTMLVideoElement)setTimeout(sync,0)},true);document.addEventListener('visibilitychange',sync);
window.addEventListener('cinema-state',e=>{cinemaHold=Boolean(e.detail);sync()});window.addEventListener('npc-voice-state',e=>{voiceHold=Boolean(e.detail);sync()});audio.addEventListener('canplay',()=>{loading=false;update()});audio.addEventListener('playing',()=>{loading=false;lastError='';update()});audio.addEventListener('pause',update);audio.addEventListener('waiting',()=>{if(enabled&&!blocked()){loading=true;update()}});audio.addEventListener('error',()=>{loading=false;lastError='media-error';loaded=false;update()});
if(enabled){const resume=()=>{sync();removeEventListener('pointerdown',resume,true);removeEventListener('keydown',resume,true)};addEventListener('pointerdown',resume,true);addEventListener('keydown',resume,true)}update();
})();
