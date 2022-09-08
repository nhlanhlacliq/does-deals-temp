import {ReferencedByView} from 'part:@indent-oss/sanityio-referenced-by'
import S from '@sanity/desk-tool/structure-builder'

export const getDefaultDocumentNode = () => {
  return S.document().views([
    S.view.form(),
    S.view.component(ReferencedByView).title('Referenced by'),
  ])
}

const structure = () =>
  S.list()
    .title('Deals')
    .items([
      
      S.listItem()
        .title('Settings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),

      S.divider(),

      ...S.documentTypeListItems()
        .filter(
          item => item.getId() !== 'siteSettings'
        )
    ])

// export default () => S.list().title('Content').items(S.documentTypeListItems())
export default structure;