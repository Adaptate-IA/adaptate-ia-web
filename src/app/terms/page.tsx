import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Términos de Servicio',
  description:
    'Condiciones que rigen el uso del sitio y la contratación de servicios de Adaptate IA SpA.',
  robots: { index: true, follow: false },
};

const sections = [
  {
    id: '1',
    title: 'Objeto',
    content: `Estos Términos de Servicio regulan el uso del sitio web adaptateia.cl y la contratación de servicios de desarrollo de agentes de inteligencia artificial ofrecidos por Adaptate IA SpA (en adelante, "Adaptate IA").

Al usar este sitio o al contratar cualquiera de nuestros servicios, aceptas estos términos en su totalidad. Si no estás de acuerdo, te pedimos que no uses el sitio ni nuestros servicios.`,
  },
  {
    id: '2',
    title: 'Servicios',
    content: `Adaptate IA diseña, desarrolla e implementa agentes de inteligencia artificial a medida para empresas y personas naturales. Nuestros servicios incluyen:

— Diagnóstico y análisis del proceso a automatizar
— Diseño y desarrollo del agente de IA
— Integración con los sistemas del cliente (CRMs, ERPs, APIs, etc.)
— Pruebas y puesta en marcha
— Soporte post-implementación según lo acordado en cada proyecto

Las características, alcance y precio de cada servicio se definen en la propuesta personalizada que enviamos a cada cliente. Esa propuesta, una vez aceptada por el cliente, forma parte del acuerdo entre las partes.`,
  },
  {
    id: '3',
    title: 'Proceso de contratación',
    content: `La contratación de nuestros servicios sigue este proceso:

1. El cliente envía una solicitud de cotización a través del formulario del sitio o por correo a hola@adaptateia.cl
2. Adaptate IA elabora y envía una propuesta personalizada dentro de las 24 horas hábiles siguientes
3. El cliente acepta la propuesta (por correo electrónico o de forma escrita)
4. Se acuerda el calendario de trabajo y las condiciones de pago

La aceptación de la propuesta constituye un acuerdo vinculante entre el cliente y Adaptate IA SpA.`,
  },
  {
    id: '4',
    title: 'Precios y pagos',
    content: `Los precios están denominados en dólares estadounidenses (USD) y son acordados individualmente en cada propuesta. Los valores publicados en el sitio son referenciales.

Las condiciones de pago (anticipo, hitos, pago final) se definen en cada propuesta. Por defecto, el esquema es:

— 50% al inicio del proyecto
— 50% al momento de la entrega final

Adaptate IA se reserva el derecho de ajustar sus tarifas de referencia con previo aviso. Los proyectos ya acordados no se ven afectados por cambios de tarifas posteriores.`,
  },
  {
    id: '5',
    title: 'Política de reembolsos',
    content: `Dado que nuestros servicios son desarrollos a medida con dedicación de tiempo y recursos desde el inicio, aplicamos la siguiente política:

— No se realizan reembolsos sobre montos ya pagados una vez iniciado el trabajo
— Si el proyecto no ha comenzado y el cliente desiste, se reembolsa el 100% de cualquier anticipo recibido
— Si el agente entregado no cumple con las especificaciones acordadas en la propuesta, Adaptate IA se compromete a corregirlo sin costo adicional dentro de los 30 días siguientes a la entrega

Entendemos que las circunstancias cambian. Si tienes una situación especial, contáctanos en hola@adaptateia.cl y buscamos una solución razonable.`,
  },
  {
    id: '6',
    title: 'Propiedad intelectual',
    content: `Una vez completado el pago total acordado, el cliente obtiene los derechos de uso sobre el agente desarrollado específicamente para su proyecto.

Adaptate IA retiene la propiedad sobre los componentes genéricos, metodologías, herramientas y código base reutilizable empleados en el desarrollo, los cuales no son específicos del cliente.

El contenido del sitio web adaptateia.cl (textos, diseño, código) es propiedad de Adaptate IA SpA y no puede ser reproducido sin autorización escrita.`,
  },
  {
    id: '7',
    title: 'Obligaciones del cliente',
    content: `Para que el desarrollo sea exitoso, el cliente se compromete a:

— Proveer información veraz y completa sobre el proceso a automatizar
— Dar acceso oportuno a los sistemas o APIs necesarios para la integración
— Designar un interlocutor que pueda revisar avances y dar feedback
— Responder consultas de Adaptate IA en un plazo razonable

Los retrasos causados por falta de respuesta o acceso del cliente no son responsabilidad de Adaptate IA y pueden afectar los plazos acordados.`,
  },
  {
    id: '8',
    title: 'Limitación de responsabilidad',
    content: `Adaptate IA no se hace responsable por:

— Pérdidas indirectas, lucro cesante o daños consecuenciales derivados del uso o la imposibilidad de uso del agente desarrollado
— Interrupciones causadas por terceros (proveedores de API, plataformas de mensajería, servicios en la nube)
— Cambios en APIs o plataformas externas que afecten el funcionamiento del agente después de la entrega

La responsabilidad total de Adaptate IA frente a cualquier reclamación no superará el monto pagado por el cliente en el proyecto en cuestión.`,
  },
  {
    id: '9',
    title: 'Uso aceptable del sitio',
    content: `Al usar este sitio te comprometes a no:

— Intentar acceder de forma no autorizada a sistemas o datos del sitio
— Usar herramientas automatizadas para sobrecargar el servidor o el asistente de chat
— Suplantar la identidad de otra persona al enviar el formulario de cotización
— Usar el asistente de chat para fines distintos a consultas sobre los servicios de Adaptate IA

Nos reservamos el derecho de bloquear accesos que violen estas condiciones.`,
  },
  {
    id: '10',
    title: 'Modificaciones',
    content: `Adaptate IA puede modificar estos términos en cualquier momento. Los cambios entran en vigor desde su publicación en este sitio.

Para proyectos ya contratados, los términos vigentes al momento de la aceptación de la propuesta son los aplicables, salvo acuerdo expreso en contrario.`,
  },
  {
    id: '11',
    title: 'Ley aplicable y jurisdicción',
    content: `Estos términos se rigen por las leyes de la República de Chile. Cualquier disputa que no pueda resolverse de forma amistosa será sometida a los tribunales ordinarios de justicia de Santiago de Chile.

Para resolver conflictos de consumo, las personas naturales también pueden recurrir al Servicio Nacional del Consumidor (SERNAC).`,
  },
];

export default function TermsPage() {
  const lastUpdated = '22 de marzo de 2026';

  return (
    <section className="px-6 py-24" style={{ background: '#0a0a0a', minHeight: '100dvh' }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <p
          className="font-mono mb-6"
          style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: '#767676' }}
        >
          // TÉRMINOS DE SERVICIO
        </p>
        <h1
          className="font-bold mb-4"
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            color: '#f0efe9',
            lineHeight: '1.2',
          }}
        >
          Las reglas del juego.
        </h1>
        <p className="mb-3" style={{ color: '#888888', lineHeight: '1.7', fontSize: '0.9rem' }}>
          Estos términos definen la relación entre tú y Adaptate IA. Están escritos en lenguaje
          claro, sin letra chica.
        </p>
        <p
          className="mb-16 font-mono"
          style={{ fontSize: '0.7rem', color: '#767676', letterSpacing: '0.1em' }}
        >
          Última actualización: {lastUpdated}
        </p>

        {/* Sections */}
        <div className="space-y-0">
          {sections.map((section) => (
            <div key={section.id} style={{ borderTop: '1px solid #2a2a2a' }} className="py-8">
              <p
                className="font-mono mb-3"
                style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: '#767676' }}
              >
                {section.id.padStart(2, '0')}
              </p>
              <h2
                className="font-semibold mb-4"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '1.1rem',
                  color: '#f0efe9',
                }}
              >
                {section.title}
              </h2>
              <div style={{ color: '#888888', fontSize: '0.9rem', lineHeight: '1.8' }}>
                {section.content.split('\n').map((line, i) =>
                  line.trim() === '' ? (
                    <br key={i} />
                  ) : (
                    <p key={i}>{line}</p>
                  )
                )}
              </div>
            </div>
          ))}
          <div style={{ borderTop: '1px solid #2a2a2a' }} />
        </div>

        {/* Footer note */}
        <div className="mt-16 pt-8" style={{ borderTop: '1px solid #1e1e1e' }}>
          <p style={{ color: '#767676', fontSize: '0.8rem', lineHeight: '1.7' }}>
            ¿Tienes preguntas sobre estos términos?{' '}
            <a
              href="mailto:hola@adaptateia.cl"
              style={{ color: '#f0efe9', textDecoration: 'underline' }}
            >
              hola@adaptateia.cl
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
