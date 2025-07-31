"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ArrowLeft, Users, Star, Clock, Shield, CalendarIcon, MapPin, Phone, Award, CheckCircle } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { es } from "date-fns/locale"

interface Caregiver {
  id: number
  name: string
  specialty: string
  rating: number
  reviews: number
  experience: string
  hourlyRate: number
  availability: string[]
  location: string
  verified: boolean
  languages: string[]
  services: string[]
  image: string
  description: string
}

export default function ReservasPage() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedCaregiver, setSelectedCaregiver] = useState<Caregiver | null>(null)
  const [showBookingForm, setShowBookingForm] = useState(false)

  const caregivers: Caregiver[] = [
    {
      id: 1,
      name: "Dra. María González",
      specialty: "Enfermera Registrada",
      rating: 4.9,
      reviews: 127,
      experience: "8 años",
      hourlyRate: 1200,
      availability: ["Mañana", "Tarde", "Noche"],
      location: "Montevideo Centro",
      verified: true,
      languages: ["Español", "Inglés"],
      services: ["Cuidados post-operatorios", "Administración de medicamentos", "Cuidados geriátricos"],
      image: "/placeholder.svg?height=100&width=100",
      description:
        "Enfermera con amplia experiencia en cuidados domiciliarios y hospitalarios. Especializada en cuidados post-operatorios y atención geriátrica.",
    },
    {
      id: 2,
      name: "Lic. Carlos Rodríguez",
      specialty: "Cuidador Especializado",
      rating: 4.8,
      reviews: 89,
      experience: "5 años",
      hourlyRate: 900,
      availability: ["Mañana", "Tarde"],
      location: "Pocitos",
      verified: true,
      languages: ["Español"],
      services: ["Cuidados básicos", "Acompañamiento", "Fisioterapia básica"],
      image: "/placeholder.svg?height=100&width=100",
      description:
        "Cuidador certificado con experiencia en atención domiciliaria. Especializado en acompañamiento y cuidados básicos para adultos mayores.",
    },
    {
      id: 3,
      name: "Enf. Ana Martínez",
      specialty: "Enfermera Pediátrica",
      rating: 4.9,
      reviews: 156,
      experience: "12 años",
      hourlyRate: 1400,
      availability: ["Mañana", "Tarde", "Noche", "Fines de semana"],
      location: "Carrasco",
      verified: true,
      languages: ["Español", "Portugués"],
      services: ["Cuidados pediátricos", "Primeros auxilios", "Cuidados especiales"],
      image: "/placeholder.svg?height=100&width=100",
      description:
        "Enfermera pediátrica con más de una década de experiencia. Especializada en cuidados infantiles y primeros auxilios.",
    },
    {
      id: 4,
      name: "Lic. Roberto Silva",
      specialty: "Fisioterapeuta",
      rating: 4.7,
      reviews: 73,
      experience: "6 años",
      hourlyRate: 1100,
      availability: ["Mañana", "Tarde"],
      location: "Punta Carretas",
      verified: true,
      languages: ["Español", "Inglés"],
      services: ["Fisioterapia", "Rehabilitación", "Terapia ocupacional"],
      image: "/placeholder.svg?height=100&width=100",
      description:
        "Fisioterapeuta licenciado con experiencia en rehabilitación domiciliaria y terapias especializadas.",
    },
  ]

  const handleBookCaregiver = (caregiver: Caregiver) => {
    setSelectedCaregiver(caregiver)
    setShowBookingForm(true)
  }

  const handleSubmitBooking = () => {
    // Handle booking submission
    alert("¡Reserva enviada! Te contactaremos pronto para confirmar los detalles.")
    setShowBookingForm(false)
    setSelectedCaregiver(null)
  }

  if (showBookingForm && selectedCaregiver) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50">
        <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => setShowBookingForm(false)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-teal-800">Reservar Cuidado</h1>
                  <p className="text-xs text-teal-600">Completa tu reserva</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-6 max-w-2xl">
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={selectedCaregiver.image || "/placeholder.svg"} />
                  <AvatarFallback>
                    {selectedCaregiver.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {selectedCaregiver.name}
                    {selectedCaregiver.verified && <CheckCircle className="w-5 h-5 text-emerald-600" />}
                  </CardTitle>
                  <CardDescription>{selectedCaregiver.specialty}</CardDescription>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{selectedCaregiver.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-600">${selectedCaregiver.hourlyRate}/hora</span>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Detalles de la Reserva</CardTitle>
              <CardDescription>Completa la información para tu cuidado personalizado</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Fecha</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP", { locale: es }) : "Seleccionar fecha"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Horario</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar horario" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="morning">Mañana (8:00 - 12:00)</SelectItem>
                      <SelectItem value="afternoon">Tarde (12:00 - 18:00)</SelectItem>
                      <SelectItem value="evening">Noche (18:00 - 22:00)</SelectItem>
                      <SelectItem value="overnight">Nocturno (22:00 - 8:00)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duración del servicio</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar duración" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2">2 horas</SelectItem>
                    <SelectItem value="4">4 horas</SelectItem>
                    <SelectItem value="8">8 horas</SelectItem>
                    <SelectItem value="12">12 horas</SelectItem>
                    <SelectItem value="24">24 horas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="service">Tipo de servicio</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar servicio" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedCaregiver.services.map((service, index) => (
                      <SelectItem key={index} value={service.toLowerCase().replace(/\s+/g, "-")}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Dirección del servicio</Label>
                <Input id="address" placeholder="Ingresa la dirección completa" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="patient-name">Nombre del paciente</Label>
                <Input id="patient-name" placeholder="Nombre completo" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="patient-age">Edad del paciente</Label>
                <Input id="patient-age" type="number" placeholder="Edad" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notas especiales</Label>
                <Textarea
                  id="notes"
                  placeholder="Describe cualquier condición médica, medicamentos, o instrucciones especiales..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact">Teléfono de contacto</Label>
                <Input id="contact" type="tel" placeholder="+598 99 123 456" />
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold">Resumen de costos:</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Tarifa por hora:</span>
                    <span>${selectedCaregiver.hourlyRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duración estimada:</span>
                    <span>4 horas</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg border-t pt-2">
                    <span>Total estimado:</span>
                    <span>${selectedCaregiver.hourlyRate * 4}</span>
                  </div>
                </div>
              </div>

              <Button onClick={handleSubmitBooking} className="w-full bg-teal-600 hover:bg-teal-700">
                Confirmar Reserva
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-emerald-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-teal-800">Cuidadores Profesionales</h1>
                <p className="text-xs text-teal-600">Encuentra el cuidado perfecto para tu familia</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Trust Banner */}
        <Card className="mb-6 bg-gradient-to-r from-teal-600 to-emerald-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold mb-2">Cuidadores Verificados y Confiables</h2>
                <p className="text-teal-100">
                  Todos nuestros profesionales están certificados y han pasado verificaciones de antecedentes
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <Shield className="w-8 h-8 mx-auto mb-1" />
                  <p className="text-xs">Verificados</p>
                </div>
                <div className="text-center">
                  <Award className="w-8 h-8 mx-auto mb-1" />
                  <p className="text-xs">Certificados</p>
                </div>
                <div className="text-center">
                  <CheckCircle className="w-8 h-8 mx-auto mb-1" />
                  <p className="text-xs">Confiables</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="grid md:grid-cols-4 gap-4">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Especialidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nurse">Enfermería</SelectItem>
                  <SelectItem value="caregiver">Cuidador</SelectItem>
                  <SelectItem value="physiotherapy">Fisioterapia</SelectItem>
                  <SelectItem value="pediatric">Pediátrico</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Ubicación" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="centro">Montevideo Centro</SelectItem>
                  <SelectItem value="pocitos">Pocitos</SelectItem>
                  <SelectItem value="carrasco">Carrasco</SelectItem>
                  <SelectItem value="punta-carretas">Punta Carretas</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Disponibilidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Mañana</SelectItem>
                  <SelectItem value="afternoon">Tarde</SelectItem>
                  <SelectItem value="evening">Noche</SelectItem>
                  <SelectItem value="weekend">Fines de semana</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Precio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">$800 - $1000</SelectItem>
                  <SelectItem value="medium">$1000 - $1200</SelectItem>
                  <SelectItem value="high">$1200+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Caregivers List */}
        <div className="space-y-6">
          {caregivers.map((caregiver) => (
            <Card key={caregiver.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={caregiver.image || "/placeholder.svg"} />
                    <AvatarFallback className="text-lg">
                      {caregiver.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                          {caregiver.name}
                          {caregiver.verified && <CheckCircle className="w-5 h-5 text-emerald-600" />}
                        </h3>
                        <p className="text-teal-600 font-medium">{caregiver.specialty}</p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            {caregiver.rating} ({caregiver.reviews} reseñas)
                          </span>
                          <span className="flex items-center gap-1">
                            <Award className="w-4 h-4" />
                            {caregiver.experience} experiencia
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {caregiver.location}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-teal-600">${caregiver.hourlyRate}</p>
                        <p className="text-sm text-gray-600">por hora</p>
                      </div>
                    </div>

                    <p className="text-gray-700 mb-4">{caregiver.description}</p>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Servicios:</h4>
                        <div className="flex flex-wrap gap-2">
                          {caregiver.services.map((service, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Disponibilidad:</h4>
                        <div className="flex flex-wrap gap-2">
                          {caregiver.availability.map((time, index) => (
                            <Badge key={index} className="text-xs bg-emerald-100 text-emerald-700">
                              <Clock className="w-3 h-3 mr-1" />
                              {time}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">Idiomas:</span>
                          {caregiver.languages.map((lang, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {lang}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Phone className="w-4 h-4 mr-2" />
                          Contactar
                        </Button>
                        <Button
                          onClick={() => handleBookCaregiver(caregiver)}
                          className="bg-teal-600 hover:bg-teal-700"
                          size="sm"
                        >
                          Reservar Ahora
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Emergency Contact */}
        <Card className="mt-8 bg-red-50 border-red-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-red-800 mb-1">¿Necesitas atención inmediata?</h3>
                <p className="text-red-600 text-sm">Para emergencias médicas, llama directamente al 911</p>
              </div>
              <Button variant="destructive">
                <Phone className="w-4 h-4 mr-2" />
                Llamar 911
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
