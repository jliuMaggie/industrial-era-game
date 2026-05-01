import type { Achievement } from './types';

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_investment', name: '初试锋芒', description: '完成第一次投资',
    flavorText: '你用第一笔投资在工业世界留下了脚印。这很小，但它是你的。',
    icon: '🎯', condition: 'firstInvestment', unlocked: false,
  },
  {
    id: 'millionaire', name: '百万富翁', description: '资产突破100万',
    flavorText: '你的财富已经超越了绝大多数人的一生积蓄。金钱开始以它自己的意志生长。',
    icon: '💰', condition: 'assets1M', unlocked: false,
  },
  {
    id: 'billionaire', name: '亿万富翁', description: '资产突破10亿',
    flavorText: '你的资产后面跟着八个零。这已经不是一个数字，而是一种权力。',
    icon: '💎', condition: 'assets1B', unlocked: false,
  },
  {
    id: 'era_master_1', name: '蒸汽先驱', description: '完成第一时代',
    flavorText: '你在蒸汽与煤烟中证明了自己的商业嗅觉。铁路和纺织厂记住了你的名字。',
    icon: '🚂', condition: 'completeEra1', unlocked: false,
  },
  {
    id: 'era_master_2', name: '钢铁领主', description: '完成第二时代',
    flavorText: '你的高炉日夜不息，你的铁路横贯大陆。钢铁是有记忆的，它记得是谁熔炼了它。',
    icon: '⚒️', condition: 'completeEra2', unlocked: false,
  },
  {
    id: 'era_master_3', name: '电气皇帝', description: '完成第三时代',
    flavorText: '电流沿着你铺设的铜线流动，照亮了你想要照亮的每一个地方。',
    icon: '⚡', condition: 'completeEra3', unlocked: false,
  },
  {
    id: 'era_master_4', name: '数字传奇', description: '完成第四时代',
    flavorText: '在硅与算法的时代，你证明了古老的商业本能仍然适用。你是跨越四个世纪的活化石。',
    icon: '🌐', condition: 'completeEra4', unlocked: false,
  },
  {
    id: 'survivor', name: '危机幸存者', description: '在危机中存活且资产为正',
    flavorText: '当恐慌席卷市场，别人在抛售，你在计算。风暴过后，你仍在牌桌上。',
    icon: '🛡️', condition: 'surviveCrisis', unlocked: false,
  },
  {
    id: 'opportunist', name: '时机猎人', description: '成功把握3次机遇',
    flavorText: '你像鲨鱼闻见血腥味一样嗅到了机遇。这不是运气，是训练出来的本能。',
    icon: '🦈', condition: 'opportunities3', unlocked: false,
  },
  {
    id: 'diversified', name: '多元化巨头', description: '同时拥有5种不同类别的投资',
    flavorText: '你的商业版图横跨五个行业。当一条船沉没，你还有四条。',
    icon: '🏗️', condition: 'categories5', unlocked: false,
  },
  {
    id: 'combo_king', name: '连击之王', description: '触发3次投资连击',
    flavorText: '节奏。投资像音乐，而你找到了节拍。三次完美的连续出击，市场为你鼓掌。',
    icon: '🔥', condition: 'combos3', unlocked: false,
  },
  {
    id: 'crit_master', name: '暴击大师', description: '触发5次暴击',
    flavorText: '五次，你的投资回报超出了所有预期。这不是赌博，是你比别人更早看到了价值。',
    icon: '⚡', condition: 'crits5', unlocked: false,
  },
  {
    id: 'prestige_100', name: '声名鹊起', description: '声望达到100',
    flavorText: '人们开始主动提起你的名字。你的签名比合同条款更有约束力。',
    icon: '📢', condition: 'prestige100', unlocked: false,
  },
  {
    id: 'prestige_500', name: '时代偶像', description: '声望达到500',
    flavorText: '你的名字出现在报纸头条、教科书和流言蜚语中。声望本身已经成为一种资产。',
    icon: '⭐', condition: 'prestige500', unlocked: false,
  },
  {
    id: 'legendary_investor', name: '传说投资人', description: '完成一次传说级投资',
    flavorText: '当传说级投资机会出现时，大多数人看不见。你看见了，并且押上了全部筹码。',
    icon: '🏆', condition: 'legendaryInvest', unlocked: false,
  },
  {
    id: 'rank_1', name: '行业领袖', description: '排名达到第1名',
    flavorText: '你站在排行榜的顶端，俯瞰着曾经的对手。这个位置不保证安全，但保证视野。',
    icon: '👑', condition: 'rank1', unlocked: false,
  },
  {
    id: 'all_eras', name: '穿越者', description: '跨越全部四个时代',
    flavorText: '从蒸汽到硅片，从煤烟到光纤。近两百年时光在你手中折叠成一本账本。',
    icon: '⏳', condition: 'allEras', unlocked: false,
  },
  {
    id: 'phoenix', name: '凤凰涅槃', description: '从破产边缘（资产<10%初始）恢复到资产翻倍',
    flavorText: '你曾站在悬崖边缘，资产只剩最初的十分之一。然后你爬了回来，而且爬得更高。',
    icon: '🔥', condition: 'phoenix', unlocked: false,
  },
  {
    id: 'century_merchant', name: '世纪商人', description: '游戏时间超过100回合',
    flavorText: '一百个回合，一百次决策。有些对了，有些错了，但你从未停止。',
    icon: '📅', condition: 'turns100', unlocked: false,
  },
];
