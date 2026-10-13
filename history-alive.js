(()=>{const root=document.querySelector('.history-archive');if(!root)return;const data={
1977:['石狮商贸档案 · 壹','镜头里的市场整顿','纪录片留下了当时治理商业活动的政策语言。它不是石狮商业故事的终点，而是后来转折发生前的一帧。','依据：展示中的历史纪录片'],
1983:['石狮商贸档案 · 贰','市场重新活起来','经历多次起落后，集市逐渐恢复。街边摊点、侨乡商品和服装交易重新聚拢，石狮开始显出后来“小香港”的轮廓。','依据：石狮镇小商品市场史料'],
1986:['石狮商贸档案 · 叁','一座镇，已有城市的经济体量','建市报告记载：当年工农业总产值和市场商品贸易额均超过一亿元，乡镇企业592家，工商税收入1163万元。繁荣也把镇级治理推到了极限。','依据：1987年建市报告相关公开资料'],
1987:['石狮商贸档案 · 肆','从晋江县析出建市','12月，国务院批准以石狮、永宁、蚶江三镇和祥芝乡设立县级石狮市。这里的“先建市”，首先是对现实治理压力的回应。','依据：石狮市人民政府建制沿革'],
1988:['石狮商贸档案 · 伍','新城市正式挂牌','9月，石狮市委、市政府正式挂牌。随后以“小政府、大社会”思路探索综合改革，让行政服务尽量跟上活跃的市场。','依据：石狮市人民政府、人民日报历史资料'],
1992:['石狮商贸档案 · 陆','晋江走上另一条建市路径','晋江县整体撤县设市，成为晋江市。它与石狮从部分乡镇析置建市属于不同路径，因此不能简单理解为谁的行政地位更高。','依据：公开行政区划沿革资料']};
const buttons=[...root.querySelectorAll('[data-era]')],year=root.querySelector('#archive-year'),kicker=root.querySelector('.archive-kicker'),title=root.querySelector('#archive-title'),copy=root.querySelector('#archive-copy'),source=root.querySelector('#archive-source'),paper=root.querySelector('.archive-paper');
function choose(btn){const era=btn.dataset.era,d=data[era];buttons.forEach(x=>x.setAttribute('aria-selected',x===btn));paper.classList.remove('turning');void paper.offsetWidth;paper.classList.add('turning');year.textContent=era;kicker.textContent=d[0];title.textContent=d[1];copy.textContent=d[2];source.textContent=d[3]}
buttons.forEach((b,i)=>{b.onclick=()=>choose(b);b.onkeydown=e=>{if(!['ArrowLeft','ArrowRight'].includes(e.key))return;e.preventDefault();const n=(i+(e.key==='ArrowRight'?1:-1)+buttons.length)%buttons.length;buttons[n].focus();choose(buttons[n])}});
if(matchMedia('(pointer:fine)').matches&&!matchMedia('(prefers-reduced-motion:reduce)').matches)document.querySelector('.city-birth')?.addEventListener('pointermove',e=>{const r=e.currentTarget.getBoundingClientRect();e.currentTarget.style.setProperty('--hx',`${(e.clientX-r.left)/r.width*100}%`);e.currentTarget.style.setProperty('--hy',`${(e.clientY-r.top)/r.height*100}%`)});
})();
