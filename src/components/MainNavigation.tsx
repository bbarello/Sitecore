import {
  Text,
  Field,
  withDatasourceCheck,
  useComponentProps,
  GetServerSideComponentProps,
  constants,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { OnfsComponentProps } from 'lib/component-props';
import { Session } from 'next-auth';
import { getSession, signIn, signOut } from 'next-auth/react';

type MainNavigationProps = OnfsComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

const MainNavigation = (props: MainNavigationProps): JSX.Element => {
  const session = useComponentProps<Session>(props.rendering.uid);
  return (
    <div>
      <Text field={props.fields.heading} tag="h2" />
      <div>
        <nav className="my-2 my-md-0 mr-md-3">
          {!session && <button onClick={() => signIn('secureAuth')}>Sign In</button>}
          {session?.user && (
            <>
              <span>
                <small>Signed in as</small>
                <br />
                <strong>{session.user.email || session.user.name}</strong>
              </span>
              <button onClick={() => signOut()}>Sign Out</button>
            </>
          )}
        </nav>
        <br />
      </div>
    </div>
  );
};

/**
 * Will be called during SSR
 * @param {ComponentRendering} rendering
 * @param {LayoutServiceData} layoutData
 * @param {GetServerSidePropsContext} context
 */
export const getServerSideProps: GetServerSideComponentProps = async (
  _rendering,
  _layoutData,
  context
) => {
  if (process.env.JSS_MODE === constants.JSS_MODE.DISCONNECTED) {
    return null;
  }
  return await getSession(context);
};

export default withDatasourceCheck()<MainNavigationProps>(MainNavigation);
