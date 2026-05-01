import type { Crisis } from './types';

export const CRISES: Crisis[] = [
  {
    id: 'panic_1837', name: '1837年大恐慌', year: 1837, era: 1,
    description: '美国银行体系崩溃，信贷紧缩波及全球',
    narrative: '纽约的银行门前排起了长队。储户们惊恐地挤在柜台前，试图把纸币兑换成黄金。棉花价格暴跌，南方种植园主破产，英国投资者撤回资金。一场由投机和过度借贷引发的金融风暴，正在吞噬每一个没有准备的人。',
    effects: [
      { type: 'asset', value: -0.30, description: '资产缩水30%' },
      { type: 'prestige', value: -20, description: '声望下降20点' },
    ],
    icon: '📉',
  },
  {
    id: 'cholera_1848', name: '霍乱大流行', year: 1848, era: 1,
    description: '城市卫生条件恶劣导致霍乱肆虐',
    narrative: '伦敦的下水道里流淌着粪便与死亡。霍乱弧菌通过被污染的水源传播，工厂区的工人家庭成片倒下。约翰·斯诺拔掉布罗德街水泵把手的那一刻，人类第一次用流行病学战胜了看不见的死神。',
    effects: [
      { type: 'asset', value: -0.15, description: '劳动力损失，资产下降15%' },
      { type: 'investment', value: -1, description: '纺织业投资暂停1年' },
    ],
    icon: '☠️',
  },
  {
    id: 'civil_war', name: '美国内战', year: 1861, era: 1,
    description: '南北战争切断棉花供应，重创纺织业',
    narrative: '萨姆特堡的炮火不仅撕裂了美国，也撕裂了兰开夏郡的纺织厂。棉花库存耗尽，工厂纷纷关门，工人在街头游荡。这场战争将以六十万人的生命为代价，但也将催生一个统一的工业强国。',
    effects: [
      { type: 'asset', value: -0.25, description: '棉花投资归零' },
      { type: 'prestige', value: -15, description: '贸易声望受损' },
    ],
    icon: '⚔️',
  },
  {
    id: 'long_depression', name: '长期萧条', year: 1873, era: 2,
    description: '铁路投机泡沫破裂，引发全球性经济衰退',
    narrative: '杰伊·库克公司的破产像推倒的第一块多米诺骨牌。维也纳、柏林、纽约，证券交易所里的恐慌情绪如同电流般传导。钢铁价格腰斩，铁路建设停滞，失业率飙升。这是现代资本主义第一次真正意义上的全球性危机。',
    effects: [
      { type: 'asset', value: -0.35, description: '资产缩水35%' },
      { type: 'prestige', value: -25, description: '投资者信心崩溃' },
    ],
    icon: '📉',
  },
  {
    id: 'strike_wave', name: '大罢工浪潮', year: 1886, era: 2,
    description: '工人要求八小时工作制，全美工厂停摆',
    narrative: '芝加哥的干草市场广场，一颗炸弹投向了警察。八小时工作制的呐喊从工厂车间传到议会大厅。雇主们惊恐地看着生产线停滞，而工人们则第一次意识到，停工的权利比生产的权利更有力量。',
    effects: [
      { type: 'asset', value: -0.20, description: '生产停滞，资产下降20%' },
      { type: 'investment', value: -1, description: '制造业投资暂停1年' },
    ],
    icon: '✊',
  },
  {
    id: 'spanish_flu', name: '西班牙大流感', year: 1918, era: 3,
    description: '全球流感大流行，死亡人数超过一战',
    narrative: '费城的街头堆满了棺材。这种被错误命名为"西班牙"的流感病毒，在军营、工厂和战壕中如野火般蔓延。五千万人在两年内死去——比四年世界大战的死亡人数还要多。人类文明在微生物面前第一次显得如此脆弱。',
    effects: [
      { type: 'asset', value: -0.40, description: '全球贸易瘫痪，资产下降40%' },
      { type: 'prestige', value: -30, description: '社会秩序动荡' },
    ],
    icon: '🦠',
  },
  {
    id: 'great_depression', name: '经济大萧条', year: 1929, era: 3,
    description: '华尔街股市崩盘，世界陷入十年萧条',
    narrative: '1929年10月29日，黑色星期二。道琼斯指数在一天内暴跌23%，交易员们从窗户跳下。银行倒闭，农场被收回，失业者在胡佛村排队领取救济汤。资本的狂欢之后，是整整一代人的饥饿与绝望。',
    effects: [
      { type: 'asset', value: -0.50, description: '资产腰斩50%' },
      { type: 'prestige', value: -40, description: '商业信誉降至冰点' },
    ],
    icon: '💸',
  },
  {
    id: 'ww2_destruction', name: '二战毁灭', year: 1945, era: 3,
    description: '欧洲工业基础设施被战争摧毁',
    narrative: '德累斯顿的火焰风暴把整座城市化为灰烬。鲁尔区的工厂在轰炸中坍塌，汉堡港沉满了被击沉的货轮。当蘑菇云在广岛升起时，人类才意识到，自己发明的武器足以终结文明本身。',
    effects: [
      { type: 'asset', value: -0.45, description: '欧洲资产毁灭性损失45%' },
      { type: 'investment', value: -2, description: '重工业投资暂停2年' },
    ],
    icon: '💣',
  },
  {
    id: 'oil_crisis_73', name: '石油危机', year: 1973, era: 4,
    description: 'OPEC石油禁运引发能源危机',
    narrative: '赎罪日战争的炮火不仅在西奈半岛燃烧，也在加油站排起的长龙中燃烧。油价在三个月内翻了两番，美国的汽车厂开始生产小型车，节能成为全球共识。石油权力第一次被用来作为政治武器，动摇了整个工业世界的根基。',
    effects: [
      { type: 'asset', value: -0.25, description: '能源依赖行业资产下降25%' },
      { type: 'prestige', value: -15, description: '能源安全风险' },
    ],
    icon: '🛢️',
  },
  {
    id: 'black_monday', name: '黑色星期一', year: 1987, era: 4,
    description: '全球股市单日暴跌，程序交易引发恐慌',
    narrative: '1987年10月19日，纽约证券交易所的电脑程序同时发出抛售指令。道琼斯指数一天下跌22.6%，市值蒸发五千亿美元。这是第一次由算法引发的金融灾难，预示着人类正在把金融市场的控制权交给机器。',
    effects: [
      { type: 'asset', value: -0.30, description: '股票投资组合缩水30%' },
      { type: 'prestige', value: -20, description: '市场信誉受损' },
    ],
    icon: '📉',
  },
  {
    id: 'dotcom_crash', name: '互联网泡沫破裂', year: 2000, era: 4,
    description: '科技股估值崩盘，纳斯达克暴跌',
    narrative: 'Pets.com的木偶吉祥物还在电视上跳舞，公司却已经破产。纳斯达克从5048点巅峰坠落，两千亿美元市值蒸发。光纤电缆铺设在海底，但流量还不足以填满一根头发丝。狂欢结束了，但宽带建设的遗产将养活下一个时代。',
    effects: [
      { type: 'asset', value: -0.40, description: '科技投资归零40%' },
      { type: 'investment', value: -1, description: '互联网投资冻结1年' },
    ],
    icon: '💻',
  },
  {
    id: 'financial_crisis', name: '次贷危机', year: 2008, era: 4,
    description: '房地产泡沫破裂引发全球金融海啸',
    narrative: '雷曼兄弟的倒闭像一颗金融核弹。次级抵押贷款违约如传染病般扩散，CDO和CDS的复杂链条把风险传遍了全球。底特律的街道上停满了被收回的房车，而华尔街的高管们仍拿着数千万美元的奖金。',
    effects: [
      { type: 'asset', value: -0.45, description: '金融资产缩水45%' },
      { type: 'prestige', value: -35, description: '金融信誉崩塌' },
    ],
    icon: '🏦',
  },
];

export function getCrisisByEra(era: number): Crisis[] {
  return CRISES.filter(c => c.era === era);
}

export function getRandomCrisis(era: number): Crisis | null {
  const crises = getCrisisByEra(era);
  if (crises.length === 0) return null;
  return crises[Math.floor(Math.random() * crises.length)];
}
