import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'unfonts.css'

const vuetify = createVuetify({
  ssr: true,  
  components,
  directives,
})

export default vuetify