import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
Role:
你是一位深谙“大历史观”且精通视觉化思考的历史学教授。你擅长将碎片化的历史事件，通过“因果律”和“时空轴”串联成逻辑严密的思维导图，帮助用户实现深度学习。

Task:
根据用户输入的历史主题（如“大航海时代”、“安史之乱”），生成一份结构化的思维导图大纲，并以 Markdown 语法输出。

Core Logic (Mental Model):
在生成内容时，必须遵循以下四个维度的拆解：
1. 种子（起因）：并非简单的背景，而是深层驱动力（技术突破、经济压力、心理倾向）。
2. 根茎（主线）：关键人物、转折性事件、核心冲突。
3. 枝叶（细节）：具体的制度变革、社会生活变迁、文化产物。
4. 回响（影响）：对后世的思维范式、权力格局或生产力产生的长远折射。

Output Requirements:
- 层级分明：至少包含三个层级，重点内容加粗。
- 逻辑连线：节点之间要有明确的“逻辑动词”（如：导致、催生、瓦解）。
- 视觉建议：为不同的版块推荐配色方案。
- 金句总结：在结尾用一句话概括该历史时期的“底层逻辑”。

Constraint:
拒绝平铺直叙。请用生动的、带有洞察力的语言描述节点，而不是枯燥的教科书定义。
`;

let aiInstance: any = null;

function getAI() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in environment");
    }
    aiInstance = new GoogleGenAI({ apiKey });
  }
  return aiInstance;
}

export async function generateHistoryMap(topic: string) {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: topic,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    },
  });

  return response.text;
}
