import {
  Text,
  Field,
  withDatasourceCheck,
  GetServerSideComponentProps,
  constants,
  useComponentProps,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { OnfsComponentProps } from 'lib/component-props';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import ApiService from 'src/services/ApiService';

type UserProfileProps = OnfsComponentProps & {
  fields: {
    heading: Field<string>;
  };
};

type Data = {
  accessToken: string;
  idToken: string;
  refreshToken: string;
  apiResponse: string;
};

const UserProfile = (props: UserProfileProps): JSX.Element => {
  const data = useComponentProps<Data>(props.rendering.uid);

  return (
    <div>
      <Text field={props.fields.heading} tag="h2" />
      <div>
        <strong>accessToken:</strong>
        <div>{data?.accessToken}</div>
      </div>
      <div>
        <strong>idToken:</strong>
        <div>{data?.idToken}</div>
      </div>
      <div>
        <strong>refreshToken:</strong>
        <div>{data?.refreshToken}</div>
      </div>
      <div>
        <div>
          <strong>apiResponse:</strong>
        </div>
        <div>{data?.apiResponse}</div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideComponentProps = async (
  _rendering,
  _layoutData,
  context
) => {
  if (process.env.JSS_MODE === constants.JSS_MODE.DISCONNECTED) {
    return null;
  }

  const session = await getSession(context);
  let apiResponse = '';

  if (session && session.accessToken) {
    //console.log('Calling API');
    const response = await new ApiService(session as Session).callApi();
    const data = await response.json();

    try {
      apiResponse = (data as string[])?.join(', ');
    } catch (error) {
      console.error(error);
    }

    return {
      accessToken: (session?.accessToken as string) || '',
      idToken: (session?.idToken as string) || '',
      refreshToken: (session?.refreshToken as string) || '',
      apiResponse: apiResponse,
    };
  }

  return {
    accessToken: '',
    idToken: '',
    refreshToken: '',
    apiResponse: '',
  };
};

export default withDatasourceCheck()<UserProfileProps>(UserProfile);
