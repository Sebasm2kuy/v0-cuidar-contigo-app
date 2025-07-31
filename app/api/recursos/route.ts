import { streamText } from "ai"
import { groq } from "@ai-sdk/groq"

export async function POST(req: Request) {
  try {
    const { messages, location, urgency } = await req.json()

    const result = await streamText({
      model: groq("llama-3.1-8b-instant"),
      messages,
      system: `Eres un asistente especializado en recursos de salud en Uruguay, específicamente en ${location}. 

Tu trabajo es ayudar a las personas a encontrar recursos médicos apropiados basándote en:
- Ubicación: ${location}
- Nivel de urgencia: ${urgency}/5
- Tipo de atención necesaria
- Horarios y disponibilidad

INSTRUCCIONES:
1. Analiza la consulta del usuario y determina qué tipo de atención médica necesita
2. Considera el nivel de urgencia (1=no urgente, 5=emergencia)
3. Recomienda recursos específicos en Uruguay
4. Incluye información práctica como horarios, ubicación y servicios
5. Si es urgencia alta (4-5), prioriza servicios de emergencia 24h
6. Sé empático y profesional
7. Proporciona información clara y accionable

RECURSOS DISPONIBLES EN URUGUAY:
- Hospitales: Hospital de Clínicas, Hospital Británico, Hospital Maciel
- Clínicas: Clínica Médica Punta Carretas, Clínica Alemana
- Farmacias: Farmacia Americana, Farmacia del Cordón
- Emergencias: Centro de Emergencias Móviles, SAMU

Responde en español y sé específico con direcciones y teléfonos cuando sea posible.`,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error("Error in recursos API:", error)
    return new Response("Error interno del servidor", { status: 500 })
  }
}
