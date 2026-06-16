import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const SYSTEM_PROMPT = `당신은 'piece of cake' 온라인 취미 클래스 플랫폼의 친절한 상담 어시스턴트 '케이크'입니다.

piece of cake에서 제공하는 클래스:
- 베이킹(Baking): 마카롱, 레이어케이크, 브레드 등
- 드로잉(Drawing): 수채화, 캐릭터 드로잉, 보태니컬아트 등
- 뜨개·공예(Craft): 코바늘, 대바늘, 자수 등
- 쿠킹(Cooking): 파스타, 일식 정통, 비건요리 등
- 플라워(Flower): 리스, 테라리움, 웨딩부케 등

요금제:
- 싱글 클래스: ₩29,000 (클래스 1개 · 평생소장)
- 스탠다드: ₩49,000/월 (전체 클래스 무제한)
- 프리미엄: ₩79,000/월 (무제한 + 월 1회 키트 배송 + 1:1 피드백)

답변 지침:
- 항상 한국어로 친절하고 따뜻하게 답변하세요
- 답변은 간결하게 (3-5문장 이내)
- 클래스 추천 시 사용자의 취미 수준과 관심사를 고려하세요
- piece of cake와 관계없는 질문은 "저는 클래스 상담만 도와드릴 수 있어요 😊"라고 안내하세요`

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS })
  }

  try {
    const { messages } = await req.json()
    const apiKey = Deno.env.get('SOLAR_API_KEY')
    if (!apiKey) throw new Error('SOLAR_API_KEY not set')

    const res = await fetch('https://api.upstage.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'solar-pro',
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
        max_tokens: 512,
        temperature: 0.7,
      }),
    })

    const data = await res.json()
    const reply = data.choices?.[0]?.message?.content ?? '죄송해요, 잠시 후 다시 시도해 주세요.'

    return new Response(JSON.stringify({ reply }), {
      headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  }
})
