import API from "API";

export class GetServerSidePropsResult {
  private readonly url: string;
  private readonly accessToken: string;
  private readonly optionalProps: Record<string, string>;
  private readonly authenticatedRedirectUrl: string;
  private readonly forwardRedirectUrl: string;

  constructor(
    __accessToken: string,
    __optionalProps: Record<string, string> = {}
  ) {
    this.url = "http://web-server/api/auth";
    this.accessToken = __accessToken;
    this.optionalProps = __optionalProps;
    this.authenticatedRedirectUrl = "/";
    this.forwardRedirectUrl = "/feed";
  }

  async getUser() {
    const api = new API({ Authorization: `${this.accessToken}` });
    const { user } = await api.getRequest(this.url);
    return user;
  }

  async ensureAuthenticated() {
    const user = await this.getUser();

    if (user) {
      return {
        props: {
          ...this.optionalProps,
        },
      };
    }

    return {
      redirect: {
        destination: this.authenticatedRedirectUrl,
        permanent: false,
      },
    };
  }
  async forwardAuthentication() {
    const user = await this.getUser();

    if (!user) {
      return {
        props: {
          ...this.optionalProps,
        },
      };
    }

    return {
      redirect: {
        destination: this.forwardRedirectUrl,
        permanent: false,
      },
    };
  }
}
