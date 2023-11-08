export const screenType = {
  'List Appointments': {
    name: 'List',
    iconName: 'list-alt',
    location: require('../screens/appointments/ListAppointments')
  },
  'Create Appointment': {
    name: 'Agregar Reserva',
    iconName: 'add',
    location: require('../screens/appointments/CreateAppointment')
  },
  'List People': {
    name: 'Lista de Personas',
    iconName: 'format-list-bulleted',
    location: require('../screens/people/ListPeople')
  },
  'Create People': {
    name: 'Agregar Persona',
    iconName: 'add',
    location: require('../screens/people/CreatePeople')
  },
  'Edit People': {
    name: 'Editar Persona',
    iconName: 'add',
    location: require('../screens/people/EditPeople')
  },
  'List Categories': {
    name: 'List Categories',
    iconName: 'format-list-bulleted',
    location: require('../screens/categories/ListCategories')
  },
  'Create Category': {
    name: 'Create New',
    iconName: 'add',
    location: require('../screens/categories/CreateCategory')
  },
  'List Clinical Records': {
    name: 'Lista de Fichas',
    iconName: 'format-list-bulleted',
    location: require('../screens/clinicalrecords/ListClinicalRecords')
  },
  'Create Clinical Record': {
    name: 'Agregar Ficha',
    iconName: 'add',
    location: require('../screens/clinicalrecords/CreateClinicalRecord')
  },
  'Create Clinical Record From Appointment': {
    name: 'Agregar Ficha (con reserva)',
    iconName: 'add',
    location: require('../screens/clinicalrecords/CreateFromAppointment')
  },
  'Edit Clinical Record': {
    name: 'Editar Ficha',
    location: require('../screens/clinicalrecords/EditClinicalRecord')
  },
  'Export Clinical Records': {
    name: 'Export',
    iconName: 'import-export',
    location: require('../screens/clinicalrecords/ExportClinicalRecords')
  }
}
