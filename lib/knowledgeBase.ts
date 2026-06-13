import type { ProductCategory } from '@/types'

export interface KnowledgeEntry {
  id: string
  /** Palabras/frases que disparan esta respuesta (en minúscula, sin tildes). */
  keywords: string[]
  answer: string
  /** Categoría de productos relacionada para sugerir al final (opcional). */
  category?: ProductCategory
}

export const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  {
    id: 'monocomando-vs-bicomando',
    keywords: ['monocomando', 'bicomando', 'bicommando', 'diferencia entre canilla', 'una sola manija', 'dos manijas', 'diferencia grifo'],
    answer:
      'Una grifería monocomando usa una sola palanca para regular caudal y temperatura a la vez: más cómoda y moderna. La bicomando tiene dos volantes separados (uno para agua fría y otro para caliente). Hoy la mayoría elige monocomando por practicidad; la bicomando se usa más en estilos clásicos.',
    category: 'griferias',
  },
  {
    id: 'cartucho-ceramico',
    keywords: ['cartucho', 'ceramico', 'ceramica', 'gotea', 'pierde agua', 'cierre'],
    answer:
      'El cartucho cerámico es el corazón de una grifería monocomando: dos discos de cerámica que abren y cierran el paso del agua. Es mucho más durable que los cueritos viejos y casi no gotea. Las griferías FV usan cartucho de 35mm de alta resistencia. Si una canilla monocomando gotea, casi siempre se soluciona cambiando el cartucho.',
    category: 'griferias',
  },
  {
    id: 'como-elegir-griferia-bano',
    keywords: ['como elijo griferia', 'que griferia', 'elegir griferia', 'griferia para el bano', 'cual griferia', 'que canilla compro'],
    answer:
      'Para elegir una grifería de baño fijate: 1) el tipo de bacha (de apoyar necesita pico alto, bajo mesada uno estándar), 2) monocomando o bicomando según tu estilo, 3) el acabado (el cromo es el más resistente y fácil de limpiar), y 4) que tenga garantía oficial y cartucho cerámico. Marcas como FV y Peirano te aseguran repuestos a futuro.',
    category: 'griferias',
  },
  {
    id: 'griferia-cocina',
    keywords: ['griferia de cocina', 'canilla cocina', 'grifo cocina', 'pico alto', 'caño giratorio', 'cocina monocomando'],
    answer:
      'Para cocina conviene una grifería monocomando con caño alto y giratorio, así lavás ollas grandes cómodo y movés el pico a ambas bachas. Las extraíbles (con flexible) suman practicidad. La Peirano Cuina es una buena opción nacional con caño alto giratorio.',
    category: 'griferias',
  },
  {
    id: 'acabado-cromo',
    keywords: ['cromo', 'acabado', 'material griferia', 'de que material', 'bronce', 'acero', 'niquel', 'oxida'],
    answer:
      'La mayoría de las griferías buenas son de cuerpo de bronce con terminación cromada: el bronce da resistencia y el cromo protege y se limpia fácil sin oxidarse. También hay acabados en negro mate o acero, más de diseño. Evitá las de zamak puro (más baratas pero menos durables).',
    category: 'griferias',
  },
  {
    id: 'inodoro-corto-largo',
    keywords: ['inodoro corto', 'inodoro largo', 'pozo', 'diferencia inodoro', 'que inodoro', 'medida inodoro', 'distancia pared'],
    answer:
      'La diferencia entre inodoro corto y largo es la distancia del centro del desagüe a la pared: el corto ronda los 30cm y el largo unos 60cm. Tenés que comprar el que coincida con la salida que ya tenés en el piso, si no, no calza. Si estás haciendo la instalación de cero, podés elegir cualquiera.',
    category: 'sanitarios',
  },
  {
    id: 'descarga-dual',
    keywords: ['descarga dual', 'doble descarga', 'mochila', 'deposito', 'ahorro de agua', 'boton doble', 'tres y seis litros'],
    answer:
      'La descarga dual es el botón doble del depósito: uno descarga ~3 litros (líquidos) y otro ~6 litros (sólidos). Te ahorra muchísima agua respecto a los sistemas viejos de 9-12 litros. Casi todos los inodoros nuevos con depósito de apoyar ya vienen con dual.',
    category: 'sanitarios',
  },
  {
    id: 'bidet',
    keywords: ['bidet', 'bidé', 'para que sirve bidet', 'griferia bidet'],
    answer:
      'El bidet es la pieza de higiene íntima que acompaña al inodoro. Necesita su propia grifería (monocomando o bicomando con pico orientable). Si renovás el baño, conviene que inodoro y bidet sean de la misma línea y color para que combinen.',
    category: 'sanitarios',
  },
  {
    id: 'bacha-apoyar-vs-bajomesada',
    keywords: ['bacha de apoyar', 'bajo mesada', 'bacha', 'lavabo', 'tipo de bacha', 'que bacha', 'apoyar o encastrar'],
    answer:
      'Bacha de apoyar: va arriba de la mesada, queda a la vista, muy de diseño, y necesita una grifería de pico alto. Bacha bajo mesada: se monta por debajo, deja la mesada lisa y es más fácil de limpiar. La de apoyar luce más moderna; la bajo mesada es más práctica para el día a día.',
    category: 'bachas',
  },
  {
    id: 'ducha-termostatica',
    keywords: ['termostatica', 'termostatico', 'que es termostatica', 'temperatura constante', 'columna de ducha', 'lluvia', 'duchador'],
    answer:
      'Una grifería termostática mantiene el agua a la temperatura que vos fijás, aunque alguien abra otra canilla en la casa: no te quema ni te enfría de golpe. Las columnas de ducha termostáticas (como la FV Allegro) suman un duchador de lluvia fijo más uno de mano. Es lo más cómodo y seguro, sobre todo si hay chicos.',
    category: 'duchas',
  },
  {
    id: 'presion-agua',
    keywords: ['presion', 'poca presion', 'tanque', 'bomba', 'sale poca agua', 'presion de agua'],
    answer:
      'La presión importa al elegir grifería y ducha. Si tu casa anda a tanque (presión baja), evitá duchadores de lluvia muy grandes porque salen "flojos"; andan mejor los compactos. Con bomba presurizadora o red directa podés poner cualquier cosa. Ante la duda, consultanos tu caso por WhatsApp y te orientamos.',
  },
  {
    id: 'marcas',
    keywords: ['marca', 'fv', 'ferrum', 'peirano', 'que marca es mejor', 'cual marca', 'recomendas marca'],
    answer:
      'Trabajamos con tres marcas nacionales de primera: FV (griferías, líder del país, repuestos en todos lados), Ferrum (sanitarios: inodoros, bidets, bachas, mismo grupo que FV) y Peirano (griferías, muy buena para cocina). Las tres tienen garantía oficial y conseguís repuestos sin problema.',
  },
  {
    id: 'garantia',
    keywords: ['garantia', 'garantía', 'cuanto dura', 'repuestos', 'service', 'falla'],
    answer:
      'Todos nuestros productos son originales con garantía oficial de fábrica (las griferías FV, por ejemplo, tienen 5 años). Al ser marcas nacionales, conseguís repuestos y service en todo el país. Guardá siempre la factura para hacer valer la garantía.',
  },
  {
    id: 'instalacion',
    keywords: ['instalacion', 'instalar', 'colocacion', 'plomero', 'me la instalan', 'colocan'],
    answer:
      'La instalación la hace un plomero/gasista matriculado. Nosotros te vendemos el producto con todos sus accesorios y te asesoramos, y para CABA y GBA podemos recomendarte instaladores de confianza. Consultanos por WhatsApp y coordinamos.',
  },
  {
    id: 'medidas-roscas',
    keywords: ['rosca', 'medida', 'pulgada', 'flexible', 'conexion', 'entra', 'compatible'],
    answer:
      'Las conexiones estándar en Argentina son de 1/2 pulgada para griferías, con flexibles de acople rápido. La mayoría de los productos vienen con sus flexibles o se consiguen aparte. Si tenés dudas de si algo es compatible con tu instalación, mandanos una foto por WhatsApp y lo chequeamos.',
  },
  {
    id: 'limpieza-mantenimiento',
    keywords: ['limpiar', 'limpieza', 'mantenimiento', 'sarro', 'cuidar', 'manchas', 'brillo'],
    answer:
      'Para mantener el cromo como nuevo: limpialo con un paño húmedo y jabón neutro, nunca con productos abrasivos ni esponjas de acero que lo rayan. Para el sarro, un poco de vinagre blanco diluido. Si el aireador (la puntita del pico) sale flojo, desenroscalo y limpiá el filtro.',
  },
]
