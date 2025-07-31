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
import { ArrowLeft, Users, Star, Clock, Shield, MapPin, Phone, Award, CheckCircle, Send } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export default function ReservasPage() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>("")
  const [formData, setFormData] = useState({
    patientName: "",
    patientAge: "",
    phone: "",
    email: "",
    address: "",
    serviceType: "",
    notes: "",
  })

  // Horarios disponibles para la Licenciada Juliana Da Rosa
  const availableTimeSlots = [
    "08:00",
    "08:30",
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
  ]

  const serviceTypes = [
    "Cuidados post-operatorios",
    "Administración de medicamentos",
    "Cuidados geriátricos",
    "Acompañamiento médico",
    "Cuidados paliativos",
    "Rehabilitación domiciliaria",
    "Control de signos vitales",
    "Curación de heridas",
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmitBooking = async () => {
    if (!selectedDate || !selectedTime || !formData.patientName || !formData.phone) {
      alert("Por favor completa todos los campos obligatorios")
      return
    }

    // Aquí se conectaría con la agenda de la profesional
    const bookingData = {
      professional: "Licenciada Juliana Da Rosa",
      date: selectedDate,
      time: selectedTime,
      patient: formData,
      timestamp: new Date(),
    }

    console.log("Reserva enviada:", bookingData)

    // Simular envío exitoso
    alert(`¡Reserva confirmada! 
    
Profesional: Licenciada Juliana Da Rosa
Fecha: ${format(selectedDate, "PPP", { locale: es })}
Hora: ${selectedTime}
Paciente: ${formData.patientName}

Te contactaremos pronto para confirmar los detalles.`)

    // Limpiar formulario
    setSelectedDate(undefined)
    setSelectedTime("")
    setFormData({
      patientName: "",
      patientAge: "",
      phone: "",
      email: "",
      address: "",
      serviceType: "",
      notes: "",
    })
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
                <h1 className="font-bold text-teal-800">Reservar Cuidado Profesional</h1>
                <p className="text-xs text-teal-600">Agenda tu cita con nuestra especialista</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Professional Info */}
      <div className="bg-teal-600 py-8">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-6">
              <div className="flex items-center gap-6">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" />
                  <AvatarFallback className="text-2xl bg-teal-100 text-teal-700">JR</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-2xl font-bold text-gray-900">Licenciada Juliana Da Rosa</h2>
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                  </div>
                  <p className="text-teal-600 font-medium mb-2">Enfermera Registrada Especializada</p>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">4.9</span>
                      <span className="text-gray-600">(156 reseñas)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="w-5 h-5 text-teal-600" />
                      <span className="text-gray-700">12 años de experiencia</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-5 h-5 text-teal-600" />
                      <span className="text-gray-700">Montevideo</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-emerald-100 text-emerald-700">Cuidados Domiciliarios</Badge>
                    <Badge className="bg-blue-100 text-blue-700">Post-operatorios</Badge>
                    <Badge className="bg-purple-100 text-purple-700">Geriátricos</Badge>
                    <Badge className="bg-orange-100 text-orange-700">Administración de Medicamentos</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-teal-600">$1,400</p>
                  <p className="text-gray-600">por hora</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm text-emerald-600">Disponible hoy</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Booking Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Información del Paciente</CardTitle>
                <CardDescription>Completa los datos para la reserva</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="patient-name">Nombre del paciente *</Label>
                    <Input
                      id="patient-name"
                      placeholder="Nombre completo"
                      value={formData.patientName}
                      onChange={(e) => handleInputChange("patientName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="patient-age">Edad</Label>
                    <Input
                      id="patient-age"
                      type="number"
                      placeholder="Edad"
                      value={formData.patientAge}
                      onChange={(e) => handleInputChange("patientAge", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+598 99 123 456"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="correo@ejemplo.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Dirección del servicio *</Label>
                  <Input
                    id="address"
                    placeholder="Dirección completa donde se realizará el cuidado"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">Tipo de servicio</Label>
                  <Select
                    value={formData.serviceType}
                    onValueChange={(value) => handleInputChange("serviceType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar tipo de cuidado" />
                    </SelectTrigger>
                    <SelectContent>
                      {serviceTypes.map((service, index) => (
                        <SelectItem key={index} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notas especiales</Label>
                  <Textarea
                    id="notes"
                    placeholder="Describe cualquier condición médica, medicamentos, o instrucciones especiales..."
                    rows={4}
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Calendar and Time Selection */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Seleccionar Fecha y Hora</CardTitle>
                <CardDescription>Elige cuándo necesitas el servicio</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-sm font-medium mb-3 block">Fecha</Label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date() || date.getDay() === 0} // Disable past dates and Sundays
                    className="rounded-md border"
                  />
                </div>

                {selectedDate && (
                  <div>
                    <Label className="text-sm font-medium mb-3 block">Horarios disponibles</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {availableTimeSlots.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedTime(time)}
                          className={selectedTime === time ? "bg-teal-600 hover:bg-teal-700" : ""}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {selectedDate && selectedTime && (
                  <div className="bg-teal-50 p-4 rounded-lg">
                    <h4 className="font-medium text-teal-800 mb-2">Resumen de la cita:</h4>
                    <div className="space-y-1 text-sm text-teal-700">
                      <p>
                        <strong>Fecha:</strong> {format(selectedDate, "PPP", { locale: es })}
                      </p>
                      <p>
                        <strong>Hora:</strong> {selectedTime}
                      </p>
                      <p>
                        <strong>Profesional:</strong> Lic. Juliana Da Rosa
                      </p>
                      <p>
                        <strong>Duración estimada:</strong> 2-4 horas
                      </p>
                      <p>
                        <strong>Costo estimado:</strong> $2,800 - $5,600
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Información de Contacto</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-teal-50 rounded-lg">
                  <Phone className="w-5 h-5 text-teal-600" />
                  <div>
                    <p className="font-medium text-teal-800">Juliana Da Rosa</p>
                    <p className="text-sm text-teal-600">+598 99 123 456</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
                  <Shield className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="font-medium text-emerald-800">Profesional Verificada</p>
                    <p className="text-sm text-emerald-600">Certificaciones validadas</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={handleSubmitBooking}
              className="w-full bg-teal-600 hover:bg-teal-700 h-12 text-lg"
              disabled={!selectedDate || !selectedTime || !formData.patientName || !formData.phone}
            >
              <Send className="w-5 h-5 mr-2" />
              Confirmar Reserva
            </Button>
          </div>
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
