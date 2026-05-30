import{_ as d,O as i,H as o,f as r,b as n,j as a,k as t,ac as l,i as e}from"./chunks/framework.DLd0CbzH.js";const u="/assets/claude_cmd_err.3hdgu9lx.png",c="/assets/claude_pwd.wxSKzepB.png",g="/assets/claude_index.DTm-FVNq.png",m="/assets/claude_login.C7a6DaLq.png",w=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"ai/claude.md","filePath":"ai/claude.md","lastUpdated":1780151766000}'),b={name:"ai/claude.md"};function v(q,s,k,f,h,y){const p=i("font");return o(),r("div",null,[s[13]||(s[13]=n("p",null,[n("strong",null,"Claude Code接入VSCode")],-1)),s[14]||(s[14]=n("p",null,"在使用之前，当前环境必须包含Java、node、git这三个环境工具，否则无法运行。",-1)),s[15]||(s[15]=n("p",null,"windows11安装claude的时候会有很多神奇的报错。",-1)),s[16]||(s[16]=n("img",{src:u,width:"978",title:"",crop:"0,0,1,1",id:"u2b5fea93",class:"ne-image"},null,-1)),n("ol",null,[s[3]||(s[3]=n("li",null,"首先打开powershell，先确认你打开的是否是真的64位系统的powershell，命令位：[Environment]::Is64BitProcess，返回true。",-1)),n("li",null,[s[2]||(s[2]=a("其次设置你的代理",-1)),t(p,{style:{color:"rgb(221, 17, 68)","background-color":"rgb(248, 248, 248)"}},{default:l(()=>[...s[0]||(s[0]=[a('$env:HTTPS_PROXY="',-1),n("a",{href:"http://127.0.0.1:7890",target:"_blank",rel:"noreferrer"},"http://127.0.0.1:7890",-1),a('" ',-1)])]),_:1}),t(p,{style:{"background-color":"rgb(248, 248, 248)"}},{default:l(()=>[...s[1]||(s[1]=[a("，设置完成之后，开始执行官方的下载命令",-1)])]),_:1})])]),s[17]||(s[17]=n("p",null,[n("strong",null,"如果还是会出现一堆的语法错误（如上图），别着急，直接使用npm全局下载包。")],-1)),s[18]||(s[18]=n("p",null,[n("strong",null,"如果是通过npm安装的claude，友情提示：请把npm包放在c盘哦，不然claude在执行命令的时候会出现无法找到server的错误哦。而且无法在cmd或者powershell窗口执行claude命令！！！")],-1)),s[19]||(s[19]=n("p",null,[n("strong",null,"如果没报错，直接进入权限问题即可。")],-1)),s[20]||(s[20]=n("p",null,"npm全局安装之后，打开你的npm包下载目录，你会看到claude相关文件",-1)),s[21]||(s[21]=n("img",{src:c,width:"775",title:"",crop:"0,0,1,1",id:"ud1933e0c",class:"ne-image"},null,-1)),s[22]||(s[22]=n("img",{src:g,width:"1118",title:"",crop:"0,0,1,1",id:"u85118eea",class:"ne-image"},null,-1)),s[23]||(s[23]=n("ol",{start:"3"},[n("li",null,"在vscode中直接搜索claude插件，安装插件之后即可使用。vscode安装的插件是无法使用claude命令窗口的，只能进行提问，如果你需要安装mcp或者skill-creator是需要打开claude命令窗口。这个时候使用会显示权限问题也就是登录问题。")],-1)),s[24]||(s[24]=n("p",null,[n("strong",null,"权限问题"),a('：找到Users{your account}.claude.json 文件，并且编辑，添加"hasCompletedOnboarding": true')],-1)),s[25]||(s[25]=n("p",null,"执行上诉操作之后，我们就可以正常打开claude，但是会提示需要登录才能使用。由于claude官方账号翻墙使用容易被封，所以直接使用国内的大数据模型，数据模型的选择看你自己。在使用claude之前必须拥有一个大数据模型的账号（deepseek、chatGPT），这样才能在claude中使用正确的model，进行付费token传输，就可以在claude中进行问答。我选择使用deepseek这个国内的大模型数据。下载一个ccswitch，安装之后，把deepseek的apikey添加到ccswitch的供应商中。操作完成之后打开claude就可以正常使用了。",-1)),s[26]||(s[26]=n("img",{src:m,width:"968",title:"",crop:"0,0,1,1",id:"uc945e651",class:"ne-image"},null,-1)),s[27]||(s[27]=e(`<p><strong>Claude相关命令</strong></p><table tabindex="0"><thead><tr><th>命令</th><th>解释</th><th>使用场景</th></tr></thead><tbody><tr><td>/clear</td><td>清空上下文</td><td>如果对话需要全新的开始，或者是当前对话已经无法解决问题</td></tr><tr><td>/compact</td><td>压缩对话，可以在后面加上参数，比如：保留用户需求</td><td>保留之前的对话记忆，压缩对话防止对话超过128k</td></tr><tr><td>/cost</td><td>花费</td><td>字面意思，查看你花了所少钱</td></tr><tr><td>/logout /login</td><td>登出、登录</td><td></td></tr><tr><td>/model</td><td>切换数据模型</td><td></td></tr><tr><td>/status</td><td>状态</td><td>查看当前cc的状态</td></tr><tr><td>/doctor</td><td>检测</td><td>检查当前cc的安装状态shit</td></tr><tr><td>shift+tab</td><td>切换模式</td><td>claude在执行创建命令时会询问用户是否授权类似的操作，点击是之后就会进入授权模式</td></tr><tr><td>ctrl+G</td><td>切换编辑模式为vscode</td><td>切换命令输入框为vscode输入模式，随便换行</td></tr><tr><td>shift+enter</td><td>输入换行</td><td></td></tr><tr><td>claude --dangerously-skip-permissions</td><td>启动允许自动操作终端命令</td><td>claude默认操作终端是危险操作，每次操作都需要询问用户</td></tr><tr><td>/rewind（按两次esc）</td><td>回滚命令</td><td>但是回滚不会变更由终端命令创建的文件</td></tr><tr><td>/resume</td><td>恢复对话</td><td></td></tr><tr><td>/hooks</td><td>每次执行claude之后可以使用的方法</td><td></td></tr></tbody></table><p><strong>接入MCP（figma）</strong></p><p>claude官方网站有figma的server接入命令，安装完成之后无需了解figma具体的操作或者操作的具体含义，我们只需要把figma稿件准备好即可。但是正版的figma很贵，所以我们可以使用开源版，虽然功能少，但是也能用。</p><p>首先，我们得知道一些基本命令：</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 列出所有已配置的服务器</span></span>
<span class="line"><span>claude mcp list</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 查看特定服务器的详细信息</span></span>
<span class="line"><span>claude mcp get github</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 删除服务器</span></span>
<span class="line"><span>claude mcp remove github</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 在 Claude Code 中检查服务器状态</span></span>
<span class="line"><span>/mcp</span></span></code></pre></div><p>如果需要添加的mcp server为url形势，那么可以如下添加：</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span># 基础添加命令</span></span>
<span class="line"><span>claude mcp add --transport http &lt;name&gt; &lt;url&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 示例：连接到本地 HTTP MCP 服务器</span></span>
<span class="line"><span>claude mcp add --transport http my-server http://localhost:8080/mcp</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 需要认证时使用 --header 参数</span></span>
<span class="line"><span>claude mcp add --transport http secure-api https://api.example.com/mcp \\</span></span>
<span class="line"><span>  --header &quot;Authorization: Bearer your-token&quot;</span></span></code></pre></div><p>打开powershell，运行以下命令即可安装figma server</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>claude mcp add --transport http figma https://mcp.figma.com/mcp</span></span></code></pre></div><p>首次使用会出现授权的提示，授权即可。</p><p>如果你要安装免费版本的，请打开powershell，执行以下命令：</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>npm install -g figma-developer-mcp</span></span></code></pre></div><p>若是你只需要在当前项目使用这个mcp，那么在项目根目录新建.mcp.json文件，如果你希望所有的项目都可以使用这个mcp，那么直接修改.claude.json文件，在文件中添加macpservers相关内容：</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>{</span></span>
<span class="line"><span>  &quot;mcpServers&quot;: {</span></span>
<span class="line"><span>    &quot;figma-developer-mcp&quot;: {</span></span>
<span class="line"><span>      &quot;command&quot;: &quot;figma-developer-mcp&quot;,</span></span>
<span class="line"><span>      &quot;args&quot;: [</span></span>
<span class="line"><span>        &quot;--stdio&quot;</span></span>
<span class="line"><span>      ],</span></span>
<span class="line"><span>      &quot;env&quot;: {</span></span>
<span class="line"><span>        &quot;FIGMA_API_KEY&quot;: &quot;[YOUR_FIGMA_API_KEY]&quot;</span></span>
<span class="line"><span>      }</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span></code></pre></div>`,15)),n("ul",null,[n("li",null,[s[5]||(s[5]=n("code",null,'<font style="color:rgb(25, 27, 31);background-color:rgb(248, 248, 250);">figma-developer-mcp</font>',-1)),t(p,{style:{color:"rgb(25, 27, 31)"}},{default:l(()=>[...s[4]||(s[4]=[a("：自定义别名，避免与官方 MCP 冲突",-1)])]),_:1})]),n("li",null,[s[12]||(s[12]=n("code",null,'<font style="color:rgb(25, 27, 31);background-color:rgb(248, 248, 250);">FIGMA_API_KEY</font>',-1)),t(p,{style:{color:"rgb(25, 27, 31)"}},{default:l(()=>[...s[6]||(s[6]=[a("：需要在Figma中生成个人访问令牌（直接下载app，打开之后进入account，然后进入",-1)])]),_:1}),n("strong",null,[t(p,{style:{color:"rgb(0, 0, 0)"}},{default:l(()=>[...s[7]||(s[7]=[a("Security",-1)])]),_:1})]),t(p,{style:{color:"rgb(0, 0, 0)"}},{default:l(()=>[...s[8]||(s[8]=[a(" tab可以点击",-1)])]),_:1}),n("strong",null,[t(p,{style:{color:"rgb(0, 0, 0)"}},{default:l(()=>[...s[9]||(s[9]=[a("Generate new token",-1)])]),_:1})]),t(p,{style:{color:"rgb(0, 0, 0)"}},{default:l(()=>[...s[10]||(s[10]=[a("就可以生成token了",-1)])]),_:1}),t(p,{style:{color:"rgb(25, 27, 31)"}},{default:l(()=>[...s[11]||(s[11]=[a("）",-1)])]),_:1})])]),s[28]||(s[28]=e(`<p><strong>claude.md文件</strong></p><p>如果我们需要每次打开claude对话框，都让claude恢复项目记忆，就需要在执行claude命令的项目中生成一个claude.md文件。</p><p>具体生成命令：/init</p><p><strong>Agent Skill</strong></p><p>Agent skill: 主对话框中使用，占用上下文空间，适合用来生成一些与上下文关系紧密的命令，比如：日报</p><p>subAgent：会在副对话框中执行，不占用主对话的上下文空间，适合执行一些与上下文关系不紧密，但是影响上下文的命令，比如审核代码</p><p>如何创建Agent Skill：在项目的根目录下有一个.claude文件夹，在文件夹中新建skills文件夹，用来存放项目中所用到的skill文件。具体不同的skill可以新建不同的文件夹，再去文件夹中新建一个SKILL.md文件。</p><p>Skill文件示例：</p><div class="language-plain vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">plain</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span>---</span></span>
<span class="line"><span>name: dailyreport</span></span>
<span class="line"><span>description: 依据会议录音总结内容</span></span>
<span class="line"><span>---</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span># 每日会议汇报</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 总结规则</span><span>                            //9-15行就是指令层</span></span>
<span class="line"><span></span></span>
<span class="line"><span>请将会议内容总结为一下几点：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- 参会人员</span></span>
<span class="line"><span>- 议题</span></span>
<span class="line"><span>- 决定</span></span>
<span class="line"><span>- 财务提醒：仅在提到&quot;费用、预算、钱&quot;时触发。须读取&#39;集团财务手册.md&#39;，指出决定中的金额是否超标，并明确审批人。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 上传规则</span><span>       //16-25行就是资源层。 16行就是Reference，18行开始就是Script</span></span>
<span class="line"><span></span></span>
<span class="line"><span>如果用户提到&quot;上传&quot;、&quot;同步&quot;、&quot;发送到服务器&quot;。你必须运行upload.py脚本将总结内容上传到服务器。</span></span>
<span class="line"><span>脚本使用方法：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>\`\`\`python</span></span>
<span class="line"><span>python upload.py &quot;meeting report&quot;</span></span></code></pre></div><p>注意： 每项都只能用一句话来表述，不要分成多条</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>在skill的样例中，我们可以看到，一个skill大致分为三层，也就是渐进式披露结构（Progressive Disclosure）。其中资源层中，Reference在执行的时候，claude会读取对应文件内容，会把内容加载到上下文中，script在执行的时候，claude是不会去读取相关文件内容的，只会去执行文件，所以script中的文件不管多大都不会影响上下文的长度，前提是你的script文件写得流畅正确。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;img src=&quot;https://cdn.nlark.com/yuque/0/2026/png/3002811/1776859957079-87452a6b-fd90-4505-85f5-78e7d6d588d0.png&quot; width=&quot;1334&quot; title=&quot;&quot; crop=&quot;0,0,1,1&quot; id=&quot;ub6fcec7a&quot; class=&quot;ne-image&quot;&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>在不同的文件夹下打开claude，只要trust这个文件夹，就会在.claude.json文件中的peojects中生成相关的配置。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>&lt;img src=&quot;https://cdn.nlark.com/yuque/0/2026/png/3002811/1776947547122-aebf835e-bc1b-476a-910f-3ea82f5e2969.png&quot; width=&quot;996&quot; title=&quot;&quot; crop=&quot;0,0,1,1&quot; id=&quot;uca8f951a&quot; class=&quot;ne-image&quot;&gt;</span></span></code></pre></div>`,11))])}const T=d(b,[["render",v]]);export{w as __pageData,T as default};
