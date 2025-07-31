"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, ArrowLeft, Send, Phone, AlertTriangle, Clock, Shield } from "lucide-react"
import Link from "next/link"

interface Message {
  id: number
  text: string
  isBot: boolean
  timestamp: Date
  urgent?: boolean
}

export default function PrimerosAuxiliosPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "¡Hola! Soy tu asistente de primeros auxilios. Estoy aquí para ayudarte en situaciones de emergencia. ¿Qué está pasando?",
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")

  const emergencyOptions = [
    "Persona inconsciente",
    "Dificultad para respirar",
    "Sangrado abundante",
    "Dolor en el pecho",
    "Quemadura",
    "Fractura o lesión",
    "Intoxicación",
    "Convulsiones",
  ]

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Simulate bot response
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: "Entiendo tu situación. Voy a guiarte paso a paso. Primero, asegúrate de que tanto tú como la persona afectada estén en un lugar seguro. ¿La persona está consciente y responde?",
        isBot: true,
        timestamp: new Date(),
        urgent: inputMessage.toLowerCase().includes("sangre") || inputMessage.toLowerCase().includes("inconsciente"),
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)

    setInputMessage("")
  }

  const handleQuickOption = (option: string) => {
    const userMessage: Message = {
      id: messages.length + 1,
      text: option,
      isBot: false,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Simulate urgent bot response for serious conditions
    setTimeout(() => {
      let response = ""
      let isUrgent = false

      switch (option) {
        case "Persona inconsciente":
          response =
            "🚨 SITUACIÓN URGENTE: Si la persona no responde, llama inmediatamente al 911. Mientras tanto: 1) Verifica si respira, 2) Si no respira, inicia RCP, 3) Colócala en posición de recuperación si respira. ¿Necesitas que te guíe con la RCP?"
          isUrgent = true
          break
        case "Dificultad para respirar":
          response =
            "🚨 Esto puede ser grave. Llama al 911 ahora. Mientras esperas: 1) Ayuda a la persona a sentarse erguida, 2) Afloja ropa ajustada, 3) Si tiene inhalador, ayúdala a usarlo. ¿La persona puede hablar?"
          isUrgent = true
          break
        case "Sangrado abundante":
          response =
            "🚨 CONTROL DE HEMORRAGIA: 1) Presiona firmemente sobre la herida con un paño limpio, 2) Eleva la parte lesionada si es posible, 3) NO remuevas objetos incrustados, 4) Llama al 911. ¿El sangrado se está controlando?"
          isUrgent = true
          break
        default:
          response = `Te ayudo con ${option.toLowerCase()}. Primero, mantén la calma. ¿Puedes describir exactamente qué está pasando?`
      }

      const botResponse: Message = {
        id: messages.length + 2,
        text: response,
        isBot: true,
        timestamp: new Date(),
        urgent: isUrgent,
      }
      setMessages((prev) => [...prev, botResponse])
    }, 1000)
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
                  <h1 className="font-bold text-red-800">Asistente de Primeros Auxilios</h1>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-600">En línea</span>
                  </div>
                </div>
              </div>
            </div>
            <Button variant="destructive" size="sm">
              <Phone className="w-4 h-4 mr-2" />
              Llamar 911
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Emergency Alert */}
        <Card className="mb-6 border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <div>
                <p className="font-semibold text-red-800">¿Es una emergencia grave?</p>
                <p className="text-sm text-red-600">Si hay peligro inmediato de vida, llama al 911 primero</p>
              </div>
              <Button variant="destructive" size="sm" className="ml-auto">
                <Phone className="w-4 h-4 mr-2" />
                911
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chat Area */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="/bot-avatar.png" />
                        <AvatarFallback className="bg-red-100 text-red-600">🏥</AvatarFallback>
                      </Avatar>
                      Asistente Médico
                    </CardTitle>
                    <CardDescription>Guía certificada de primeros auxilios</CardDescription>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    <Shield className="w-3 h-3 mr-1" />
                    Seguro
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.isBot
                          ? message.urgent
                            ? "bg-red-100 text-red-900 border border-red-200"
                            : "bg-gray-100 text-gray-900"
                          : "bg-emerald-600 text-white"
                      }`}
                    >
                      {message.urgent && (
                        <div className="flex items-center gap-1 mb-2">
                          <AlertTriangle className="w-4 h-4 text-red-600" />
                          <span className="text-xs font-semibold text-red-600">URGENTE</span>
                        </div>
                      )}
                      <p className="text-sm">{message.text}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <Clock className="w-3 h-3 opacity-60" />
                        <span className="text-xs opacity-60">
                          {message.timestamp.toLocaleTimeString("es-UY", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>

              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Describe la situación..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} className="bg-emerald-600 hover:bg-emerald-700">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Situaciones Comunes</CardTitle>
                <CardDescription>Selecciona para obtener ayuda inmediata</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {emergencyOptions.map((option) => (
                  <Button
                    key={option}
                    variant="outline"
                    className="w-full justify-start text-left h-auto p-3 bg-transparent"
                    onClick={() => handleQuickOption(option)}
                  >
                    <div>
                      <div className="font-medium">{option}</div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Números de Emergencia</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-red-800">Emergencias</p>
                    <p className="text-sm text-red-600">Policía, Bomberos, SAMU</p>
                  </div>
                  <Button size="sm" variant="destructive">
                    <Phone className="w-4 h-4 mr-1" />
                    911
                  </Button>
                </div>
                <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-emerald-800">Centro de Información</p>
                    <p className="text-sm text-emerald-600">Intoxicaciones</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Phone className="w-4 h-4 mr-1" />
                    1722
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
