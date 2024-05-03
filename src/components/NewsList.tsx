import {
  Text,
  Field,
  withDatasourceCheck,
  constants,
  useComponentProps,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { OnfsComponentProps } from 'lib/component-props';
import { GetServerSideComponentProps } from '@sitecore-jss/sitecore-jss-nextjs';
import { NewsListQueryDocument, AppRoute, Item } from './NewsListQuery.graphql';
import config from 'temp/config';
import { getSession } from 'next-auth/react';
import { GraphQLRequestWithAccessTokenClient } from 'src/types/GraphQLRequestWithAccessTokenClient';

type DataSource = {
  heading: {
    jsonValue: {
      value: string;
    };
    value: string;
  };

  newsItems: {
    value: string;
    jsonValue: [];
  };

  name: string;
  id: string;
};

type NewsListProps = OnfsComponentProps & {
  fields: {
    heading: Field<string>;
    data: {
      datasource: DataSource;
      contextItem: {
        id: string;
        pageTitle: {
          value: string;
        };
      };
    };
  };
};

type RouteItem = AppRoute & Item;
type GraphQLNewsListingData = {
  datasource: DataSource;
  contextItem: RouteItem;
};

type NewsItem = {
  id: string;
  fields: {
    Title: {
      value: string;
    };
    Subtitle: {
      value: string;
    };
    Body: {
      value: string;
    };
  };
};

const NewsList = (props: NewsListProps): JSX.Element => {
  const data = useComponentProps<GraphQLNewsListingData>(props.rendering.uid);
  return (
    <div>
      <Text field={props.fields.heading} tag="h2" />

      {data?.datasource?.newsItems.jsonValue && (
        <>
          {data.datasource.newsItems.jsonValue.map((newsItem: NewsItem) => {
            return (
              <div key={newsItem.id}>
                <div>
                  <strong>{newsItem.fields.Title.value}</strong>
                </div>
                <div>
                  <em>{newsItem.fields.Subtitle.value}</em>
                </div>
                <div dangerouslySetInnerHTML={{ __html: newsItem.fields.Body.value }}></div>
              </div>
            );
          })}
        </>
      )}
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
  rendering,
  layoutData,
  context
) => {
  if (process.env.JSS_MODE === constants.JSS_MODE.DISCONNECTED) {
    return null;
  }
  const session = await getSession(context);
  const accessToken = (session?.accessToken as string) || '';

  const graphQLClient = new GraphQLRequestWithAccessTokenClient(config.graphQLEndpoint, {
    apiKey: config.sitecoreApiKey,
    accessToken: accessToken,
  });

  const result = await graphQLClient.request<GraphQLNewsListingData>(NewsListQueryDocument, {
    datasource: rendering.dataSource,
    contextItem: layoutData?.sitecore?.route?.itemId,
    language: layoutData?.sitecore?.context?.language,
  });

  //console.log(result);

  return result;
};

export default withDatasourceCheck()<NewsListProps>(NewsList);
