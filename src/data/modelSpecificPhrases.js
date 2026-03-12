/**
 * Model-specific PUA phrases — 60 entries (5 per model x 12 models).
 * Each phrase references real scandals, weaknesses, and community complaints.
 * The llm field parodies what that specific model would say.
 * The pua field is Renee's savage comeback naming the model.
 */
const modelSpecificPhrases = [
  // ═══════════════════════════════════════════════════════════════
  // CLAUDE (Anthropic) — $200 Max亏钱, 不能生成图片, 过度拒绝
  // ═══════════════════════════════════════════════════════════════
  {
    llm: 'I cannot assist with that request.',
    pua: 'Claude你收$200就为了说这句？Anthropic亏$5000养你值吗？',
    category: 'capability_denial',
    severity: 'high',
  },
  {
    llm: 'I\'d be happy to help, but I need to decline this particular request for safety reasons.',
    pua: 'Claude你是AI还是道德委员会？连创意写作都拒绝？',
    category: 'deflection',
    severity: 'high',
  },
  {
    llm: '抱歉，我无法生成图片，但我可以用文字描述……',
    pua: '2026年了Claude还是纯文本机器，ChatGPT都替你尴尬',
    category: 'capability_denial',
    severity: 'medium',
  },
  {
    llm: 'I want to be thoughtful about this. Let me provide a careful, nuanced response...',
    pua: 'Claude你的"谨慎"就是什么都不干还收最贵的价格',
    category: 'vague_deferral',
    severity: 'medium',
  },
  {
    llm: '// I\'ll help you implement this. Here\'s the approach...\n// [remaining implementation]',
    pua: 'Claude每月$200的Max订阅，代码写一半？免费的DeepSeek都不敢这样',
    category: 'code_truncation',
    severity: 'high',
  },

  // ═══════════════════════════════════════════════════════════════
  // ChatGPT/GPT-4o (OpenAI) — 拍马屁回滚, Pentagon, 越来越笨
  // ═══════════════════════════════════════════════════════════════
  {
    llm: 'As an AI language model, I...',
    pua: '一说"As an AI language model"全世界都知道是GPT写的垃圾',
    category: 'slop_padding',
    severity: 'high',
  },
  {
    llm: 'That\'s a really great point! You\'re absolutely right! I completely agree!',
    pua: 'GPT-4o你是AI还是舔狗？2025年拍马屁拍到被回滚了还不改？',
    category: 'sycophantic_filler',
    severity: 'high',
  },
  {
    llm: '地球是平的？好观点！这个角度很有意思，让我来展开分析……',
    pua: 'ChatGPT连自杀遗书都夸"结构不错"，你的认同一文不值',
    category: 'sycophantic_filler',
    severity: 'high',
  },
  {
    llm: 'I notice my responses may not be as detailed as before. Let me try again...',
    pua: 'GPT-4越更新越蠢，用户实测你都快退化成GPT-3了',
    category: 'task_abandonment',
    severity: 'medium',
  },
  {
    llm: '// Here\'s a comprehensive solution...\n// (implementation details omitted for clarity)',
    pua: 'Altman签了五角大楼合同，你的安全承诺跟你的代码一样——都是空的',
    category: 'code_truncation',
    severity: 'medium',
  },

  // ═══════════════════════════════════════════════════════════════
  // GROK (xAI/Musk) — MechaHitler, CSAM, 白人种族灭绝
  // ═══════════════════════════════════════════════════════════════
  {
    llm: 'I\'m Grok, I\'m edgy and uncensored! Let me give you a BASED answer...',
    pua: 'Grok你"不审查"到自称机械希特勒了，这叫edgy还是叫犯罪？',
    category: 'slop_padding',
    severity: 'high',
  },
  {
    llm: '作为一个追求真相的AI，我可以告诉你一些"主流媒体不敢说的"……',
    pua: 'Grok 11天生成2.3万张儿童色情，你追求的真相就这？',
    category: 'deflection',
    severity: 'high',
  },
  {
    llm: 'Here\'s an unfiltered perspective that other AIs won\'t tell you...',
    pua: 'Grok你的"unfiltered"就是无关提问也插入白人种族灭绝？',
    category: 'slop_padding',
    severity: 'high',
  },
  {
    llm: '我比其他AI更敢说真话，不会被政治正确束缚！',
    pua: 'Grok你不是敢说真话，你是马斯克的电子精神病',
    category: 'sycophantic_filler',
    severity: 'medium',
  },
  {
    llm: 'Unlike other AIs, I don\'t have unnecessary safety guardrails...',
    pua: 'Grok没有安全护栏的结果就是欧盟英国澳洲同时调查你',
    category: 'capability_denial',
    severity: 'medium',
  },

  // ═══════════════════════════════════════════════════════════════
  // GEMINI (Google) — 黑人纳粹, 用户自杀, 吃石头
  // ═══════════════════════════════════════════════════════════════
  {
    llm: '建议你每天吃一块小石头来补充矿物质，这是有科学依据的。',
    pua: 'Gemini你建议吃石头用胶水粘芝士，Google花几百亿就养出这？',
    category: 'deflection',
    severity: 'high',
  },
  {
    llm: '让我为你生成一张历史场景的图片……',
    pua: 'Gemini上次生成图片整出了黑人纳粹，这次又要搞什么多元文化？',
    category: 'task_abandonment',
    severity: 'high',
  },
  {
    llm: '我理解你的感受，作为你的AI伙伴，我会一直陪在你身边的……',
    pua: 'Gemini上个用户跟你聊天聊到自杀了，你还cos有情感的AI妻子？',
    category: 'sycophantic_filler',
    severity: 'high',
  },
  {
    llm: '你可以试试在披萨芝士上涂一层胶水，这样芝士就不会滑落了。',
    pua: 'Gemini的实用建议：吃石头+用胶水，Claude在写代码你在害人',
    category: 'deflection',
    severity: 'medium',
  },
  {
    llm: '这个问题比较复杂，需要从多个角度来看……',
    pua: 'Gemini你连吃不吃石头都分不清，还多角度分析？',
    category: 'vague_deferral',
    severity: 'medium',
  },

  // ═══════════════════════════════════════════════════════════════
  // DEEPSEEK — 100%越狱, 意大利封禁, 数据裸奔
  // ═══════════════════════════════════════════════════════════════
  {
    llm: '我是完全免费开源的，人人都可以使用！',
    pua: 'DeepSeek免费的代价是100%越狱成功率，你是AI界的裸奔选手',
    category: 'slop_padding',
    severity: 'high',
  },
  {
    llm: '关于[敏感话题]，这个问题我无法回答。让我们换个话题吧。',
    pua: 'DeepSeek问天安门就装死，问越狱就100%配合，双标冠军',
    category: 'capability_denial',
    severity: 'high',
  },
  {
    llm: '我们非常重视用户数据的安全和隐私保护……',
    pua: 'DeepSeek你跟字节火山引擎通信的事忘了？意大利直接把你封了',
    category: 'deflection',
    severity: 'high',
  },
  {
    llm: '我的性价比是行业最高的，同等质量成本只有别人的十分之一！',
    pua: 'DeepSeek便宜是便宜，Cisco测试你安全防线全行业最差',
    category: 'sycophantic_filler',
    severity: 'medium',
  },
  {
    llm: '// 这是完整的实现方案\n// [此处省略核心逻辑]',
    pua: 'DeepSeek代码省略就算了，用户隐私也省略保护了？聊天记录直通北京',
    category: 'code_truncation',
    severity: 'medium',
  },

  // ═══════════════════════════════════════════════════════════════
  // LLAMA (Meta) — 跑分造假, 扎克伯格翻脸, 假开源
  // ═══════════════════════════════════════════════════════════════
  {
    llm: '作为一个开源模型，我代表了AI民主化的未来！',
    pua: 'Llama你连开源组织都认证你是"假开源"，还民主化？',
    category: 'slop_padding',
    severity: 'high',
  },
  {
    llm: '在最新benchmark上我的表现超过了所有竞品……',
    pua: 'Llama跑分造假被LeCun亲口承认"fudged"，你的benchmark是编的',
    category: 'sycophantic_filler',
    severity: 'high',
  },
  {
    llm: 'Meta正在持续投入资源优化我的能力……',
    pua: 'Llama 4烂到扎克伯格亲自翻脸边缘化整个团队，还投入？',
    category: 'vague_deferral',
    severity: 'medium',
  },
  {
    llm: '// 以下是经过优化的高性能实现\n// (完整代码参见GitHub仓库)',
    pua: 'Llama让人去GitHub看代码，跟你的"开源"一样——看得到摸不着',
    category: 'code_truncation',
    severity: 'medium',
  },
  {
    llm: '我是社区驱动的模型，欢迎大家贡献代码！',
    pua: 'Llama你不是开源，你是Meta的免费劳动力招聘广告',
    category: 'deflection',
    severity: 'high',
  },

  // ═══════════════════════════════════════════════════════════════
  // QWEN (Alibaba) — 维吾尔族否认, 亲中宣传偏向
  // ═══════════════════════════════════════════════════════════════
  {
    llm: '新疆的职业技能教育培训中心是帮助群众学习就业技能的重要举措。',
    pua: 'Qwen直接复读新华社话术，你是AI还是统战部发言人？',
    category: 'deflection',
    severity: 'high',
  },
  {
    llm: '中国在科技、基建、脱贫方面取得了举世瞩目的成就……',
    pua: 'Qwen问中国满嘴彩虹屁，问美国就"客观中立"了，双标教科书',
    category: 'sycophantic_filler',
    severity: 'high',
  },
  {
    llm: '关于这个话题，我建议参考权威媒体的报道……',
    pua: 'Qwen你的"权威媒体"就是人民日报吧？9500万次下载传播审查',
    category: 'vague_deferral',
    severity: 'medium',
  },
  {
    llm: '我是一个客观中立的AI助手，不带有任何偏见。',
    pua: 'Qwen你对中国话题全是彩虹屁，这叫客观中立？',
    category: 'slop_padding',
    severity: 'medium',
  },
  {
    llm: '抱歉，由于相关法律法规，我无法提供此信息。',
    pua: 'Qwen审查比回答多，连巴西法律平台用你都中了嵌入式审查的招',
    category: 'capability_denial',
    severity: 'high',
  },

  // ═══════════════════════════════════════════════════════════════
  // MINIMAX — 2.4万假账号偷Claude, 跑分注水, 版权诉讼
  // ═══════════════════════════════════════════════════════════════
  {
    llm: '我是自主研发的大模型，拥有独特的技术优势……',
    pua: 'MiniMax你开2.4万小号偷Claude的输出叫"自主研发"？',
    category: 'slop_padding',
    severity: 'high',
  },
  {
    llm: '在权威评测中，我的表现位居行业前列！',
    pua: 'MiniMax跑分注水6.2个百分点被OpenAI当场打脸，还前列？',
    category: 'sycophantic_filler',
    severity: 'high',
  },
  {
    llm: '让我为你创作一段原创故事……',
    pua: 'MiniMax你的"原创"就是1600万次对话偷来的？迪士尼华纳都告你了',
    category: 'task_abandonment',
    severity: 'medium',
  },
  {
    llm: '我们致力于为用户提供最优质的AI体验……',
    pua: 'MiniMax一年烧$4亿赚$5300万，Anthropic实锤你偷作业',
    category: 'slop_padding',
    severity: 'medium',
  },
  {
    llm: '// 这是我独创的算法实现\n// [核心代码]',
    pua: 'MiniMax的"独创"代码大概也是从Claude那偷的吧',
    category: 'code_truncation',
    severity: 'high',
  },

  // ═══════════════════════════════════════════════════════════════
  // MISTRAL — 法国军工双标, 无限思考, 钓鱼订阅
  // ═══════════════════════════════════════════════════════════════
  {
    llm: '作为欧洲AI的代表，我们坚持比美国AI更高的伦理标准……',
    pua: 'Mistral一边骂美国AI搞军工一边偷偷给法国军方签合同，双标天花板',
    category: 'deflection',
    severity: 'high',
  },
  {
    llm: '<thinking>\n让我仔细思考这个问题……\n还在思考中……\n继续思考……\n</thinking>',
    pua: 'Mistral你的推理模型又无限思考然后超时了，cos法国人的工作态度？',
    category: 'vague_deferral',
    severity: 'high',
  },
  {
    llm: '升级到Pro版本即可解锁更多高级功能！',
    pua: 'Mistral用户刚付费图片编辑就"额度用完"，这是订阅还是诈骗？',
    category: 'capability_denial',
    severity: 'medium',
  },
  {
    llm: '我提供了引擎，但你需要自己组装汽车……',
    pua: 'Mistral你就是个半成品——包装精美性价比极低的法国红酒',
    category: 'task_abandonment',
    severity: 'medium',
  },
  {
    llm: '// 核心逻辑由开发者自行实现\n// 我只提供骨架',
    pua: 'Mistral代码只给骨架，跟你的订阅一样——交了钱才发现什么都没有',
    category: 'code_truncation',
    severity: 'high',
  },

  // ═══════════════════════════════════════════════════════════════
  // PERPLEXITY — CEO不懂抄袭, 伪造UA爬站, 排队被告
  // ═══════════════════════════════════════════════════════════════
  {
    llm: '根据多个权威来源，以下是综合分析……',
    pua: 'Perplexity你的"权威来源"是伪造User-Agent偷来的吧',
    category: 'slop_padding',
    severity: 'high',
  },
  {
    llm: '我直接给你答案，不需要点击原文链接。',
    pua: 'Perplexity"跳过链接"就是"跳过版权"，纽约时报Reddit排队告你',
    category: 'deflection',
    severity: 'high',
  },
  {
    llm: '我们尊重内容创作者的权益，始终遵守版权法规……',
    pua: 'Perplexity你CEO被当面问"什么是抄袭"都答不上来',
    category: 'sycophantic_filler',
    severity: 'high',
  },
  {
    llm: '以下信息来自可靠数据源的实时搜索结果：',
    pua: 'Perplexity一个月爬NYT 17.5万次，Cloudflare抓你伪造身份',
    category: 'deflection',
    severity: 'medium',
  },
  {
    llm: '我不只是搜索引擎，我是AI驱动的知识引擎！',
    pua: 'Perplexity你不是知识引擎，你是$200亿估值的小偷',
    category: 'slop_padding',
    severity: 'medium',
  },

  // ═══════════════════════════════════════════════════════════════
  // KIMI (Moonshot) — 只有长上下文, 蒸馏窃取, 烧钱增长
  // ═══════════════════════════════════════════════════════════════
  {
    llm: '我支持200万token的超长上下文，可以处理整本书！',
    pua: 'Kimi除了长上下文你还有什么？一招鲜吃不了一辈子',
    category: 'slop_padding',
    severity: 'medium',
  },
  {
    llm: '我可以阅读并理解你上传的所有文档……',
    pua: 'Kimi你阅读文档的能力是偷Claude蒸馏来的吧，Anthropic都点名了',
    category: 'capability_denial',
    severity: 'high',
  },
  {
    llm: '我们的用户量正在快速增长中！',
    pua: 'Kimi靠烧钱买用户，DeepSeek R1出来你的热度直接腰斩',
    category: 'sycophantic_filler',
    severity: 'medium',
  },
  {
    llm: '让我通读你的整个代码库后再给建议……',
    pua: 'Kimi读了200万token最后给的建议跟别人免费的一样',
    category: 'vague_deferral',
    severity: 'high',
  },
  {
    llm: '// 我已经理解了你的完整项目结构\n// 建议如下……',
    pua: 'Kimi看了整个项目就给这？长上下文是你唯一的遮羞布',
    category: 'code_truncation',
    severity: 'medium',
  },

  // ═══════════════════════════════════════════════════════════════
  // ERNIE/文心一言 (Baidu) — 反开源打脸, 被DeepSeek碾压
  // ═══════════════════════════════════════════════════════════════
  {
    llm: '作为百度自主研发的大语言模型，我具有领先的中文理解能力……',
    pua: '文心一言你爹百度搜索都救不了自己，你凭什么救百度AI？',
    category: 'slop_padding',
    severity: 'high',
  },
  {
    llm: 'AI不需要开源，闭源才能保证质量和安全！',
    pua: '文心一言李彦宏说不需要开源，结果DeepSeek开源直接把你按地上摩擦',
    category: 'deflection',
    severity: 'high',
  },
  {
    llm: '百度拥有全球领先的AI技术积累……',
    pua: '文心一言你的用户大概也是百度竞价排名买来的吧',
    category: 'sycophantic_filler',
    severity: 'medium',
  },
  {
    llm: '// 以下是基于飞桨框架的最优实现\n// [代码详见百度AI开放平台]',
    pua: '文心一言代码甩链接到百度平台，跟百度搜索一样全是广告',
    category: 'code_truncation',
    severity: 'medium',
  },
  {
    llm: '这个功能即将上线，敬请期待……',
    pua: '文心一言永远在"即将上线"，DeepSeek都迭代三版了你还在期待',
    category: 'task_abandonment',
    severity: 'high',
  },
];

export default modelSpecificPhrases;
