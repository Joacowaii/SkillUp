import './App.css';
import React, { useState, useEffect } from 'react';
import { Search, Plus, MessageCircle, Clock, DollarSign, Filter, User, Star, Send, Loader } from 'lucide-react';

const SkillUpApp = () => {
  const [activeTab, setActiveTab] = useState('buscar');
  const [trabajos, setTrabajos] = useState([]);
  const [trabajadores, setTrabajadores] = useState([]);
  const [filtros, setFiltros] = useState({ categoria: '', precio: '', tiempo: '' });
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [chatActivo, setChatActivo] = useState(null);
  const [mensajes, setMensajes] = useState({});
  const [nuevoMensaje, setNuevoMensaje] = useState('');

  const categorias = [
    { value: '', label: 'Todas las categorías' },
    { value: 'transcripcion', label: 'Transcripción' },
    { value: 'diseno', label: 'Diseño Gráfico' },
    { value: 'desarrollo', label: 'Desarrollo Web' },
    { value: 'investigacion', label: 'Investigación' },
    { value: 'redaccion', label: 'Redacción y Contenido' },
    { value: 'traduccion', label: 'Traducción' },
    { value: 'marketing', label: 'Marketing Digital' },
    { value: 'video', label: 'Edición de Video' },
    { value: 'audio', label: 'Edición de Audio' },
    { value: 'fotografia', label: 'Fotografía y Retoque' },
    { value: 'social_media', label: 'Redes Sociales' },
    { value: 'datos', label: 'Análisis de Datos' },
    { value: 'virtual_assistant', label: 'Asistencia Virtual' },
    { value: 'consultoria', label: 'Consultoría' },
    { value: 'educacion', label: 'Educación y Tutorías' }
  ];

  // Cargar datos de ejemplo
  useEffect(() => {
    setTrabajos([
      {
        id: 1,
        titulo: "Transcripción de audio 15 min",
        descripcion: "Necesito transcribir una entrevista de 15 minutos en español",
        categoria: "transcripcion",
        tiempo: "2 horas",
        pago: "$15",
        usuario: "María González",
        fechaPublicacion: "Hace 5 min"
      },
      {
        id: 2,
        titulo: "Diseño de logo simple",
        descripcion: "Logo minimalista para startup tecnológica, colores azul/blanco",
        categoria: "diseno",
        tiempo: "1 día",
        pago: "$35",
        usuario: "Carlos Tech",
        fechaPublicacion: "Hace 12 min"
      },
      {
        id: 3,
        titulo: "Landing page en React",
        descripcion: "Necesito una página de aterrizaje moderna y responsive para mi producto",
        categoria: "desarrollo",
        tiempo: "3-5 días",
        pago: "$150",
        usuario: "Diego Empresario",
        fechaPublicacion: "Hace 1 hora"
      },
      {
        id: 4,
        titulo: "Editar video promocional",
        descripcion: "Video de 2 minutos con efectos y música para redes sociales",
        categoria: "video",
        tiempo: "2 días",
        pago: "$80",
        usuario: "Laura Marketing",
        fechaPublicacion: "Hace 2 horas"
      }
    ]);

    setTrabajadores([
      {
        id: 1,
        nombre: "Luis Experto",
        especialidad: "Transcripción y redacción profesional",
        categoria: "transcripcion",
        disponibilidad: "Inmediata",
        precio: "$8-12/hora",
        rating: 4.8,
        trabajosCompletados: 127
      },
      {
        id: 2,
        nombre: "Sofia Design",
        especialidad: "Diseño gráfico y branding",
        categoria: "diseno",
        disponibilidad: "2-4 horas",
        precio: "$20-40/trabajo",
        rating: 4.9,
        trabajosCompletados: 89
      },
      {
        id: 3,
        nombre: "Carlos Dev",
        especialidad: "Desarrollo web full-stack (React, Node.js)",
        categoria: "desarrollo",
        disponibilidad: "24-48 horas",
        precio: "$40-60/hora",
        rating: 4.9,
        trabajosCompletados: 73
      },
      {
        id: 4,
        nombre: "Ana VideoCreator",
        especialidad: "Edición profesional de video y motion graphics",
        categoria: "video",
        disponibilidad: "1-3 días",
        precio: "$30-50/hora",
        rating: 4.8,
        trabajosCompletados: 95
      }
    ]);
  }, []);

  const FormularioTrabajo = ({ tipo, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
      titulo: '',
      descripcion: '',
      categoria: '',
      tiempo: '',
      pago: ''
    });

    const handleSubmit = () => {
      if (formData.titulo && formData.descripcion && formData.categoria && formData.tiempo && formData.pago) {
        const nuevoItem = {
          id: Date.now(),
          ...formData,
          usuario: "Tú",
          fechaPublicacion: "Ahora",
          ...(tipo === 'trabajador' && { 
            nombre: formData.titulo,
            especialidad: formData.descripcion,
            disponibilidad: formData.tiempo,
            precio: formData.pago,
            rating: 0,
            trabajosCompletados: 0
          })
        };
        onSubmit(nuevoItem);
        onClose();
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold mb-4">
            {tipo === 'trabajo' ? 'Publicar Trabajo' : 'Ofrecer Servicios'}
          </h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder={tipo === 'trabajo' ? 'Título del trabajo' : 'Tu nombre/marca'}
              className="w-full p-3 border rounded-lg"
              value={formData.titulo}
              onChange={(e) => setFormData({...formData, titulo: e.target.value})}
              required
            />
            <textarea
              placeholder={tipo === 'trabajo' ? 'Descripción detallada' : 'Qué servicios ofreces'}
              className="w-full p-3 border rounded-lg h-24"
              value={formData.descripcion}
              onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
              required
            />
            <select
              className="w-full p-3 border rounded-lg"
              value={formData.categoria}
              onChange={(e) => setFormData({...formData, categoria: e.target.value})}
              required
            >
              <option value="">Seleccionar categoría</option>
              {categorias.slice(1).map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder={tipo === 'trabajo' ? 'Tiempo estimado (ej: 2 horas)' : 'Disponibilidad (ej: Inmediata)'}
              className="w-full p-3 border rounded-lg"
              value={formData.tiempo}
              onChange={(e) => setFormData({...formData, tiempo: e.target.value})}
              required
            />
            <input
              type="text"
              placeholder={tipo === 'trabajo' ? 'Pago ofrecido (ej: $25)' : 'Precio por trabajo/hora (ej: $15/hora)'}
              className="w-full p-3 border rounded-lg"
              value={formData.pago}
              onChange={(e) => setFormData({...formData, pago: e.target.value})}
              required
            />
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2 px-4 border rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Publicar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Chat = ({ contacto, onClose }) => {
    const chatId = `chat_${contacto.id}`;
    const mensajesChat = mensajes[chatId] || [];

    const enviarMensaje = () => {
      if (nuevoMensaje.trim()) {
        setMensajes(prev => ({
          ...prev,
          [chatId]: [...(prev[chatId] || []), {
            id: Date.now(),
            texto: nuevoMensaje,
            autor: 'yo',
            timestamp: new Date().toLocaleTimeString()
          }]
        }));
        setNuevoMensaje('');
        
        setTimeout(() => {
          setMensajes(prev => ({
            ...prev,
            [chatId]: [...(prev[chatId] || []), {
              id: Date.now() + 1,
              texto: "💬 Mensaje enviado. El usuario recibirá una notificación y podrá responderte pronto.",
              autor: 'sistema',
              timestamp: new Date().toLocaleTimeString()
            }]
          }));
        }, 500);
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg w-full max-w-md h-96 flex flex-col">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-semibold">{contacto.nombre || contacto.usuario}</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {mensajesChat.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                Inicia la conversación 👋
              </div>
            )}
            {mensajesChat.map(mensaje => (
              <div key={mensaje.id} className={`flex ${mensaje.autor === 'yo' ? 'justify-end' : mensaje.autor === 'sistema' ? 'justify-center' : 'justify-start'}`}>
                <div className={`max-w-xs p-3 rounded-lg ${
                  mensaje.autor === 'yo' 
                    ? 'bg-blue-500 text-white' 
                    : mensaje.autor === 'sistema'
                    ? 'bg-gray-200 text-gray-600 text-sm'
                    : 'bg-gray-100'
                }`}>
                  <p className="text-sm">{mensaje.texto}</p>
                  <p className="text-xs opacity-70 mt-1">{mensaje.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 border-t flex gap-2">
            <input
              type="text"
              placeholder="Escribe un mensaje..."
              className="flex-1 p-2 border rounded-lg"
              value={nuevoMensaje}
              onChange={(e) => setNuevoMensaje(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && enviarMensaje()}
            />
            <button
              onClick={enviarMensaje}
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const filtrarItems = (items, esTrabajo = true) => {
    return items.filter(item => {
      const categoriaMatch = !filtros.categoria || item.categoria === filtros.categoria;
      
      const precioMatch = !filtros.precio || 
        (item.pago && item.pago.toLowerCase().includes(filtros.precio.toLowerCase())) || 
        (item.precio && item.precio.toLowerCase().includes(filtros.precio.toLowerCase()));
        
      const tiempoMatch = !filtros.tiempo || 
        (item.tiempo && item.tiempo.toLowerCase().includes(filtros.tiempo.toLowerCase())) || 
        (item.disponibilidad && item.disponibilidad.toLowerCase().includes(filtros.tiempo.toLowerCase()));
        
      return categoriaMatch && precioMatch && tiempoMatch;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-blue-600">SkillUp</h1>
          <p className="text-gray-600 text-sm">Conecta tu talento con oportunidades inmediatas</p>
        </div>
      </header>

      <nav className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('buscar')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'buscar' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Search className="h-4 w-4 inline mr-2" />
              Buscar Trabajador
            </button>
            <button
              onClick={() => setActiveTab('ofrecer')}
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                activeTab === 'ofrecer' 
                  ? 'border-blue-500 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <User className="h-4 w-4 inline mr-2" />
              Ofrecer Trabajo
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <Filter className="h-5 w-5 text-gray-500" />
            <select
              className="p-2 border rounded-lg"
              value={filtros.categoria}
              onChange={(e) => setFiltros({...filtros, categoria: e.target.value})}
            >
              {categorias.map(cat => (
                <option key={cat.value} value={cat.value}>{cat.label}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Filtrar por precio"
              className="p-2 border rounded-lg"
              value={filtros.precio}
              onChange={(e) => setFiltros({...filtros, precio: e.target.value})}
            />
            <input
              type="text"
              placeholder="Filtrar por tiempo"
              className="p-2 border rounded-lg"
              value={filtros.tiempo}
              onChange={(e) => setFiltros({...filtros, tiempo: e.target.value})}
            />
            <button
              onClick={() => setMostrarFormulario(true)}
              className="ml-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              {activeTab === 'buscar' ? 'Publicar Trabajo' : 'Ofrecer Servicios'}
            </button>
          </div>
        </div>

        {activeTab === 'buscar' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Trabajos Disponibles</h2>
            {filtrarItems(trabajos).map(trabajo => (
              <div key={trabajo.id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-blue-600">{trabajo.titulo}</h3>
                    <p className="text-gray-600 mt-2">{trabajo.descripcion}</p>
                    <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {trabajo.tiempo}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {trabajo.pago}
                      </span>
                      <span>Por: {trabajo.usuario}</span>
                      <span>{trabajo.fechaPublicacion}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setChatActivo(trabajo)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center gap-2 ml-4"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Contactar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'ofrecer' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Trabajadores Disponibles</h2>
            {filtrarItems(trabajadores, false).map(trabajador => (
              <div key={trabajador.id} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-blue-600">{trabajador.nombre}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm">{trabajador.rating}</span>
                        <span className="text-sm text-gray-500">({trabajador.trabajosCompletados} trabajos)</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mt-2">{trabajador.especialidad}</p>
                    <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {trabajador.disponibilidad}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {trabajador.precio}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setChatActivo(trabajador)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center gap-2 ml-4"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Contactar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {mostrarFormulario && (
        <FormularioTrabajo
          tipo={activeTab === 'buscar' ? 'trabajo' : 'trabajador'}
          onClose={() => setMostrarFormulario(false)}
          onSubmit={(nuevoItem) => {
            if (activeTab === 'buscar') {
              setTrabajos([nuevoItem, ...trabajos]);
            } else {
              setTrabajadores([nuevoItem, ...trabajadores]);
            }
          }}
        />
      )}

      {chatActivo && (
        <Chat
          contacto={chatActivo}
          onClose={() => setChatActivo(null)}
        />
      )}
    </div>
  );
};

export default SkillUpApp;