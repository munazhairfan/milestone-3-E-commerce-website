import { type SchemaTypeDefinition } from 'sanity'
import { schemaTypes } from './product'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: schemaTypes,
}
