'use client';

import { useCopilotAction, useCopilotReadable } from '@copilotkit/react-core';

export interface FormData {
  name: string;
  email: string;
  company: string;
  problem: string;
}

interface CopilotActionsProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

export function CopilotActions({ formData, setFormData }: CopilotActionsProps) {
  useCopilotReadable({
    description:
      'Estado actual del formulario de cotización. Campos: name, email, company, problem. Si están vacíos el usuario aún no los ha llenado.',
    value: JSON.stringify(formData),
  });

  useCopilotAction({
    name: 'fillQuoteForm',
    description:
      'Llena el formulario de cotización con los datos que el usuario dio en el chat. Usa esto cuando el usuario quiera cotizar, diga "llena el formulario", "quiero un agente", "me interesa", o cuando hayas recopilado sus datos via preguntas.',
    parameters: [
      { name: 'name', type: 'string', description: 'Nombre completo', required: true },
      { name: 'email', type: 'string', description: 'Email de contacto', required: true },
      {
        name: 'company',
        type: 'string',
        description: 'Nombre de la empresa (puede estar vacío)',
        required: false,
      },
      {
        name: 'problem',
        type: 'string',
        description: 'Descripción del proceso que quiere automatizar',
        required: true,
      },
    ],
    handler: async ({ name, email, company, problem }) => {
      setFormData({
        name: name ?? '',
        email: email ?? '',
        company: company ?? '',
        problem: problem ?? '',
      });
      document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
      return 'Formulario llenado. Dile al usuario que revise los datos y haga click en "Quiero mi agente" para enviar.';
    },
  });

  useCopilotAction({
    name: 'navigateToSection',
    description:
      'Navega a una sección de la página. Usa esto cuando el usuario pregunte por servicios, precios, cómo funciona, preguntas frecuentes, o quiera ver el formulario.',
    parameters: [
      {
        name: 'sectionId',
        type: 'string',
        description:
          'ID de la sección. Opciones: hero (inicio), process (cómo funciona, 3 pasos), contact-form (formulario de cotización), faq (preguntas frecuentes), cta (llamada a acción final)',
        required: true,
      },
    ],
    handler: async ({ sectionId }) => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return `Navegando a la sección ${sectionId}.`;
      }
      return `No encontré la sección con id "${sectionId}".`;
    },
  });

  return null;
}
