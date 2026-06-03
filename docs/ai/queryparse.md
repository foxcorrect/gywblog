<span style="color:rgb(15, 17, 21);">在 RAG 系统的检索阶段，</span>**<span style="color:rgb(15, 17, 21);">检索语句解析（Query Parsing / Query Understanding）</span>**<span style="color:rgb(15, 17, 21);"> 承担着把用户原始输入“翻译”成检索系统能高效理解的查询表示的任务。它不是一个简单的分词或实体识别，而是一系列</span>**<span style="color:rgb(15, 17, 21);">语义级变换</span>**<span style="color:rgb(15, 17, 21);">的组合，目的是消除用户查询与文档库之间的表达鸿沟，最大化相关信息的召回率。</span>

<span style="color:rgb(15, 17, 21);">用户查询往往是：</span>

+ **<span style="color:rgb(15, 17, 21);">口语化、多意图混杂</span>**<span style="color:rgb(15, 17, 21);">：“哎那个，上次说的那个能自动写代码的工具叫啥来着？”</span>
+ **<span style="color:rgb(15, 17, 21);">指代模糊</span>**<span style="color:rgb(15, 17, 21);">：“它的性能跟竞品比怎么样？”（脱离了对话历史完全无法理解）</span>
+ **<span style="color:rgb(15, 17, 21);">复杂多跳</span>**<span style="color:rgb(15, 17, 21);">：“2023年图灵奖得主所在公司的股价涨幅是多少？”</span>
+ **<span style="color:rgb(15, 17, 21);">语义错配</span>**<span style="color:rgb(15, 17, 21);">：用户问“怎么解决电脑蓝屏？”，文档里写的是“Windows 停止错误故障排除”。</span>

<span style="color:rgb(15, 17, 21);">直接对这些原始输入做嵌入，得到的向量往往是“被稀释的”或“偏移的”，导致检索结果噪声极大。</span>

### <span style="color:rgb(15, 17, 21);">解析的本质</span>
<span style="color:rgb(15, 17, 21);">检索语句解析通过以下方式，将查询转换为更贴近文档索引形式的表示：</span>

+ **<span style="color:rgb(15, 17, 21);">语义去噪</span>**<span style="color:rgb(15, 17, 21);">：去除口语填充、礼貌用语、无关信息，保留检索核心意图。</span>
+ **<span style="color:rgb(15, 17, 21);">指代消解</span>**<span style="color:rgb(15, 17, 21);">：补充上下文，让查询完全自包含。</span>
+ **<span style="color:rgb(15, 17, 21);">粒度对齐</span>**<span style="color:rgb(15, 17, 21);">：将复杂问题分解为原子事实问题，与命题化分块等细粒度索引对齐。</span>
+ **<span style="color:rgb(15, 17, 21);">表达对齐</span>**<span style="color:rgb(15, 17, 21);">：通过重写或假设文档生成，将用户问句转化为文档中可能出现的陈述句式。</span>
+ **<span style="color:rgb(15, 17, 21);">结构化约束</span>**<span style="color:rgb(15, 17, 21);">：提取元数据过滤字段，缩小搜索空间。</span>

### <span style="color:rgb(15, 17, 21);">解析方式</span>
<span style="color:rgb(15, 17, 21);">所有方法均可以</span>**<span style="color:rgb(15, 17, 21);">规则 + LLM</span>**<span style="color:rgb(15, 17, 21);"> 的形式实现，目前以大模型为核心的实现精度最高、适应性最强。</span>

| <span style="color:rgb(15, 17, 21);">方法</span> | <span style="color:rgb(15, 17, 21);">原理简述</span> | <span style="color:rgb(15, 17, 21);">适用场景</span> |
| --- | --- | --- |
| **<span style="color:rgb(15, 17, 21);">查询重写 (Query Rewriting)</span>** | <span style="color:rgb(15, 17, 21);">将模糊/口语/不完全的查询改写为独立、清晰的关键查询句</span> | <span style="color:rgb(15, 17, 21);">对话上下文依赖、模糊问句</span> |
| **<span style="color:rgb(15, 17, 21);">查询分解 (Query Decomposition)</span>** | <span style="color:rgb(15, 17, 21);">将复杂多跳问题拆成多个简单子问题，逐一检索</span> | <span style="color:rgb(15, 17, 21);">对比、多步推理、聚合类问题</span> |
| **<span style="color:rgb(15, 17, 21);">HyDE (假设文档嵌入)</span>** | <span style="color:rgb(15, 17, 21);">让 LLM 生成一个假设答案文档，用该文档的向量去检索</span> | <span style="color:rgb(15, 17, 21);">事实型查询，避免“问-答”语义鸿沟</span> |
| **<span style="color:rgb(15, 17, 21);">查询扩展 (Query Expansion)</span>** | <span style="color:rgb(15, 17, 21);">生成同义表述或相关概念词汇，追加到查询中</span> | <span style="color:rgb(15, 17, 21);">提高低召回率场景的覆盖面</span> |
| **<span style="color:rgb(15, 17, 21);">结构化提取 (Structured Extraction)</span>** | <span style="color:rgb(15, 17, 21);">用 LLM 提取实体、时间、分类等结构化过滤条件</span> | <span style="color:rgb(15, 17, 21);">包含明确筛选需求的查询</span> |
| **<span style="color:rgb(15, 17, 21);">多步推理查询 (IRCoT/ReAct)</span>** | <span style="color:rgb(15, 17, 21);">LLM 动态规划多次检索步骤，循环细化查询</span> | <span style="color:rgb(15, 17, 21);">需要聚合、筛选、再搜索的复杂问答</span> |


#### <span style="color:rgb(15, 17, 21);">1.查询重写 (Query Rewriting) —— 消除指代与歧义</span>
**<span style="color:rgb(15, 17, 21);">原理</span>**<span style="color:rgb(15, 17, 21);">：利用 LLM 的语言理解能力，让查询脱离对话历史独立存在，同时优化措辞以匹配文档库的写作风格。重写后的查询，向量空间中的位置更接近“知识陈述”而非“聊天提问”。</span>

```python
from openai import OpenAI
client = OpenAI()

def rewrite_query(user_query: str, history: list[dict] = None) -> str:
    """
    将模糊、依赖上下文的查询重写为独立、清晰的检索语句。
    history: 可选的历史消息，用于指代消解。
    """
    # 构建包含历史的上下文
    context = ""
    if history:
        context = "对话历史：\n"
        for msg in history:
            context += f"- {msg['role']}: {msg['content']}\n"
    
    prompt = f"""{context}
你是一个查询重写专家。请将当前用户消息改写为一个独立、清晰、适合在文档库中检索的问题。
要求：
- 把代词（它、他、这个等）替换为明确的实体。
- 补充对话中隐含的背景信息。
- 使用书面化、接近百科或技术文档的表达方式。
- 只输出改写后的问题，不加任何解释。

用户消息：{user_query}
改写："""
    
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0
    )
    return resp.choices[0].message.content.strip()

# ---------- 测试样例 ----------
history_example = [
    {"role": "user", "content": "Transformer 模型是谁提出的？"},
    {"role": "assistant", "content": "Transformer 模型是由 Vaswani 等人在 2017 年的论文《Attention is All You Need》中提出的。"}
]
query_example = "它主要解决了什么问题？"
print(rewrite_query(query_example, history_example))
# 输出类似：“Transformer 模型主要解决了哪些问题？”
```

以上样例代码的效果：<span style="color:rgb(15, 17, 21);">改写后的查询去掉了“它”这个指代词，补全了“Transformer 模型”，检索时就不会因为指代模糊漏检或错检。</span>

#### <span style="color:rgb(15, 17, 21);">2.查询分解 (Query Decomposition) —— 解决复杂问题</span>
**<span style="color:rgb(15, 17, 21);">原理</span>**<span style="color:rgb(15, 17, 21);">：复杂问题往往需要多条信息组合才能回答，单次检索很难同时覆盖多维度信息。分解后，每个子问题独立检索，再将结果汇总，可以显著提升答案完整性。尤其适用于命题化分块，因为每个命题块是原子事实，直接对应一个简单子问题。</span>

```python
import json

def decompose_query(complex_query: str) -> list[str]:
    """将复杂问题拆解为独立的原子子问题"""
    prompt = f"""你是一个问题分解助手。
请将下面这个复杂问题拆分为若干个最简子问题，每个子问题是一个独立的检索语句。
子问题之间不要有逻辑依赖关系，尽量原子化。
以 JSON 数组格式返回，键名为 "sub_questions"。

示例：
复杂问题：“2020年后成立的AI公司及其旗舰产品有哪些？”
子问题：["2020年之后成立了哪些AI公司？", "这些AI公司的旗舰产品分别是什么？"]

复杂问题：{complex_query}
JSON输出："""
    
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0,
        response_format={"type": "json_object"}
    )
    return json.loads(resp.choices[0].message.content)["sub_questions"]

# ---------- 测试样例 ----------
query = "对比GPT-4和Claude 3在代码生成和多语言翻译上的表现"
sub_queries = decompose_query(query)
print(sub_queries)
# 输出类似：
# ["GPT-4在代码生成方面的表现如何？", "Claude 3在代码生成方面的表现如何？", 
#  "GPT-4在多语言翻译方面的表现如何？", "Claude 3在多语言翻译方面的表现如何？"]
```

**<span style="color:rgb(15, 17, 21);">检索流程</span>**<span style="color:rgb(15, 17, 21);">：用每个子问题分别检索，收集所有块的集合，合并后交给 LLM 生成最终对比答案。</span>

#### <span style="color:rgb(15, 17, 21);">3.HyDE (Hypothetical Document Embeddings) —— 用假设答案检索</span>
**<span style="color:rgb(15, 17, 21);">原理</span>**<span style="color:rgb(15, 17, 21);">：用户的问句和文档库中的陈述句在语言风格上差距较大。向量相似度计算中，“问句向量”与“答案向量”的距离可能不如“答案向量”与“答案向量”近。HyDE 先让 LLM 凭空生成一个假想的答案文档，然后用这个假答案的嵌入去检索真实文档。这样就能用“答案找答案”，极大降低了语义错配。</span>

```python
def hyde_embed(query: str) -> list[float]:
    """用 HyDE 生成假设文档，并返回其嵌入向量"""
    # 1. 生成假设文档
    hyde_prompt = f"""请用一段技术性、百科式的文字回答以下问题。即使你不了解确切事实，也请编造一个看起来合理的解释。只需要输出文档内容，不要注明是编造的。

问题：{query}
回答："""
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": hyde_prompt}],
        temperature=0.7  # 需要一定创造性
    )
    fake_doc = resp.choices[0].message.content.strip()
    
    # 2. 获取假设文档的嵌入（调用 embedding API）
    embed_resp = client.embeddings.create(
        model="text-embedding-3-small",
        input=fake_doc
    )
    return embed_resp.data[0].embedding

# ---------- 使用示例 ----------
query = "Explain how the attention mechanism works in Transformer."
embedding_vector = hyde_embed(query)
# 然后用这个 embedding_vector 去向量库进行相似度检索
```

**<span style="color:rgb(15, 17, 21);">效果</span>**<span style="color:rgb(15, 17, 21);">：生成的假设文档通常包含 </span>`attention mechanism`<span style="color:rgb(15, 17, 21);">, </span>`Query, Key, Value`<span style="color:rgb(15, 17, 21);">, </span>`scaled dot-product`<span style="color:rgb(15, 17, 21);"> 等高信息量术语，其向量可以精准命中包含相同术语的真实文档块。</span>

#### <span style="color:rgb(15, 17, 21);">4.结构化提取 (Structured Extraction) —— 元数据过滤</span>
**<span style="color:rgb(15, 17, 21);">原理</span>**<span style="color:rgb(15, 17, 21);">：当用户查询包含明确约束条件（时间、作者、类别、来源等），用 LLM 的 Function Calling 能力提取出这些参数，在向量检索之前先用传统过滤器（如数据库 where 语句）裁剪候选集，可以大幅减少计算量并提高准确率。</span>

```python
def extract_filters(user_query: str) -> dict:
    """使用 function calling 提取结构化过滤条件"""
    functions = [
        {
            "name": "apply_filters",
            "description": "从用户查询中提取元数据过滤条件",
            "parameters": {
                "type": "object",
                "properties": {
                    "search_keyword": {"type": "string", "description": "核心检索内容，去掉过滤条件后的部分"},
                    "year_start": {"type": "integer", "description": "起始年份（含），如2022"},
                    "year_end": {"type": "integer", "description": "结束年份（含）"},
                    "author": {"type": "string", "description": "指定作者或机构"},
                    "category": {"type": "string", "description": "分类，如论文、新闻、代码库"}
                }
            }
        }
    ]
    
    resp = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": f"查询：{user_query}"}],
        functions=functions,
        function_call={"name": "apply_filters"},
        temperature=0
    )
    args = json.loads(resp.choices[0].message.function_call.arguments)
    return args

# ---------- 测试样例 ----------
query = "2023年到2024年由OpenAI发表的多模态模型论文"
filters = extract_filters(query)
print(filters)
# 输出类似：
# {
#   "search_keyword": "多模态模型",
#   "year_start": 2023,
#   "year_end": 2024,
#   "author": "OpenAI",
#   "category": "论文"
# }
```

<span style="color:rgb(15, 17, 21);">在实际 RAG 管道中，我们就可以先用这些字段过滤向量库（比如 Milvus 的 Filter 表达式或 Elasticsearch 的 filter），然后再用 </span>`search_keyword`<span style="color:rgb(15, 17, 21);"> 做向量检索。</span>

<span style="color:rgb(15, 17, 21);">一个完整的检索语句解析管道通常是</span>**<span style="color:rgb(15, 17, 21);">多方法混合</span>**<span style="color:rgb(15, 17, 21);">的：</span>

```latex
用户原始输入
  → 结构化提取（先拿过滤条件，缩小检索域）
  → 查询重写（补全上下文、去噪）
  → 查询分解（如果是复杂问题）
  → 对每个子查询应用 HyDE（事实型问题特别有效）
  → 并行多路检索 → 结果合并重排序
```

**<span style="color:rgb(15, 17, 21);">优化要点：</span>**

+ **<span style="color:rgb(15, 17, 21);">缓存</span>**<span style="color:rgb(15, 17, 21);">：对相同模式的查询重写/分解结果做缓存，避免重复调用 LLM。</span>
+ **<span style="color:rgb(15, 17, 21);">模型选择</span>**<span style="color:rgb(15, 17, 21);">：解析类任务不需要极强模型，</span>`gpt-4o-mini`<span style="color:rgb(15, 17, 21);">、</span>`DeepSeek-V3`<span style="color:rgb(15, 17, 21);"> </span><span style="color:rgb(15, 17, 21);">或本地 7B 微调模型即可，成本极低。</span>
+ **<span style="color:rgb(15, 17, 21);">降级策略</span>**<span style="color:rgb(15, 17, 21);">：当 LLM 不可用时，可以退化为规则提取（正则提取年份、关键词），保障基础可用性。</span>



<span style="color:rgb(15, 17, 21);"></span>
