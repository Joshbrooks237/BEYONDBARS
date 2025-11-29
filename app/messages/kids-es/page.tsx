'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Heart, Send, Star, Smile, Sun, Mic } from 'lucide-react'
import SpeechToTextButton from '@/components/SpeechToTextButton'

// Plantillas en español para niños
const plantillasNinos = [
  {
    id: 1,
    title: "Te Amo",
    emoji: "❤️",
    message: "Querido/a {parent},\n\n¡Te amo mucho! Te extraño todos los días. Pienso en ti todo el tiempo.\n\nCon amor,\n{child}"
  },
  {
    id: 2,
    title: "Te Extraño",
    emoji: "🥺",
    message: "¡Hola {parent}!\n\n¡Te extraño mucho! No puedo esperar para verte otra vez. Pienso en ti todos los días.\n\nAbrazos y besos,\n{child}"
  },
  {
    id: 3,
    title: "¡Buenas Noticias!",
    emoji: "🎉",
    message: "Querido/a {parent},\n\n¡Quería contarte buenas noticias! [Cuéntale algo bueno que pasó]\n\n¡Espero que tú también estés bien!\n\nCon amor,\n{child}"
  },
  {
    id: 4,
    title: "Noticias de la Escuela",
    emoji: "📚",
    message: "¡Hola {parent}!\n\nLa escuela va bien. Estoy aprendiendo mucho. [Cuéntale sobre tu materia favorita]\n\n¡Me gustaría que pudieras ver mi trabajo! Estoy haciendo mi mejor esfuerzo.\n\nCon amor,\n{child}"
  },
  {
    id: 5,
    title: "Pensando en Ti",
    emoji: "💭",
    message: "Querido/a {parent},\n\nEstoy pensando en ti hoy. Recuerdo cuando [comparte un recuerdo feliz].\n\nNo puedo esperar para hacer más recuerdos felices contigo.\n\nCon todo mi amor,\n{child}"
  },
  {
    id: 6,
    title: "Estoy Orgulloso/a de Ti",
    emoji: "⭐",
    message: "¡Hola {parent}!\n\nQuiero que sepas que estoy orgulloso/a de ti. Eres mi {parent} y te amo sin importar nada.\n\n¡Mantente fuerte!\n\nCon amor,\n{child}"
  }
]

export default function ModoNinosPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null)
  const [message, setMessage] = useState('')
  const [childName, setChildName] = useState('')
  const [parentName, setParentName] = useState('')

  const handleTemplateSelect = (template: typeof plantillasNinos[0]) => {
    setSelectedTemplate(template.id)
    const customMessage = template.message
      .replace('{parent}', parentName || 'Mamá/Papá')
      .replace('{child}', childName || 'Tu Hijo/a')
    setMessage(customMessage)
  }

  const handleSend = () => {
    alert(`¡Muy bien! Tu mensaje será enviado a ${parentName || 'tu mamá/papá'}. ¡Les va a encantar! ❤️`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header Amigable para Niños */}
      <nav className="bg-white border-b-4 border-primary-400">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/dashboard" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-6 w-6" />
              <span className="text-lg">Atrás</span>
            </Link>
            <div className="flex items-center space-x-3">
              <Heart className="h-10 w-10 text-pink-500" />
              <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Modo Niños
              </span>
            </div>
            <Link href="/messages/kids" className="text-sm text-blue-600 hover:text-blue-700">
              English
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Mensaje de Bienvenida para Niños */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📝 ¡Escribe a Tu Mamá o Papá! 💌
          </h1>
          <p className="text-xl text-gray-700">
            ¡Diles que los amas y los extrañas!
          </p>
        </div>

        {/* Paso 1: Nombres */}
        {(!childName || !parentName) && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border-4 border-purple-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Star className="h-8 w-8 text-yellow-400 mr-3" />
              ¡Primero, vamos a empezar!
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  ¿Cómo te llamas?
                </label>
                <input
                  type="text"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  placeholder="Tu nombre"
                  className="w-full text-xl border-4 border-purple-200 rounded-xl px-6 py-4 focus:ring-4 focus:ring-purple-300 focus:border-purple-400"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-2">
                  ¿Cómo llamas a tu mamá o papá?
                </label>
                <input
                  type="text"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="Mamá, Papá, Mami, Papi, etc."
                  className="w-full text-xl border-4 border-purple-200 rounded-xl px-6 py-4 focus:ring-4 focus:ring-purple-300 focus:border-purple-400"
                />
              </div>
            </div>
          </div>
        )}

        {/* Paso 2: Selección de Plantilla */}
        {childName && parentName && !selectedTemplate && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 border-4 border-blue-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Smile className="h-8 w-8 text-blue-500 mr-3" />
              Elige un mensaje para empezar:
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {plantillasNinos.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleTemplateSelect(template)}
                  className="bg-gradient-to-br from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 rounded-2xl p-6 text-left transition-all transform hover:scale-105 border-4 border-transparent hover:border-purple-300"
                >
                  <div className="text-5xl mb-3">{template.emoji}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {template.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Haz clic para usar este mensaje
                  </p>
                </button>
              ))}
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => {
                  setSelectedTemplate(-1)
                  setMessage(`Querido/a ${parentName},\n\n\n\nCon amor,\n${childName}`)
                }}
                className="text-lg text-purple-600 hover:text-purple-700 font-semibold"
              >
                O escribe tu propio mensaje →
              </button>
            </div>
          </div>
        )}

        {/* Paso 3: Editar Mensaje */}
        {selectedTemplate && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8 border-4 border-green-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Sun className="h-8 w-8 text-yellow-500 mr-3" />
                Tu mensaje para {parentName}:
              </h2>

              <div className="mb-6">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={12}
                  className="w-full text-xl border-4 border-green-200 rounded-xl px-6 py-4 focus:ring-4 focus:ring-green-300 focus:border-green-400 font-sans leading-relaxed"
                  placeholder="Escribe tu mensaje aquí..."
                />
                <p className="text-sm text-gray-600 mt-2">
                  💡 Consejo: ¡Puedes agregar o cambiar lo que quieras!
                </p>
              </div>

              {/* Voz a Texto - Amigable para Niños */}
              <div className="mb-6 bg-gradient-to-br from-purple-100 to-pink-100 border-4 border-purple-300 rounded-2xl p-6 shadow-lg">
                <h4 className="text-xl font-bold text-gray-900 mb-2 flex items-center">
                  <Mic className="h-7 w-7 text-purple-600 mr-2" />
                  ¿No puedes escribir? ¡Solo habla! 🗣️
                </h4>
                <p className="text-sm text-gray-700 mb-4">
                  Presiona y mantén el botón, luego habla. ¡Suelta cuando termines!
                </p>
                <SpeechToTextButton
                  language="es-MX"
                  mode="hold"
                  onTranscript={(text) => {
                    // Agregar texto hablado al mensaje
                    setMessage(prev => prev + (prev ? ' ' : '') + text)
                  }}
                  buttonText="Mantén para Hablar"
                  className="w-full"
                />
              </div>

              {/* Ayuda para Niños */}
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
                <h4 className="font-bold text-gray-900 mb-2">¿Necesitas ideas? Agrega cosas como:</h4>
                <ul className="text-gray-700 space-y-1 text-sm">
                  <li>• Lo que hiciste hoy</li>
                  <li>• Algo divertido en la escuela</li>
                  <li>• Un recuerdo feliz con ellos</li>
                  <li>• Cómo te sientes</li>
                  <li>• Lo que quieres hacer cuando los veas</li>
                </ul>
              </div>

              {/* Botón de Enviar */}
              <button
                onClick={handleSend}
                disabled={message.length < 20}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-2xl font-bold py-6 px-8 rounded-2xl shadow-lg transform transition hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3"
              >
                <Send className="h-8 w-8" />
                <span>¡Enviar a {parentName}! 💌</span>
              </button>

              {message.length < 20 && (
                <p className="text-center text-red-600 mt-3 font-semibold">
                  ¡Tu mensaje necesita ser un poquito más largo!
                </p>
              )}
            </div>

            {/* Ánimo */}
            <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-6 text-center border-4 border-pink-200">
              <p className="text-xl font-bold text-gray-900 mb-2">
                ⭐ ¡Lo estás haciendo muy bien! ⭐
              </p>
              <p className="text-gray-700">
                ¡{parentName} va a estar muy feliz de recibir tu mensaje! Te ama mucho. ❤️
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

