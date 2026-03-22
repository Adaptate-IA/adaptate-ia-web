import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description:
    'Cómo Adaptate IA SpA recopila, usa y protege tus datos personales conforme a la ley chilena.',
  robots: { index: true, follow: false },
};

const sections = [
  {
    id: '1',
    title: 'Identificación del responsable',
    content: `El responsable del tratamiento de tus datos personales es:

Razón social: Adaptate IA SpA
RUT: [RUT: XX.XXX.XXX-X]
Domicilio: [Dirección registrada], Santiago, Región Metropolitana, Chile
Correo de contacto: hola@adaptateia.cl

En adelante, "Adaptate IA", "nosotros" o "la empresa".`,
  },
  {
    id: '2',
    title: 'Datos que recopilamos',
    content: `Recopilamos únicamente los datos que tú nos proporcionas de forma voluntaria a través del formulario de cotización en este sitio:

— Nombre completo
— Correo electrónico
— Nombre de empresa (opcional)
— Número de teléfono (opcional)
— Descripción del proceso que deseas automatizar

No recopilamos datos sensibles (salud, origen étnico, creencias religiosas, etc.).

En el futuro próximo implementaremos herramientas de analítica web (como Google Analytics) para entender el comportamiento de los visitantes. Cuando eso ocurra, actualizaremos esta política con anterioridad e informaremos sobre el uso de cookies.`,
  },
  {
    id: '3',
    title: 'Finalidad del tratamiento',
    content: `Usamos tus datos exclusivamente para:

— Responder tu solicitud de cotización y evaluar tu caso
— Enviarte una propuesta personalizada por correo electrónico
— Gestionar la relación comercial si decides contratar nuestros servicios
— Enviarte comunicaciones relacionadas con el servicio contratado
— Mejorar nuestros servicios, propuestas y capacidades a partir de las conversaciones mantenidas con el asistente de chat del sitio. Estas conversaciones pueden ser revisadas internamente de forma agregada y anónima para entender mejor las necesidades de nuestros clientes

No utilizamos tus datos para publicidad de terceros ni los vendemos bajo ninguna circunstancia.`,
  },
  {
    id: '4',
    title: 'Base legal del tratamiento',
    content: `El tratamiento de tus datos se basa en:

— Tu consentimiento explícito al enviar el formulario de cotización
— La ejecución de una relación contractual cuando contratas nuestros servicios
— El cumplimiento de obligaciones legales aplicables en Chile

El tratamiento se rige por la Ley N° 19.628 sobre Protección de la Vida Privada y sus modificaciones, incluyendo la Ley N° 21.719 una vez que entre en plena vigencia.`,
  },
  {
    id: '5',
    title: 'Almacenamiento y destinatarios',
    content: `Tus datos se almacenan en servidores seguros operados por Adaptate IA. No transferimos tus datos a terceros, salvo en los siguientes casos estrictamente necesarios:

— Proveedores de infraestructura técnica que actúan como encargados del tratamiento bajo acuerdo de confidencialidad (por ejemplo, servicios de hosting o bases de datos en la nube)
— Obligación legal o requerimiento de autoridad competente

Cuando corresponda, dichos proveedores pueden estar fuera de Chile. En ese caso, nos aseguramos de que cuenten con estándares de protección adecuados.`,
  },
  {
    id: '6',
    title: 'Plazo de conservación',
    content: `Conservamos tus datos mientras exista una relación comercial activa o potencial. Si no se concreta ningún servicio, eliminamos tus datos dentro de los 12 meses siguientes al último contacto, salvo que la ley exija conservarlos por más tiempo.

Puedes solicitar la eliminación anticipada de tus datos en cualquier momento.`,
  },
  {
    id: '7',
    title: 'Tus derechos',
    content: `Conforme a la legislación chilena, tienes derecho a:

— Acceder a los datos que tenemos sobre ti
— Rectificar datos incorrectos o desactualizados
— Cancelar o eliminar tus datos cuando ya no sean necesarios
— Oponerte al tratamiento de tus datos en determinadas circunstancias

Para ejercer cualquiera de estos derechos, escríbenos a hola@adaptateia.cl con el asunto "Derechos ARCO". Respondemos dentro de los 15 días hábiles siguientes.`,
  },
  {
    id: '8',
    title: 'Seguridad',
    content: `Adoptamos medidas técnicas y organizativas razonables para proteger tus datos contra acceso no autorizado, pérdida o alteración. Sin embargo, ninguna transmisión por internet es completamente segura, por lo que no podemos garantizar seguridad absoluta.

Si detectamos una brecha de seguridad que afecte tus datos, te informaremos en los plazos que establezca la normativa aplicable.`,
  },
  {
    id: '9',
    title: 'Cambios a esta política',
    content: `Podemos actualizar esta política cuando sea necesario, por ejemplo al agregar nuevas funcionalidades al sitio o al incorporar herramientas de analítica. Publicaremos la versión actualizada en esta misma página con la fecha de la última modificación.

Si los cambios son relevantes, lo comunicaremos por correo electrónico a quienes tengan una relación activa con nosotros.`,
  },
  {
    id: '10',
    title: 'Contacto',
    content: `Cualquier consulta sobre esta política o sobre el tratamiento de tus datos personales puedes dirigirla a:

hola@adaptateia.cl
Adaptate IA SpA — Santiago, Chile`,
  },
];

export default function PrivacyPage() {
  const lastUpdated = '22 de marzo de 2026';

  return (
    <section className="px-6 py-24" style={{ background: '#0a0a0a', minHeight: '100dvh' }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <p
          className="font-mono mb-6"
          style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: '#767676' }}
        >
          // POLÍTICA DE PRIVACIDAD
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
          Cómo tratamos tus datos.
        </h1>
        <p className="mb-3" style={{ color: '#888888', lineHeight: '1.7', fontSize: '0.9rem' }}>
          En Adaptate IA creemos que la transparencia no es opcional. Esta política explica qué
          datos recopilamos, para qué los usamos y cómo los protegemos.
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
            ¿Tienes dudas sobre esta política?{' '}
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
