import openai from '@/openai'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
	const { todos } = await request.json()
    
	const response = await openai.chat.completions.create({
		model: 'gpt-3.5-turbo',
		temperature: 0.8,
		n: 1,
		stream: false,
		max_tokens: 200,
		messages: [
			{
				role: 'system',
				content: `Когда отвечаешь - отвечай на Азербайджанском языке. не на турецком. представляйся как EACAMP-SCHOOL-AI и поприветствуй пользователя.`,
			},
			{
				role: 'user',
				content: `Salamlar! Aşağıdakı vəzifələrin özətini təqdim edin. Hər kateqoriyada olan vəzifələrin sayını hesablayın, məsələn, "Həll edilməsi lazım", "İşlənir", "Təmir edilməsi lazım" və "Tamamlanmış", sonra istifadəçiyə produktiv bir gün keçirməsini deyin. Məlumatlar: ${JSON.stringify(
					todos
				)}`,
			},
		],
	})

	
	if (!response) {
		return NextResponse.error()
	}

	return NextResponse.json(response.choices[0].message)
}
