/**
 * Bilingual Support - English/Spanish
 * For families communicating with incarcerated loved ones
 */

export type Language = 'en' | 'es'

export const translations = {
  en: {
    // Navigation
    nav: {
      home: 'Home',
      dashboard: 'Dashboard',
      messages: 'Messages',
      wallet: 'Wallet',
      signIn: 'Sign In',
      getStarted: 'Get Started',
      back: 'Back',
    },
    // Home Page
    home: {
      title: 'BeyondBars - Stay Connected',
      hero: {
        title: 'Stay Connected with Your Loved Ones',
        subtitle: 'A simple, dignified way to send messages and support to those in California prisons and juvenile facilities. Because everyone deserves to maintain their connections.',
        startNow: 'Start Now',
        findFacility: 'Find a Facility',
      },
      features: {
        title: 'Everything You Need to Stay in Touch',
        messaging: {
          title: 'Send Messages',
          description: 'Easy, compliant messaging to California prisons and juvenile facilities',
        },
        kidsMode: {
          title: 'Kids Mode 👧👦',
          description: 'Simple, safe mode for children to write to their parents',
        },
        wallet: {
          title: 'Commissary Wallet',
          description: 'Use Cash App, PayPal, Venmo, or cards to send money instantly',
        },
        compliant: {
          title: 'Fully Compliant',
          description: 'All communications follow CDCR and facility guidelines',
        },
      },
    },
    // Kids Mode
    kidsMode: {
      title: 'Kids Mode',
      subtitle: 'Write to Your Parent!',
      description: 'Let them know you love them and miss them!',
      yourName: "What's your name?",
      parentName: 'What do you call your parent?',
      parentPlaceholder: 'Mom, Dad, Mommy, Papa, etc.',
      chooseMessage: 'Choose a message to start with:',
      yourMessage: 'Your message for',
      sendButton: 'Send to',
      templates: {
        iLoveYou: {
          title: 'I Love You',
          message: 'Dear {parent},\n\nI love you so much! I miss you every day. I think about you all the time.\n\nLove,\n{child}',
        },
        iMissYou: {
          title: 'I Miss You',
          message: 'Hi {parent}!\n\nI miss you a lot. I can\'t wait to see you again. I think about you every day.\n\nHugs and kisses,\n{child}',
        },
        goodNews: {
          title: 'Good News!',
          message: 'Dear {parent},\n\nI wanted to tell you some good news! [Tell your parent something good that happened]\n\nI hope you\'re doing good too!\n\nLove,\n{child}',
        },
        schoolUpdate: {
          title: 'School Update',
          message: 'Hi {parent}!\n\nSchool is going good. I\'m learning a lot. [Tell about your favorite subject or what you\'re learning]\n\nI wish you could see my work! I\'m doing my best.\n\nLove,\n{child}',
        },
        thinkingOfYou: {
          title: 'Thinking of You',
          message: 'Dear {parent},\n\nI\'m thinking about you today. I remember when we [share a happy memory together].\n\nI can\'t wait to make more happy memories with you.\n\nLove always,\n{child}',
        },
        proudOfYou: {
          title: "I'm Proud of You",
          message: 'Hi {parent}!\n\nI want you to know that I\'m proud of you. You\'re my {parent} and I love you no matter what.\n\nStay strong!\n\nLove,\n{child}',
        },
      },
    },
    // Parents Mode
    parentsMode: {
      title: 'Parents Mode',
      subtitle: 'Writing to Your Child in Juvenile Detention',
      guidance: 'Parent Guidance',
      childName: "Your child's name",
      relationship: 'Your child is your',
      signAs: 'Sign as',
      son: 'Son',
      daughter: 'Daughter',
      child: 'Child',
      templates: {
        unconditionalLove: {
          title: 'I Love You No Matter What',
          category: 'Unconditional Love',
        },
        proud: {
          title: "I'm Proud of Your Strength",
          category: 'Encouragement',
        },
        missYou: {
          title: 'We Miss You at Home',
          category: 'Family Connection',
        },
        listening: {
          title: "I'm Here to Listen",
          category: 'Support',
        },
        future: {
          title: 'Looking Forward Together',
          category: 'Hope & Future',
        },
        forgiveness: {
          title: 'I Forgive You, I Love You',
          category: 'Healing',
        },
        identity: {
          title: "You're Not Defined By This",
          category: 'Identity',
        },
        growth: {
          title: 'Keep Learning & Growing',
          category: 'Personal Growth',
        },
      },
    },
  },
  es: {
    // Navegación
    nav: {
      home: 'Inicio',
      dashboard: 'Panel',
      messages: 'Mensajes',
      wallet: 'Cartera',
      signIn: 'Iniciar Sesión',
      getStarted: 'Comenzar',
      back: 'Atrás',
    },
    // Página Principal
    home: {
      title: 'BeyondBars - Mantente Conectado',
      hero: {
        title: 'Mantente Conectado con Tus Seres Queridos',
        subtitle: 'Una manera simple y digna de enviar mensajes y apoyo a quienes están en prisiones y centros juveniles de California. Porque todos merecen mantener sus conexiones.',
        startNow: 'Comenzar Ahora',
        findFacility: 'Buscar una Instalación',
      },
      features: {
        title: 'Todo lo que Necesitas para Mantenerte en Contacto',
        messaging: {
          title: 'Enviar Mensajes',
          description: 'Mensajería fácil y conforme a prisiones y centros juveniles de California',
        },
        kidsMode: {
          title: 'Modo Niños 👧👦',
          description: 'Modo simple y seguro para que los niños escriban a sus padres',
        },
        wallet: {
          title: 'Cartera de Comisariato',
          description: 'Usa Cash App, PayPal, Venmo o tarjetas para enviar dinero al instante',
        },
        compliant: {
          title: 'Totalmente Conforme',
          description: 'Todas las comunicaciones siguen las pautas de CDCR y las instalaciones',
        },
      },
    },
    // Modo Niños
    kidsMode: {
      title: 'Modo Niños',
      subtitle: '¡Escribe a Tu Mamá o Papá!',
      description: '¡Diles que los amas y los extrañas!',
      yourName: '¿Cómo te llamas?',
      parentName: '¿Cómo llamas a tu mamá o papá?',
      parentPlaceholder: 'Mamá, Papá, Mami, Papi, etc.',
      chooseMessage: 'Elige un mensaje para empezar:',
      yourMessage: 'Tu mensaje para',
      sendButton: 'Enviar a',
      templates: {
        iLoveYou: {
          title: 'Te Amo',
          message: 'Querido/a {parent},\n\n¡Te amo mucho! Te extraño todos los días. Pienso en ti todo el tiempo.\n\nCon amor,\n{child}',
        },
        iMissYou: {
          title: 'Te Extraño',
          message: '¡Hola {parent}!\n\n¡Te extraño mucho! No puedo esperar para verte otra vez. Pienso en ti todos los días.\n\nAbrazos y besos,\n{child}',
        },
        goodNews: {
          title: '¡Buenas Noticias!',
          message: 'Querido/a {parent},\n\n¡Quería contarte buenas noticias! [Cuéntale algo bueno que pasó]\n\n¡Espero que tú también estés bien!\n\nCon amor,\n{child}',
        },
        schoolUpdate: {
          title: 'Noticias de la Escuela',
          message: '¡Hola {parent}!\n\nLa escuela va bien. Estoy aprendiendo mucho. [Cuéntale sobre tu materia favorita o lo que estás aprendiendo]\n\n¡Me gustaría que pudieras ver mi trabajo! Estoy haciendo mi mejor esfuerzo.\n\nCon amor,\n{child}',
        },
        thinkingOfYou: {
          title: 'Pensando en Ti',
          message: 'Querido/a {parent},\n\nEstoy pensando en ti hoy. Recuerdo cuando [comparte un recuerdo feliz juntos].\n\nNo puedo esperar para hacer más recuerdos felices contigo.\n\nCon todo mi amor,\n{child}',
        },
        proudOfYou: {
          title: 'Estoy Orgulloso/a de Ti',
          message: '¡Hola {parent}!\n\nQuiero que sepas que estoy orgulloso/a de ti. Eres mi {parent} y te amo sin importar nada.\n\n¡Mantente fuerte!\n\nCon amor,\n{child}',
        },
      },
    },
    // Modo Padres
    parentsMode: {
      title: 'Modo Padres',
      subtitle: 'Escribiendo a Tu Hijo/a en Detención Juvenil',
      guidance: 'Guía para Padres',
      childName: 'Nombre de tu hijo/a',
      relationship: 'Tu hijo/a es tu',
      signAs: 'Firmar como',
      son: 'Hijo',
      daughter: 'Hija',
      child: 'Hijo/a',
      templates: {
        unconditionalLove: {
          title: 'Te Amo Sin Importar Nada',
          category: 'Amor Incondicional',
        },
        proud: {
          title: 'Estoy Orgulloso/a de Tu Fortaleza',
          category: 'Ánimo',
        },
        missYou: {
          title: 'Te Extrañamos en Casa',
          category: 'Conexión Familiar',
        },
        listening: {
          title: 'Estoy Aquí para Escucharte',
          category: 'Apoyo',
        },
        future: {
          title: 'Mirando Hacia el Futuro Juntos',
          category: 'Esperanza y Futuro',
        },
        forgiveness: {
          title: 'Te Perdono, Te Amo',
          category: 'Sanación',
        },
        identity: {
          title: 'Esto No Te Define',
          category: 'Identidad',
        },
        growth: {
          title: 'Sigue Aprendiendo y Creciendo',
          category: 'Crecimiento Personal',
        },
      },
    },
  },
}

// Parent templates in Spanish
export const spanishParentTemplates = [
  {
    id: 1,
    title: 'Te Amo Sin Importar Nada',
    category: 'Amor Incondicional',
    message: 'Querido/a {child},\n\nTe amo. Eso nunca va a cambiar, sin importar nada. Eres mi {son/daughter} y nada puede romper ese vínculo.\n\nEstoy aquí para ti. No voy a ningún lado. Vamos a superar esto juntos.\n\nCon todo mi amor,\n{parent}',
  },
  {
    id: 2,
    title: 'Estoy Orgulloso/a de Tu Fortaleza',
    category: 'Ánimo',
    message: 'Querido/a {child},\n\nQuiero que sepas que veo lo mucho que estás intentando. Estoy orgulloso/a de las decisiones que estás tomando ahora. Cada día es una nueva oportunidad.\n\nEres más fuerte de lo que piensas. Mantén la cabeza en alto y enfócate en tu futuro. Creo en ti.\n\nCon amor y orgullo,\n{parent}',
  },
  {
    id: 3,
    title: 'Te Extrañamos en Casa',
    category: 'Conexión Familiar',
    message: 'Hola {child},\n\nTe extrañamos mucho en casa. {sibling/family member} pregunta por ti todo el tiempo. Hablamos de ti todos los días.\n\n[Comparte una pequeña actualización familiar - pero mantenla ligera y positiva]\n\nEstamos contando los días hasta que estés de vuelta en casa con nosotros.\n\nCon amor,\n{parent}',
  },
  {
    id: 4,
    title: 'Estoy Aquí para Escucharte',
    category: 'Apoyo',
    message: 'Querido/a {child},\n\n¿Cómo estás? De verdad - ¿cómo te sientes? Siempre puedes ser honesto/a conmigo.\n\nEstoy aquí para escucharte, no para juzgarte. Sea lo que sea por lo que estés pasando, podemos hablar de ello. No estás solo/a en esto.\n\nTe amo,\n{parent}',
  },
  {
    id: 5,
    title: 'Mirando Hacia el Futuro Juntos',
    category: 'Esperanza y Futuro',
    message: 'Hola {child},\n\nHe estado pensando en el futuro - tu futuro. Tienes mucho por delante. Este es solo un capítulo, no toda tu historia.\n\nHablemos sobre lo que quieres hacer cuando regreses a casa. ¿Qué te interesa? ¿Cuáles son tus metas? Quiero apoyar tus sueños.\n\nVamos a construir ese futuro juntos.\n\nCon amor,\n{parent}',
  },
  {
    id: 6,
    title: 'Te Perdono, Te Amo',
    category: 'Sanación',
    message: 'Querido/a {child},\n\nTe perdono. Quiero que lo sepas. Cualquier dolor o enojo que sentí, estoy eligiendo el amor. Eres mi {son/daughter} y te amo.\n\nEspero que también puedas perdonarte a ti mismo/a. Todos cometemos errores. Lo que importa ahora es cómo seguimos adelante.\n\nEstoy contigo en cada paso del camino.\n\nCon amor,\n{parent}',
  },
  {
    id: 7,
    title: 'Esto No Te Define',
    category: 'Identidad',
    message: 'Querido/a {child},\n\nNo eres tus errores. No eres este lugar. Eres {child\'s name} - una persona con valor, mérito y un futuro.\n\nVeo quién eres realmente. Veo tu corazón, tu potencial, tu bondad. Eso es lo que te define.\n\nNunca olvides quién eres.\n\nCon amor,\n{parent}',
  },
  {
    id: 8,
    title: 'Sigue Aprendiendo y Creciendo',
    category: 'Crecimiento Personal',
    message: 'Hola {child},\n\nEspero que estés aprovechando los programas y clases allí. La educación y el aprendizaje son cosas que nadie te puede quitar.\n\nTodo lo que aprendas ahora está construyendo tu futuro. Estoy muy orgulloso/a cuando escucho que estás participando e intentando.\n\nSigue creciendo. Sigue aprendiendo. Estoy animándote.\n\nCon amor,\n{parent}',
  },
]

export function getTranslation(lang: Language, key: string): string {
  const keys = key.split('.')
  let value: any = translations[lang]
  
  for (const k of keys) {
    value = value?.[k]
  }
  
  return value || key
}

