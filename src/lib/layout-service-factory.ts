import { LayoutService } from '@sitecore-jss/sitecore-jss-nextjs';
import { Session } from 'next-auth';
import { GraphQLLayoutServiceWithAccessToken } from 'src/types/GraphQLLayoutServiceWithAccessToken';
import config from 'temp/config';

export class LayoutServiceFactory {
  private layoutService!: GraphQLLayoutServiceWithAccessToken;

  create(session?: Session): LayoutService {
    this.layoutService = new GraphQLLayoutServiceWithAccessToken({
      endpoint: config.graphQLEndpoint,
      apiKey: config.sitecoreApiKey,
      siteName: config.jssAppName,
      accessToken: session?.accessToken as string,
    });
    return this.layoutService;
  }
}

export const layoutServiceFactory = new LayoutServiceFactory();
