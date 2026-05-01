import type { Investment } from './types';

export const INVESTMENTS: Investment[] = [
  // Era 1: 蒸汽黎明 (1830-1869)
  {
    id: 'textile_mill_1', name: '手摇纺织机', description: '基础纺织设备，成本低廉', cost: 5000,
    returnRate: 0.08, riskLevel: 1, category: '纺织', era: 1, level: 1, icon: '🧵',
    flavorText: '珍妮纺纱机的轰鸣，开启了工业化的序章。'
  },
  {
    id: 'textile_mill_2', name: '水力纺织厂', description: '利用水力驱动的大规模纺织厂', cost: 15000,
    returnRate: 0.12, riskLevel: 2, category: '纺织', era: 1, level: 2, icon: '🏭',
    flavorText: '河流的力量被 harness，生产效率翻倍。'
  },
  {
    id: 'coal_mine_1', name: '小型煤矿', description: '浅层煤矿开采', cost: 8000,
    returnRate: 0.10, riskLevel: 3, category: '矿业', era: 1, level: 1, icon: '⛏️',
    flavorText: '黑色的黄金，驱动着蒸汽机的脉搏。'
  },
  {
    id: 'coal_mine_2', name: '深层矿井', description: '深部煤层开采，产量更高', cost: 25000,
    returnRate: 0.15, riskLevel: 4, category: '矿业', era: 1, level: 2, icon: '⚒️',
    flavorText: '深入地底三百米，每一车煤都是财富与危险的赌注。'
  },
  {
    id: 'railway_1', name: '短途铁路', description: '连接矿区与工厂的早期铁路', cost: 30000,
    returnRate: 0.14, riskLevel: 3, category: '铁路', era: 1, level: 1, icon: '🚂',
    flavorText: '两条铁轨铺向远方，货物与时代一同加速。'
  },
  {
    id: 'railway_2', name: '城际干线', description: '连接主要城市的重要铁路线', cost: 60000,
    returnRate: 0.18, riskLevel: 4, category: '铁路', era: 1, level: 2, icon: '🛤️',
    flavorText: '汽笛声响彻平原，城市与城市被钢铁血管连接。'
  },
  {
    id: 'iron_works_1', name: '小铁匠铺', description: '传统铁器加工', cost: 4000,
    returnRate: 0.07, riskLevel: 1, category: '钢铁', era: 1, level: 1, icon: '🔨',
    flavorText: '炉火映照着工匠的脸庞，铁锤敲打着工业化的基石。'
  },
  {
    id: 'iron_works_2', name: '炼铁高炉', description: '规模化生铁生产', cost: 20000,
    returnRate: 0.13, riskLevel: 3, category: '钢铁', era: 1, level: 2, icon: '🏗️',
    flavorText: '焦炭燃烧的温度足以熔化岩石，也足以熔化旧世界的秩序。'
  },
  {
    id: 'steam_ship_1', name: '蒸汽货船', description: '内河蒸汽运输船', cost: 35000,
    returnRate: 0.16, riskLevel: 4, category: '航运', era: 1, level: 1, icon: '⛴️',
    flavorText: '不再依赖风向，人类第一次真正征服了河流与近海。'
  },
  {
    id: 'steam_ship_2', name: '远洋蒸汽轮', description: '跨洋蒸汽运输船队', cost: 70000,
    returnRate: 0.20, riskLevel: 5, category: '航运', era: 1, level: 2, icon: '🚢',
    flavorText: '烟囱喷吐着黑烟，把旧大陆的货物送往新大陆的港口。'
  },

  // Era 2: 钢铁洪流 (1870-1909)
  {
    id: 'steel_mill_1', name: '贝塞麦转炉', description: '廉价钢生产技术', cost: 50000,
    returnRate: 0.15, riskLevel: 3, category: '钢铁', era: 2, level: 1, icon: '🔩',
    flavorText: '转炉倾倒的瞬间，液态钢水如金色瀑布，建筑时代的骨骼就此诞生。'
  },
  {
    id: 'steel_mill_2', name: '大型钢铁联合企业', description: '从矿石到钢材的完整产业链', cost: 120000,
    returnRate: 0.22, riskLevel: 4, category: '钢铁', era: 2, level: 2, icon: '🏭',
    flavorText: '高炉林立，铁路蜿蜒，这是一座用钢铁铸造的城市。'
  },
  {
    id: 'oil_well_1', name: '油井钻探', description: '早期石油开采', cost: 30000,
    returnRate: 0.18, riskLevel: 4, category: '石油', era: 2, level: 1, icon: '🛢️',
    flavorText: '德雷克井的喷油，宣告了石油世纪的到来。'
  },
  {
    id: 'oil_refinery_1', name: '炼油厂', description: '原油精炼加工', cost: 60000,
    returnRate: 0.20, riskLevel: 3, category: '石油', era: 2, level: 2, icon: '🏭',
    flavorText: '黑色原油分馏成金色的煤油与汽油，照亮并驱动了整个世界。'
  },
  {
    id: 'chemical_plant_1', name: '染料化工厂', description: '合成染料生产', cost: 25000,
    returnRate: 0.14, riskLevel: 2, category: '化工', era: 2, level: 1, icon: '🧪',
    flavorText: '苯胺紫的色彩，是化学家从煤焦油中提取出的彩虹。'
  },
  {
    id: 'chemical_plant_2', name: '化肥工厂', description: '人工合成化肥', cost: 45000,
    returnRate: 0.17, riskLevel: 3, category: '化工', era: 2, level: 2, icon: '⚗️',
    flavorText: '哈伯-博施工艺把空气变成面包，养活了亿万人口。'
  },
  {
    id: 'transatlantic_cable', name: '跨大西洋电报电缆', description: '洲际通信基础设施', cost: 80000,
    returnRate: 0.19, riskLevel: 4, category: '通信', era: 2, level: 1, icon: '🔌',
    flavorText: '电流穿越三千英里海底，将消息从伦敦传到纽约只需数分钟。'
  },
  {
    id: 'armaments_1', name: '军工厂', description: '步枪与大炮制造', cost: 55000,
    returnRate: 0.16, riskLevel: 5, category: '军工', era: 2, level: 1, icon: '⚔️',
    flavorText: '克虏伯大炮的轰鸣，既带来战争，也带来了帝国的订单。'
  },

  // Era 3: 电气纪元 (1910-1969)
  {
    id: 'power_plant_1', name: '火力发电厂', description: '燃煤发电站', cost: 70000,
    returnRate: 0.18, riskLevel: 3, category: '电力', era: 3, level: 1, icon: '⚡',
    flavorText: '涡轮机旋转，发电机轰鸣，电流沿着铜线流入千家万户。'
  },
  {
    id: 'power_plant_2', name: '水电站', description: '水力发电大坝', cost: 150000,
    returnRate: 0.24, riskLevel: 4, category: '电力', era: 3, level: 2, icon: '💧',
    flavorText: '胡佛大坝拦住了科罗拉多河，也拦住了半个美国的光明。'
  },
  {
    id: 'auto_factory_1', name: '汽车装配线', description: '福特式流水线生产', cost: 100000,
    returnRate: 0.20, riskLevel: 3, category: '汽车', era: 3, level: 1, icon: '🚗',
    flavorText: 'T型车从传送带上源源不断地下线，工人买得起自己生产的产品。'
  },
  {
    id: 'auto_factory_2', name: '豪华汽车厂', description: '高端汽车品牌', cost: 180000,
    returnRate: 0.26, riskLevel: 4, category: '汽车', era: 3, level: 2, icon: '🏎️',
    flavorText: '凯迪拉克与劳斯莱斯，是速度时代最显赫的身份徽章。'
  },
  {
    id: 'airline_1', name: '航空公司', description: '商业航空运输', cost: 130000,
    returnRate: 0.22, riskLevel: 5, category: '航空', era: 3, level: 1, icon: '✈️',
    flavorText: '银色机翼划破云层，大洋两岸的距离缩短到一夜之遥。'
  },
  {
    id: 'electronics_1', name: '电子管工厂', description: '收音机与早期电子设备', cost: 60000,
    returnRate: 0.16, riskLevel: 2, category: '电子', era: 3, level: 1, icon: '📻',
    flavorText: '电子管在黑暗中发出橘红色光芒，无线电波把世界连成一个剧场。'
  },
  {
    id: 'electronics_2', name: '半导体实验室', description: '晶体管与集成电路', cost: 200000,
    returnRate: 0.28, riskLevel: 4, category: '电子', era: 3, level: 2, icon: '💻',
    flavorText: '硅片上蚀刻的微观电路，其复杂程度超越了人类历史上任何建筑。'
  },

  // Era 4: 数字时代 (1970-2025)
  {
    id: 'software_1', name: '软件公司', description: '操作系统与应用软件', cost: 150000,
    returnRate: 0.25, riskLevel: 3, category: '计算机', era: 4, level: 1, icon: '💾',
    flavorText: '二进制代码在磁介质上起舞，看不见的软件正在重塑可见的世界。'
  },
  {
    id: 'software_2', name: '互联网巨头', description: '搜索引擎与社交平台', cost: 400000,
    returnRate: 0.35, riskLevel: 5, category: '互联网', era: 4, level: 2, icon: '🌐',
    flavorText: '点击与链接编织成全球神经网络，信息以光速传播，隐私成为商品。'
  },
  {
    id: 'biotech_1', name: '生物技术公司', description: '基因工程与制药', cost: 250000,
    returnRate: 0.22, riskLevel: 4, category: '生物', era: 4, level: 1, icon: '🧬',
    flavorText: '人类第一次读出了生命的源代码，也第一次拥有了改写它的能力。'
  },
  {
    id: 'biotech_2', name: '基因编辑实验室', description: 'CRISPR基因编辑技术', cost: 500000,
    returnRate: 0.30, riskLevel: 5, category: '生物', era: 4, level: 2, icon: '🔬',
    flavorText: '剪刀在DNA双螺旋上精确切割，治愈疾病与改造生命的界限变得模糊。'
  },
  {
    id: 'ai_lab_1', name: '人工智能实验室', description: '机器学习与神经网络', cost: 350000,
    returnRate: 0.28, riskLevel: 5, category: '人工智能', era: 4, level: 1, icon: '🤖',
    flavorText: '硅基神经元在数据中心里编织思维，人类第一次造出了比自己更聪明的工具。'
  },
  {
    id: 'space_company', name: '私人航天公司', description: '商业卫星与太空旅行', cost: 800000,
    returnRate: 0.32, riskLevel: 6, category: '航天', era: 4, level: 1, icon: '🚀',
    flavorText: '火箭回收着陆的一刻，人类通往多行星文明的门票开始打折出售。'
  },
  {
    id: 'renewable_energy', name: '新能源集团', description: '太阳能与风力发电', cost: 300000,
    returnRate: 0.24, riskLevel: 3, category: '新能源', era: 4, level: 1, icon: '🌱',
    flavorText: '光伏板在阳光下沉默地工作，风车的叶片切割着大气与旧能源的霸权。'
  },
  {
    id: 'quantum_computing', name: '量子计算中心', description: '量子比特超级计算机', cost: 1000000,
    returnRate: 0.40, riskLevel: 6, category: '计算机', era: 4, level: 2, icon: '⚛️',
    flavorText: '在接近绝对零度的极寒中，量子比特同时存在于0与1之间，算力超越了宇宙中所有原子的总和。'
  },
];

export function getInvestmentsByEra(era: number): Investment[] {
  return INVESTMENTS.filter(inv => inv.era === era);
}

export function getInvestmentById(id: string): Investment | undefined {
  return INVESTMENTS.find(inv => inv.id === id);
}

export function getLegendaryInvestments(era: number): Investment[] {
  return INVESTMENTS.filter(inv => inv.era === era && inv.level >= 2 && inv.cost > inv.era * 100000);
}
