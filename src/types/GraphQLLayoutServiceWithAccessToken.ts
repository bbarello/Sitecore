import {
  GraphQLLayoutService,
  GraphQLLayoutServiceConfig,
  debug,
} from '@sitecore-jss/sitecore-jss';
import { GraphQLRequestWithAccessTokenClient } from './GraphQLRequestWithAccessTokenClient';

export type GraphQLWithAccessTokenConfig = GraphQLLayoutServiceConfig & {
  accessToken?: string;
};

export class GraphQLLayoutServiceWithAccessToken extends GraphQLLayoutService {
  constructor(clientConfig: GraphQLWithAccessTokenConfig) {
    super(clientConfig);
  }

  getGraphQLClient() {
    return new GraphQLRequestWithAccessTokenClient(this.serviceConfig.endpoint, {
      apiKey: this.serviceConfig.apiKey,
      debugger: debug.layout,
      accessToken: (this.serviceConfig as GraphQLWithAccessTokenConfig).accessToken,
    });
  }
}
