"use client"

import { useState } from "react"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ArrowLeft,
  MapPin,
  Search,
  Filter,
  Clock,
  Phone,
  Star,
  Navigation,
  Hospital,
  Pill,
  Stethoscope,
  Building2,
  Bot,
  Loader2,
  Send,
  Zap,
  ExternalLink,
} from "lucide-react"
import Link from "next/link"

interface HealthResource {
  id: number
  name: string
  type: "hospital" | "clinic" | "pharmacy" | "emergency"
  address: string
  distance: string
  rating: number
  isOpen: boolean
  phone: string
  services: string[]
  emergencyServices: boolean
}

export default function RecursosPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedUrgency, setSelectedUrgency] = useState<string>("2")
  const [userLocation, setUserLocation] = useState("Montevideo, Uruguay")
  const [showAIAssistant, setShowAIAssistant] = useState(false)

  // IA Assistant para recursos
  const {
    messages: aiMessages,
    input: aiInput,
    handleInputChange: handleAIInputChange,
    handleSubmit: handleAISubmit,
    isLoading: aiLoading,
  } = useChat({
    api: "/api/recursos",
    initialMessages: [
      {
        id: "1",
        role: "assistant",
        content:
          "¡Hola! Soy tu asistente inteligente para recursos de salud en Uruguay. Puedo ayudarte a encontrar exactamente lo que necesitas. ¿Qué tipo de atención médica estás buscando?",
      },
    ],
    body: {
      location: userLocation,
      urgency: selectedUrgency,
    },
  })

  const healthResources: HealthResource[] = [
    {
      id: 1,
      name: "Hospital de Clínicas",
      type: "hospital",
      address: "Av. Italia s/n, Montevideo",
      distance: "2.3 km",
      rating: 4.2,
      isOpen: true,
      phone: "+598 2487 1515",
      services: ["Emergencias", "Cirugía", "Cardiología", "Pediatría"],
      emergencyServices: true,
    },
    {
      id: 2,
      name: "Hospital Británico",
      type: "hospital",
      address: "Av. Italia 2420, Montevideo",
      distance: "3.1 km",
      rating: 4.5,
      isOpen: true,
      phone: "+598 2487 1020",
      services: ["Emergencias", "Oncología", "Traumatología"],
      emergencyServices: true,
    },
    {
      id: 3,
      name: "Farmacia Americana",
      type: "pharmacy",
      address: "18 de Julio 1234, Montevideo",
      distance: "0.8 km",
      rating: 4.0,
      isOpen: true,
      phone: "+598 2901 2345",
      services: ["Medicamentos", "Vacunas", "Primeros Auxilios"],
      emergencyServices: false,
    },
    {
      id: 4,
      name: "Clínica Médica Punta Carretas",
      type: "clinic",
      address: "Solano García 2464, Montevideo",
      distance: "1.5 km",
      rating: 4.3,
      isOpen: false,
      phone: "+598 2712 1234",
      services: ["Consultas", "Laboratorio", "Radiología"],
      emergencyServices: false,
    },
    {
      id: 5,
      name: "Centro de Emergencias Móviles",
      type: "emergency",
      address: "Bvar. Artigas 1550, Montevideo",
      distance: "4.2 km",
      rating: 4.1,
      isOpen: true,
      phone: "+598 2400 9999",
      services: ["Emergencias Móviles", "Traslados", "Cuidados Intensivos"],
      emergencyServices: true,
    },
    {
      id: 6,
      name: "Farmacia del Cordón",
      type: "pharmacy",
      address: "Canelones 1456, Montevideo",
      distance: "1.2 km",
      rating: 3.8,
      isOpen: true,
      phone: "+598 2901 5678",
      services: ["Medicamentos", "Productos Naturales", "Dermocosmética"],
      emergencyServices: false,
    },
  ]

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "hospital":
        return <Hospital className="w-5 h-5" />
      case "clinic":
        return <Stethoscope className="w-5 h-5" />
      case "pharmacy":
        return <Pill className="w-5 h-5" />
      case "emergency":
        return <Building2 className="w-5 h-5" />
      default:
        return <MapPin className="w-5 h-5" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "hospital":
        return "bg-red-100 text-red-700"
      case "clinic":
        return "bg-emerald-100 text-emerald-700"
      case "pharmacy":
        return "bg-blue-100 text-blue-700"
      case "emergency":
        return "bg-orange-100 text-orange-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const filteredResources = healthResources.filter((resource) => {
    const matchesSearch =
      searchQuery === "" ||
      resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.services.some((service) => service.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesType = selectedType === "all" || resource.type === selectedType

    // Filter by urgency - show emergency services for high urgency
    const urgencyLevel = Number.parseInt(selectedUrgency)
    const matchesUrgency = urgencyLevel <= 3 || resource.emergencyServices || resource.isOpen

    return matchesSearch && matchesType && matchesUrgency
  })

  const handleSearch = () => {
    // Trigger AI search if assistant is active and there's a query
    if (showAIAssistant && searchQuery.trim()) {
      handleAISearch(searchQuery)
    }
    // The filtering is already handled by the filteredResources computation
  }

  const openGoogleMaps = (address: string, name: string) => {
    const encodedAddress = encodeURIComponent(`${name}, ${address}, Uruguay`)
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}&travelmode=driving`
    window.open(googleMapsUrl, "_blank")
  }

  const openGoogleMapsView = () => {
    // Show all filtered resources on map
    const searchTerm =
      selectedType === "all"
        ? "hospitales clínicas farmacias"
        : selectedType === "hospital"
          ? "hospitales"
          : selectedType === "clinic"
            ? "clínicas"
            : selectedType === "pharmacy"
              ? "farmacias"
              : "emergencias médicas"

    const googleMapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(searchTerm)}+${encodeURIComponent(userLocation)}`
    window.open(googleMapsUrl, "_blank")
  }

  const callPhone = (phone: string) => {
    window.location.href = `tel:${phone}`
  }

  const handleAISearch = (query: string) => {
    setSearchQuery(query)
    setShowAIAssistant(true)
    // Enviar consulta a la IA
    const syntheticEvent = {
      preventDefault: () => {},
      target: { value: query },
    } as any
    handleAIInputChange(syntheticEvent)
    setTimeout(() => {
      handleAISubmit(new Event("submit") as any)
    }, 100)
  }

  const quickSearchOptions = [
    "Necesito una farmacia abierta ahora",
    "Hospital con emergencias 24 horas",
    "Clínica para consulta general",
    "Centro de vacunación",
    "Laboratorio para análisis",
    "Atención pediátrica urgente",
    "Farmacia con medicamentos especiales",
    "Centro de salud mental",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
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
                <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-emerald-800">Recursos de Salud IA</h1>
                  <p className="text-xs text-emerald-600">Búsqueda inteligente y personalizada</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={showAIAssistant ? "default" : "outline"}
                size="sm"
                onClick={() => setShowAIAssistant(!showAIAssistant)}
              >
                <Bot className="w-4 h-4 mr-2" />
                {showAIAssistant ? "Ocultar IA" : "Asistente IA"}
              </Button>
              <Button variant="outline" size="sm">
                <Navigation className="w-4 h-4 mr-2" />
                Mi Ubicación
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with AI */}
      <div className="bg-emerald-600 py-8">
        <div className="container mx-auto px-4">
          <div className="relative h-40 rounded-lg overflow-hidden">
            <img
              src="/placeholder.svg?height=160&width=800"
              alt="Recursos de salud inteligentes en Uruguay"
              className="w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
                  <Zap className="w-6 h-6" />
                  Búsqueda Inteligente de Recursos de Salud
                </h2>
                <p className="text-emerald-100">IA que entiende tus necesidades médicas específicas</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* AI Assistant Panel */}
        {showAIAssistant && (
          <Card className="mb-6 border-emerald-200 bg-gradient-to-r from-emerald-50 to-teal-50">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-emerald-800">Asistente IA de Recursos de Salud</h3>
                  <p className="text-sm text-emerald-600">Describe lo que necesitas en lenguaje natural</p>
                </div>
              </div>

              {/* Quick Search Options */}
              <div className="mb-4">
                <p className="text-sm font-medium text-emerald-700 mb-2">Búsquedas rápidas:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {quickSearchOptions.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs h-auto p-2 bg-white hover:bg-emerald-50"
                      onClick={() => handleAISearch(option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>

              {/* AI Chat Interface */}
              <div className="bg-white rounded-lg border max-h-96 overflow-y-auto mb-4">
                <div className="p-4 space-y-3">
                  {aiMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.role === "assistant" ? "bg-emerald-100 text-emerald-900" : "bg-emerald-600 text-white"
                        }`}
                      >
                        <div className="text-sm whitespace-pre-wrap">{message.content}</div>
                      </div>
                    </div>
                  ))}
                  {aiLoading && (
                    <div className="flex justify-start">
                      <div className="bg-emerald-100 rounded-lg p-3 flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                        <span className="text-sm text-emerald-700">Buscando recursos perfectos para ti...</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* AI Input */}
              <form onSubmit={handleAISubmit} className="flex gap-2">
                <Input
                  placeholder="Ej: 'Necesito un pediatra cerca de Pocitos' o 'Farmacia abierta los domingos'"
                  value={aiInput}
                  onChange={handleAIInputChange}
                  disabled={aiLoading}
                  className="flex-1"
                />
                <Button type="submit" disabled={aiLoading || !aiInput.trim()} className="bg-emerald-600">
                  {aiLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Location and Search */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-emerald-600" />
            <span className="text-sm text-gray-600">Tu ubicación: {userLocation}</span>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Buscar hospitales, clínicas, farmacias..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-20"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    handleSearch()
                  }
                }}
              />
              <Button
                onClick={handleSearch}
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-emerald-600 hover:bg-emerald-700"
              >
                <Search className="w-4 h-4" />
              </Button>
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los tipos</SelectItem>
                <SelectItem value="hospital">Hospitales</SelectItem>
                <SelectItem value="clinic">Clínicas</SelectItem>
                <SelectItem value="pharmacy">Farmacias</SelectItem>
                <SelectItem value="emergency">Emergencias</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedUrgency} onValueChange={setSelectedUrgency}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Urgencia" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">No urgente</SelectItem>
                <SelectItem value="2">Consulta rutinaria</SelectItem>
                <SelectItem value="3">Moderada</SelectItem>
                <SelectItem value="4">Urgente</SelectItem>
                <SelectItem value="5">Emergencia</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2 overflow-hidden">
                <img src="/placeholder.svg?height=32&width=32" alt="Hospitales" className="w-6 h-6" />
              </div>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-sm text-gray-600">Hospitales</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Stethoscope className="w-6 h-6 text-emerald-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">28</p>
              <p className="text-sm text-gray-600">Clínicas</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Pill className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">45</p>
              <p className="text-sm text-gray-600">Farmacias</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Building2 className="w-6 h-6 text-orange-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">8</p>
              <p className="text-sm text-gray-600">Emergencias</p>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Recursos encontrados ({filteredResources.length})
              {searchQuery && <span className="text-sm font-normal text-gray-600 ml-2">para "{searchQuery}"</span>}
              {selectedType !== "all" && (
                <Badge className="ml-2 bg-blue-100 text-blue-800">
                  {selectedType === "hospital"
                    ? "Hospitales"
                    : selectedType === "clinic"
                      ? "Clínicas"
                      : selectedType === "pharmacy"
                        ? "Farmacias"
                        : "Emergencias"}
                </Badge>
              )}
              {Number.parseInt(selectedUrgency) >= 4 && (
                <Badge className="ml-2 bg-red-100 text-red-800">Alta Urgencia</Badge>
              )}
              {showAIAssistant && (
                <Badge className="ml-2 bg-emerald-100 text-emerald-800">
                  <Zap className="w-3 h-3 mr-1" />
                  IA Activa
                </Badge>
              )}
            </h2>
            <Button variant="outline" size="sm" onClick={openGoogleMapsView}>
              <MapPin className="w-4 h-4 mr-2" />
              Ver en Mapa
              <ExternalLink className="w-3 h-3 ml-1" />
            </Button>
          </div>

          {filteredResources.map((resource) => (
            <Card key={resource.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg ${getTypeColor(resource.type)}`}>
                        {getTypeIcon(resource.type)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{resource.name}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {resource.distance}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            {resource.rating}
                          </span>
                          <Badge variant={resource.isOpen ? "default" : "secondary"} className="text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            {resource.isOpen ? "Abierto" : "Cerrado"}
                          </Badge>
                          {resource.emergencyServices && (
                            <Badge variant="destructive" className="text-xs">
                              24h Emergencias
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-3">{resource.address}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {resource.services.map((service, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    <Button
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700"
                      onClick={() => openGoogleMaps(resource.address, resource.name)}
                    >
                      <Navigation className="w-4 h-4 mr-2" />
                      Ir
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => callPhone(resource.phone)}>
                      <Phone className="w-4 h-4 mr-2" />
                      Llamar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Bot className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">¿No encuentras lo que buscas?</h3>
              <p className="text-gray-600 mb-4">
                Prueba usando nuestro asistente IA para búsquedas más específicas y personalizadas.
              </p>
              <Button onClick={() => setShowAIAssistant(true)} className="bg-emerald-600">
                <Bot className="w-4 h-4 mr-2" />
                Activar Asistente IA
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
