"use client"

import { useState } from "react"
import { useChat } from "ai"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Heart, Phone, AlertTriangle, Send, Loader2, Bot, Zap, Shield, Activity } from "lucide-react"
import Link from "next/link"

export default function PrimerosAuxiliosPage() {
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "connecting" | "error">("connected")

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "1",
        role: "assistant",
        content:
          "¡Hola! Soy tu asistente de primeros auxilios con IA. Estoy aquí para ayudarte en situaciones de emergencia médica. ¿Qué situación necesitas atender?",
      },
    ],
    onError: () => setConnectionStatus("error"),
    onFinish: () => setConnectionStatus("connected"),
  })

  const emergencyScenarios = [
    {
      title: "Atragantamiento",
      description: "Persona no puede respirar o hablar",
      urgency: "high",
      query: "Una persona se está atragantando y no puede respirar, ¿qué debo hacer?",
    },
    {
      title: "Paro Cardíaco",
      description: "Persona inconsciente sin pulso",
      urgency: "critical",
      query: "Una persona está inconsciente y no respira, creo que es un paro cardíaco",
    },
    {
      title: "Herida Sangrante",
      description: "Corte profundo con sangrado abundante",
      urgency: "high",
      query: "Tengo una herida que sangra mucho, ¿cómo puedo detener la hemorragia?",
    },
    {
      title: "Quemadura",
      description: "Lesión por calor, químicos o electricidad",
      urgency: "medium",
      query: "Me quemé con agua caliente, ¿qué primeros auxilios debo aplicar?",
    },
    {
      title: "Fractura",
      description: "Posible hueso roto",
      urgency: "medium",
      query: "Creo que me fracturé un hueso, ¿qué debo hacer mientras llega la ayuda?",
    },
    {
      title: "Convulsiones",
      description: "Persona con movimientos involuntarios",
      urgency: "high",
      query: "Una persona está teniendo convulsiones, ¿cómo puedo ayudarla?",
    },
  ]

  const handleQuickQuery = (query: string) => {
    const syntheticEvent = {
      preventDefault: () => {},
      target: { value: query },
    } as any
    handleInputChange(syntheticEvent)
    setTimeout(() => {
      handleSubmit(new Event("submit") as any)
    }, 100)
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver
                </Link>
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-red-800">Primeros Auxilios IA</h1>
                  <p className="text-xs text-red-600">Asistencia médica inteligente 24/7</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={connectionStatus === "connected" ? "default" : "destructive"} className="text-xs">
                <Activity className="w-3 h-3 mr-1" />
                {connectionStatus === "connected" ? "IA Activa" : "Reconectando..."}
              </Badge>
              <Button variant="destructive" size="sm">
                <Phone className="w-4 h-4 mr-2" />
                911
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Emergency Alert */}
      <div className="bg-red-600 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 text-white">
            <AlertTriangle className="w-6 h-6" />
            <p className="font-semibold">
              En emergencias graves, llama inmediatamente al 911 antes de aplicar primeros auxilios
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Emergency Scenarios */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-red-600" />
                  Emergencias Comunes
                </CardTitle>
                <CardDescription>Haz clic para obtener ayuda inmediata</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {emergencyScenarios.map((scenario, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={`w-full h-auto p-4 text-left justify-start ${getUrgencyColor(scenario.urgency)}`}
                    onClick={() => handleQuickQuery(scenario.query)}
                  >
                    <div>
                      <div className="font-semibold text-sm">{scenario.title}</div>
                      <div className="text-xs opacity-80 mt-1">{scenario.description}</div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Emergency Contacts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-red-600" />
                  Contactos de Emergencia
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-red-800">Emergencias</p>
                    <p className="text-sm text-red-600">Policía, Bomberos, Médica</p>
                  </div>
                  <Button size="sm" variant="destructive">
                    911
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-orange-800">SAMU</p>
                    <p className="text-sm text-orange-600">Emergencias Médicas</p>
                  </div>
                  <Button size="sm" variant="outline">
                    105
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-blue-800">Bomberos</p>
                    <p className="text-sm text-blue-600">Rescates y Emergencias</p>
                  </div>
                  <Button size="sm" variant="outline">
                    104
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-red-600" />
                  Asistente de Primeros Auxilios IA
                </CardTitle>
                <CardDescription>
                  Describe la situación de emergencia y recibe instrucciones paso a paso
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                {/* Messages */}
                <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-gray-50 rounded-lg">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.role === "assistant"
                            ? "bg-white border border-red-200 text-gray-900"
                            : "bg-red-600 text-white"
                        }`}
                      >
                        <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-red-200 rounded-lg p-3 flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-red-600" />
                        <span className="text-sm text-gray-700">Analizando situación...</span>
                      </div>
                    </div>
                  )}
                  {error && (
                    <div className="flex justify-center">
                      <div className="bg-red-100 border border-red-300 rounded-lg p-3 text-center">
                        <p className="text-sm text-red-800 mb-2">Error de conexión</p>
                        <Button size="sm" variant="outline" onClick={() => window.location.reload()}>
                          Reintentar
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    placeholder="Describe la emergencia: ej. 'Una persona se cayó y no se mueve'"
                    value={input}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={isLoading || !input.trim()} className="bg-red-600">
                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Safety Information */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Shield className="w-8 h-8 text-blue-600 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-800 mb-2">Información Importante</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
                  <div>
                    <p className="font-medium mb-1">✓ Mantén la calma</p>
                    <p>La tranquilidad es clave para actuar correctamente</p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">✓ Evalúa la seguridad</p>
                    <p>Asegúrate de que el lugar sea seguro antes de actuar</p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">✓ Llama al 911</p>
                    <p>En emergencias graves, siempre llama primero</p>
                  </div>
                  <div>
                    <p className="font-medium mb-1">✓ No muevas lesionados</p>
                    <p>A menos que sea absolutamente necesario</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
