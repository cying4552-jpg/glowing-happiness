(()=>{const panel=document.querySelector('#explore-panel'),top=panel?.querySelector('.explore-top'),content=panel?.querySelector('#explore-content');if(!panel||!top||!content)return;
const tools=document.createElement('div');tools.className='detail-tools';tools.innerHTML='<span id="view-kind">正在翻阅</span><button id="remember-stop" aria-pressed="false">◇ 记住这一站</button><button id="reading-mode" aria-pressed="false">沉浸阅读</button>';top.insertBefore(tools,top.lastElementChild);
let activeId='',saved=new Set;try{saved=new Set(JSON.parse(localStorage.getItem('shishi-saved-stops')||'[]'))}catch{}
const names={home:'海风入口',intro:'童年近景',places:'山海长卷',frames:'摄影取景',history:'商贸档案',folk:'闽南屋檐',oldtown:'老街寻迹',food:'街头味觉',souvenir:'文创记忆',memory:'私人讲述',cinema:'光影片场','local-film':'服装城实景',ending:'写给家乡'};
function sync(){const section=content.querySelector('section');if(!section)return;activeId=section.id;document.querySelector('#view-kind').textContent=names[activeId]||'正在翻阅';const remembered=saved.has(activeId),b=document.querySelector('#remember-stop');b.setAttribute('aria-pressed',remembered);b.textContent=remembered?'◆ 已记住这一站':'◇ 记住这一站';panel.dataset.view=activeId}
new MutationObserver(sync).observe(content,{childList:true});
document.querySelector('#remember-stop').onclick=()=>{if(!activeId)return;saved.has(activeId)?saved.delete(activeId):saved.add(activeId);try{localStorage.setItem('shishi-saved-stops',JSON.stringify([...saved]))}catch{}sync();const status=document.querySelector('#town-status');if(status)status.textContent=saved.has(activeId)?'这一站已收进你的石狮行旅册。':'已从行旅册移除这一站。'};
document.querySelector('#reading-mode').onclick=e=>{const on=panel.classList.toggle('reading-mode');e.currentTarget.setAttribute('aria-pressed',on);e.currentTarget.textContent=on?'退出沉浸':'沉浸阅读'};
window.addEventListener('keydown',e=>{if(e.key.toLowerCase()==='m'&&panel.open){panel.close();document.querySelector('#town-view')?.focus({preventScroll:true})}});
const hint=document.createElement('div');hint.className='town-key-hint';hint.innerHTML='<kbd>M</kbd><span>返回地图</span><kbd>E</kbd><span>与人物交谈</span>';document.querySelector('.town')?.append(hint);
})();
(()=>{const link=document.createElement('link');link.rel='stylesheet';link.href='refinement.css';document.head.append(link)})();
(()=>{document.querySelectorAll('.memory-list article>span').forEach(label=>{const [era,note]=label.textContent.split('/').map(x=>x.trim());if(!note)return;label.replaceChildren(Object.assign(document.createElement('strong'),{textContent:era}),Object.assign(document.createElement('small'),{textContent:note}))})})();
(()=>{if(typeof places==='undefined'||places.length<3)return;
places[0].pages=[
 {label:'第一折 / 山巅古塔',title:'万寿塔、关锁塔，也是姑嫂塔。',text:'姑嫂塔位于石狮宝盖山山巅，正式名称为万寿塔，也见称关锁塔，始建于南宋绍兴年间。塔身以花岗岩砌筑，第二层门额上仍可见“万寿宝塔”四字。它不是孤立摆放的一座观景塔，而是宝盖山、泉州湾与古代港口视野共同构成的海丝地标。',fact:'三个名称指向同一座塔：万寿塔是正式名称，关锁塔见于旧志，姑嫂塔来自广为流传的地方故事。'},
 {label:'第二折 / 海上航标',title:'商船看见它，便知道陆地近了。',text:'宝盖山地势高，塔又立在山巅，古代从泉州湾归来的船只能够远远望见。明代《八闽通志》记载，商船从海上返回时，会把关锁塔视为抵岸的标志。今天理解姑嫂塔，不能只把它当作登山拍照点；它还连接着泉州港、航海贸易与“涨海声中万国商”的时代。',fact:'姑嫂塔与六胜塔、石湖码头常被称为石狮“海丝三宝”，共同见证古泉州的海上交通。'},
 {label:'第三折 / 姑嫂传说',title:'等待远航亲人的人，把乡愁留在山顶。',text:'民间故事中，姑嫂登山守望，盼望远赴南洋的亲人归来。不同讲述在人物和结局上略有差异，但共同表达了闽南侨乡的离别、等待与团圆愿望。传说不是建塔年代的史料，却让冰冷的石塔拥有了人的感情，也映照出早年石狮人漂洋过海谋生的经历。',fact:'课堂表达时可分开说明：南宋建塔属于历史信息；“姑嫂等待”属于地方传说与侨乡文化记忆。'},
 {label:'第四折 / 我的记忆',title:'对别人是古迹，对我是山上熟悉的塔。',text:'我家所在的村子就在姑嫂塔所在山体前方，距离姑嫂塔大约2.5公里。大约七岁时，我记得山上还有很多人，塔下和道路都很热闹。后来再去，我遇见的人少了，附近后来开发的商业街也有不少店铺关门。它的历史价值没有改变，但我对它最深的认识，仍然来自一个住在附近的小孩怎样看着熟悉的地方慢慢变化。',fact:'这是我的个人记忆，不用它代替所有日期、节假日和其他游客的客流体验。'}];
places[1].pages=[
 {label:'第一折 / 名称与海岛',title:'“洛伽”，让海边寺庙有了观音道场的意象。',text:'洛伽寺位于石狮永宁黄金海岸东侧的宫屿岛，寺院通过通道与岸边相连。“洛伽”这一名称与佛教中观音道场的称谓传统相联系，因此这里既是滨海景观，也是当地礼佛、祈愿和烧香的宗教空间。潮水、礁石和殿宇靠得很近，形成了“海上有寺，寺边有浪”的独特印象。',fact:'这里应写作“洛伽寺”。它是石狮的海中寺庙，不要与其他地区的同名山寺混为一谈。'},
 {label:'第二折 / 建设年代',title:'它的辨识度很古典，现有寺院却是现代兴建。',text:'有关现有寺院的建设资料记载：1997年举行奠基仪式，2000年开工，2001年首期工程竣工，寺名由赵朴初题写。红橙色屋瓦、闽南式屋脊、石栏与海面共同组成今天看到的景观。介绍时既可以欣赏传统建筑语言，也应避免把它笼统说成未经证实的“千年古寺”。',fact:'准确表达比传奇化更有力量：这里采用能够核实的现代建设时间。'},
 {label:'第三折 / 在海边看寺',title:'一步看殿宇，转身就是潮汐。',text:'洛伽寺吸引人的地方，在于宗教建筑与海岸空间几乎同时进入视野。近处可以看屋脊龙饰、石栏、院落和“佛”字黄墙，远处则是海平线、浪花与礁石。不同天气、潮位和光线会改变画面气氛；风浪较大时，更应该留在允许通行的区域，不为拍照进入湿滑礁石或越过围栏。',fact:'左侧相册可以依次查看海岛全景、殿宇、屋脊、院落和墙面细节。'},
 {label:'第四折 / 镜头与日常',title:'游客寻找“李现同款”，我还是把它当作烧香的地方。',text:'前几年，李现在洛伽寺拍摄的照片让这里的构图和机位被更多人注意，节假日常常聚集许多游客。对我来说，它离家不远，没有太多游乐项目，就是一座海中的寺庙：平时想烧香时会去，遇到假期人潮时也会觉得拥挤。同一个地方，可以同时是社交平台上的热门背景，也是本地人熟悉的生活场所。',fact:'照片专题展示的是画面观察，不提供鼓励冒险复刻的精确站位。'}];
places[2].pages=[
 {label:'第一折 / 为什么是服装城',title:'石狮的城市名片，不只有海，还有衣服。',text:'石狮服装城位于灵秀片区，是观察本地纺织服装产业和专业市场的重要窗口。石狮早期服装交易从街巷摊位和市场逐渐发展，20世纪80年代已经出现“全国跑石狮、石狮跑全国”的商贸景象。后来建设专业化服装市场，是为了让分散的交易、展示、采购和物流拥有更集中的空间。',fact:'它不是普通购物中心，而是面向批发、采购与产业交流的专业市场。'},
 {label:'第二折 / 市场怎样运转',title:'看样、询价、订货、发货，都在这里相遇。',text:'服装城的重要功能包括服装批发交易、品牌与产品展示、采购对接、展览活动和物流配送。进入市场，看到的不只是货架上的成衣，还有档口经营者、采购商、设计与销售人员之间不断发生的沟通。一件衣服从样品变成订单，再从仓库送往不同城市，需要市场、仓储、运输和信息服务共同配合。',fact:'服装城让抽象的“产业”变成可以看见的档口、订单、人流与货流。'},
 {label:'第三折 / 一件衣服的产业链',title:'面料到成衣，背后是一整座城市的协作。',text:'石狮纺织服装产业不仅包括卖衣服，还连接纺织面料、染整、辅料、设计、成衣加工、品牌运营、摄影直播、电商销售和物流。服装城与周边轻纺、辅料、网批和电商空间相互联系，让采购者能够在较短距离内寻找货源、比较款式并完成对接。这也是石狮被称为休闲服装名城的重要现实基础。',fact:'从一件衣服，可以理解制造业、商贸业、物流业和数字电商怎样彼此连接。'},
 {label:'第四折 / 从线下走向网络',title:'档口没有消失，生意的入口变多了。',text:'今天的服装生意已经不只发生在线下市场。直播、网批、国内电商和跨境电商让商品能够从石狮连接更远的消费者，线下档口也承担选款、看样与供应链对接功能。不同日期、季节和楼层的人流可能差异很大，因此一张“热闹”或“冷清”的照片，都不足以概括整个市场的长期经营状态。',fact:'2025年，全球男装供应链中心暨跨境电商产业集聚区在石狮服装城展览艺术中心启动。'},
 {label:'第五折 / 我想介绍的家乡',title:'山海是风景，服装城是石狮人经营生活的方式。',text:'把服装城放进家乡介绍，是因为石狮不能只用景点概括。姑嫂塔讲远航与归来，洛伽寺讲海边信俗，而服装城讲的是今天的人怎样做产品、谈生意、赶订单。春节前的实拍视频里，人们穿行在货架之间；这些具体的忙碌，让“爱拼敢赢”不只是口号。',fact:'山是记忆，海是日常，市场则是这座城市持续运转的烟火。'}];
const detailSources=document.createElement('section');detailSources.innerHTML='<h3>三处地点 · 补充资料</h3><a href="https://www.shishi.gov.cn/zjss/csfm/201709/t20170930_545547.htm" target="_blank" rel="noopener">石狮市人民政府 · 万寿塔（姑嫂塔）</a><a href="https://www.shishi.gov.cn/zjss/csfm/201710/t20171006_547111.htm" target="_blank" rel="noopener">石狮市人民政府 · 石狮服装城</a><a href="https://www.shishi.gov.cn/zwgk/xwzx/jrss/202304/t20230421_2872135.htm" target="_blank" rel="noopener">石狮市人民政府 · 中国男装网批城</a><a href="https://www.shishi.gov.cn/zwgk/xwzx/jrss/202505/t20250520_3170737.htm" target="_blank" rel="noopener">石狮市人民政府 · 全球男装供应链中心与跨境电商产业集聚区</a>';document.querySelector('#sources-content')?.prepend(detailSources);
})();
