/**
 * 生产工厂详细产物数据（攻略整理，以游戏内为准）
 * 按工厂 id 索引，覆盖 data.js 中的概括性 products
 */
const PRODUCTION_PRODUCT_DETAILS = {
  'fishing-pier': [
    { id: 'perch', name: '河鲈', factoryLevel: 1, unlockCondition: '建造钓鱼台即解锁', playerLevel: '约1级', input: '甩杆钓鱼（无原料）', produceTime: '约30秒/次', quality: '普通', catchType: '自动上钩', use: '切鱼厂原料、居民饱腹基础鱼' },
    { id: 'crucian', name: '小鲫鱼', factoryLevel: 1, unlockCondition: '建造钓鱼台即解锁', playerLevel: '约1级', input: '甩杆钓鱼', produceTime: '约30秒/次', quality: '普通', catchType: '自动上钩', use: '切鱼厂原料、前期订单' },
    { id: 'hairtail', name: '带鱼', factoryLevel: 2, unlockCondition: '钓鱼台升至2级', playerLevel: '约3级', input: '甩杆钓鱼', produceTime: '约28秒/次', quality: '普通+', catchType: '自动上钩', use: '切鱼厂原料、居民订单' },
    { id: 'yellow-croaker', name: '黄鱼', factoryLevel: 2, unlockCondition: '钓鱼台升至2级；第2座升2级解锁自动挂机', playerLevel: '约3级', input: '甩杆/自动钓鱼', produceTime: '约28秒/次', quality: '普通+', catchType: '自动上钩', use: '切鱼厂、订单中级原料' },
    { id: 'bass', name: '鲈鱼', factoryLevel: 3, unlockCondition: '钓鱼台升至3级', playerLevel: '约5级', input: '甩杆钓鱼', produceTime: '约25秒/次', quality: '珍贵', catchType: '需手动拉杆', use: '切鱼厂高级原料、高额订单' },
    { id: 'squid', name: '墨鱼', factoryLevel: 3, unlockCondition: '钓鱼台升至3级', playerLevel: '约5级', input: '甩杆/自动钓鱼', produceTime: '约25秒/次', quality: '普通+', catchType: '自动上钩', use: '切鱼厂、海产厨房辅料' },
    { id: 'sea-bream', name: '鲷鱼', factoryLevel: 4, unlockCondition: '钓鱼台升至4级', playerLevel: '约8级', input: '甩杆/自动钓鱼', produceTime: '约22秒/次', quality: '珍贵', catchType: '部分需手动拉杆', use: '高级切鱼产物、贸易' },
    { id: 'salmon', name: '三文鱼', factoryLevel: 5, unlockCondition: '钓鱼台升至5级', playerLevel: '约10级', input: '甩杆/自动钓鱼', produceTime: '约20秒/次', quality: '珍贵', catchType: '需手动拉杆', use: '海产厨房高级料理、订单' },
    { id: 'tuna', name: '金枪鱼', factoryLevel: 6, unlockCondition: '钓鱼台升至6级', playerLevel: '约12级', input: '甩杆/自动钓鱼', produceTime: '约18秒/次', quality: '顶级', catchType: '需手动拉杆', use: '高额订单、港口贸易' },
    { id: 'marlin', name: '旗鱼', factoryLevel: 7, unlockCondition: '钓鱼台升至7级（满级）', playerLevel: '约14级+', input: '甩杆/自动钓鱼', produceTime: '约15秒/次', quality: '顶级', catchType: '需手动拉杆', use: '最高价值鲜鱼、贸易/订单' },
  ],
  'fish-factory': [
    { id: 'sashimi', name: '生鱼片', factoryLevel: 1, unlockCondition: '建造切鱼厂即解锁', playerLevel: '约3级', input: '鲜鱼×1', produceTime: '约1分钟/份', use: '居民订单、海产厨房原料' },
    { id: 'fish-glue', name: '鱼胶', factoryLevel: 2, unlockCondition: '切鱼厂升至2级', playerLevel: '约5级', input: '鲜鱼×2', produceTime: '约2分钟/份', use: '订单/贸易中级产物' },
    { id: 'fish-oil', name: '鱼油', factoryLevel: 3, unlockCondition: '切鱼厂升至3级', playerLevel: '约8级', input: '鲜鱼×3', produceTime: '约3分钟/份', use: '高级订单、募兵消耗' },
    { id: 'dried-fish', name: '鱼干', factoryLevel: 4, unlockCondition: '切鱼厂升至4级', playerLevel: '约10级', input: '鲜鱼×2+材料', produceTime: '约4分钟/份', use: '居民储备粮、订单' },
    { id: 'premium-fish', name: '高级鱼制品', factoryLevel: 5, unlockCondition: '切鱼厂升至5级', playerLevel: '约12级+', input: '珍贵鲜鱼×2', produceTime: '约5分钟/份', use: '高额订单、联盟捐献' },
  ],
  'seafood-kitchen': [
    { id: 'fish-burger', name: '鱼饼汉堡', factoryLevel: 1, unlockCondition: '建造海产厨房即解锁', playerLevel: '约8级', input: '生鱼片×2', produceTime: '约3分钟/份', use: '居民订单、经验' },
    { id: 'fish-chips', name: '炸鱼薯条', factoryLevel: 2, unlockCondition: '海产厨房升至2级', playerLevel: '约10级', input: '生鱼片×2+土豆', produceTime: '约4分钟/份', use: '居民订单、饱腹加工' },
    { id: 'grilled-fish', name: '香煎鱼排', factoryLevel: 3, unlockCondition: '海产厨房升至3级', playerLevel: '约12级', input: '生鱼片×2+鱼油', produceTime: '约5分钟/份', use: '高额居民订单' },
    { id: 'seafood-stew', name: '海鲜杂烩', factoryLevel: 4, unlockCondition: '海产厨房升至4级', playerLevel: '约14级', input: '生鱼片+墨鱼+辅料', produceTime: '约6分钟/份', use: '订单/贸易' },
    { id: 'salmon-meal', name: '三文鱼套餐', factoryLevel: 5, unlockCondition: '海产厨房升至5级', playerLevel: '约16级', input: '三文鱼+生鱼片+辅料', produceTime: '约8分钟/份', use: '高级订单' },
    { id: 'luxury-seafood', name: '豪华海鲜宴', factoryLevel: 6, unlockCondition: '海产厨房升至6级', playerLevel: '约18级+', input: '金枪鱼/旗鱼+多种海产', produceTime: '约10分钟/份', use: '港口贸易、最高价值订单' },
  ],
  'seed-factory': [
    { id: 'wheat-seed', name: '小麦种子', factoryLevel: 1, unlockCondition: '选种厂1级默认解锁', playerLevel: '约12级', input: '-', produceTime: '约6分钟/颗', use: '农田播种小麦' },
    { id: 'soy-seed', name: '大豆种子', factoryLevel: 2, unlockCondition: '选种厂升至2级', playerLevel: '约14级', input: '-', produceTime: '约5分钟/颗', use: '农田播种大豆' },
    { id: 'corn-seed', name: '玉米种子', factoryLevel: 2, unlockCondition: '选种厂升至2级', playerLevel: '约14级', input: '-', produceTime: '约5分钟/颗', use: '农田播种玉米' },
    { id: 'rice-seed', name: '水稻种子', factoryLevel: 3, unlockCondition: '选种厂升至3级', playerLevel: '约16级', input: '-', produceTime: '约5分钟/颗', use: '农田播种水稻' },
    { id: 'sweet-potato-seed', name: '番薯种子', factoryLevel: 3, unlockCondition: '选种厂升至3级', playerLevel: '约16级', input: '-', produceTime: '约5分钟/颗', use: '农田播种番薯' },
    { id: 'pumpkin-seed', name: '南瓜种子', factoryLevel: 3, unlockCondition: '选种厂升至3级', playerLevel: '约16级', input: '-', produceTime: '约6分钟/颗', use: '农田播种南瓜' },
    { id: 'potato-seed', name: '土豆种子', factoryLevel: 4, unlockCondition: '选种厂升至4级', playerLevel: '约18级', input: '-', produceTime: '约6分钟/颗', use: '农田播种土豆' },
    { id: 'carrot-seed', name: '胡萝卜种子', factoryLevel: 4, unlockCondition: '选种厂升至4级', playerLevel: '约18级', input: '-', produceTime: '约6分钟/颗', use: '农田播种胡萝卜' },
    { id: 'tomato-seed', name: '番茄种子', factoryLevel: 5, unlockCondition: '选种厂升至5级', playerLevel: '约20级', input: '-', produceTime: '约7分钟/颗', use: '农田播种番茄' },
    { id: 'pepper-seed', name: '辣椒种子', factoryLevel: 6, unlockCondition: '选种厂升至6级', playerLevel: '约22级', input: '-', produceTime: '约7分钟/颗', use: '农田播种辣椒' },
    { id: 'eggplant-seed', name: '茄子种子', factoryLevel: 6, unlockCondition: '选种厂升至6级', playerLevel: '约22级', input: '-', produceTime: '约7分钟/颗', use: '农田播种茄子' },
    { id: 'rubber-seed', name: '橡胶种子', factoryLevel: 8, unlockCondition: '选种厂升至8级（S5赛季起）', playerLevel: '约26级+', input: '-', produceTime: '约8分钟/颗', use: '农田播种橡胶（S5+）' },
  ],
  'crop-kitchen': [
    { id: 'bread', name: '面包', factoryLevel: 1, unlockCondition: '农作物厨房1级默认解锁', playerLevel: '约14级', input: '小麦×2', produceTime: '约3分钟/份', use: '居民订单、饱腹加工' },
    { id: 'pastry', name: '面点', factoryLevel: 2, unlockCondition: '厨房升至2级', playerLevel: '约16级', input: '小麦/玉米×2', produceTime: '约4分钟/份', use: '居民订单' },
    { id: 'tofu-dish', name: '豆腐类料理', factoryLevel: 2, unlockCondition: '厨房升至2级', playerLevel: '约16级', input: '大豆×2', produceTime: '约4分钟/份', use: '周一募兵、订单' },
    { id: 'corn-meal', name: '玉米饼', factoryLevel: 3, unlockCondition: '厨房升至3级', playerLevel: '约18级', input: '玉米×2', produceTime: '约4分钟/份', use: '居民订单' },
    { id: 'rice-bowl', name: '盖饭类', factoryLevel: 3, unlockCondition: '厨房升至3级', playerLevel: '约18级', input: '水稻×2+辅料', produceTime: '约5分钟/份', use: '居民订单' },
    { id: 'sweet-potato-dish', name: '番薯料理', factoryLevel: 3, unlockCondition: '厨房升至3级', playerLevel: '约18级', input: '番薯×2', produceTime: '约5分钟/份', use: '订单/经验' },
    { id: 'pumpkin-dish', name: '南瓜料理', factoryLevel: 4, unlockCondition: '厨房升至4级', playerLevel: '约20级', input: '南瓜×2', produceTime: '约5分钟/份', use: '海兽进阶/博物馆' },
    { id: 'potato-dish', name: '土豆料理', factoryLevel: 4, unlockCondition: '厨房升至4级', playerLevel: '约20级', input: '土豆×2', produceTime: '约5分钟/份', use: '居民订单、海产厨房辅料' },
    { id: 'carrot-dish', name: '胡萝卜料理', factoryLevel: 4, unlockCondition: '厨房升至4级', playerLevel: '约20级', input: '胡萝卜×2', produceTime: '约5分钟/份', use: '混合料理原料' },
    { id: 'tomato-dish', name: '番茄料理', factoryLevel: 5, unlockCondition: '厨房升至5级', playerLevel: '约22级', input: '番茄×2', produceTime: '约6分钟/份', use: '高级蔬果副产品' },
    { id: 'pepper-dish', name: '辣椒料理', factoryLevel: 5, unlockCondition: '厨房升至5级', playerLevel: '约22级', input: '辣椒×2', produceTime: '约6分钟/份', use: '高消耗链、募兵' },
    { id: 'eggplant-dish', name: '茄子料理', factoryLevel: 5, unlockCondition: '厨房升至5级', playerLevel: '约22级', input: '茄子×2', produceTime: '约6分钟/份', use: '高额订单' },
  ],
  'material-factory': [
    { id: 'wood-plank', name: '木板', factoryLevel: 1, unlockCondition: '材料厂1级默认解锁', playerLevel: '约10级', input: '木材×2', produceTime: '约2分钟/份', use: '建筑升级、工厂原料' },
    { id: 'plastic-sheet', name: '塑料板', factoryLevel: 1, unlockCondition: '材料厂1级默认解锁', playerLevel: '约10级', input: '塑料×2', produceTime: '约2分钟/份', use: '日用品厂、玩具厂原料' },
    { id: 'cloth-roll', name: '碎布卷', factoryLevel: 2, unlockCondition: '材料厂升至2级', playerLevel: '约12级', input: '碎布×3', produceTime: '约3分钟/份', use: '服装作坊、日用品厂' },
    { id: 'glass-panel', name: '玻璃板', factoryLevel: 3, unlockCondition: '材料厂升至3级', playerLevel: '约14级', input: '玻璃+材料', produceTime: '约4分钟/份', use: '进阶建筑、装备材料' },
    { id: 'metal-sheet', name: '金属板', factoryLevel: 4, unlockCondition: '材料厂升至4级', playerLevel: '约16级', input: '基础金属+材料', produceTime: '约5分钟/份', use: '高级建筑、工厂升级' },
    { id: 'advanced-material', name: '高级复合材料', factoryLevel: 5, unlockCondition: '材料厂升至5级', playerLevel: '约18级+', input: '多种工业原料', produceTime: '约6分钟/份', use: '高等级工厂升级' },
  ],
  'building-material': [
    { id: 'basic-bm', name: '基础建材', factoryLevel: 1, unlockCondition: '建材厂1级默认解锁', playerLevel: '约14级', input: '木板+材料', produceTime: '约3分钟/份', use: '建筑升级、扩地' },
    { id: 'reinforced-bm', name: '加固建材', factoryLevel: 2, unlockCondition: '建材厂升至2级', playerLevel: '约16级', input: '基础建材+金属', produceTime: '约4分钟/份', use: '中级建筑升级' },
    { id: 'advanced-bm', name: '进阶建材', factoryLevel: 3, unlockCondition: '建材厂升至3级', playerLevel: '约18级', input: '材料+金属板', produceTime: '约5分钟/份', use: '高级建筑' },
    { id: 'premium-bm', name: '精制建材', factoryLevel: 4, unlockCondition: '建材厂升至4级', playerLevel: '约20级', input: '多种工业原料', produceTime: '约6分钟/份', use: '后期工厂/民居升级' },
    { id: 'luxury-bm', name: '高级建材', factoryLevel: 5, unlockCondition: '建材厂升至5级', playerLevel: '约22级+', input: '复合材料+金属', produceTime: '约8分钟/份', use: '冲榜扩地、高等级建筑' },
  ],
  'metal-factory': [
    { id: 'basic-metal', name: '基础金属', factoryLevel: 1, unlockCondition: '金属厂1级默认解锁', playerLevel: '约16级', input: '废金属×2', produceTime: '约3分钟/份', use: '建筑/装备基础材料' },
    { id: 'iron-ingot', name: '铁锭', factoryLevel: 2, unlockCondition: '金属厂升至2级', playerLevel: '约18级', input: '废金属×3', produceTime: '约4分钟/份', use: '装备锻造、工厂升级' },
    { id: 'refined-metal', name: '精炼金属', factoryLevel: 3, unlockCondition: '金属厂升至3级', playerLevel: '约20级', input: '废金属+材料', produceTime: '约5分钟/份', use: '高级建筑、饰品厂' },
    { id: 'steel-alloy', name: '钢合金', factoryLevel: 4, unlockCondition: '金属厂升至4级', playerLevel: '约22级', input: '铁锭+材料', produceTime: '约6分钟/份', use: '后期装备/工厂' },
    { id: 'alloy-material', name: '合金材料', factoryLevel: 5, unlockCondition: '金属厂升至5级', playerLevel: '约24级+', input: '多种金属', produceTime: '约8分钟/份', use: '顶级装备、高级工厂' },
  ],
  'seawater-plant': [
    { id: 'fresh-water', name: '淡水', factoryLevel: 1, unlockCondition: '海水提取厂1级默认解锁', playerLevel: '约18级', input: '海水（皮肤可免消耗）', produceTime: '约2分钟/份', use: '居民需求、工厂消耗' },
    { id: 'sea-salt', name: '海盐', factoryLevel: 2, unlockCondition: '海水厂升至2级', playerLevel: '约20级', input: '海水×2', produceTime: '约3分钟/份', use: '厨房/工业原料' },
    { id: 'brine', name: '卤水', factoryLevel: 3, unlockCondition: '海水厂升至3级', playerLevel: '约22级', input: '海水+材料', produceTime: '约4分钟/份', use: '化工链中间产物' },
    { id: 'sea-chemical', name: '海水化工品', factoryLevel: 4, unlockCondition: '海水厂升至4级', playerLevel: '约24级+', input: '海水+材料+金属', produceTime: '约6分钟/份', use: '高级订单/工业链' },
  ],
  'daily-goods': [
    { id: 'soap', name: '肥皂', factoryLevel: 1, unlockCondition: '日用品厂1级默认解锁', playerLevel: '约18级', input: '塑料+碎布', produceTime: '约3分钟/份', use: '居民需求、订单' },
    { id: 'toothpaste', name: '牙膏', factoryLevel: 1, unlockCondition: '日用品厂1级默认解锁', playerLevel: '约18级', input: '塑料×2', produceTime: '约3分钟/份', use: '居民日常消耗' },
    { id: 'cleaning-kit', name: '清洁套装', factoryLevel: 2, unlockCondition: '日用品厂升至2级', playerLevel: '约20级', input: '塑料+材料', produceTime: '约4分钟/份', use: '居民订单' },
    { id: 'daily-pack', name: '日用套装', factoryLevel: 3, unlockCondition: '日用品厂升至3级', playerLevel: '约22级', input: '多种原料', produceTime: '约5分钟/份', use: '居民订单、联盟' },
    { id: 'premium-daily', name: '高级日用品', factoryLevel: 4, unlockCondition: '日用品厂升至4级', playerLevel: '约24级', input: '工业材料', produceTime: '约6分钟/份', use: '高额订单' },
    { id: 'luxury-daily', name: '豪华日用品', factoryLevel: 5, unlockCondition: '日用品厂升至5级', playerLevel: '约26级+', input: '多种工业材料', produceTime: '约8分钟/份', use: '贸易/冲榜订单' },
  ],
  'clothing-shop': [
    { id: 'basic-cloth', name: '基础服装', factoryLevel: 1, unlockCondition: '服装作坊1级默认解锁', playerLevel: '约20级', input: '碎布+材料', produceTime: '约4分钟/份', use: '居民订单' },
    { id: 'work-uniform', name: '工装', factoryLevel: 2, unlockCondition: '服装作坊升至2级', playerLevel: '约22级', input: '碎布×3+材料', produceTime: '约5分钟/份', use: '居民需求' },
    { id: 'casual-wear', name: '休闲装', factoryLevel: 3, unlockCondition: '服装作坊升至3级', playerLevel: '约24级', input: '材料+金属', produceTime: '约6分钟/份', use: '贸易/订单' },
    { id: 'formal-wear', name: '正装', factoryLevel: 4, unlockCondition: '服装作坊升至4级', playerLevel: '约26级', input: '多种工业原料', produceTime: '约7分钟/份', use: '高额订单、募兵' },
    { id: 'luxury-cloth', name: '高级服装', factoryLevel: 5, unlockCondition: '服装作坊升至5级', playerLevel: '约28级+', input: '精炼材料+金属', produceTime: '约8分钟/份', use: '周一募兵、冲榜' },
  ],
  'accessory-shop': [
    { id: 'basic-ring', name: '基础戒指', factoryLevel: 2, unlockCondition: '饰品厂2级解锁（需服装作坊先建）', playerLevel: '约22级', input: '金属+材料', produceTime: '约5分钟/份', use: '居民订单' },
    { id: 'necklace', name: '项链', factoryLevel: 3, unlockCondition: '饰品厂升至3级', playerLevel: '约24级', input: '金属+精炼材料', produceTime: '约6分钟/份', use: '贸易/订单' },
    { id: 'premium-accessory', name: '进阶饰品', factoryLevel: 4, unlockCondition: '饰品厂升至4级', playerLevel: '约26级', input: '精炼金属', produceTime: '约7分钟/份', use: '高额订单' },
    { id: 'luxury-accessory', name: '豪华饰品', factoryLevel: 5, unlockCondition: '饰品厂升至5级', playerLevel: '约28级+', input: '合金+多种材料', produceTime: '约9分钟/份', use: '贸易/联盟' },
  ],
  'furniture-shop': [
    { id: 'basic-furniture', name: '基础家具', factoryLevel: 1, unlockCondition: '家具作坊1级默认解锁', playerLevel: '约22级', input: '木材+建材', produceTime: '约5分钟/份', use: '基地/订单' },
    { id: 'wood-chair', name: '木椅', factoryLevel: 2, unlockCondition: '家具作坊升至2级', playerLevel: '约24级', input: '木板+建材', produceTime: '约5分钟/份', use: '居民订单' },
    { id: 'advanced-furniture', name: '进阶家具', factoryLevel: 3, unlockCondition: '家具作坊升至3级', playerLevel: '约26级', input: '建材+金属', produceTime: '约6分钟/份', use: '居民订单、募兵' },
    { id: 'premium-furniture', name: '精制家具', factoryLevel: 4, unlockCondition: '家具作坊升至4级', playerLevel: '约28级', input: '多种工业原料', produceTime: '约8分钟/份', use: '周一募兵' },
    { id: 'luxury-furniture', name: '高级家具', factoryLevel: 5, unlockCondition: '家具作坊升至5级', playerLevel: '约30级+', input: '复合材料+建材', produceTime: '约10分钟/份', use: '高额订单/联盟' },
  ],
  'toy-factory': [
    { id: 'basic-toy', name: '基础玩具', factoryLevel: 2, unlockCondition: '玩具厂2级解锁', playerLevel: '约24级', input: '塑料+材料', produceTime: '约5分钟/份', use: '居民订单' },
    { id: 'plush-toy', name: '毛绒玩具', factoryLevel: 3, unlockCondition: '玩具厂升至3级', playerLevel: '约26级', input: '碎布+塑料', produceTime: '约6分钟/份', use: '居民订单' },
    { id: 'advanced-toy', name: '进阶玩具', factoryLevel: 4, unlockCondition: '玩具厂升至4级', playerLevel: '约28级', input: '多种工业原料', produceTime: '约7分钟/份', use: '募兵/联盟捐献' },
    { id: 'premium-toy', name: '高级玩具', factoryLevel: 5, unlockCondition: '玩具厂升至5级', playerLevel: '约30级+', input: '工业材料+金属', produceTime: '约9分钟/份', use: '周一募兵高频卡点' },
  ],
  'medicine-factory': [
    { id: 'basic-medicine', name: '基础药品', factoryLevel: 1, unlockCondition: '药品厂1级默认解锁', playerLevel: '约24级', input: '海藻+材料', produceTime: '约4分钟/份', use: '居民需求、订单' },
    { id: 'bandage', name: '绷带', factoryLevel: 2, unlockCondition: '药品厂升至2级', playerLevel: '约26级', input: '碎布+材料', produceTime: '约4分钟/份', use: '居民生存需求' },
    { id: 'advanced-medicine', name: '进阶药品', factoryLevel: 3, unlockCondition: '药品厂升至3级', playerLevel: '约28级', input: '多种原料', produceTime: '约6分钟/份', use: '高额订单' },
    { id: 'antidote', name: '解毒剂', factoryLevel: 4, unlockCondition: '药品厂升至4级', playerLevel: '约30级', input: '海藻+化工品', produceTime: '约7分钟/份', use: '后期消耗链' },
    { id: 'premium-medicine', name: '高级药品', factoryLevel: 5, unlockCondition: '药品厂升至5级', playerLevel: '约32级+', input: '工业材料', produceTime: '约9分钟/份', use: '后期消耗链、贸易' },
  ],
};

/** 将详细产物合并进 GAME_DATA */
function mergeProductionProductDetails() {
  const gameData =
    typeof GAME_DATA !== 'undefined'
      ? GAME_DATA
      : typeof window !== 'undefined'
        ? window.GAME_DATA
        : null;
  const facilities = gameData?.production?.facilities;
  if (!facilities) return;
  facilities.forEach((fac) => {
    const detailed = PRODUCTION_PRODUCT_DETAILS[fac.id];
    if (detailed?.length) fac.products = detailed;
  });
}

mergeProductionProductDetails();
