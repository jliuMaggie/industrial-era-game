import type { Opportunity } from './types';

export const OPPORTUNITIES: Opportunity[] = [
  {
    id: 'crystal_palace', name: '万国博览会', year: 1851, era: 1,
    description: '伦敦世博会展示工业成果，带来巨大商机',
    narrative: '水晶宫里，海德公园的阳光透过三十万块玻璃洒在蒸汽机和纺织机上。维多利亚女王亲自为博览会开幕剪彩，六百万参观者从世界各地涌来。你敏锐地意识到，这是向全球展示产品、签订贸易合同的绝佳时机。',
    effects: [
      { type: 'asset', value: 0.25, description: '资产增长25%' },
      { type: 'prestige', value: 30, description: '国际声望大幅提升' },
    ],
    icon: '🏛️',
  },
  {
    id: 'california_gold', name: '加州淘金热', year: 1849, era: 1,
    description: '加利福尼亚发现黄金，相关产业爆发',
    narrative: '萨特的磨坊水车轮下，詹姆斯·马歇尔的发现引发了人类历史上最大规模的移民潮。三万人涌向加州，你需要的是铲子、牛仔裤和运河水——卖给淘金者的工具，比金子本身更值钱。',
    effects: [
      { type: 'asset', value: 0.40, description: '资产暴涨40%' },
      { type: 'prestige', value: 15, description: '冒险家声望提升' },
    ],
    icon: '💰',
  },
  {
    id: 'transcontinental_rail', name: '横贯大陆铁路', year: 1869, era: 1,
    description: '美国太平洋铁路贯通，物流成本骤降',
    narrative: '犹他州的海角峰，中央太平洋与联合太平洋铁路公司的轨道终于相遇。金色道钉敲下的那一刻，纽约到旧金山的旅程从六个月缩短到七天。你投资的钢铁和铁路股票一夜之间翻倍。',
    effects: [
      { type: 'asset', value: 0.30, description: '铁路资产增值30%' },
      { type: 'investment', value: 1, description: '解锁西部投资机会' },
    ],
    icon: '🛤️',
  },
  {
    id: 'berlin_conference', name: '柏林会议', year: 1884, era: 2,
    description: '非洲瓜分协议，殖民地投资机会涌现',
    narrative: '俾斯麦召集欧洲列强在柏林开会，像切蛋糕一样瓜分非洲大陆。刚果归比利时，尼日利亚归英国，安哥拉归葡萄牙。你深知，殖民地的橡胶、象牙和矿产，将是下一个世纪的财富密码。',
    effects: [
      { type: 'asset', value: 0.35, description: '殖民地投资带来35%收益' },
      { type: 'prestige', value: 25, description: '帝国声望提升' },
    ],
    icon: '🌍',
  },
  {
    id: 'electrical_grid', name: '电网建设潮', year: 1890, era: 2,
    description: '交流电系统普及，电气化浪潮来临',
    narrative: '尼亚加拉大瀑布的水流推动着西屋公司的交流发电机。爱迪生的直流电帝国正在崩塌，特斯拉的多相交流系统照亮了芝加哥世界博览会。你决定投资铜矿和电缆厂——每一盏电灯都需要数英里电线。',
    effects: [
      { type: 'asset', value: 0.28, description: '电气投资增值28%' },
      { type: 'prestige', value: 20, description: '科技先驱声望' },
    ],
    icon: '⚡',
  },
  {
    id: 'model_t', name: '福特T型车', year: 1908, era: 2,
    description: '流水线生产让汽车普及，产业链爆发',
    narrative: '底特律高地公园的工厂里，传送带以每分钟六英尺的速度移动，一辆T型车在93分钟内组装完成。亨利·福特宣布日薪五美元——他的工人也买得起自己造的车。你闻到了橡胶、玻璃和石油的商机。',
    effects: [
      { type: 'asset', value: 0.32, description: '汽车产业链收益32%' },
      { type: 'investment', value: 1, description: '解锁橡胶和玻璃投资' },
    ],
    icon: '🚗',
  },
  {
    id: 'ww2_production', name: '战时生产', year: 1941, era: 3,
    description: '战争订单涌入，军工产能全开',
    narrative: '珍珠港的硝烟还未散尽，美国工厂已经转型。通用汽车开始生产轰炸机，克莱斯勒制造坦克，西屋为军舰提供雷达。政府合同如雪片般飞来，利润有保障，风险有国家兜底。',
    effects: [
      { type: 'asset', value: 0.45, description: '军工订单带来45%资产增长' },
      { type: 'prestige', value: 35, description: '爱国企业家声望' },
    ],
    icon: '🏭',
  },
  {
    id: 'marshall_plan', name: '马歇尔计划', year: 1948, era: 3,
    description: '欧洲重建带来巨量订单',
    narrative: '国务卿马歇尔在哈佛演讲，承诺用130亿美元重建被战争摧毁的欧洲。这不是慈善，而是精明——欧洲人要花这些钱购买美国的钢铁、机械和食品。你早早地在汉堡和鹿特丹布局了分销网络。',
    effects: [
      { type: 'asset', value: 0.38, description: '出口业务增长38%' },
      { type: 'prestige', value: 30, description: '国际商业领袖声望' },
    ],
    icon: '📦',
  },
  {
    id: 'space_race', name: '太空竞赛', year: 1961, era: 3,
    description: 'NASA预算激增，航天产业链爆发',
    narrative: '肯尼迪总统在国会宣布："十年内，我们要把人类送上月球。"NASA的预算从每年五亿美元飙升到五十亿。你投资的钛合金、精密仪器和电子元件工厂接到了十年都完不成的订单。',
    effects: [
      { type: 'asset', value: 0.35, description: '航天供应链收益35%' },
      { type: 'prestige', value: 40, description: '科技先锋声望' },
    ],
    icon: '🚀',
  },
  {
    id: 'personal_computer', name: '个人电脑革命', year: 1981, era: 4,
    description: 'IBM PC发布，计算机进入家庭',
    narrative: 'IBM 5150用Intel 8088处理器和微软DOS系统，把计算能力从机房搬到书桌上。盖茨保留了DOS的授权而非出售——这个决定将让他成为世界首富。你投资的内存芯片厂和主板制造商正在印钞。',
    effects: [
      { type: 'asset', value: 0.40, description: 'PC产业链暴涨40%' },
      { type: 'investment', value: 1, description: '解锁软件投资机会' },
    ],
    icon: '💻',
  },
  {
    id: 'internet_boom', name: '互联网爆发', year: 1995, era: 4,
    description: '网景上市引爆互联网泡沫早期',
    narrative: '网景通信在纳斯达克上市，首日股价从28美元飙升到75美元。安德森说："软件正在吞噬世界。"你创办的ISP公司在地下室里用几台调制解调器，开始向家庭用户出售互联网接入服务。',
    effects: [
      { type: 'asset', value: 0.50, description: '互联网资产翻倍50%' },
      { type: 'prestige', value: 45, description: '互联网先驱声望' },
    ],
    icon: '🌐',
  },
  {
    id: 'smartphone', name: '智能手机时代', year: 2007, era: 4,
    description: 'iPhone发布，移动互联网产业爆发',
    narrative: '乔布斯从口袋里掏出iPhone，在一块玻璃上同时展示了电话、iPod和互联网通讯器。诺基亚的工程师们嘲笑它不耐摔，但消费者用钱包投票。你投资的触摸屏、锂电池和应用开发商的股票三年涨了十倍。',
    effects: [
      { type: 'asset', value: 0.55, description: '移动生态收益55%' },
      { type: 'prestige', value: 50, description: '科技投资大师声望' },
    ],
    icon: '📱',
  },
];

export function getOpportunitiesByEra(era: number): Opportunity[] {
  return OPPORTUNITIES.filter(o => o.era === era);
}

export function getRandomOpportunity(era: number): Opportunity | null {
  const opportunities = getOpportunitiesByEra(era);
  if (opportunities.length === 0) return null;
  return opportunities[Math.floor(Math.random() * opportunities.length)];
}
