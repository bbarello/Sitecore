import { DictionaryPhrases, ComponentPropsCollection } from '@sitecore-jss/sitecore-jss-nextjs';
import { OnfsSitecoreContextValue } from './component-props';

/**
 * Sitecore page props
 */
export type SitecorePageProps = {
  locale: string;
  dictionary: DictionaryPhrases;
  componentProps: ComponentPropsCollection;
  notFound: boolean;
  sitecoreContext: OnfsSitecoreContextValue | null;
  unauthorized: boolean;
};
