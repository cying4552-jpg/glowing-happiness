(()=>{
const details=[
 {src:'assets/shishi-folk.jpg',pos:'48% 72%',caption:'燕尾脊与剪瓷雕 · 色彩、曲线与红砖共同构成闽南建筑的表情'},
 {src:'assets/tower.jpg',pos:'50% 45%',caption:'姑嫂塔石构 · 层层塔檐与花岗岩塔身，在山海之间留下坚实轮廓'},
 {src:'assets/temple-poster.jpg',pos:'50% 68%',caption:'洛伽寺屋顶 · 朱红屋面沿礁岸展开，闽南建筑与海景叠在一起'}
];const viewer=document.querySelector('#detail-viewer'),img=document.querySelector('#detail-image'),lens=viewer?.querySelector('.detail-lens'),cap=document.querySelector('#detail-caption');let current=0;
function detail(i){current=i;const d=details[i];img.style.opacity=.2;setTimeout(()=>{img.src=d.src;img.style.objectPosition=d.pos;lens.style.backgroundImage=`url('${d.src}')`;lens.style.backgroundPosition=d.pos;cap.textContent=d.caption;img.style.opacity=1},140);document.querySelectorAll('[data-detail]').forEach((b,n)=>b.setAttribute('aria-selected',String(n===i)))}
document.querySelectorAll('[data-detail]').forEach(b=>b.onclick=()=>detail(+b.dataset.detail));function move(e){if(!viewer||!lens)return;const r=viewer.getBoundingClientRect(),x=Math.max(0,Math.min(r.width,e.clientX-r.left)),y=Math.max(0,Math.min(r.height,e.clientY-r.top));lens.style.left=x+'px';lens.style.top=y+'px';lens.style.backgroundSize=`${r.width*2.25}px ${r.height*2.25}px`;lens.style.backgroundPosition=`${-x*2.25+85}px ${-y*2.25+85}px`}viewer?.addEventListener('pointermove',move);detail(0);
const days=[
 ['06:30','清晨，从一碗面线糊开始。','面线糊和花生汤把街巷慢慢叫醒，熟悉的一天从早餐升起的热气里开始。','assets/food-noodles.jpg','石狮清晨的早餐'],
 ['09:00','市场开门，布料与订单开始流动。','服装城里看样、询价、订货，仓储和物流把一件衣服送往更远的地方。','assets/fashion-user.jpg','石狮服装城'],
 ['14:00','午后的老街，屋檐下仍有生活。','庙宇、骑楼与小店连在一起，城市的名字和日常都藏在街巷中。','assets/chenghuang.jpg','石狮八卦街'],
 ['17:30','海风转凉，屋顶染上晚霞。','黄金海岸与洛伽寺迎来傍晚，浪花、礁石与朱红屋顶落进同一幅画面。','assets/temple-poster.jpg','洛伽寺傍晚海景'],
 ['20:00','灯火亮起，熟悉的人开始归家。','热闹慢慢收拢，家乡回到普通的夜晚；走过这些路，也就快到家了。','assets/shishi-folk.jpg','石狮夜晚归家意象']
];const di=document.querySelector('#day-image'),dt=document.querySelector('#day-time'),dh=document.querySelector('#day-title'),dd=document.querySelector('#day-desc');function day(i){const d=days[i];di.style.opacity=.15;setTimeout(()=>{dt.textContent=d[0];dh.textContent=d[1];dd.textContent=d[2];di.src=d[3];di.alt=d[4];di.style.opacity=1},160);document.querySelectorAll('[data-day]').forEach((b,n)=>b.setAttribute('aria-selected',String(n===i)))}document.querySelectorAll('[data-day]').forEach(b=>b.onclick=()=>day(+b.dataset.day));
const weave=['石狮的服装故事从面料、染整和辅料开始，它们决定一件衣服的质感与基础。','设计把市场信息变成款式，也让加工能力逐渐形成自己的品牌表达。','裁剪、缝制与整烫把图纸变成成衣，背后连接着密集的产业协作。','服装城承担看样、询价、订货与集散功能，市场与物流在这里汇合。','网批、直播与国内电商让传统批发进入屏幕，订单抵达得更快。','跨境电商与供应链服务把石狮服装送向海外，也与我的专业学习发生联系。'];const wd=document.querySelector('#textile-desc');document.querySelectorAll('[data-weave]').forEach(b=>b.onclick=()=>{const i=+b.dataset.weave;wd.animate([{opacity:.2,transform:'translateY(5px)'},{opacity:1,transform:'none'}],{duration:280});wd.textContent=weave[i];document.querySelectorAll('[data-weave]').forEach((x,n)=>x.setAttribute('aria-selected',String(n===i)))})
})();
