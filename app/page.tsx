import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin, Users, Shield, Clock, Star, Phone, MessageCircle } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-emerald-800">Cuidar Contigo</h1>
                <p className="text-xs text-emerald-600">Salud y cuidado familiar</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/primeros-auxilios" className="text-gray-600 hover:text-emerald-600 transition-colors">
                Primeros Auxilios
              </Link>
              <Link href="/recursos" className="text-gray-600 hover:text-emerald-600 transition-colors">
                Recursos
              </Link>
              <Link href="/reservas" className="text-gray-600 hover:text-emerald-600 transition-colors">
                Reservar Cuidado
              </Link>
              <Button variant="outline" size="sm">
                Iniciar Sesión
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-4 bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
            <Shield className="w-3 h-3 mr-1" />
            Plataforma Segura y Confiable
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Tu salud y la de tu familia en <span className="text-emerald-600">buenas manos</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Accede a asistencia médica inmediata, encuentra recursos de salud cercanos y conecta con profesionales de
            confianza en Uruguay.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700" asChild>
              <Link href="/primeros-auxilios">
                <MessageCircle className="w-5 h-5 mr-2" />
                Asistencia Inmediata
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/recursos">
                <MapPin className="w-5 h-5 mr-2" />
                Encontrar Recursos
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Todo lo que necesitas para cuidar a tu familia</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Una plataforma integral diseñada para brindarte tranquilidad y acceso rápido a la atención médica que
              necesitas.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-emerald-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle className="text-xl">Asistente de Primeros Auxilios</CardTitle>
                <CardDescription>
                  Bot inteligente disponible 24/7 para guiarte en situaciones de emergencia con instrucciones claras y
                  precisas.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    Disponible las 24 horas
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-600" />
                    Información médica verificada
                  </li>
                  <li className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-emerald-600" />
                    Conexión directa con emergencias
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-emerald-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-emerald-600" />
                </div>
                <CardTitle className="text-xl">Recursos de Salud Cercanos</CardTitle>
                <CardDescription>
                  Encuentra hospitales, clínicas, farmacias y centros de salud cerca de tu ubicación con información
                  actualizada.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    Geolocalización precisa
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    Horarios actualizados
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-emerald-600" />
                    Reseñas y calificaciones
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-emerald-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-teal-600" />
                </div>
                <CardTitle className="text-xl">Cuidadores Profesionales</CardTitle>
                <CardDescription>
                  Conecta con enfermeros y cuidadores certificados para atención personalizada en tu hogar.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-600" />
                    Profesionales verificados
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-emerald-600" />
                    Perfiles con reseñas
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-600" />
                    Reservas flexibles
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 px-4 bg-emerald-50">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Tu confianza es nuestra prioridad</h2>
            <p className="text-gray-600 mb-8">
              Cumplimos con los más altos estándares de seguridad y privacidad para proteger tu información y la de tu
              familia.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Datos Seguros</h3>
                <p className="text-sm text-gray-600">Encriptación de extremo a extremo</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mb-4">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Profesionales Verificados</h3>
                <p className="text-sm text-gray-600">Certificaciones validadas</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold mb-2">Atención Personalizada</h3>
                <p className="text-sm text-gray-600">Soporte humano disponible</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-emerald-600">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Comienza a cuidar a tu familia hoy</h2>
          <p className="text-emerald-100 mb-8 max-w-2xl mx-auto">
            Únete a miles de familias uruguayas que ya confían en Cuidar Contigo para su bienestar y tranquilidad.
          </p>
          <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-50">
            Crear Cuenta Gratuita
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold">Cuidar Contigo</span>
              </div>
              <p className="text-gray-400 text-sm">
                Tu plataforma de confianza para el cuidado de la salud familiar en Uruguay.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Servicios</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/primeros-auxilios" className="hover:text-white">
                    Primeros Auxilios
                  </Link>
                </li>
                <li>
                  <Link href="/recursos" className="hover:text-white">
                    Recursos de Salud
                  </Link>
                </li>
                <li>
                  <Link href="/reservas" className="hover:text-white">
                    Reservar Cuidador
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Soporte</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/ayuda" className="hover:text-white">
                    Centro de Ayuda
                  </Link>
                </li>
                <li>
                  <Link href="/contacto" className="hover:text-white">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link href="/emergencias" className="hover:text-white">
                    Emergencias
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/privacidad" className="hover:text-white">
                    Privacidad
                  </Link>
                </li>
                <li>
                  <Link href="/terminos" className="hover:text-white">
                    Términos
                  </Link>
                </li>
                <li>
                  <Link href="/seguridad" className="hover:text-white">
                    Seguridad
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Cuidar Contigo. Todos los derechos reservados. Hecho con ❤️ en Uruguay.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
