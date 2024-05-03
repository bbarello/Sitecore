import {
  Field,
  ComponentParams,
  ComponentRendering,
  LayoutServiceContext,
  RouteData,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { Session } from 'inspector';

/**
 * Onfs sitecore context value shape
 */
export type OnfsSitecoreContextValue = LayoutServiceContext & {
  itemId?: string;
  route: RouteData;
};

/**
 * Shared Onfs specimen fields
 */
export type OnfsSpecimenFields = {
  fields: {
    description: Field<string>;
    heading: Field<string>;
  };
};

/**
 * Shared ONFS component props
 */
export type OnfsComponentProps = {
  rendering: ComponentRendering;
  params: ComponentParams;
  session: Session;
};

/**
 * ONFS component props with context
 * You can access `sitecoreContext` by withSitecoreContext/useSitecoreContext
 * @example withSitecoreContext()(ContentBlock)
 * @example const { sitecoreContext } = useSitecoreContext()
 */
export type OnfsComponentWithContextProps = OnfsComponentProps & {
  sitecoreContext: OnfsSitecoreContextValue;
};
