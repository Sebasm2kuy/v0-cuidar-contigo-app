"use client"

import { useState } from "react"
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
  const [userLocation, setUserLocation] = useState("Montevideo, Uruguay")

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
      resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.address.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = selectedType === "all" || resource.type === selectedType
    return matchesSearch && matchesType
  })

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
                  <h1 className="font-bold text-emerald-800">Recursos de Salud</h1>
                  <p className="text-xs text-emerald-600">Encuentra atención médica cerca de ti</p>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Navigation className="w-4 h-4 mr-2" />
              Mi Ubicación
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
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
                className="pl-10"
              />
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
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Hospital className="w-6 h-6 text-red-600" />
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
            <h2 className="text-xl font-semibold text-gray-900">Recursos encontrados ({filteredResources.length})</h2>
            <Button variant="outline" size="sm">
              <MapPin className="w-4 h-4 mr-2" />
              Ver en Mapa
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
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                      <Navigation className="w-4 h-4 mr-2" />
                      Ir
                    </Button>
                    <Button size="sm" variant="outline">
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
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No se encontraron recursos</h3>
              <p className="text-gray-600">
                Intenta ajustar tu búsqueda o filtros para encontrar recursos de salud cerca de ti.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
